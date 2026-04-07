import { useState } from 'react';
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
import { doctors, adminAppointments } from '../data/doctors';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [eChannelLink, setEChannelLink] = useState('https://www.echannelling.com');

  const handleLogout = () => {
    // Basic logout logic for UI
    navigate('/login');
  };

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
                    <h3 className="text-gray-500 text-sm font-medium">Today's Appointments</h3>
                    <p className="text-3xl font-bold text-gray-900">42</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">New Patients</h3>
                    <p className="text-3xl font-bold text-gray-900">18</p>
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
                      {adminAppointments.slice(0, 3).map((apt) => (
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
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
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
                              <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
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
                      {adminAppointments.map((apt) => (
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
                              defaultValue={apt.status}
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
                
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Settings saved!"); }}>
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
