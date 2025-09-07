
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, X, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 50MB.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a file and enter a title.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Determine if this is a video file
      const isVideo = file.type.startsWith('video/') || 
                     file.name.toLowerCase().match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/);
      
      // Upload to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const bucketName = isVideo ? 'videos' : 'documents';
      
      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (isVideo) {
        // Insert into videos table
        const { error: insertError } = await supabase
          .from('videos')
          .insert({
            title,
            description: description || null,
            youtube_url: publicUrl,
            category: category || 'general',
            thumbnail_url: null,
            youtube_video_id: null,
            duration: null,
            view_count: 0,
            published_at: new Date().toISOString()
          });

        if (insertError) {
          throw insertError;
        }

        toast({
          title: "Video Uploaded!",
          description: `${file.name} has been uploaded to the Videos section.`,
        });
      } else {
        // Insert into documents table
        const { error: insertError } = await supabase
          .from('documents')
          .insert({
            title,
            description: description || null,
            file_url: publicUrl,
            file_type: file.type,
            file_size: file.size,
            category: category || 'general',
            uploaded_by: null
          });

        if (insertError) {
          throw insertError;
        }

        toast({
          title: "Document Uploaded!",
          description: `${file.name} has been uploaded to the Blog section.`,
        });
      }

      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setCategory('');
      
      // Reset file input
      const fileInput = document.getElementById('document-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    const fileInput = document.getElementById('document-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Documents & PDFs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File (Documents go to Blog, Videos go to Videos section)
          </label>
          <Input
            id="document-upload"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.wmv,.flv,.webm,.mkv"
            className="cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Documents: PDF, DOC, DOCX, TXT, JPG, PNG, GIF → Blog section<br/>
            Videos: MP4, AVI, MOV, WMV, FLV, WEBM, MKV → Videos section<br/>
            (Max 50MB)
          </p>
        </div>

        {file && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            {file.type.startsWith('video/') || file.name.toLowerCase().match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/) ? 
              <Video className="h-5 w-5 text-purple-600" /> : 
              <FileText className="h-5 w-5 text-blue-600" />
            }
            <div className="flex-1">
              <p className="font-medium text-sm">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
              </p>
              <p className="text-xs text-green-600 font-medium">
                → Will be uploaded to {file.type.startsWith('video/') || file.name.toLowerCase().match(/\.(mp4|avi|mov|wmv|flv|webm|mkv)$/) ? 'Videos' : 'Blog'} section
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-600 hover:text-red-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rajasthani-red"
          >
            <option value="">Select category</option>
            <option value="culture">Culture & Traditions</option>
            <option value="history">History</option>
            <option value="recipes">Traditional Recipes</option>
            <option value="festivals">Festivals</option>
            <option value="art">Arts & Crafts</option>
            <option value="travel">Travel Guides</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the document"
            rows={3}
          />
        </div>

        <Button 
          onClick={handleUpload}
          disabled={!file || !title.trim() || uploading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
