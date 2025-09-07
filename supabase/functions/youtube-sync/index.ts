
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting YouTube sync process...')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get the YouTube API key from Supabase secrets
    const { data: secrets, error: secretError } = await supabaseClient
      .from('vault')
      .select('secret')
      .eq('name', 'YOUTUBE_API_KEY')
      .single()

    if (secretError || !secrets?.secret) {
      console.error('YouTube API key not found:', secretError)
      throw new Error('YouTube API key not configured')
    }

    const YOUTUBE_API_KEY = secrets.secret
    const CHANNEL_HANDLE = '@rajasthan_ri_bata'

    console.log('Fetching channel data for:', CHANNEL_HANDLE)

    // Get channel ID from handle
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&forHandle=${CHANNEL_HANDLE}&key=${YOUTUBE_API_KEY}`
    )
    
    if (!channelResponse.ok) {
      throw new Error(`YouTube API error: ${channelResponse.status} ${channelResponse.statusText}`)
    }
    
    const channelData = await channelResponse.json()

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found')
    }

    const channel = channelData.items[0]
    console.log('Channel found:', channel.snippet.title)
    
    // Check if channel already exists
    const { data: existingChannel } = await supabaseClient
      .from('channels')
      .select('id')
      .eq('youtube_channel_id', channel.id)
      .single()

    let channelId
    if (existingChannel) {
      // Update existing channel
      channelId = existingChannel.id
      const { error: channelError } = await supabaseClient
        .from('channels')
        .update({
          title: channel.snippet.title,
          description: channel.snippet.description,
          logo_url: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default?.url,
          subscriber_count: parseInt(channel.statistics.subscriberCount),
          video_count: parseInt(channel.statistics.videoCount),
          view_count: parseInt(channel.statistics.viewCount),
          updated_at: new Date().toISOString()
        })
        .eq('id', channelId)

      if (channelError) {
        console.error('Error updating channel:', channelError)
        throw channelError
      }
    } else {
      // Insert new channel - let database generate UUID
      const { data: newChannel, error: channelError } = await supabaseClient
        .from('channels')
        .insert({
          title: channel.snippet.title,
          description: channel.snippet.description,
          logo_url: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default?.url,
          subscriber_count: parseInt(channel.statistics.subscriberCount),
          video_count: parseInt(channel.statistics.videoCount),
          view_count: parseInt(channel.statistics.viewCount),
          youtube_channel_id: channel.id,
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single()

      if (channelError) {
        console.error('Error saving channel:', channelError)
        throw channelError
      }
      
      channelId = newChannel.id
    }

    console.log('Channel data saved successfully with ID:', channelId)

    // Get latest videos
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&maxResults=20&order=date&type=video&key=${YOUTUBE_API_KEY}`
    )
    
    if (!videosResponse.ok) {
      throw new Error(`YouTube videos API error: ${videosResponse.status} ${videosResponse.statusText}`)
    }
    
    const videosData = await videosResponse.json()

    // Get video statistics
    const videoIds = videosData.items.map((video: any) => video.id.videoId).join(',')
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    )
    
    const statsData = statsResponse.ok ? await statsResponse.json() : { items: [] }

    console.log(`Processing ${videosData.items.length} videos...`)

    // Store videos with statistics
    for (let i = 0; i < videosData.items.length; i++) {
      const video = videosData.items[i]
      const stats = statsData.items.find((stat: any) => stat.id === video.id.videoId)
      
      // Check if video already exists
      const { data: existingVideo } = await supabaseClient
        .from('videos')
        .select('id')
        .eq('youtube_video_id', video.id.videoId)
        .single()

      if (existingVideo) {
        // Update existing video
        await supabaseClient
          .from('videos')
          .update({
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnail_url: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
            view_count: stats?.statistics?.viewCount ? parseInt(stats.statistics.viewCount) : 0,
            duration: stats?.contentDetails?.duration || '',
            updated_at: new Date().toISOString()
          })
          .eq('id', existingVideo.id)
      } else {
        // Insert new video - let database generate UUID
        await supabaseClient
          .from('videos')
          .insert({
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnail_url: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
            published_at: video.snippet.publishedAt,
            youtube_video_id: video.id.videoId,
            youtube_url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
            view_count: stats?.statistics?.viewCount ? parseInt(stats.statistics.viewCount) : 0,
            duration: stats?.contentDetails?.duration || '',
            category: 'general',
            updated_at: new Date().toISOString()
          })
      }
    }

    console.log('Video sync completed successfully')

    return new Response(
      JSON.stringify({ 
        success: true, 
        channel: {
          title: channel.snippet.title,
          description: channel.snippet.description,
          subscriberCount: channel.statistics.subscriberCount,
          videoCount: channel.statistics.videoCount,
          viewCount: channel.statistics.viewCount,
          logoUrl: channel.snippet.thumbnails.high?.url
        },
        videosSync: videosData.items.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('YouTube sync error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
