import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CalendarCheck, Phone, Mail, Clock, MapPin, Award, BookOpen, User, ArrowLeft, Loader2 } from 'lucide-react';
import { fetchDoctor } from '../services/api';

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctor(id);
        setDoctor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <h2 className="text-2xl font-bold text-gray-900">Doctor not found</h2>
        <p className="text-gray-600 mt-2">{error || 'The requested doctor could not be found.'}</p>
        <Link to="/doctors" className="text-primary-600 hover:underline mt-4 inline-block">Back to Doctors</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/doctors" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Doctors
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-3">
            
            {/* Left Col: Image & Quick Info */}
            <div className="bg-primary-900 text-white p-8 md:p-10 text-center md:text-left flex flex-col md:col-span-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              
              <div className="relative w-48 h-48 md:w-full md:h-64 rounded-2xl overflow-hidden shadow-2xl mx-auto mb-8 border-4 border-white/10">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-2xl font-bold mb-2 relative z-10">{doctor.name}</h1>
              <p className="text-primary-300 font-medium text-lg mb-6 relative z-10">{doctor.specialization}</p>
              
              <div className="space-y-4 text-sm text-primary-100 relative z-10">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>{doctor.place}</span>
                </div>
              </div>
            </div>
            
            {/* Right Col: Details */}
            <div className="p-8 md:p-10 md:col-span-2">
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-6 h-6 text-primary-500" />
                  About Dr. {doctor.name.split(' ').pop()}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {doctor.bio}
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-10">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary-500" />
                    Qualifications
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-gray-700 text-sm">
                    {doctor.qualifications}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-500" />
                    Experience
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-gray-700 text-sm">
                    {doctor.experience} in {doctor.specialization}
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary-500" />
                    Availability
                  </h3>
                  <div className="bg-accent-50 rounded-xl p-4 border border-accent-100 text-accent-800 text-sm flex justify-between items-center">
                    <span className="font-medium">Consultation Days:</span>
                    <span className="font-bold">{doctor.availability}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <a
                  href={doctor.eChannelLink || 'https://www.echannelling.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transform hover:-translate-y-0.5 text-lg"
                >
                  <CalendarCheck className="w-6 h-6" />
                  Book via e-Channel
                </a>
                <p className="text-center text-xs text-gray-400 mt-3">
                  No advance payment required for online bookings.
                </p>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}
