import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Save, Eye, Youtube, FileText, Key, Database, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import YouTubeApiKeyForm from '@/components/YouTubeApiKeyForm';
import YouTubeSync from '@/components/YouTubeSync';
import DocumentUpload from '@/components/DocumentUpload';
import UserManagement from '@/components/UserManagement';
import DocumentManagement from '@/components/DocumentManagement';

const Admin = () => {
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    category: '',
    thumbnail: ''
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    featured: false
  });

  const { toast } = useToast();

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Video submitted:', videoForm);
    toast({
      title: "Video Added!",
      description: "Your video has been successfully added to the gallery.",
    });
    setVideoForm({ title: '', description: '', youtubeUrl: '', category: '', thumbnail: '' });
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blog submitted:', blogForm);
    toast({
      title: "Blog Post Created!",
      description: "Your blog post has been successfully published.",
    });
    setBlogForm({ title: '', excerpt: '', content: '', category: '', featured: false });
  };

  const existingVideos = [
    { id: 1, title: 'Traditional Rajasthani Wedding Ceremonies', category: 'culture', views: '25K' },
    { id: 2, title: 'Pushkar Camel Fair 2024', category: 'festivals', views: '18K' },
    { id: 3, title: 'Authentic Dal Baati Churma Recipe', category: 'food', views: '32K' },
  ];

  const existingBlogs = [
    { id: 1, title: 'The Timeless Art of Rajasthani Miniature Painting', category: 'Art & Culture', status: 'Published' },
    { id: 2, title: 'Behind the Scenes: Filming at Mehrangarh Fort', category: 'Behind the Scenes', status: 'Draft' },
  ];

  const existingDocuments = [
    { id: 1, title: 'Rajasthan Culture Guide', type: 'PDF', size: '2.3 MB', uploadDate: '2024-01-15' },
    { id: 2, title: 'Traditional Recipes Collection', type: 'PDF', size: '5.1 MB', uploadDate: '2024-01-10' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rajasthani-sand via-white to-rajasthani-sand/50">
      <Navigation />
      
      {/* Header */}
      <div className="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">Manage your content and keep your audience engaged</p>
        <Tabs defaultValue="youtube" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto lg:grid-cols-7">
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* YouTube Integration Tab */}
          <TabsContent value="youtube" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <YouTubeApiKeyForm />
              <YouTubeSync />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Channel Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">15.2K</p>
                    <p className="text-sm text-gray-600">Subscribers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-rajasthani-gold">125</p>
                    <p className="text-sm text-gray-600">Videos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">2.1M</p>
                    <p className="text-sm text-gray-600">Total Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add New Video */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Video
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVideoSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Video Title
                      </label>
                      <Input
                        value={videoForm.title}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter video title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        YouTube URL
                      </label>
                      <Input
                        value={videoForm.youtubeUrl}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                        placeholder="https://youtube.com/watch?v=..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <Input
                        value={videoForm.category}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g., culture, festivals, food"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <Textarea
                        value={videoForm.description}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the video"
                        rows={3}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thumbnail URL (Optional)
                      </label>
                      <Input
                        value={videoForm.thumbnail}
                        onChange={(e) => setVideoForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                        placeholder="Custom thumbnail URL"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-rajasthani-red hover:bg-rajasthani-red-dark">
                      <Upload className="mr-2 h-4 w-4" />
                      Add Video
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Existing Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Youtube className="h-5 w-5" />
                    Existing Videos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {existingVideos.map((video) => (
                      <div key={video.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{video.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span className="capitalize">{video.category}</span>
                            <span>{video.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentUpload />
              <DocumentManagement />
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add New Blog Post */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create Blog Post
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Post Title
                      </label>
                      <Input
                        value={blogForm.title}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter blog post title"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <Input
                        value={blogForm.category}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g., Culture, Behind the Scenes"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Excerpt
                      </label>
                      <Textarea
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Brief excerpt for the blog post"
                        rows={2}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <Textarea
                        value={blogForm.content}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your blog post content here..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={blogForm.featured}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, featured: e.target.checked }))}
                        className="rounded"
                      />
                      <label htmlFor="featured" className="text-sm text-gray-700">
                        Mark as featured post
                      </label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-rajasthani-gold hover:bg-rajasthani-gold-dark">
                      <Save className="mr-2 h-4 w-4" />
                      Publish Post
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Existing Blog Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {existingBlogs.map((blog) => (
                      <div key={blog.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{blog.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>{blog.category}</span>
                            <span className={`px-2 py-1 rounded-full ${
                              blog.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {blog.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-8">
            <UserManagement />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-rajasthani-red">125</p>
                    <p className="text-sm text-gray-600">Total Videos</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-rajasthani-gold">15.2K</p>
                    <p className="text-sm text-gray-600">Subscribers</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-rajasthani-red">2.1M</p>
                    <p className="text-sm text-gray-600">Total Views</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-rajasthani-gold">25</p>
                    <p className="text-sm text-gray-600">Documents</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics charts and detailed metrics would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Channel Description
                  </label>
                  <Textarea
                    placeholder="Brief description of your channel..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <Input placeholder="contact@rajasthanribata.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Media Links
                  </label>
                  <div className="space-y-2">
                    <Input placeholder="YouTube Channel URL" />
                    <Input placeholder="Instagram Profile URL" />
                    <Input placeholder="WhatsApp Number" />
                  </div>
                </div>
                
                <Button className="bg-rajasthani-red hover:bg-rajasthani-red-dark">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
