import { Link } from 'react-router-dom';
import { Eye, Ear, HeartPulse, Baby, Brain, Bone, Stethoscope, Sparkles } from 'lucide-react';

export default function CategoriesSection() {
  const categories = [
    { name: "Eye Doctor", spec: "Ophthalmologist", icon: <Eye strokeWidth={1.5} className="w-10 h-10" />, color: "bg-blue-50 text-blue-600" },
    { name: "Ear, Nose, Throat", spec: "ENT Specialist", icon: <Ear strokeWidth={1.5} className="w-10 h-10" />, color: "bg-purple-50 text-purple-600" },
    { name: "Heart Specialist", spec: "Cardiologist", icon: <HeartPulse strokeWidth={1.5} className="w-10 h-10" />, color: "bg-red-50 text-red-600" },
    { name: "Child Specialist", spec: "Pediatrician", icon: <Baby strokeWidth={1.5} className="w-10 h-10" />, color: "bg-green-50 text-green-600" },
    { name: "Brain & Nerves", spec: "Neurologist", icon: <Brain strokeWidth={1.5} className="w-10 h-10" />, color: "bg-indigo-50 text-indigo-600" },
    { name: "Bones & Joints", spec: "Orthopedic Surgeon", icon: <Bone strokeWidth={1.5} className="w-10 h-10" />, color: "bg-orange-50 text-orange-600" },
    { name: "Skin Specialist", spec: "Dermatologist", icon: <Sparkles strokeWidth={1.5} className="w-10 h-10" />, color: "bg-pink-50 text-pink-600" },
    { name: "General Surgeon", spec: "General Surgeon", icon: <Stethoscope strokeWidth={1.5} className="w-10 h-10" />, color: "bg-cyan-50 text-cyan-600" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 rounded-full mb-4">
            <span className="text-primary-700 text-sm font-semibold">Specializations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Search Doctors by <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-gray-600">
            Find the right specialist for your specific health needs quickly and easily.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx}
              to={`/doctors?category=${cat.spec}`}
              className="flex flex-col items-center justify-center p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-primary-100/40 hover:-translate-y-1 transition-all group text-center"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-gray-900 leading-tight">{cat.name}</h3>
              <p className="text-xs text-gray-500 mt-2 font-medium">{cat.spec}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
