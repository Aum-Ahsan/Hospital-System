import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Shield, Clock, Award } from 'lucide-react';

const heroImages = [
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&h=800&fit=crop",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=800&fit=crop",
  "https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&h=800&fit=crop",
  "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=700&h=800&fit=crop"
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-primary-50/30 to-accent-50/20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-primary-200/40 to-primary-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-accent-200/30 to-accent-300/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-100/20 to-accent-100/20 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1d4ed8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              <span className="text-primary-700 text-sm font-medium">Chilaw's Trusted Healthcare Provider</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Health,{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              At Suwaya Hospital, we combine modern medical technology with compassionate care to 
              provide you and your family with the best healthcare experience in Chilaw, Sri Lanka.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/book-appointment"
                className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+94322221000"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-all duration-300 shadow-lg shadow-gray-200/50 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-primary-500" />
                Emergency Call
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              {[
                { number: '25+', label: 'Expert Doctors' },
                { number: '10K+', label: 'Happy Patients' },
                { number: '24/7', label: 'Emergency Care' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image + floating cards */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/10 h-[520px]">
                {heroImages.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Modern hospital facility ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary-900/40 via-transparent to-transparent z-10" />
              </div>

              {/* Floating card 1 */}
              <div className="absolute -left-8 top-12 bg-white rounded-2xl p-4 shadow-xl shadow-gray-200/50 flex items-center gap-3 animate-float">
                <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Certified Care</p>
                  <p className="text-xs text-gray-500">WHO Standard</p>
                </div>
              </div>

              {/* Floating card 2 */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-4 shadow-xl shadow-gray-200/50 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">24/7 Open</p>
                  <p className="text-xs text-gray-500">Always Available</p>
                </div>
              </div>

              {/* Floating card 3 */}
              <div className="absolute -left-4 bottom-8 bg-white rounded-2xl p-4 shadow-xl shadow-gray-200/50 flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Award Winning</p>
                  <p className="text-xs text-gray-500">Best in Region</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
