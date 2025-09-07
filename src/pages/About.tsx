
import { Heart, Camera, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rajasthani-sand via-white to-rajasthani-sand/50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                <span className="gradient-text">राजस्थान री बाता</span> के बारे में
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                राजस्थान के दिल की यात्रा में आपका स्वागत है, जहां हर कहानी हमारी समृद्ध विरासत, 
                जीवंत संस्कृति और कालातीत परंपराओं का उत्सव है।
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-rajasthani-red">50+</p>
                  <p className="text-sm text-gray-600">वीडियो बनाए गए</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-rajasthani-gold">10K+</p>
                  <p className="text-sm text-gray-600">सब्सक्राइबर</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-rajasthani-red">500K+</p>
                  <p className="text-sm text-gray-600">कुल व्यूज</p>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in delay-300">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-rajasthani-red to-rajasthani-gold rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-medium">चैनल निर्माता</p>
                      <p className="text-sm opacity-80">भावुक कहानीकार</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rajasthani-gold/20 rounded-full blur-xl"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-rajasthani-red/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">हमारा मिशन</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            अपने कैमरे के लेंस और कहानी कहने की शक्ति के माध्यम से, मैं राजस्थान की अविश्वसनीय 
            विरासत को संरक्षित करने और साझा करने का लक्ष्य रखता हूं। हर वीडियो हमारे गौरवशाली 
            अतीत और आशाजनक भविष्य के बीच एक पुल है, जो यह सुनिश्चित करता है कि हमारी भूमि की 
            कहानियां, परंपराएं और संस्कृति पीढ़ियों को प्रेरणा देती रहें।
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rajasthani-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-rajasthani-red" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">संस्कृति का संरक्षण</h3>
              <p className="text-gray-600">पारंपरिक प्रथाओं, रीति-रिवाजों और कहानियों का दस्तावेजीकरण और साझाकरण</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rajasthani-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-rajasthani-gold" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">दृश्य कहानीकरण</h3>
              <p className="text-gray-600">कहानियों को जीवंत बनाने के लिए सिनेमैटिक तकनीकों का उपयोग</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-rajasthani-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-rajasthani-red" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">समुदाय निर्माण</h3>
              <p className="text-gray-600">राजस्थानी संस्कृति से प्रेम करने वाले लोगों को जोड़ना</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">मेरी कहानी</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  राजस्थान के दिल में जन्मे और पले-बढ़े, मैं कहानियों से घिरा हुआ बड़ा हुआ। 
                  मेरी दादी मुझे बहादुर राजा-रानियों की कहानियां सुनाती थीं, मेरी माँ पीढ़ियों 
                  से चली आ रही व्यंजनों की विधि साझा करती थीं, और मेरे पिता उन परंपराओं के बारे 
                  में बताते थे जिन्होंने हमारी पहचान को आकार दिया।
                </p>
                <p>
                  कॉलेज के दिनों में मुझे एहसास हुआ कि ये सुंदर कहानियां धीरे-धीरे विलुप्त हो 
                  रही हैं। युवा शहरों की ओर जा रहे थे, पारंपरिक प्रथाएं भुलाई जा रही थीं, और 
                  हमारे पूर्वजों की समृद्ध मौखिक परंपराएं हमेशा के लिए गायब होने के खतरे में थीं।
                </p>
                <p>
                  तभी मैंने कैमरा उठाया और "राजस्थान री बाता" शुरू किया - सिर्फ एक यूट्यूब चैनल 
                  के रूप में नहीं, बल्कि हमारी भूमि की अविश्वसनीय विरासत का दस्तावेजीकरण, संरक्षण 
                  और साझाकरण करने के मिशन के रूप में। हर वीडियो प्रेम का श्रम है, हर कहानी एक 
                  खजाना है जिसे दुनिया के साथ साझा करने का मुझे सम्मान मिला है।
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rajasthani-red/10 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-rajasthani-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">कंटेंट क्रिएटर अवार्ड</h3>
                      <p className="text-sm text-gray-600">सांस्कृतिक दस्तावेजीकरण के लिए सम्मानित</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rajasthani-gold/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-rajasthani-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">सामुदायिक प्रभाव</h3>
                      <p className="text-sm text-gray-600">पीढ़ियों के बीच पुल निर्माण</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rajasthani-red/10 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-rajasthani-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">सांस्कृतिक संरक्षण</h3>
                      <p className="text-sm text-gray-600">भावी पीढ़ियों के लिए परंपराओं का दस्तावेजीकरण</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-rajasthani-red to-rajasthani-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">हमारी प्रेरणा</h2>
            <p className="text-rajasthani-sand text-lg max-w-2xl mx-auto">
              ये मूल मूल्य हमारी हर कहानी और हर वीडियो का मार्गदर्शन करते हैं
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'प्रामाणिकता', description: 'हर कहानी का शोध किया जाता है और परंपरा के सम्मान के साथ कहा जाता है' },
              { title: 'गुणवत्ता', description: 'उच्च उत्पादन मानक जो हमारे विषयों का सम्मान करते हैं' },
              { title: 'पहुंच', description: 'सांस्कृतिक सामग्री को सभी के लिए उपलब्ध कराना' },
              { title: 'सम्मान', description: 'हमारे द्वारा प्रस्तुत लोगों और परंपराओं का सम्मान करना' }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-rajasthani-sand text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
