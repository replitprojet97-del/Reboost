import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'wouter';
import image1 from '@assets/stock_images/modern_business_prof_e6d6637f.jpg';
import image2 from '@assets/stock_images/financial_advisor_co_cd5f43f9.jpg';
import image3 from '@assets/stock_images/professional_busines_18a0ae91.jpg';
import image4 from '@assets/stock_images/modern_business_prof_2525f578.jpg';
import image5 from '@assets/stock_images/financial_advisor_co_3eccfc80.jpg';
import image6 from '@assets/stock_images/professional_busines_c74b6c1f.jpg';
import { useLanguage, translations } from '@/lib/i18n';

const heroImages = [image1, image2, image3, image4, image5, image6];

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];
  const [loanAmount, setLoanAmount] = useState('50000');
  const [loanDuration, setLoanDuration] = useState('48');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const calculateMonthlyPayment = () => {
    const amount = parseInt(loanAmount);
    const months = parseInt(loanDuration);
    const interestRate = 0.04;
    const monthlyRate = interestRate / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
    return payment.toFixed(2);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImages[currentImageIndex]})`,
          filter: 'brightness(0.35)',
          transition: 'background-image 0.15s cubic-bezier(0.4, 0, 0.6, 1)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-500/70 to-blue-700/80" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <div className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </div>
              <span className="text-sm font-medium">{t.hero.trustIndicator}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              {t.hero.title}
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 font-light leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/loans/new">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 py-6 bg-orange-500 text-white hover:bg-orange-600 shadow-2xl font-semibold"
                  data-testid="button-request-loan"
                >
                  {t.hero.cta1}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 py-6 backdrop-blur-sm bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold"
                  data-testid="button-learn-more"
                >
                  {t.hero.learnMore}
                </Button>
              </Link>
            </div>
          </div>

          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0 rounded-2xl overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4">
                <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Calculator className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t.hero.calculator.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t.hero.calculator.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900 block">
                    {t.hero.calculator.loanAmount}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-lg">€</span>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="pl-10 h-14 text-lg font-semibold border-gray-300"
                      min="3000"
                      max="400000"
                      step="1000"
                      data-testid="input-loan-amount"
                    />
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="400000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    data-testid="slider-loan-amount"
                  />
                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>€3,000</span>
                    <span>€400,000</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900 block">
                    {t.hero.calculator.duration}
                  </label>
                  <Select value={loanDuration} onValueChange={setLoanDuration}>
                    <SelectTrigger className="h-14 text-base border-gray-300" data-testid="select-loan-duration">
                      <SelectValue placeholder="48 months" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 {t.common.months}</SelectItem>
                      <SelectItem value="24">24 {t.common.months}</SelectItem>
                      <SelectItem value="36">36 {t.common.months}</SelectItem>
                      <SelectItem value="48">48 {t.common.months}</SelectItem>
                      <SelectItem value="60">60 {t.common.months}</SelectItem>
                      <SelectItem value="72">72 {t.common.months}</SelectItem>
                      <SelectItem value="84">84 {t.common.months}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-blue-100">
                      {t.hero.calculator.monthlyPayment}
                    </span>
                    <div className="text-right">
                      <div className="text-4xl font-bold">
                        €{calculateMonthlyPayment()}
                      </div>
                      <div className="text-xs text-blue-100 mt-1">
                        {t.hero.calculator.perMonth}
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/loans/new" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 h-14 text-base font-semibold shadow-lg"
                    data-testid="button-apply-now"
                  >
                    {t.hero.calculator.applyNow}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>

                <p className="text-xs text-center text-gray-500">
                  {t.hero.calculator.disclaimer}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Carousel Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 w-2.5 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
