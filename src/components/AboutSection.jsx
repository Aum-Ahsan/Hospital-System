import { Heart, Users, Building, Stethoscope } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Compassionate Care',
    desc: 'Patient-centered approach with empathy and understanding at every touchpoint.',
    color: 'bg-rose-50 text-rose-500',
  },
  {
    icon: Building,
    title: 'Modern Facilities',
    desc: 'State-of-the-art medical equipment and comfortable, hygienic environments.',
    color: 'bg-primary-50 text-primary-500',
  },
  {
    icon: Users,
    title: 'Expert Team',
    desc: 'Highly qualified doctors and nurses with years of specialized experience.',
    color: 'bg-violet-50 text-violet-500',
  },
  {
    icon: Stethoscope,
    title: 'Advanced Treatment',
    desc: 'Latest medical procedures and evidence-based treatment methodologies.',
    color: 'bg-accent-50 text-accent-600',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-200/30">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=500&fit=crop"
                alt="Suwaya Hospital building"
                className="w-full h-[400px] lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl p-5 shadow-xl shadow-gray-200/50 border border-gray-100">
              <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                28+
              </p>
              <p className="text-sm text-gray-600 font-medium">Years of<br />Excellence</p>
            </div>
          </div>

          {/* Content side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 rounded-full mb-4">
              <span className="text-primary-600 text-sm font-semibold">About Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Delivering Quality Healthcare{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                Since 1998
              </span>
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed">
              Suwaya Hospital has been the cornerstone of healthcare excellence in Chilaw, Sri Lanka 
              for over two decades. We are committed to providing accessible, affordable, and 
              high-quality medical services to our community.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Our dedicated team of medical professionals works tirelessly to ensure every patient 
              receives personalized care and treatment using the latest medical advancements.
            </p>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{f.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
