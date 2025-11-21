// Basic DOM interactions, language switch and SweetAlert booking flow

const texts = {
  en: {
    heroTitle: "WildTrail\nAdventures",
    heroSub: "The most popular and trusted travel agency in Greece",
    serviceTitle: "Tailored Private Tours in Mercedes Vito",
    serviceText: "Enjoy a personalized journey in our Mercedes Vito (9-seater). These tours offer complete flexibility — visit as many or as few places as you wish."
  },
  es: {
    heroTitle: "WildTrail\nAdventures",
    heroSub: "La agencia de viajes más popular y confiable en Grecia",
    serviceTitle: "Tours Privados a Medida en Mercedes Vito",
    serviceText: "Disfruta de un viaje personalizado en nuestro Mercedes Vito (9 plazas). Estos tours ofrecen total flexibilidad — visita los lugares que quieras."
  },
  fr: {
    heroTitle: "WildTrail\nAdventures",
    heroSub: "L'agence de voyage la plus populaire et fiable en Grèce",
    serviceTitle: "Visites Privées sur Mesure en Mercedes Vito",
    serviceText: "Profitez d'un voyage personnalisé dans notre Mercedes Vito (9 places). Ces excursions offrent une flexibilité complète."
  }
};

document.addEventListener("DOMContentLoaded", () => {

  // Language selector
  const langSelect = document.getElementById("langSelect");
  const heroTitleEl = document.getElementById("heroTitle");
  const heroSubEl = document.getElementById("heroSub");
  const serviceTitleEl = document.getElementById("serviceTitle");
  const serviceTextEl = document.getElementById("serviceText");
  const saved = localStorage.getItem("lang") || "en";

  langSelect.value = saved;
  applyLang(saved);

  langSelect.addEventListener("change", e => {
    const v = e.target.value;
    localStorage.setItem("lang", v);
    applyLang(v);
  });

  function applyLang(code){
    const t = texts[code] || texts.en;
    heroTitleEl.innerText = t.heroTitle;
    heroSubEl.innerText = t.heroSub;
    serviceTitleEl.innerText = t.serviceTitle;
    serviceTextEl.innerText = t.serviceText;
  }

  // Tabs
  document.querySelectorAll(".tab").forEach(btn=>{
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const service = btn.dataset.service;
      // update content based on service (simple demo)
      if(service === "private"){
        serviceTitleEl.innerText = texts[langSelect.value].serviceTitle;
        serviceTextEl.innerText = texts[langSelect.value].serviceText;
      } else if(service === "scheduled"){
        serviceTitleEl.innerText = "Scheduled Tours";
        serviceTextEl.innerText = "Join a scheduled group route, guided and fast.";
      } else if(service === "transfers"){
        serviceTitleEl.innerText = "Transfers";
        serviceTextEl.innerText = "Reliable transfers between ports, airports and hotels.";
      } else {
        serviceTitleEl.innerText = "Accessibility";
        serviceTextEl.innerText = "Accessible vehicles and routes for all travelers.";
      }
    })
  });

  // Book button (top)
  document.getElementById("bookBtn").addEventListener("click", ()=>openBooking());

  // Book buttons in tours
  document.querySelectorAll(".book-now").forEach(b=>{
    b.addEventListener("click", ()=> {
      const tour = b.dataset.tour || "Selected tour";
      openBooking(tour);
    })
  });

  function openBooking(tourName = "") {
    Swal.fire({
      title: 'Book a tour',
      html:
        `<input id="swal-name" class="swal2-input" placeholder="Full name">
         <input id="swal-email" class="swal2-input" placeholder="Email">
         <input id="swal-date" type="date" class="swal2-input">
         <input id="swal-tour" class="swal2-input" placeholder="Tour" value="${tourName}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Send request',
      preConfirm: () => {
        const name = document.getElementById('swal-name').value;
        const email = document.getElementById('swal-email').value;
        const date = document.getElementById('swal-date').value;
        const tour = document.getElementById('swal-tour').value;
        if(!name || !email) {
          Swal.showValidationMessage('Please enter name and email');
          return false;
        }
        return {name,email,date,tour};
      }
    }).then(result=>{
      if(result.isConfirmed && result.value){
        // Simple success - here you would send to server
        Swal.fire('Request sent', `Thanks ${result.value.name}, we'll contact you at ${result.value.email}`, 'success');
      }
    })
  }

  // Form submit
  document.getElementById("contactForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const msg = document.getElementById("message").value.trim();
    if(!name || !email){
      Swal.fire('Missing data','Please provide name and email','warning');
      return;
    }
    Swal.fire('Message sent', 'We received your message — thanks!', 'success');
    e.target.reset();
  });

});
