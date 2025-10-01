import {supabaseUrl, supabaseAnonKey} from './constant.js';

const client = supabase.createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase Instance: ', client);

async function getDoctor() {
    const {data, error} = await client
    .from('users')
    .select("id, name, doctor(specialization,photo_url)");
    
    if(error) {
        console.error('Error mengambil data:', error);
        return;
    }

    console.log(data);

    const list = document.getElementById('doctor-list');
    list.innerHTML = '';

    data.forEach(doc => {
        const card = `
       <div class="bg-orange-50 border rounded-xl shadow p-4 flex flex-col justify-between">
          <div class="flex items-start space-x-4">
            <img src="${doc.doctor.photo_url}" alt="Doctor" class="w-24 h-40 object-cover rounded-md">
            <div class="flex flex-col w-full">
              <h3 class="text-lg font-bold text-gray-900">${doc.name}</h3>
              <p class="text-gray-700">${doc.doctor.specialization}</p>
            </div>
          </div>
          <div class="mt-3 flex justify-center space-x-2">
              <button class="flex-1 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-200 hover:text-orange-700">Book now</button>
              <button class="flex-1 border px-4 py-2 rounded w-auto">Detail</button>
          </div>
        </div>
        `;
        list.innerHTML += card;
  }).slice(2);
} 

document.addEventListener('DOMContentLoaded', getDoctor);


async function getPatient() {
  const {patientData, error} = await client
  .from("user")
  .select('');
}