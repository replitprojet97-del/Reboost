import Header from '@/components/Header';
import FooterPremium from '@/components/premium/FooterPremium';
import SEO from '@/components/SEO';
import { useTranslations } from '@/lib/i18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactPageSchema, breadcrumbSchema } from '@/lib/seo-data';

export default function Contact() {
  const t = useTranslations();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const contactBreadcrumb = breadcrumbSchema([
    { name: t.nav.home, path: '/' },
    { name: t.nav.contact, path: '/contact' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message');
      }

      toast({
        title: t.contact.success,
        description: data.message || t.common.success,
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Erreur lors de l\'envoi du message',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={t.seo.contact.title}
        description={t.seo.contact.description}
        keywords="contact Altus Finance Group, contact us, loan customer service, business financing help, Altus customer support"
        path="/contact"
        structuredData={[contactPageSchema, contactBreadcrumb]}
      />
      <Header />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t.contact.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">{t.contact.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-6xl mx-auto">
            <Card className="p-8 sm:p-10 bg-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">{t.contact.name}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">{t.contact.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">{t.contact.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                    placeholder="+352 XX XX XX"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium">{t.contact.message}</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="mt-2"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#005DFF] hover:bg-[#0052E0] h-12 text-base" isLoading={isSubmitting}>
                  {t.contact.send}
                </Button>
              </form>
            </Card>

            <div className="space-y-6 sm:space-y-8">
              <Card className="p-8 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="bg-[#005DFF]/10 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-[#005DFF]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-gray-900">Email</h3>
                    <p className="text-gray-600">infos@altusfinancegroup.com</p>
                    <p className="text-sm text-gray-500 mt-1">Réponse sous 24h</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="bg-[#005DFF]/10 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-[#005DFF]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-gray-900">{t.contact.phone}</h3>
                    <p className="text-gray-600 font-semibold">+352 40 63 48</p>
                    <p className="text-sm text-gray-500 mt-1">Lun-Ven 9h-18h</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="bg-[#005DFF]/10 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-[#005DFF]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-gray-900">Adresse</h3>
                    <p className="text-gray-600">19 Rue Sigismond</p>
                    <p className="text-gray-600">L-2537 Luxembourg</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <FooterPremium />
    </div>
  );
}
