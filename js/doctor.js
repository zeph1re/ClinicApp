import { supabase } from "./api.js";

const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("id");
const doctorDetail = document.getElementById("doctorDetail");

async function loadDoctor() {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("id", doctorId)
    .single();

  if (error) return console.error(error);

  doctorDetail.innerHTML = `
    <img src="${data.photo}" class="w-full h-64 object-cover rounded mb-4">
    <h2 class="text-2xl font-bold">${data.name}</h2>
    <p class="text-gray-600">${data.specialty}</p>
    <p class="mt-2">${data.description}</p>
    <a href="appointment.html?doctor_id=${data.id}" 
       class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">Make Appointment</a>
  `;
}

loadDoctor();
