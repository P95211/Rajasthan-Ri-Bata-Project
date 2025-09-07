
import { useState, useEffect } from 'react';
import { Play, Clock, Eye, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'culture', 'festivals', 'food', 'travel', 'history'];

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data } = await supabase
        .from('videos')
        .select('id, title, description, duration, view_count, published_at, category, thumbnail_url, youtube_url')
        .order('published_at', { ascending: false });
      
      if (data && data.length > 0) {
        setVideos(data);
      } else {
        // Fallback to sample data if no real data
        setVideos([
          {
            id: '1',
            title: 'Traditional Rajasthani Wedding Ceremonies',
            description: 'Explore the rich traditions and colorful ceremonies of a traditional Rajasthani wedding...',
            duration: '15:30',
            view_count: 25000,
            published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            category: 'culture',
            thumbnail_url: '',
            youtube_url: 'https://www.youtube.com/@rajasthan_ri_bata'
          },
          {
            id: '2',
            title: 'Pushkar Camel Fair 2024',
            description: 'Experience the vibrant atmosphere of the world-famous Pushkar Camel Fair...',
            duration: '12:45',
            view_count: 18000,
            published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            category: 'festivals',
            thumbnail_url: '',
            youtube_url: 'https://www.youtube.com/@rajasthan_ri_bata'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
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

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rajasthani-sand via-white to-rajasthani-sand/50">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rajasthani-red"></div>
            <p className="mt-4 text-gray-600">Loading videos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rajasthani-sand via-white to-rajasthani-sand/50">
      <Navigation />
      
      {/* Header */}
      <section className="pt-20 lg:pt-24 pb-8 bg-white/50">
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Gallery</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Explore our collection of stories, traditions, and cultural experiences from Rajasthan
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600 hidden sm:inline">Filter:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs ${selectedCategory === category 
                      ? "bg-rajasthani-red hover:bg-rajasthani-red-dark" 
                      : "border-rajasthani-gold text-rajasthani-red hover:bg-rajasthani-sand"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section>
        <div className="max-w-7xl mx-auto mobile-padding">
          <div className="grid mobile-grid-1 md:grid-cols-2 lg:grid-cols-3 mobile-gap-4 md:gap-6 lg:gap-8">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="hover-lift overflow-hidden cursor-pointer group"
                    onClick={() => video.youtube_url && window.open(video.youtube_url, '_blank')}>
                <div className="aspect-video bg-gradient-to-br from-rajasthani-sand to-rajasthani-gold/20 relative">
                  {video.thumbnail_url ? (
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-all duration-300 group-hover:bg-rajasthani-red/80">
                        <Play className="h-8 w-8 text-rajasthani-red group-hover:text-white" />
                      </div>
                    </div>
                  )}
                  
                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {video.duration}
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-rajasthani-red text-white px-3 py-1 rounded-full text-xs font-medium capitalize">
                    {video.category || 'general'}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rajasthani-red transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {video.description || ''}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {formatCount(video.view_count || 0)} views
                    </div>
                    <span>{formatDate(video.published_at)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No videos found. Try syncing your YouTube channel in the admin panel.</p>
            </div>
          )}

          {/* Load More Button */}
          {filteredVideos.length > 0 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                className="border-rajasthani-red text-rajasthani-red hover:bg-rajasthani-red hover:text-white px-8"
              >
                Load More Videos
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Videos;
