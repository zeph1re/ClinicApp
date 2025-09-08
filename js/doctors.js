const doctors = [
  {
    name: "dr. Bima Santoso",
    specialty: "Umum",
    schedule: "Setiap Hari, 07:00 - 11:00",
    image: "assets/img/male_doctor.png"
  },
  {
    name: "dr. Maria Lestari, Sp.OG",
    specialty: "Kebidanan & Kandungan",
    schedule: "Selasa & Kamis, 09:00 - 14:00",
    image: "assets/img/female_doctor.png"
  },
  {
    name: "drg. Lina Kartika, Sp.KG",
    specialty: "Kedokteran Gigi",
    schedule: "Senin - Kamis, 15:00 - 19:00",
    image: "assets/img/female_doctor.png"
  }
];


function renderDoctors( ) {
    const container = document.getElementById("doctor-list");
    container.innerHTML = "";

    doctors.forEach(doc => {
        const card = `
        <div class="bg-orange-50 border rounded-xl shadow p-4 flex flex-col justify-between">
          <div class="flex items-start space-x-4">
            <img src="${doc.image}" alt="Doctor" class="w-24 h-40 object-cover rounded-md">
            <div class="flex flex-col w-full">
              <h3 class="text-lg font-bold text-gray-900">${doc.name}</h3>
              <p class="text-gray-700">${doc.specialty}</p>
              <p class="font-semibold text-gray-800">${doc.schedule}</p>
            </div>
          </div>
          <div class="mt-3 flex justify-center space-x-2">
              <button class="flex-1 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-200 hover:text-orange-700">Book now</button>
              <button class="flex-1 border px-4 py-2 rounded w-auto">Detail</button>
          </div>
        </div>
    `
        ;
        container.innerHTML += card;
    })
}

document.addEventListener("DOMContentLoaded", renderDoctors);
