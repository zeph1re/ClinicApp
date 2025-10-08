const testimonies = [];

function renderTestimonies() {
  const container = document.getElementById("testimonies");
  container.innerHTML = "";

  testimonies.forEach((doc) => {
    const card = `
        
    `;
    container.innerHTML += card;
  });
}

document.addEventListener("DOMContentLoaded", renderTestimonies);
