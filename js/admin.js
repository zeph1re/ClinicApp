import { supabase } from "./api.js";

const tbody = document.querySelector("tbody");

async function loadAppointments() {
  const { data, error } = await supabase
    .from("appointments")
    .select(`
      id,
      date,
      time,
      status,
      doctors(name),
      users(name)
    `)
    .order("date", { ascending: false });

  if (error) return console.error(error);

  tbody.innerHTML = data.map(app => `
    <tr>
      <td class="border p-2">${app.users.name}</td>
      <td class="border p-2">${app.doctors.name}</td>
      <td class="border p-2">${app.date}</td>
      <td class="border p-2">${app.time}</td>
      <td class="border p-2">${app.status}</td>
    </tr>
  `).join('');
}

loadAppointments();
