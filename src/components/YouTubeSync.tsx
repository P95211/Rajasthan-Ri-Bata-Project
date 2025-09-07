
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';

const YouTubeSync = () => {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [channelData, setChannelData] = useState<any>(null);
  const { toast } = useToast();

  const handleSync = async () => {
    setSyncing(true);
    try {
      console.log('Starting YouTube sync...');
      
      if (!isSupabaseConfigured) {
        // Mock sync when Supabase is not configured
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        
        const mockData = {
          channel: {
            title: 'Rajasthan Ri Bata',
            subscriberCount: '15200',
            viewCount: '500000',
            videoCount: '50'
          },
          videosSync: 20
        };
        
        setLastSync(new Date());
        setChannelData(mockData.channel);
        
        toast({
          title: "Mock Sync Complete!",
          description: "Demo data loaded. Connect to Supabase for real YouTube integration.",
        });
        return;
      }
      
      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('youtube-sync');
      
      if (error) {
        throw error;
      }

      console.log('YouTube sync response:', data);
      
      setLastSync(new Date());
      setChannelData(data.channel);
      
      toast({
        title: "Sync Complete!",
        description: `Successfully synced ${data.videosSync} videos and channel data.`,
      });
    } catch (error) {
      console.error('YouTube sync error:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync YouTube data. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-5 w-5 text-red-600" />
          YouTube Channel Sync
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSupabaseConfigured && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <p className="text-sm text-yellow-700">
              Supabase not configured. This will show demo data only.
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
          <Youtube className="h-5 w-5 text-red-600" />
          <div>
            <p className="font-medium text-sm">@rajasthan_ri_bata</p>
            <p className="text-xs text-gray-600">Connected YouTube Channel</p>
          </div>
        </div>

        {channelData && (
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-sm text-green-800">{channelData.title}</p>
            <div className="text-xs text-green-600 mt-1 space-y-1">
              <div>Subscribers: {parseInt(channelData.subscriberCount).toLocaleString()}</div>
              <div>Videos: {parseInt(channelData.videoCount).toLocaleString()}</div>
              <div>Views: {parseInt(channelData.viewCount).toLocaleString()}</div>
            </div>
          </div>
        )}

        {lastSync && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Last synced: {lastSync.toLocaleString()}</span>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Sync your latest videos, channel information, and statistics.
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Updates video titles and descriptions</li>
            <li>• Fetches new thumbnails</li>
            <li>• Syncs subscriber and view counts</li>
            <li>• Imports latest 20 videos</li>
          </ul>
        </div>

        <Button 
          onClick={handleSync}
          disabled={syncing}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          {syncing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Syncing Channel Data...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              {isSupabaseConfigured ? 'Sync YouTube Channel' : 'Demo Sync (No Supabase)'}
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>Automatic sync runs daily at midnight</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeSync;
