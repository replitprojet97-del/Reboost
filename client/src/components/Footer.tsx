import { Link } from 'wouter';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from '@/lib/i18n';

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'Prêts particuliers', href: '/products' },
      { name: 'Prêts professionnels', href: '/products' },
      { name: 'Prêt immobilier', href: '/products' },
      { name: 'Crédit auto', href: '/products' },
      { name: 'Prêt travaux', href: '/products' },
    ],
    company: [
      { name: t.nav.about, href: '/about' },
      { name: t.nav.howItWorks, href: '/how-it-works' },
      { name: t.nav.resources, href: '/resources' },
      { name: t.nav.contact, href: '/contact' },
      { name: 'Carrières', href: '/contact' },
    ],
    legal: [
      { name: 'Mentions légales', href: '/terms' },
      { name: 'Politique de confidentialité', href: '/privacy' },
      { name: 'CGU', href: '/terms' },
      { name: 'Cookies', href: '/privacy' },
      { name: 'RGPD', href: '/privacy' },
    ],
    help: [
      { name: 'FAQ', href: '/resources' },
      { name: 'Guide d\'utilisation', href: '/how-it-works' },
      { name: 'Support client', href: '/contact' },
      { name: 'Simulateur de prêt', href: '/dashboard' },
      { name: 'Nous contacter', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand and Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity inline-block mb-4">
              Altus Finance Group
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Votre partenaire de confiance pour tous vos projets de financement.
              Solutions de prêt adaptées aux particuliers et professionnels.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>contact@altus-group.fr</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>75 Avenue des Champs-Élysées, 75008 Paris</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Nos Produits</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4">Aide</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.help.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>© {currentYear} Altus Finance Group. Tous droits réservés.</p>
            <p className="text-xs mt-1">
              Altus Finance Group est une marque de financement agréée par l'ACPR. 
              Organisme de crédit soumis au contrôle de la Banque de France.
            </p>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Regulatory Information */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center max-w-4xl mx-auto">
            Attention, emprunter de l'argent coûte aussi de l'argent. Les informations sur cette page sont données à titre indicatif et ne constituent pas une offre contractuelle. 
            Toute demande de crédit est soumise à l'étude et à l'acceptation du dossier. 
            Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
          </p>
        </div>
      </div>
    </footer>
  );
}
