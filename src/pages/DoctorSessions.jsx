import { useParams, useNavigate, Link } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { MousePointerClick } from 'lucide-react'; // For the 'Book Now' icon

export default function DoctorSessions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="pt-32 pb-20 min-h-screen text-center">
        <h2 className="text-2xl font-bold">Doctor not found</h2>
        <Link to="/doctors" className="text-primary-600 hover:underline mt-4 inline-block">Back to Doctors</Link>
      </div>
    );
  }

  const sessions = [
    { id: 1, date: '08-April-2026', dayTime: 'Wednesday 4:30 pm', number: '01' },
    { id: 2, date: '10-April-2026', dayTime: 'Friday 4:30 pm', number: '01' },
    { id: 3, date: '13-April-2026', dayTime: 'Monday 4:30 pm', number: '01' },
    { id: 4, date: '15-April-2026', dayTime: 'Wednesday 4:30 pm', number: '01' },
    { id: 5, date: '17-April-2026', dayTime: 'Friday 4:30 pm', number: '01' },
    { id: 6, date: '20-April-2026', dayTime: 'Monday 4:30 pm', number: '01' },
    { id: 7, date: '22-April-2026', dayTime: 'Wednesday 4:30 pm', number: '01' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Blue Header Bar */}
      <div className="bg-[#1976d2] text-white py-3 px-6 shadow-sm mt-[72px]">
        <h1 className="text-lg font-medium">{doctor.place}</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Info block */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-sm">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 w-full max-w-xl bg-gray-50 rounded flex items-center px-6 relative mt-4 sm:mt-0 border border-gray-100 shadow-sm py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-[#666666] font-medium">{doctor.specialization}</p>
              <p className="text-sm text-gray-500 mt-1">{doctor.qualifications}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-primary-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Available
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Header */}
        <div className="mb-6">
          <h2 className="text-[#555555] text-lg font-medium mb-4">
            {doctor.place} - Sessions ({sessions.length})
          </h2>
          <button 
            onClick={() => navigate(-1)}
            className="bg-[#26bcae] hover:bg-[#1fa094] text-white px-5 py-2 rounded text-sm transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Sessions List */}
        <div className="bg-white border-t border-gray-100">
          {sessions.map((session, index) => (
            <div 
              key={session.id} 
              className={`flex flex-col md:flex-row md:items-center py-5 px-4 ${index !== sessions.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50/50 transition-colors gap-4`}
            >
              <div className="md:w-1/5 text-[#666666] text-sm">
                {session.date}
              </div>
              <div className="md:w-1/4 text-[#666666] text-sm">
                {session.dayTime}
              </div>
              <div className="md:w-1/4 text-[#5cb85c] text-sm font-medium">
                Next Available Number: {session.number}
              </div>
              <div className="md:w-auto flex items-center gap-6 md:ml-auto">
                <Link
                  to={`/appointment?doctor=${doctor.id}&date=${session.date}`}
                  className="inline-flex items-center gap-1.5 bg-[#26bcae] hover:bg-[#1fa094] text-white px-5 py-2 rounded text-sm font-medium transition-colors shadow-sm"
                >
                  <MousePointerClick className="w-4 h-4" />
                  Book Now
                </Link>
                <span className="text-[#666666] text-sm w-20">
                  Available
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
