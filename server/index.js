const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Routes ---

// Doctors - GET all
app.get('/api/doctors', (req, res) => {
  try {
    const doctors = db.prepare('SELECT * FROM doctors').all();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Doctors - GET one
app.get('/api/doctors/:id', (req, res) => {
  try {
    const doctor = db.prepare('SELECT * FROM doctors WHERE id = ?').get(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Doctors - POST (Add)
app.post('/api/doctors', (req, res) => {
  const { name, specialization, experience, availability, place, qualifications, image, bio, phone, email, eChannelLink } = req.body;
  if (!name || !specialization) {
    return res.status(400).json({ error: 'Name and specialization are required' });
  }
  try {
    const info = db.prepare(`
      INSERT INTO doctors (name, specialization, experience, availability, place, qualifications, image, bio, phone, email, eChannelLink)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, specialization, experience || '', availability || '', place || 'Suwaya Hospital, Chilaw', qualifications || '', image || '', bio || '', phone || '', email || '', eChannelLink || 'https://www.echannelling.com');
    const newDoctor = db.prepare('SELECT * FROM doctors WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Doctors - PUT (Edit)
app.put('/api/doctors/:id', (req, res) => {
  const { name, specialization, experience, availability, place, qualifications, image, bio, phone, email, eChannelLink } = req.body;
  try {
    const result = db.prepare(`
      UPDATE doctors SET name=?, specialization=?, experience=?, availability=?, place=?, qualifications=?, image=?, bio=?, phone=?, email=?, eChannelLink=?
      WHERE id=?
    `).run(name, specialization, experience, availability, place, qualifications, image, bio, phone, email, eChannelLink || 'https://www.echannelling.com', req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Doctor not found' });
    const updatedDoctor = db.prepare('SELECT * FROM doctors WHERE id = ?').get(req.params.id);
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Doctors - DELETE
app.delete('/api/doctors/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM doctors WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Services
app.get('/api/services', (req, res) => {
  try {
    const services = db.prepare('SELECT * FROM services').all();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Testimonials
app.get('/api/testimonials', (req, res) => {
  try {
    const testimonials = db.prepare('SELECT * FROM testimonials').all();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Appointments - GET all
app.get('/api/appointments', (req, res) => {
  try {
    const appointments = db.prepare('SELECT * FROM appointments').all();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Appointments - POST (create)
app.post('/api/appointments', (req, res) => {
  const { patient, doctor, date, time } = req.body;
  if (!patient || !doctor || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const info = db.prepare(`
      INSERT INTO appointments (patient, doctor, date, time, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(patient, doctor, date, time, 'Pending');
    res.status(201).json({ id: info.lastInsertRowid, message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Appointments - PATCH (update status)
app.patch('/api/appointments/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }
  try {
    const result = db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Appointments - DELETE
app.delete('/api/appointments/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM appointments WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Settings - GET
app.get('/api/settings', (req, res) => {
  try {
    const setting = db.prepare('SELECT * FROM settings WHERE key = ?').get('echanneling_link');
    res.json({ echanneling_link: setting ? setting.value : 'https://www.echannelling.com' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Settings - POST/update
app.post('/api/settings', (req, res) => {
  const { echanneling_link } = req.body;
  try {
    db.prepare(`
      INSERT INTO settings (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).run('echanneling_link', echanneling_link);
    res.json({ message: 'Settings saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = db.prepare('SELECT * FROM admins WHERE email = ? AND password = ?').get(email, password);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', admin: { id: admin.id, email: admin.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
