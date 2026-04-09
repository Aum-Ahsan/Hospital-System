const API_BASE_URL = 'http://localhost:5000/api';

export const fetchDoctors = async () => {
  const response = await fetch(`${API_BASE_URL}/doctors`);
  if (!response.ok) throw new Error('Failed to fetch doctors');
  return response.json();
};

export const fetchDoctor = async (id) => {
  const response = await fetch(`${API_BASE_URL}/doctors/${id}`);
  if (!response.ok) throw new Error('Failed to fetch doctor');
  return response.json();
};

export const fetchSettings = async () => {
  const response = await fetch(`${API_BASE_URL}/settings`);
  if (!response.ok) throw new Error('Failed to fetch settings');
  return response.json();
};

export const fetchServices = async () => {
  const response = await fetch(`${API_BASE_URL}/services`);
  if (!response.ok) throw new Error('Failed to fetch services');
  return response.json();
};

export const fetchTestimonials = async () => {
  const response = await fetch(`${API_BASE_URL}/testimonials`);
  if (!response.ok) throw new Error('Failed to fetch testimonials');
  return response.json();
};

export const fetchAppointments = async () => {
  const response = await fetch(`${API_BASE_URL}/appointments`);
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return response.json();
};

export const createAppointment = async (appointmentData) => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });
  if (!response.ok) throw new Error('Failed to create appointment');
  return response.json();
};
