import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Phone, Mail, ChevronDown, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { fetchDoctor } from '../services/api';

export default function Appointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get('doctor');
  const date = queryParams.get('date');

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [formData, setFormData] = useState({
    title: 'Mr.',
    name: '',
    mobile: '',
    email: '',
    nationality: 'Local',
    nic: '',
    paymentMethod: 'card'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.nic) {
      setError(true);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setError(false);
    }, 800);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(false);
  };

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const data = await fetchDoctor(doctorId);
        setDoctor(data);
      } catch (err) {
        console.error('Failed to load doctor for appointment:', err);
        setLoadError('Unable to load doctor details.');
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      loadDoctor();
    } else {
      setLoading(false);
      setLoadError('No doctor selected for the appointment.');
    }
  }, [doctorId]);

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center bg-white px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Successful!</h2>
          <p className="text-gray-600 mb-8">
            Your appointment has been successfully requested. You will receive an SMS and Email confirmation shortly.
          </p>
          <button
            onClick={() => navigate('/doctors')}
            className="w-full py-3.5 bg-[#26bcae] text-white font-semibold rounded hover:bg-[#1fa094] transition-colors"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-flex items-center gap-3 text-gray-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
              Loading appointment details...
            </div>
          </div>
        ) : loadError ? (
          <div className="pt-32 pb-20 min-h-screen text-center">
            <h2 className="text-2xl font-bold">Unable to continue</h2>
            <p className="text-gray-600 mt-2">{loadError}</p>
            <button
              onClick={() => navigate('/doctors')}
              className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Doctors
            </button>
          </div>
        ) : (
          <> 
            {doctor && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded flex gap-4 items-center">
              <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialization} {date && `• ${date}`}</p>
              </div>
            </div>
        )}

        <form onSubmit={handleSubmit} className="border border-gray-100 p-8 shadow-sm rounded-sm">
          
          {/* Patient's Name */}
          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-50 gap-4">
            <label className="sm:w-48 text-[#666666] font-bold text-sm">Patient's Name</label>
            <div className="flex-1 flex gap-2 w-full max-w-xl">
              <div className="relative w-32 flex-shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-500">
                  <User className="w-4 h-4" fill="currentColor" />
                </div>
                <select 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange}
                  className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 text-[#666] focus:outline-none focus:border-gray-300 appearance-none bg-white cursor-pointer"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss</option>
                  <option value="Rev.">Rev.</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              <div className="flex-1">
                 <input 
                   type="text" 
                   name="name"
                   placeholder="Name - Required"
                   value={formData.name}
                   onChange={handleChange}
                   className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-300 text-[#666] placeholder-gray-400"
                 />
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-col sm:flex-row sm:items-start py-4 border-b border-gray-50 gap-4">
            <label className="sm:w-48 text-[#666666] font-bold text-sm sm:pt-2">Mobile</label>
            <div className="flex-1 w-full max-w-xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-500">
                  <Phone className="w-4 h-4" fill="currentColor" />
                </div>
                <input 
                  type="tel" 
                  name="mobile"
                  placeholder="Mobile - Ex: 07xxxxxxxx"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-300 text-[#666] placeholder-gray-400"
                />
              </div>
              <p className="text-[11px] text-[#e74c3c] mt-2 font-medium">
                *Please enter mobile number if you require to send sms receipt to your mobile number.
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-start py-4 border-b border-gray-50 gap-4">
            <label className="sm:w-48 text-[#666666] font-bold text-sm sm:pt-2">E-mail</label>
            <div className="flex-1 w-full max-w-xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" fill="currentColor" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  placeholder="E-Mail - Optional"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-300 text-[#666] placeholder-gray-400"
                />
              </div>
              <p className="text-[11px] text-[#e74c3c] mt-2 font-medium">
                *Please enter email address if you require to send receipt to your email account.
              </p>
            </div>
          </div>

          {/* Nationality */}
          <div className="flex flex-col sm:flex-row sm:items-start py-4 border-b border-gray-50 gap-4">
            <label className="sm:w-48 text-[#666666] font-bold text-sm">Nationality</label>
            <div className="flex-1 flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="nationality" 
                  value="Local"
                  checked={formData.nationality === 'Local'}
                  onChange={handleChange}
                  className="text-[#3b82f6] focus:ring-[#3b82f6] cursor-pointer"
                />
                <span className="text-sm text-[#666] font-medium">Local</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="nationality" 
                  value="Foreign"
                  checked={formData.nationality === 'Foreign'}
                  onChange={handleChange}
                  className="text-[#3b82f6] focus:ring-[#3b82f6] cursor-pointer"
                />
                <span className="text-sm text-[#666] font-medium">Foreign</span>
              </label>
            </div>
          </div>

          {/* NIC */}
          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-50 gap-4">
            <label className="sm:w-48 text-[#666666] font-bold text-sm">NIC</label>
            <div className="flex-1 w-full max-w-xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-400">
                  <Sparkles className="w-4 h-4" fill="currentColor" />
                </div>
                <input 
                  type="text" 
                  name="nic"
                  placeholder="NIC - Ex: 123456789v"
                  value={formData.nic}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-300 text-[#666] placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-50 gap-4">
            <label className="sm:w-48 text-[#666666] font-bold text-sm">Payment Method</label>
            <div className="flex-1 flex items-center gap-3">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleChange}
                className="w-4 h-4 text-[#2196f3] focus:ring-[#2196f3] cursor-pointer"
              />
              <div className="flex gap-2 items-center">
                {/* Mastercard Logo mimicking the exact shape from the reference */}
                <div className="w-[45px] h-[28px] rounded overflow-hidden flex relative bg-[#ffb600] shadow-sm">
                  <div className="absolute top-0 left-0 w-[24px] h-[28px] bg-[#ea001b]"></div>
                  <div className="absolute top-0 left-1/2 -ml-[8px] w-[16px] h-[28px] bg-[#f9a021] rounded-[60%]"></div>
                </div>
                
                {/* Visa Logo matching the deep blue background */}
                <div className="w-[50px] h-[28px] bg-[#1a1f71] rounded flex items-center justify-center shadow-sm">
                   <span className="text-white font-bold italic text-sm">VISA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 sm:ml-52">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="bg-[#26bcae] hover:bg-[#1fa094] text-white px-8 py-2 rounded text-sm transition-colors"
            >
              Go Back
            </button>
            <button 
              type="submit"
              className="bg-[#26bcae] hover:bg-[#1fa094] text-white px-8 py-2 rounded text-sm transition-colors"
            >
              Submit
            </button>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-4 sm:ml-52">
              <AlertCircle className="w-4 h-4" />
              Please fill all required fields.
            </div>
          )}
        </form>
          </>
        )}
      </div>
    </div>
  );
}
