 
    const popup = document.getElementById("videoPopup");
const popupVideo = document.getElementById("popupVideo");
const muteBtn = document.querySelector(".mute-btn");

/* Open video */
function openVideo(src) {
  popup.style.display = "flex";
  popupVideo.src = src;
  popupVideo.muted = false;
  popupVideo.play();
  muteBtn.textContent = "Mute";
}

/* Close video */
function closeVideo() {
  popupVideo.pause();
  popupVideo.src = "";
  popup.style.display = "none";
}

/* Mute / Unmute */

function toggleMute() {
  popupVideo.muted = !popupVideo.muted;
  muteBtn.textContent = popupVideo.muted ? "Unmute" : "Mute";
}
/* Data: replace src/insta URLs with your real files */
const videoData = {
  wedding: {
    title: "Wedding Shoots",
    embeds: [
      "https://www.instagram.com/reel/DLuHFfBxT1P/?igsh=MWUyNnppYnoxNjBuYw=="
      
    ]
  },
  car: {
    title: "Car Shoots",
    embeds: [
      "https://www.instagram.com/reel/DP6ZKVljy3F/?igsh=MTlia3NodWM2azdveA==",
      "https://www.instagram.com/reel/DO089fIiqyR/?igsh=MXBqZ3Z2MzV2enloag==",
      "https://www.instagram.com/reel/DNGJh2JI46H/?igsh=NGVvZjU2aHByNDNs",
      "https://www.instagram.com/reel/DKWG-QKRaQI/?igsh=Y205ZHVnNmpqeHZq"
    ]
  },
  festival: {
    title: "Festival Shoots",
    embeds: [
      "https://www.instagram.com/reel/AAAAAAAAA/"
    ]
  }
};

function openModal(category) {
  document.getElementById("videoModal").style.display = "block";
  document.getElementById("modalTitle").innerText = videoData[category].title;

  const container = document.getElementById("modalVideos");
  container.innerHTML = "";

  videoData[category].embeds.forEach(link => {
    const block = document.createElement("blockquote");
    block.className = "instagram-media";
    block.setAttribute("data-instgrm-permalink", link);
    block.setAttribute("data-instgrm-version", "14");
    container.appendChild(block);
  });

  window.instgrm.Embeds.process();
}

function closeModal() {
  document.getElementById("videoModal").style.display = "none";
}
/* Open modal with 3x3 grid (2:3 ratio videos) */
function openModal(category) {
  const modal = document.getElementById("videoModal");
  const container = document.getElementById("modalVideos");
  const titleEl = document.getElementById("modalTitle");

  modal.style.display = "block";
  container.innerHTML = "";

  if (category === "wedding") {
    titleEl.innerText = "Wedding Shoots";
    container.innerHTML = `
      <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DLuHFfBxT1P/?igsh=MWUyNnppYnoxNjBuYw==">
      </blockquote>

      <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DLFobmFT67x/?igsh=MXIxNHZrNm1pdnJpZA==">
      </blockquote>
    `;
  }

  if (category === "car") {
    titleEl.innerText = "Car Shoots";
    container.innerHTML = `
      <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DP6ZKVljy3F/?igsh=MTlia3NodWM2azdveA==">
      </blockquote>

      <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DO089fIiqyR/?igsh=MXBqZ3Z2MzV2enloag==">
      </blockquote>
      <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DNGJh2JI46H/?igsh=NGVvZjU2aHByNDNs">
      </blockquote>
       <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DKWG-QKRaQI/?igsh=Y205ZHVnNmpqeHZq">
      </blockquote>
    `;
  }

  if (category === "festival") {
    titleEl.innerText = "Festival Shoots";
    container.innerHTML = `
      <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DNe4m3LoQ5K/?igsh=eXVxZTVwc3Q1NWJh">
      </blockquote>
      <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DOTdiZGj9X3/?igsh=ZXBqZW45MHAwdWpy">
      </blockquote>
      <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DN06LIH1ETO/?igsh=NmZ6cXY4NDVxaGtj">
      </blockquote>
      <blockquote class="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DLCvJi2zalz/?igsh=MTc2bW5zdXo0M25jbQ==">
      </blockquote>
    `;
  }

  if (window.instgrm) {
    window.instgrm.Embeds.process();
  }
}

/* Full video view with back + mute/unmute */
function showFullVideo(category, index) {
  inFullView = true;
  const container = document.getElementById("modalVideos");
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "full-video";

  const videoEl = document.createElement("video");
  videoEl.src = videoData[category].videos[index].src;
  videoEl.controls = true;
  videoEl.autoplay = true;
  videoEl.id = "activeVideo";

  const controls = document.createElement("div");
  controls.className = "controls";

  const muteBtn = document.createElement("button");
  muteBtn.className = "btn";
  muteBtn.textContent = "Mute";
  muteBtn.onclick = () => {
    videoEl.muted = !videoEl.muted;
    muteBtn.textContent = videoEl.muted ? "Unmute" : "Mute";
  };

  const backBtn = document.createElement("button");
  backBtn.className = "btn";
  backBtn.textContent = "Back";
  backBtn.onclick = () => openModal(category);

  controls.appendChild(muteBtn);
  controls.appendChild(backBtn);

  wrapper.appendChild(videoEl);
  wrapper.appendChild(controls);
  container.appendChild(wrapper);

  const instaLink = document.createElement("div");
  instaLink.className = "instagram-link";
  instaLink.innerHTML = `<a href="${videoData[category].insta}" target="_blank">📸 View this category on Instagram</a>`;
  container.appendChild(instaLink);
}

function backToGrid() {
  if (currentCategory && inFullView) {
    openModal(currentCategory);
  }
}

function closeModal() {
  document.getElementById("videoModal").style.display = "none";
  currentCategory = null;
  inFullView = false;
}

    // Mobile nav toggle
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.getElementById("navLinks");

    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close menu on link click (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });

    // Dynamic year
    document.getElementById("year").textContent = new Date().getFullYear();
    const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e){
  e.preventDefault();

  // form data
  const name = document.getElementById("name").value;
  const brand = document.getElementById("brand").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value;

  
  const ownerWhatsApp = "918261955179";

 // Text to send
const text = `New Booking Enquiry 🚀%0A
Name: ${name}%0A
Brand: ${brand}%0A
Email: ${email}%0A
WhatsApp: ${phone}%0A
Service: ${service}%0A
Message: ${message}`;

  // WhatsApp URL
  const url = `https://wa.me/${ownerWhatsApp}?text=${text}`;

  // Open WhatsApp link
  window.open(url, "_blank");

  });
} 
  