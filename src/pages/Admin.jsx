import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2,
  TrendingUp,
  Activity,
  UserCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDoctors, fetchAppointments, fetchSettings } from '../services/api';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [eChannelLink, setEChannelLink] = useState('https://www.echannelling.com');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialization: '',
    experience: '',
    availability: '',
    place: 'Suwaya Hospital, Chilaw',
    qualifications: '',
    image: '',
    bio: '',
    phone: '',
    email: '',
    eChannelLink: 'https://www.echannelling.com'
  });

  const specializationOptions = ['Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedic Surgeon', 'Dermatologist', 'General Surgeon', 'Ophthalmologist', 'ENT Specialist', 'Other'];
  const availabilityOptions = ['Mon, Wed, Fri', 'Tue, Thu, Sat', 'Mon - Fri', 'Mon - Sat', 'Wed, Sat', 'Custom'];

  const resetDoctorForm = () => {
    setDoctorForm({
      name: '',
      specialization: '',
      experience: '',
      availability: '',
      place: 'Suwaya Hospital, Chilaw',
      qualifications: '',
      image: '',
      bio: '',
      phone: '',
      email: '',
      eChannelLink: 'https://www.echannelling.com'
    });
    setEditingDoctorId(null);
  };

  const loadDoctors = async () => {
    try {
      const docs = await fetchDoctors();
      setDoctors(docs);
    } catch (err) {
      console.error('Failed to reload doctors:', err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [docs, apts, settings] = await Promise.all([fetchDoctors(), fetchAppointments(), fetchSettings()]);
        setDoctors(docs);
        setAppointments(apts);
        setEChannelLink(settings.echanneling_link || 'https://www.echannelling.com');
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctorId(doctor.id);
    setDoctorForm({
      name: doctor.name || '',
      specialization: doctor.specialization || '',
      experience: doctor.experience || '',
      availability: doctor.availability || '',
      place: doctor.place || 'Suwaya Hospital, Chilaw',
      qualifications: doctor.qualifications || '',
      image: doctor.image || '',
      bio: doctor.bio || '',
      phone: doctor.phone || '',
      email: doctor.email || '',
      eChannelLink: doctor.eChannelLink || 'https://www.echannelling.com'
    });
    setShowAddDoctor(true);
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!doctorForm.name || !doctorForm.specialization) {
      alert('Name and specialization are required');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorForm),
      });
      
      if (response.ok) {
        await loadDoctors();
        setShowAddDoctor(false);
        resetDoctorForm();
        alert('Doctor added successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to add doctor: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Error adding doctor');
    }
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    if (!editingDoctorId) {
      alert('No doctor selected for editing');
      return;
    }

    if (!doctorForm.name || !doctorForm.specialization) {
      alert('Name and specialization are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${editingDoctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorForm),
      });

      if (response.ok) {
        const updatedDoctor = await response.json();
        setDoctors(doctors.map((doctor) => doctor.id === editingDoctorId ? updatedDoctor : doctor));
        await loadDoctors();
        setShowAddDoctor(false);
        resetDoctorForm();
        alert('Doctor updated successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to update doctor: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('Error updating doctor: ' + error.message);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await loadDoctors();
        alert('Doctor deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to delete doctor: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('Error deleting doctor');
    }
  };

  const handleUpdateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setAppointments(appointments.map(apt => 
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        ));
      } else {
        alert('Failed to update appointment status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Error updating appointment status');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ echanneling_link: eChannelLink }),
      });
      
      if (response.ok) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col pt-16 md:pt-0">
        <div className="p-6 hidden md:block">
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">S</span>
            Suwaya Admin
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-4 md:py-0 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-primary-600 text-white font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('doctors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'doctors' ? 'bg-primary-600 text-white font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="w-5 h-5" />
            Doctors
          </button>
          
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'appointments' ? 'bg-primary-600 text-white font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Calendar className="w-5 h-5" />
            Appointments
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-primary-600 text-white font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>
        
        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-rose-400 bg-rose-500/10 rounded-xl hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden pt-16 md:pt-0">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Doctors</h3>
                    <p className="text-3xl font-bold text-gray-900">{doctors.length}</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent-50 rounded-xl flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Appointments</h3>
                    <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
                    <p className="text-3xl font-bold text-gray-900">{appointments.filter(a => a.status === 'Pending').length}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-lg">Recent Appointments</h3>
                  <button className="text-primary-600 text-sm font-medium hover:underline" onClick={() => setActiveTab('appointments')}>View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm">
                        <th className="p-4 font-medium">Patient</th>
                        <th className="p-4 font-medium">Doctor</th>
                        <th className="p-4 font-medium">Date & Time</th>
                        <th className="p-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {appointments.slice(0, 5).map((apt) => (
                        <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-medium text-gray-900">{apt.patient}</td>
                          <td className="p-4 text-gray-600">{apt.doctor}</td>
                          <td className="p-4 text-gray-600">{apt.date} at {apt.time}</td>
                          <td className="p-4">
                            <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                              apt.status === 'Confirmed' ? 'bg-accent-100 text-accent-700' :
                              apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Doctors Tab */}
          {activeTab === 'doctors' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Doctors</h2>
                <button 
                  onClick={() => {
                    resetDoctorForm();
                    setShowAddDoctor(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Doctor
                </button>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm">
                        <th className="p-4 font-medium">Doctor</th>
                        <th className="p-4 font-medium">Specialization</th>
                        <th className="p-4 font-medium">Experience</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {doctors.map((doctor) => (
                        <tr key={doctor.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                              <span className="font-medium text-gray-900">{doctor.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">{doctor.specialization}</td>
                          <td className="p-4 text-gray-600">{doctor.experience}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleEditDoctor(doctor)}
                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteDoctor(doctor.id)}
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" 
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Add Doctor Modal */}
          {showAddDoctor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900">{editingDoctorId ? 'Edit Doctor Profile' : 'Add New Doctor'}</h3>
                </div>
                
                <form onSubmit={editingDoctorId ? handleUpdateDoctor : handleAddDoctor} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={doctorForm.name}
                        onChange={(e) => setDoctorForm({...doctorForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                      <select
                        value={doctorForm.specialization}
                        onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      >
                        <option value="" disabled>Select specialization</option>
                        {specializationOptions.map((specialty) => (
                          <option key={specialty} value={specialty}>{specialty}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                      <input
                        type="text"
                        value={doctorForm.experience}
                        onChange={(e) => setDoctorForm({...doctorForm, experience: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g., 5 Years"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                      <select
                        value={doctorForm.availability}
                        onChange={(e) => setDoctorForm({...doctorForm, availability: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="" disabled>Select availability</option>
                        {availabilityOptions.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Place</label>
                      <input
                        type="text"
                        value={doctorForm.place}
                        onChange={(e) => setDoctorForm({...doctorForm, place: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                      <input
                        type="text"
                        value={doctorForm.qualifications}
                        onChange={(e) => setDoctorForm({...doctorForm, qualifications: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="e.g., MBBS, MD"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={doctorForm.phone}
                        onChange={(e) => setDoctorForm({...doctorForm, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={doctorForm.email}
                        onChange={(e) => setDoctorForm({...doctorForm, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={doctorForm.image}
                      onChange={(e) => setDoctorForm({...doctorForm, image: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={doctorForm.bio}
                      onChange={(e) => setDoctorForm({...doctorForm, bio: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Brief description of the doctor..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">e-Channel Link</label>
                    <input
                      type="url"
                      value={doctorForm.eChannelLink}
                      onChange={(e) => setDoctorForm({...doctorForm, eChannelLink: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://echannel.hospital.lk/doctor/"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddDoctor(false);
                        resetDoctorForm();
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      {editingDoctorId ? 'Save Changes' : 'Add Doctor'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointments</h2>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm">
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Patient</th>
                        <th className="p-4 font-medium">Doctor</th>
                        <th className="p-4 font-medium">Date & Time</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {appointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-gray-500">#{apt.id}</td>
                          <td className="p-4 font-medium text-gray-900">{apt.patient}</td>
                          <td className="p-4 text-gray-600">{apt.doctor}</td>
                          <td className="p-4 text-gray-600">{apt.date} <br/> <span className="text-xs">{apt.time}</span></td>
                          <td className="p-4">
                            <select 
                              className={`border-none rounded-lg text-xs font-semibold px-2 py-1 outline-none cursor-pointer appearance-none ${
                                apt.status === 'Confirmed' ? 'bg-accent-100 text-accent-700' :
                                apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}
                              value={apt.status}
                              onChange={(e) => handleUpdateAppointmentStatus(apt.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button className="text-primary-600 text-sm font-medium hover:underline">Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">External Integrations</h3>
                
                <form className="space-y-5" onSubmit={handleSaveSettings}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-Channeling Link setup</label>
                    <p className="text-xs text-gray-500 mb-3">Update the external link where users are redirected for e-channeling.</p>
                    <input 
                      type="url" 
                      value={eChannelLink}
                      onChange={(e) => setEChannelLink(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all text-gray-700"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

