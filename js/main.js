import { AppController } from './controllers/AppController.js';

const appController = new AppController();

// Event listener untuk form pemesanan
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointmentForm');
  const listContainer = document.getElementById('appointmentList');

  if (form) form.addEventListener('submit', (e) => appController.submitForm(e));
  if (listContainer) appController.renderAppointments(listContainer);
});
