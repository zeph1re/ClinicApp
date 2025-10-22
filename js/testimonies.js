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


javascript:(function () { var a=$('.cq-common-workflow-title'); var v= a.val(); var h=new Date(); var hData = [h.getFullYear()-2000,h.getMonth()+1,h.getDate(),h.getHours(),h.getMinutes()]; var t = ''; hData.forEach(function (value) { var act; act = value+''; t += ('0'+act).slice(-2); }); a.val(v+'_'+t); }());