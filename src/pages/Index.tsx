
import { useState, useEffect } from 'react';
import { Youtube, Play, Users, Eye, MessageCircle, Send, FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { PDFThumbnail } from '@/components/PDFThumbnail';
import { HeroCarousel } from '@/components/HeroCarousel';
import { SearchBar } from '@/components/SearchBar';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [channelData, setChannelData] = useState({
    subscriberCount: '15.2K',
    viewCount: '500K+',
    videoCount: '50+',
    title: 'Rajasthan Ri Bata',
    description: 'राजस्थान, जिसे राजाओं की भूमि कहा जाता है, अपनी शाही विरासत, वीरता और परंपराओं से बनी एक समृद्ध संस्कृति का धनी है। यहाँ के रंग-बिरंगे त्योहार, घूमर और कालबेलिया जैसे लोकनृत्य, और लोकसंगीत यहाँ के लोगों की जीवंतता को दर्शाते हैं। भव्य किले, भव्य महल और बारीक नक्काशीदार मंदिर इसकी ऐतिहासिक और कलात्मक विरासत की गवाही देते हैं। यहाँ का विविध व्यंजन, खास पहनावे जैसे पगड़ी और घाघरा, तथा सदियों पुरानी रीतियाँ राजस्थान की सांस्कृतिक विविधता को उजागर करती हैं। राजपूत, जाट, भील आदि विभिन्न समुदाय इस मरुस्थलीय प्रदेश को एकता और सांझा परंपरा की मिसाल बनाते हैं।',
    logoUrl: ''
  });

  const [latestVideos, setLatestVideos] = useState([
    {
      id: '1',
      title: 'Traditional Rajasthani Wedding Ceremonies',
      description: 'Discover the graceful movements and vibrant costumes of traditional Rajasthani dance forms...',
      thumbnail_url: '',
      view_count: 12000,
      published_at: '2 days ago',
      youtube_url: ''
    },
    {
      id: '2', 
      title: 'Pushkar Camel Fair Experience',
      description: 'Experience the vibrant atmosphere of the world-famous Pushkar Camel Fair...',
      thumbnail_url: '',
      view_count: 8000,
      published_at: '5 days ago',
      youtube_url: ''
    },
    {
      id: '3',
      title: 'Authentic Dal Baati Churma Recipe',
      description: 'Learn to make the iconic Rajasthani dish from scratch with traditional methods...',
      thumbnail_url: '',
      view_count: 15000, 
      published_at: '1 week ago',
      youtube_url: ''
    }
  ]);

  const [latestDocuments, setLatestDocuments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Load critical data first, then others in background
      try {
        await fetchChannelData();
        // Load non-critical data in background
        Promise.all([
          fetchLatestVideos(),
          fetchLatestDocuments()
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const fetchChannelData = async () => {
    try {
      const { data } = await supabase
        .from('channels')
        .select('*')
        .single();
      
      if (data) {
        setChannelData({
          subscriberCount: formatCount(data.subscriber_count),
          viewCount: formatCount(data.view_count),
          videoCount: formatCount(data.video_count),
          title: data.title,
          description: data.description || 'राजस्थान, जिसे राजाओं की भूमि कहा जाता है, अपनी शाही विरासत, वीरता और परंपराओं से बनी एक समृद्ध संस्कृति का धनी है। यहाँ के रंग-बिरंगे त्योहार, घूमर और कालबेलिया जैसे लोकनृत्य, और लोकसंगीत यहाँ के लोगों की जीवंतता को दर्शाते हैं। भव्य किले, भव्य महल और बारीक नक्काशीदार मंदिर इसकी ऐतिहासिक और कलात्मक विरासत की गवाही देते हैं। यहाँ का विविध व्यंजन, खास पहनावे जैसे पगड़ी और घाघरा, तथा सदियों पुरानी रीतियाँ राजस्थान की सांस्कृतिक विविधता को उजागर करती हैं। राजपूत, जाट, भील आदि विभिन्न समुदाय इस मरुस्थलीय प्रदेश को एकता और सांझा परंपरा की मिसाल बनाते हैं।',
          logoUrl: data.logo_url || ''
        });
      }
    } catch (error) {
      console.log('No channel data found, using defaults');
    }
  };

  const fetchLatestVideos = async () => {
    try {
      const { data } = await supabase
        .from('videos')
        .select('id, title, description, thumbnail_url, view_count, published_at, youtube_url')
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (data && data.length > 0) {
        const formattedVideos = data.map(video => ({
          id: video.id,
          title: video.title,
          description: video.description || '',
          thumbnail_url: video.thumbnail_url || '',
          view_count: video.view_count || 0,
          published_at: formatDate(video.published_at),
          youtube_url: video.youtube_url || ''
        }));
        setLatestVideos(formattedVideos);
      }
    } catch (error) {
      console.log('No video data found, using defaults');
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count?.toString() || '0';
  };

  const fetchLatestDocuments = async () => {
    try {
      const { data } = await supabase
        .from('documents')
        .select('id, title, description, file_url, file_type, created_at, category')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (data && data.length > 0) {
        setLatestDocuments(data);
      }
    } catch (error) {
      console.log('No document data found');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section with Background Images */}
      <section className="relative">
        <HeroCarousel>
          {/* Search Bar - at the very top */}
          <div className="absolute top-0 left-0 right-0 z-30 pt-6">
            <div className="content-width mobile-padding">
              <div className="flex justify-center sm:justify-end">
                <SearchBar className="w-full sm:w-auto" />
              </div>
            </div>
          </div>

          {/* Hero Content Overlay */}
          <div className="flex items-center justify-center h-full">
            <div className="content-width mobile-padding">
              <div className="text-center max-w-4xl mx-auto space-y-6 pt-20">
                {/* Logo and Title */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
                  {channelData.logoUrl && (
                    <img 
                      src={channelData.logoUrl} 
                      alt="Channel Logo" 
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-2 sm:border-4 border-white shadow-2xl"
                    />
                  )}
                  <div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-royal font-bold leading-tight text-white text-shadow-lg">
                      <span className="text-yellow-300">राजस्थान</span>{' '}
                      <span className="text-white">री बाता</span>
                    </h1>
                  </div>
                </div>
                
                {/* Description */}
                <div className="space-y-4 max-w-3xl mx-auto">
                  <p className="text-sm sm:text-base lg:text-lg text-white/95 font-body leading-relaxed text-shadow">
                    राजस्थान, जिसे राजाओं की भूमि कहा जाता है, अपनी शाही विरासत, वीरता और परंपराओं से बनी एक समृद्ध संस्कृति का धनी है। यहाँ के रंग-बिरंगे त्योहार, घूमर और कालबेलिया जैसे लोकनृत्य, और लोकसंगीत यहाँ के लोगों की जीवंतता को दर्शाते हैं।
                  </p>
                  
                  <p className="text-sm sm:text-base lg:text-lg text-white/90 font-body leading-relaxed text-shadow">
                    यहाँ का विविध व्यंजन, खास पहनावे जैसे पगड़ी और घाघरा, तथा सदियों पुरानी रीतियाँ राजस्थान की सांस्कृतिक विविधता को उजागर करती हैं। हमारे साथ जुड़िए और खोजिए राजस्थान की अनमोल कहानियाँ।
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                  <Button 
                    size="lg" 
                    className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 font-body h-auto shadow-2xl border-0"
                    onClick={() => window.open('https://www.youtube.com/@rajasthan_ri_bata', '_blank')}
                  >
                    <Youtube className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">यूट्यूब पर सब्सक्राइब करें</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white/20 border-white/50 text-white hover:bg-white/30 backdrop-blur-sm text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 font-body h-auto shadow-2xl"
                    onClick={() => latestVideos[0]?.youtube_url && window.open(latestVideos[0].youtube_url, '_blank')}
                  >
                    <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">नवीनतम वीडियो देखें</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </HeroCarousel>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 lg:py-20 bg-card/60 backdrop-blur-sm">
        <div className="content-width mobile-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {[
              { icon: Users, label: 'सब्सक्राइबर', value: channelData.subscriberCount, color: 'text-rajasthani-royal-red' },
              { icon: Eye, label: 'व्यूज', value: channelData.viewCount, color: 'text-rajasthani-turquoise' },
              { icon: Play, label: 'वीडियो', value: channelData.videoCount, color: 'text-rajasthani-golden' },
              { icon: MessageCircle, label: 'कमेंट्स', value: '2K+', color: 'text-rajasthani-purple' },
            ].map((stat, index) => (
              <div key={index} className="rajasthani-card hover-lift p-3 sm:p-4 lg:p-6 text-center group">
                <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 ${stat.color} mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-foreground font-royal mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="content-width mobile-padding">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
            
            {/* Latest Documents Section */}
            <div className="animate-fade-in">
              <div className="flex items-center mb-6 sm:mb-8 lg:mb-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-jewel rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-soft">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground font-royal mb-1 sm:mb-2">Latest Documents</h2>
                  <p className="text-sm sm:text-base text-muted-foreground font-body">Discover our new cultural insights and heritage</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {latestDocuments.length > 0 ? (
                  latestDocuments.map((doc) => (
                    <div key={doc.id} className="rajasthani-card hover-lift overflow-hidden cursor-pointer group"
                          onClick={() => window.open(doc.file_url, '_blank')}>
                      <div className="flex">
                        <div className="w-28 h-20 lg:w-36 lg:h-24 bg-gradient-to-br from-rajasthani-turquoise/20 to-rajasthani-emerald/20 relative flex-shrink-0 flex items-center justify-center">
                          {doc.file_type === 'application/pdf' ? (
                            <PDFThumbnail 
                              url={doc.file_url} 
                              alt={doc.title}
                              width={144}
                              height={96}
                              className="w-full h-full rounded-l-xl"
                            />
                          ) : (
                            <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-rajasthani-turquoise" />
                          )}
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Download className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 p-4 lg:p-6">
                          <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-body line-clamp-2">
                            {doc.title}
                          </h3>
                          {doc.description && (
                            <p className="text-muted-foreground mobile-text mb-3 line-clamp-2 font-body">
                              {doc.description}
                            </p>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-center text-xs lg:text-sm text-muted-foreground gap-2">
                            <span className="flex items-center font-body">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(doc.created_at)}
                            </span>
                            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full self-start font-body text-xs">
                              {doc.category || 'सामान्य'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="font-body text-lg">अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया</p>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-lg font-body border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  onClick={() => window.location.href = '/blog'}
                >
                  सभी दस्तावेज़ देखें
                </Button>
              </div>
            </div>

            {/* Latest Videos Section */}
            <div className="animate-fade-in delay-300">
              <div className="flex items-center mb-6 sm:mb-8 lg:mb-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-sunset rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-soft">
                  <Play className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground font-royal mb-1 sm:mb-2">Latest Videos</h2>
                  <p className="text-sm sm:text-base text-muted-foreground font-body">Explore our cultural stories and traditions</p>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {latestVideos.slice(0, 3).map((video) => (
                  <div key={video.id} className="rajasthani-card hover-lift overflow-hidden cursor-pointer group"
                        onClick={() => video.youtube_url && window.open(video.youtube_url, '_blank')}>
                    <div className="flex">
                      <div className="w-20 h-16 sm:w-28 sm:h-20 lg:w-36 lg:h-24 bg-gradient-to-br from-rajasthani-saffron/20 to-rajasthani-deep-orange/20 relative flex-shrink-0">
                        {video.thumbnail_url ? (
                          <img 
                            src={video.thumbnail_url} 
                            alt={video.title}
                            className="w-full h-full object-cover rounded-l-xl"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-rajasthani-saffron opacity-70" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 p-3 sm:p-4 lg:p-6">
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-body line-clamp-2">
                          {video.title}
                        </h3>
                        <div className="flex items-center text-xs sm:text-sm text-muted-foreground space-x-2 sm:space-x-4 font-body">
                          <span>{video.published_at}</span>
                          <span>{formatCount(video.view_count)} व्यूज</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8">
                <Button 
                  variant="outline" 
                  className="w-full h-10 sm:h-12 text-sm sm:text-lg font-body border-2 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                  onClick={() => window.location.href = '/videos'}
                >
                  सभी वीडियो देखें
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-royal relative overflow-hidden">
        <div className="absolute inset-0 rajasthani-pattern opacity-20"></div>
        <div className="relative content-width mobile-padding text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-royal">
                Stay Connected with Rajasthan Stories
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/90 font-body max-w-2xl mx-auto">
                Get updates on new videos, cultural insights, and exclusive content about Rajasthan's rich heritage
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-0 focus:ring-2 focus:ring-white text-foreground font-body text-base sm:text-lg"
              />
              <Button className="bg-white text-primary hover:bg-muted px-6 sm:px-8 py-3 sm:py-4 font-body text-base sm:text-lg font-semibold shadow-golden">
                <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
