
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';

const YouTubeApiKeyForm = () => {
  const [apiKey, setApiKey] = useState('');
  const [isStored, setIsStored] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isSupabaseConfigured) {
      checkExistingKey();
    }
  }, []);

  const checkExistingKey = async () => {
    try {
      const { data } = await supabase
        .from('vault')
        .select('name')
        .eq('name', 'YOUTUBE_API_KEY')
        .single();
      
      if (data) {
        setIsStored(true);
      }
    } catch (error) {
      console.log('No existing API key found');
    }
  };

  const handleStoreApiKey = async () => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        // Store in localStorage as fallback
        localStorage.setItem('YOUTUBE_API_KEY', apiKey);
        setIsStored(true);
        setApiKey('');
        toast({
          title: "API Key Stored!",
          description: "Your YouTube API key has been stored locally. Connect to Supabase for secure storage.",
        });
        return;
      }

      // Store the API key in Supabase vault
      const { error } = await supabase
        .from('vault')
        .upsert({
          name: 'YOUTUBE_API_KEY',
          secret: apiKey
        });

      if (error) throw error;

      setIsStored(true);
      setApiKey('');
      toast({
        title: "API Key Stored!",
        description: "Your YouTube API key has been securely stored.",
      });
    } catch (error) {
      console.error('Error storing API key:', error);
      toast({
        title: "Error",
        description: "Failed to store API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isStored) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-green-600">
            <Check className="h-5 w-5" />
            <span className="font-medium">YouTube API Key Configured</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3"
            onClick={() => setIsStored(false)}
          >
            Update API Key
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          YouTube API Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSupabaseConfigured && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <p className="text-sm text-yellow-700">
              Supabase not configured. API key will be stored locally.
            </p>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube API Key
          </label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="font-mono"
          />
          <p className="text-xs text-gray-500 mt-1">
            {isSupabaseConfigured 
              ? "Your API key will be stored securely and encrypted."
              : "Your API key will be stored locally in your browser."
            }
          </p>
        </div>
        <Button 
          onClick={handleStoreApiKey}
          disabled={!apiKey.trim() || loading}
          className="w-full"
        >
          {loading ? 'Storing...' : 'Store API Key Securely'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default YouTubeApiKeyForm;
