import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import BookAppointment from './pages/BookAppointment';
import Appointment from './pages/Appointment';
import EChanneling from './pages/EChanneling';
import Admin from './pages/Admin';
import Login from './pages/Login';

// Helper to conditionally render Navbar and Footer
function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className={isAuthPage ? '' : 'min-h-screen'}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/e-channeling" element={<EChanneling />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
