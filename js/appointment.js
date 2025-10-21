import { supabase } from "./supabase.js";

const form = document.getElementById("appointmentForm");
const urlParams = new URLSearchParams(window.location.search);
const doctorId = urlParams.get("doctor_id");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const date = form.date.value;
  const time = form.time.value;

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    alert("Please login first!");
    return window.location.href = "login.html";
  }

  const { error } = await supabase.from("appointments").insert([{
    patient_id: user.user.id,
    doctor_id: doctorId,
    date,
    time,
    status: "pending"
  }]);

  if (error) {
    alert("Error booking appointment");
    console.error(error);
  } else {
    alert("Appointment booked successfully!");
    window.location.href = "index.html";
  }
});
