const supabaseUrl = 'https://tmvrbmwwvtsdnqhdtuto.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdnJibXd3dnRzZG5xaGR0dXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NzY5NjksImV4cCI6MjA2OTM1Mjk2OX0.vbxYtNHUYasLM9eANSPu_KZ2CFnS6b4WQPwED0zWzfk';
const client = supabase.createClient(supabaseUrl, supabaseKey);

  console.log('Supabase Instance: ', client);


async function getDoctor() {
    const {data, error} = await client
    .from('doctor')
    .select("*");
    
    if(error) {
        console.error('Error mengambil data:', error);
        return;
    }

    console.log(data);

    const list = document.getElementById('doctor-list');
    list.innerHTML = ''; // Kosongkan daftar dulu

    data.forEach(doc => {
        const card = `
       <div class="bg-orange-50 border rounded-xl shadow p-4 flex flex-col justify-between">
          <div class="flex items-start space-x-4">
            <img src="${doc.photo_url}" alt="Doctor" class="w-24 h-40 object-cover rounded-md">
            <div class="flex flex-col w-full">
              <h3 class="text-lg font-bold text-gray-900">${doc.name}</h3>
              <p class="text-gray-700">${doc.specialization}</p>
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

document.addEventListener('DOMContentLoaded', getDoctor);
