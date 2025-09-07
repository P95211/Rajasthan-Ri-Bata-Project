
import { useState } from 'react';
import { MessageCircle, Youtube, Instagram, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rajasthani-sand via-white to-rajasthani-sand/50">
      <Navigation />
      
      {/* Header */}
      <section className="pt-20 lg:pt-24 pb-8 bg-white/50">
        <div className="max-w-7xl mx-auto mobile-padding text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a story to share, a collaboration idea, or just want to connect? 
            We'd love to hear from you!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto mobile-padding">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="hover-lift">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us more about your message..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-rajasthani-red hover:bg-rajasthani-red-dark text-white"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Send className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Telegram</p>
                      <p className="text-gray-600">t.me/rajastanribata</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp</p>
                      <p className="text-gray-600">+91 9001936370</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-rajasthani-red/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-rajasthani-red" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">Jaipur, Rajasthan, India</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Follow Us</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-16 border-rajasthani-red text-rajasthani-red hover:bg-rajasthani-red hover:text-white"
                    onClick={() => window.open('https://www.youtube.com/@rajasthan_ri_bata', '_blank')}
                  >
                    <div className="text-center">
                      <Youtube className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-xs font-medium">YouTube</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-16 border-rajasthani-gold text-rajasthani-gold hover:bg-rajasthani-gold hover:text-white"
                    onClick={() => window.open('https://www.instagram.com/rajasthan.ri.bata?igsh=MWhrczlpaTlmbXJjcw==', '_blank')}
                  >
                    <div className="text-center">
                      <Instagram className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-xs font-medium">Instagram</p>
                    </div>
                  </Button>
                </div>
                
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full h-16 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    onClick={() => window.open('https://t.me/rajastanribata', '_blank')}
                  >
                    <div className="text-center">
                      <Send className="h-6 w-6 mx-auto mb-1" />
                      <p className="text-xs font-medium">Telegram Channel</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Response */}
            <Card className="hover-lift bg-gradient-to-r from-rajasthani-red to-rajasthani-gold">
              <CardContent className="p-6 text-white text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-80" />
                <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
                <p className="text-sm opacity-90 mb-4">
                  We typically respond to messages within 24 hours. For urgent matters, 
                  reach out to us on WhatsApp or Telegram!
                </p>
                <Button 
                  variant="outline" 
                  className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-rajasthani-red"
                  onClick={() => window.open('https://wa.me/919001936370', '_blank')}
                >
                  WhatsApp Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I suggest video topics?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! We love hearing your ideas and suggestions for future videos. 
                  Send us your ideas through Telegram or WhatsApp.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Do you collaborate with other creators?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, we're always open to meaningful collaborations that help preserve 
                  and share Rajasthani culture.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I share my cultural stories?</h3>
                <p className="text-gray-600 text-sm">
                  We'd love to hear your stories! Reach out to us with your cultural 
                  experiences and traditions via our social channels.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How often do you upload?</h3>
                <p className="text-gray-600 text-sm">
                  We aim to upload new content regularly. Subscribe to our YouTube channel 
                  and follow our Telegram for updates!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
