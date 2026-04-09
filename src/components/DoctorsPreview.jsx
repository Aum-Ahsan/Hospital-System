import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchDoctors } from '../services/api';

export default function DoctorsPreview() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors()
      .then(data => {
        setDoctors(data.slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mb-12"></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-50 rounded-full mb-4">
            <span className="text-accent-700 text-sm font-semibold">Our Doctors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Expert Doctors</span>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our team of highly qualified specialists is dedicated to providing 
            the best medical care with a personal touch.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-primary-100/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-primary-700">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {doctor.specialization}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-primary-600 font-medium mt-0.5">{doctor.specialization}</p>

                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {doctor.experience}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span>{doctor.availability}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <span>{doctor.place}</span>
                </div>

                <Link
                  to={`/doctors/${doctor.id}`}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 border border-primary-200 text-primary-600 rounded-xl text-sm font-semibold hover:bg-primary-50 transition-all"
                >
                  View Profile
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5"
          >
            View All Doctors
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

