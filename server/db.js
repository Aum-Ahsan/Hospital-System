const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'hospital.db');
const db = new Database(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    experience TEXT,
    availability TEXT,
    place TEXT,
    qualifications TEXT,
    image TEXT,
    bio TEXT,
    phone TEXT,
    email TEXT,
    eChannelLink TEXT
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    text TEXT NOT NULL,
    rating INTEGER,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient TEXT NOT NULL,
    doctor TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'Pending'
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT
  );
`);

// Function to seed initial data
function seedData() {
  const rowCount = db.prepare('SELECT count(*) as count FROM doctors').get();
  if (rowCount.count > 0) return; // Already seeded

  console.log('Seeding initial data...');

  const doctors = [
    {
      name: "Dr. Kumara Wijesinghe",
      specialization: "Cardiologist",
      experience: "15 Years",
      availability: "Mon, Wed, Fri",
      place: "Suwaya Hospital, Chilaw",
      qualifications: "MBBS, MD (Cardiology), FRCP",
      image: "https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=400",
      bio: "Dr. Kumara Wijesinghe is a renowned cardiologist with over 15 years of experience in treating complex heart conditions.",
      phone: "+94 32 222 1001",
      email: "kumara.w@suwayahospital.lk",
      eChannelLink: "https://echannel.hospital.lk/doctor/1"
    },
    {
      name: "Dr. Nishantha Perera",
      specialization: "Neurologist",
      experience: "12 Years",
      availability: "Tue, Thu, Sat",
      place: "Suwaya Hospital, Chilaw",
      qualifications: "MBBS, MD (Neurology), MRCP",
      image: "https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man-wearing-medical-uniform-stethoscope-looking-camera_1258-75618.jpg?w=400",
      bio: "Dr. Nishantha Perera is an expert neurologist specializing in stroke management, epilepsy, and neurodegenerative disorders.",
      phone: "+94 32 222 1002",
      email: "nishantha.p@suwayahospital.lk",
      eChannelLink: "https://echannel.hospital.lk/doctor/2"
    },
    {
      name: "Dr. Anoma Fernando",
      specialization: "Pediatrician",
      experience: "10 Years",
      availability: "Mon - Fri",
      place: "Suwaya Hospital, Chilaw",
      qualifications: "MBBS, DCH, MD (Paediatrics)",
      image: "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=400",
      bio: "Dr. Anoma Fernando is a dedicated pediatrician who has been caring for children in the Chilaw region for over a decade.",
      phone: "+94 32 222 1003",
      email: "anoma.f@suwayahospital.lk",
      eChannelLink: "https://echannel.hospital.lk/doctor/3"
    }
    // ... we can add more if needed, but this is enough to start
  ];

  const insertDoctor = db.prepare(`
    INSERT INTO doctors (name, specialization, experience, availability, place, qualifications, image, bio, phone, email, eChannelLink)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  doctors.forEach(doc => {
    insertDoctor.run(doc.name, doc.specialization, doc.experience, doc.availability, doc.place, doc.qualifications, doc.image, doc.bio, doc.phone, doc.email, doc.eChannelLink);
  });

  const testimonials = [
    { name: "Samantha Rajapaksa", text: "The care I received at Suwaya Hospital was exceptional.", rating: 5, role: "Patient" },
    { name: "Dinesh Karunanayake", text: "My daughter was treated by Dr. Fernando and the pediatric team.", rating: 5, role: "Parent" }
  ];

  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (name, text, rating, role)
    VALUES (?, ?, ?, ?)
  `);

  testimonials.forEach(t => {
    insertTestimonial.run(t.name, t.text, t.rating, t.role);
  });

  const services = [
    { title: "Emergency Care", description: "24/7 emergency medical services.", icon: "Siren" },
    { title: "Laboratory", description: "Advanced diagnostic laboratory.", icon: "FlaskConical" },
    { title: "Pharmacy", description: "Full-service in-house pharmacy.", icon: "Pill" },
    { title: "E-Channeling", description: "Book your appointments online.", icon: "CalendarCheck" }
  ];

  const insertService = db.prepare(`
    INSERT INTO services (title, description, icon)
    VALUES (?, ?, ?)
  `);

  services.forEach(s => {
    insertService.run(s.title, s.description, s.icon);
  });

  const appointments = [
    { patient: "Kamal Perera", doctor: "Dr. Kumara Wijesinghe", date: "2026-04-10", time: "09:00 AM", status: "Confirmed" },
    { patient: "Nilmini Silva", doctor: "Dr. Anoma Fernando", date: "2026-04-10", time: "10:30 AM", status: "Pending" }
  ];

  const insertAppointment = db.prepare(`
    INSERT INTO appointments (patient, doctor, date, time, status)
    VALUES (?, ?, ?, ?, ?)
  `);

  appointments.forEach(a => {
    insertAppointment.run(a.patient, a.doctor, a.date, a.time, a.status);
  });

  // Seed admin user
  const adminCount = db.prepare('SELECT count(*) as count FROM admins').get();
  if (adminCount.count === 0) {
    const insertAdmin = db.prepare(`
      INSERT INTO admins (email, password, name)
      VALUES (?, ?, ?)
    `);
    insertAdmin.run('admin@suwayahospital.lk', 'admin123', 'Hospital Admin');
  }

  // Seed settings
  const settingsCount = db.prepare('SELECT count(*) as count FROM settings').get();
  if (settingsCount.count === 0) {
    const insertSetting = db.prepare(`
      INSERT INTO settings (key, value)
      VALUES (?, ?)
    `);
    insertSetting.run('echanneling_link', 'https://www.echannelling.com');
  }

  console.log('Seeding complete.');
}

try {
  db.prepare('ALTER TABLE doctors ADD COLUMN eChannelLink TEXT').run();
} catch (err) {
  if (!/column .* already exists/i.test(err.message)) {
    console.warn('Could not add eChannelLink column:', err.message);
  }
}

seedData();

module.exports = db;
