import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { Activity, User, MapPin, Clock, ArrowRight, Star } from 'lucide-react';

const diseasesMapping = [
  { disease: "Chest Pain / Heart Issues", spec: "Cardiologist" },
  { disease: "High Blood Pressure", spec: "Cardiologist" },
  { disease: "Headaches / Migraines", spec: "Neurologist" },
  { disease: "Seizures / Stroke", spec: "Neurologist" },
  { disease: "Child Fever / Vaccination", spec: "Pediatrician" },
  { disease: "Joint Pain / Fractures", spec: "Orthopedic Surgeon" },
  { disease: "Back Pain", spec: "Orthopedic Surgeon" },
  { disease: "Skin Rashes / Acne", spec: "Dermatologist" },
  { disease: "Hair Loss", spec: "Dermatologist" },
  { disease: "Abdominal Pain / Hernia", spec: "General Surgeon" },
  { disease: "Vision Problems / Red Eye", spec: "Ophthalmologist" },
  { disease: "Ear Ache / Sore Throat", spec: "ENT Specialist" },
  { disease: "Sinus Issues", spec: "ENT Specialist" },
];

export default function BookAppointment() {
  const [selectedDisease, setSelectedDisease] = useState('');
  const navigate = useNavigate();

  // Find corresponding specialization
  const targetSpec = diseasesMapping.find(d => d.disease === selectedDisease)?.spec;

  // Filter doctors based on target spec
  const filteredDoctors = targetSpec 
    ? doctors.filter(doc => doc.specialization === targetSpec)
    : [];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 shadow-sm">
            <Activity className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book an Appointment</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Select your symptom or condition below, and we will recommend the best specialists available for you.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
          <label className="block text-sm font-semibold text-gray-800 mb-3 text-lg">What are you experiencing?</label>
          <div className="relative">
            <select
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
              className="w-full pl-4 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none text-gray-700 text-lg cursor-pointer"
            >
              <option value="">-- Select Disease / Symptom --</option>
              {diseasesMapping.map((item, index) => (
                <option key={index} value={item.disease}>{item.disease}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {selectedDisease && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-500" />
              Recommended Doctors for {selectedDisease}
            </h2>
            
            {filteredDoctors.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredDoctors.map(doctor => (
                  <div key={doctor.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <div className="flex gap-4">
                      <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover shadow-sm border border-gray-100" />
                      <div>
                        <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                        <div className="flex items-center gap-1 text-primary-600 text-sm font-medium mt-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {doctor.specialization}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 space-y-2 text-sm text-gray-600 flex-1">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{doctor.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{doctor.place}</span>
                      </div>
                    </div>

                    <Link
                      to={`/doctors/${doctor.id}/sessions`}
                      className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 bg-primary-50 text-primary-700 rounded-xl text-sm font-semibold hover:bg-primary-100 transition-all"
                    >
                      View Sessions & Book
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-500">
                No doctors found for this specific condition. Please check our full doctors directory.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
