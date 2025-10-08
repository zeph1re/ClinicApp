import { supabase } from "./constant.js"; // pastikan path ini benar

async function getDoctor() {
    const { data, error } = await supabase
        .from("doctors")
        .select(`id, profiles (full_name)`)
        .order("created_at", { ascending: false });
    if (error) {
        console.error("Error mengambil data:", error);
        return;
    }

    console.log("Data Doctor: ", data);

    const list = document.getElementById("doctor-list");
    list.innerHTML = "";

    data.forEach((doc) => {
        const card = `
        <div class="bg-orange-50 border rounded-xl shadow p-4 flex flex-col justify-between">
          <div class="flex items-start space-x-4">
            <img src="" alt="Doctor" class="w-24 h-40 object-cover rounded-md">
            <div class="flex flex-col w-full">
              <h3 class="text-lg font-bold text-gray-900">${doc.profiles.full_name}</h3>
              <p class="text-gray-700"></p>
            </div>
          </div>
          <div class="mt-3 flex justify-center space-x-2">
              <button class="flex-1 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-200 hover:text-orange-700">Book now</button>
              <button class="flex-1 border px-4 py-2 rounded w-auto">Detail</button>
          </div>
        </div>
        `;
        list.innerHTML += card;
    });
}

document.addEventListener("DOMContentLoaded", getDoctor);

async function getPatient() {
    const { patientData, error } = await client.from("user").select("");
}
