
import { useState, useEffect } from 'react';
import { Calendar, User, Tag, ArrowRight, FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { PDFThumbnail } from '@/components/PDFThumbnail';
import { supabase } from '@/integrations/supabase/client';

const Blog = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('id, title, description, file_url, file_type, file_size, created_at, category')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileTypeIcon = (fileType) => {
    if (fileType?.includes('pdf')) return '📄';
    if (fileType?.includes('image')) return '🖼️';
    if (fileType?.includes('video')) return '🎥';
    if (fileType?.includes('audio')) return '🎵';
    return '📄';
  };

  const categories = [...new Set(documents.map(doc => doc.category || 'General'))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20">
      <Navigation />
      
      {/* Header */}
      <section className="pt-20 lg:pt-24 pb-8">
        <div className="max-w-7xl mx-auto mobile-padding text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Library</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access our collection of cultural documents, research papers, and educational resources
          </p>
        </div>
      </section>

      {/* Documents Grid */}
      <section>
        <div className="max-w-7xl mx-auto mobile-padding">
          {loading ? (
            <div className="grid mobile-grid-1 md:grid-cols-2 lg:grid-cols-3 mobile-gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="modern-card">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : documents.length > 0 ? (
            <div className="grid mobile-grid-1 md:grid-cols-2 lg:grid-cols-3 mobile-gap-4 md:gap-6">
              {documents.map((doc) => (
                <Card 
                  key={doc.id} 
                  className="modern-card hover-lift cursor-pointer group"
                  onClick={() => window.open(doc.file_url, '_blank')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        {doc.file_type === 'application/pdf' ? (
                          <PDFThumbnail 
                            url={doc.file_url} 
                            alt={doc.title}
                            width={48}
                            height={48}
                            className="rounded-lg"
                          />
                        ) : (
                          <FileText className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                        {getFileTypeIcon(doc.file_type)}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {doc.title}
                    </h3>
                    
                    {doc.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {doc.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Uploaded {formatDate(doc.created_at)}</span>
                      </div>
                      
                      {doc.file_size && (
                        <div className="flex items-center text-xs text-gray-500">
                          <FileText className="h-3 w-3 mr-1" />
                          <span>{formatFileSize(doc.file_size)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                        {doc.category || 'General'}
                      </span>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-blue-600 hover:bg-blue-50 p-2"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Documents Found</h3>
              <p className="text-gray-600 mb-6">
                There are no documents uploaded yet. Check back later for new content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 content-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Document Categories</h2>
            
            <div className="grid tablet-grid-2 md:grid-cols-3 lg:grid-cols-4 mobile-gap-4">
              {categories.map((category) => (
                <Card key={category} className="modern-card hover-lift cursor-pointer group">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Tag className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                      {category}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {documents.filter(doc => (doc.category || 'General') === category).length} documents
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Blog;
