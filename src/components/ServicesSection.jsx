import { Link } from 'react-router-dom';
import { Siren, FlaskConical, Pill, CalendarCheck, ArrowRight } from 'lucide-react';
import { services } from '../data/doctors';

const iconMap = {
  Siren,
  FlaskConical,
  Pill,
  CalendarCheck,
};

const colorMap = [
  { bg: 'bg-red-50', icon: 'text-red-500', border: 'border-red-100', hover: 'hover:border-red-200 hover:shadow-red-100/50' },
  { bg: 'bg-violet-50', icon: 'text-violet-500', border: 'border-violet-100', hover: 'hover:border-violet-200 hover:shadow-violet-100/50' },
  { bg: 'bg-emerald-50', icon: 'text-emerald-500', border: 'border-emerald-100', hover: 'hover:border-emerald-200 hover:shadow-emerald-100/50' },
  { bg: 'bg-primary-50', icon: 'text-primary-500', border: 'border-primary-100', hover: 'hover:border-primary-200 hover:shadow-primary-100/50' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 rounded-full mb-4">
            <span className="text-primary-600 text-sm font-semibold">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Comprehensive Healthcare{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We provide a comprehensive range of medical services, ensuring every patient receives 
            exceptional care with modern technology and experienced professionals.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const colors = colorMap[index];
            return (
              <div
                key={service.id}
                className={`group relative bg-white border ${colors.border} rounded-2xl p-7 transition-all duration-300 hover:shadow-xl ${colors.hover} hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.description}</p>
                <Link
                  to={service.title === 'E-Channeling' ? '/e-channeling' : '#'}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2.5 transition-all"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
