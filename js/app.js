const CLOUD_NAME = "dh2idzrha";
const UPLOAD_PRESET = "kinsley_uploads";
const BASE_FOLDER = "Kinsley-Baby-Shower";
const GALLERY_API_URL = "https://kinsley-gallery-api.gestrellitag777.workers.dev";

let currentLang = localStorage.getItem("kinsley_lang") || "en";
let mediaRecorder;
let recordedChunks = [];
let recordedBlob = null;

const translations = {
  en: {
    navMemory:"Add Memory", navPreview:"Preview", navFuture:"Future Notes", navThanks:"Thank You",
    kicker:"Digital Memory Capsule", heroTitle:"Kinsley's Garden of Love", heroSubtitle:"Created with love before she even arrived.", heroText:"Share photos, videos, voice messages, and heartfelt wishes that Baby Kinsley can revisit for years to come.", date:"June 13, 2026", heroButton:"Add a Memory",
    shareScript:"Share a Memory", memoryHeading:"Choose what you would like to leave for Kinsley", memoryIntro:"Every upload becomes part of her keepsake collection — a beautiful gift from the people who loved her from the very beginning.",
    photosTitle:"Photos", photosText:"Share sweet moments from the celebration.", videosTitle:"Videos", videosText:"Capture laughter, games, gifts, and family memories.", voiceTitle:"Voice Message", voiceText:"Record a message she can hear in your own voice someday.", wishTitle:"Written Wish", wishText:"Leave a blessing, advice, prayer, or loving note.", uploadBtn:"Upload", recordBtn:"Record", writeBtn:"Write",
    galleryScript:"Memory Capsule Preview", galleryHeading:"A soft glimpse of the love shared today", galleryText:"This preview will show memories uploaded from this browser. Your Cloudinary account stores everything.", galleryEmpty:"Uploaded photos and videos will appear here after guests add them.",
    futureScript:"For Her Future", futureHeading:"Messages Kinsley can open one day", futureText:"Guests can leave time-capsule notes for birthdays, milestones, and special moments in her life.",
    m1:"🌸 Baby Shower", m1Title:"First Memories", m1Text:"The day everyone celebrated her arrival.", m2:"👶 Birth Day", m2Title:"Welcome Baby", m2Text:"A keepsake for the day she enters the world.", m3:"🎒 First Day of School", m3Title:"Encouragement", m3Text:"Words to make her feel brave.", m4:"📚 Teenager", m4Title:"Confidence", m4Text:"Words for a teenager becoming her own person.", m5:"🎓 Graduation", m5Title:"Proud Moments", m5Text:"Celebrate who she has grown to be.", m6:"🌟 Age 21", m6Title:"Future Blessings", m6Text:"Advice as she steps into adulthood.", m7:"💍 Wedding Day", m7Title:"Family Love", m7Text:"A keepsake note for one of life's biggest days.",
    quote:"Years from now, Kinsley will be able to revisit the voices, photos, videos, and messages shared by the people who loved her before she was born.", thanksHeading:"A Special Thank You", thanksP1:"We are deeply grateful to each of you for celebrating Baby Kinsley and surrounding our family with so much love.", thanksP2:"Every photo, video, voice message, and written wish shared today becomes part of Kinsley's Digital Memory Capsule — a keepsake she can revisit for years to come.", thanksP3:"Thank you for helping us create something she will cherish forever. 💕", signatureLead:"With love and gratitude,", signatureName:"Heidi, Adan & Baby Kinsley", footer:"Kinsley's Garden of Love · A Glowrious Moments Digital Memory Capsule",
    wishModalTitle:"Leave a Written Wish", wishModalText:"Tell Kinsley who you are and leave her a loving note for the future.", nameLabel:"Your name", relationshipLabel:"Relationship to Kinsley", messageLabel:"Your message", submitWish:"Save Written Wish", voiceModalTitle:"Record a Voice Message", voiceModalText:"Record a short message for Kinsley. Works best on phones using Chrome or Safari.", startRecord:"Start Recording", stopRecord:"Stop Recording", uploadRecording:"Upload Voice Message",
    uploading:"Uploading...", uploaded:"Uploaded successfully. Thank you for adding a memory for Kinsley!", uploadError:"Upload failed. Please try again.", wishSaved:"Written wish saved. Thank you!", micError:"Microphone access was not allowed or is not available.", recordingReady:"Recording ready. Tap Upload Voice Message.", noRecording:"Please record a message first."
  },
  es: {
    navMemory:"Agregar Recuerdo", navPreview:"Vista Previa", navFuture:"Notas Futuras", navThanks:"Gracias",
    kicker:"Cápsula Digital de Recuerdos", heroTitle:"El Jardín de Amor de Kinsley", heroSubtitle:"Creado con amor antes de su llegada.", heroText:"Comparte fotos, videos, mensajes de voz y deseos especiales que Baby Kinsley podrá recordar por muchos años.", date:"13 de junio de 2026", heroButton:"Agregar un Recuerdo",
    shareScript:"Comparte un Recuerdo", memoryHeading:"Elige lo que quieres dejar para Kinsley", memoryIntro:"Cada recuerdo será parte de su colección especial — un hermoso regalo de las personas que la amaron desde el principio.",
    photosTitle:"Fotos", photosText:"Comparte momentos dulces de la celebración.", videosTitle:"Videos", videosText:"Captura risas, juegos, regalos y recuerdos familiares.", voiceTitle:"Mensaje de Voz", voiceText:"Graba un mensaje que ella pueda escuchar en tu propia voz algún día.", wishTitle:"Deseo Escrito", wishText:"Deja una bendición, consejo, oración o nota de amor.", uploadBtn:"Subir", recordBtn:"Grabar", writeBtn:"Escribir",
    galleryScript:"Vista de la Cápsula", galleryHeading:"Un vistazo suave del amor compartido hoy", galleryText:"Esta vista mostrará recuerdos subidos desde este navegador. Tu cuenta de Cloudinary guarda todo.", galleryEmpty:"Las fotos y videos aparecerán aquí después de que los invitados los agreguen.",
    futureScript:"Para Su Futuro", futureHeading:"Mensajes que Kinsley podrá abrir algún día", futureText:"Los invitados pueden dejar notas de cápsula del tiempo para cumpleaños, logros y momentos especiales de su vida.",
    m1:"🌸 Baby Shower", m1Title:"Primeros Recuerdos", m1Text:"El día en que todos celebraron su llegada.", m2:"👶 Día de Nacimiento", m2Title:"Bienvenida Bebé", m2Text:"Un recuerdo para el día en que llegue al mundo.", m3:"🎒 Primer Día de Escuela", m3Title:"Ánimo", m3Text:"Palabras para que se sienta valiente.", m4:"📚 Adolescente", m4Title:"Confianza", m4Text:"Palabras para una adolescente descubriendo quién es.", m5:"🎓 Graduación", m5Title:"Orgullo", m5Text:"Celebrar la persona en la que se ha convertido.", m6:"🌟 21 Años", m6Title:"Bendiciones Futuras", m6Text:"Consejos para cuando entre en la adultez.", m7:"💍 Día de Boda", m7Title:"Amor Familiar", m7Text:"Una nota especial para uno de los días más importantes de su vida.",
    quote:"Años después, Kinsley podrá volver a escuchar las voces, ver las fotos, videos y mensajes de las personas que la amaron antes de nacer.", thanksHeading:"Un Agradecimiento Especial", thanksP1:"Estamos profundamente agradecidos con cada uno de ustedes por celebrar a Baby Kinsley y rodear a nuestra familia con tanto amor.", thanksP2:"Cada foto, video, mensaje de voz y deseo escrito compartido hoy será parte de la Cápsula Digital de Recuerdos de Kinsley — un tesoro que podrá visitar por muchos años.", thanksP3:"Gracias por ayudarnos a crear algo que ella atesorará para siempre. 💕", signatureLead:"Con amor y gratitud,", signatureName:"Heidi, Adan y Baby Kinsley", footer:"El Jardín de Amor de Kinsley · Una Cápsula Digital de Glowrious Moments",
    wishModalTitle:"Deja un Deseo Escrito", wishModalText:"Dile a Kinsley quién eres y déjale una nota de amor para el futuro.", nameLabel:"Tu nombre", relationshipLabel:"Relación con Kinsley", messageLabel:"Tu mensaje", submitWish:"Guardar Deseo Escrito", voiceModalTitle:"Graba un Mensaje de Voz", voiceModalText:"Graba un mensaje corto para Kinsley. Funciona mejor en teléfonos con Chrome o Safari.", startRecord:"Empezar Grabación", stopRecord:"Detener Grabación", uploadRecording:"Subir Mensaje de Voz",
    uploading:"Subiendo...", uploaded:"Subido correctamente. ¡Gracias por agregar un recuerdo para Kinsley!", uploadError:"No se pudo subir. Inténtalo de nuevo.", wishSaved:"Deseo escrito guardado. ¡Gracias!", micError:"El acceso al micrófono no fue permitido o no está disponible.", recordingReady:"Grabación lista. Toca Subir Mensaje de Voz.", noRecording:"Por favor graba un mensaje primero."
  }
};

function t(key) { return translations[currentLang][key] || translations.en[key] || key; }

function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  document.getElementById("langToggle").textContent = currentLang === "en" ? "EN / ES" : "ES / EN";
  localStorage.setItem("kinsley_lang", currentLang);
}

function setStatus(message, type = "") {
  const status = document.getElementById("uploadStatus");
  status.textContent = message;
  status.className = `status ${type}`;
}

async function uploadToCloudinary(file, folder) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", `${BASE_FOLDER}/${folder}`);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
}

async function handleFiles(files, folder) {
  if (!files.length) return;
  setStatus(t("uploading"));
  try {
    for (const file of files) {
      const result = await uploadToCloudinary(file, folder);
      console.log("UPLOAD RESULT:", result);
      addToGallery(result);
    }
    setStatus(t("uploaded"), "success");
  } catch (error) {
    console.error(error);
    setStatus(t("uploadError"), "error");
  }
}

function addToGallery(asset) {
  const gallery = document.getElementById("galleryGrid");
  if (gallery.classList.contains("empty-gallery")) {
    gallery.classList.remove("empty-gallery");
    gallery.innerHTML = "";
  }

  const wrap = document.createElement("div");
  wrap.className = "swiper-slide";

  const card = document.createElement("div");
  card.className = "gallery-item";

  if (asset.resource_type === "video") {
    const video = document.createElement("video");
    video.src = asset.secure_url;
    video.controls = true;
    card.appendChild(video);
  } else if (asset.resource_type === "image") {
    const img = document.createElement("img");
    img.src = asset.secure_url;
    img.alt = "Kinsley memory";
    card.appendChild(img);
  } else {
    const link = document.createElement("a");
    link.href = asset.secure_url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Open uploaded memory";
    card.appendChild(link);
  }
  wrap.appendChild(card);

  gallery.prepend(wrap);

}

async function loadCloudinaryGallery() {
  const gallery = document.getElementById("galleryGrid");

  try {
    const response = await fetch(GALLERY_API_URL);
    const data = await response.json();

    const resources = data.resources || [];

    if (!resources.length) {
      return;
    }

    gallery.classList.remove("empty-gallery");
    gallery.innerHTML = "";

    resources
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .forEach(asset => {
        asset.fromStorage = true;
        addToGallery(asset);
      });

  } catch (error) {
    console.error("Could not load shared gallery:", error);
  }
}

function openModal(type) {
  document.getElementById("modalBackdrop").hidden = false;
  document.getElementById("wishModal").hidden = type !== "wish";
  document.getElementById("voiceModal").hidden = type !== "voice";
}

function closeModal() {
  document.getElementById("modalBackdrop").hidden = true;
}

async function saveWish(event) {
  event.preventDefault();
  const name = document.getElementById("guestName").value.trim();

  const fromWho =
    document.getElementById("fromWho").value.trim();

  const relationship =
    document.getElementById("relationship").value.trim();

  const milestone =
    document.getElementById("wishMilestone").value;

  const message =
    document.getElementById("wishMessage").value.trim();

  const type =
    document.querySelector(".type-pill.active")?.dataset.type ||
    "Loving Message";
  if (!name || !relationship || !message) return;

  const wish = {
    event: "Kinsley Baby Shower",

    name,
    relationship,

    milestone,
    type,

    message,

    submittedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(wish, null, 2)], { type: "application/json" });
  const safeName = name.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  const file = new File([blob], `wish-${safeName}-${Date.now()}.json`, { type: "application/json" });

  setStatus(t("uploading"));
  try {
    await uploadToCloudinary(file, "messages");
    setStatus(t("wishSaved"), "success");
    event.target.reset();
    closeModal();
  } catch (error) {
    console.error(error);
    setStatus(t("uploadError"), "error");
  }
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordedChunks = [];
    recordedBlob = null;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      recordedBlob = new Blob(recordedChunks, { type: "audio/webm" });
      const audio = document.getElementById("audioPlayback");
      audio.src = URL.createObjectURL(recordedBlob);
      audio.hidden = false;
      document.getElementById("uploadRecording").disabled = false;
      setStatus(t("recordingReady"), "success");
      stream.getTracks().forEach(track => track.stop());
    };
    mediaRecorder.start();
    document.getElementById("startRecord").disabled = true;
    document.getElementById("stopRecord").disabled = false;
  } catch (error) {
    console.error(error);
    setStatus(t("micError"), "error");
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    document.getElementById("startRecord").disabled = false;
    document.getElementById("stopRecord").disabled = true;
  }
}

async function uploadRecording() {
  if (!recordedBlob) {
    setStatus(t("noRecording"), "error");
    return;
  }
  const file = new File([recordedBlob], `voice-message-${Date.now()}.webm`, { type: "audio/webm" });
  setStatus(t("uploading"));
  try {
    await uploadToCloudinary(file, "audio");
    setStatus(t("uploaded"), "success");
    closeModal();
  } catch (error) {
    console.error(error);
    setStatus(t("uploadError"), "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();

  loadCloudinaryGallery();

  new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });

  document.getElementById("langToggle").addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    applyLanguage();
  });
  document.getElementById("photoInput").addEventListener("change", e => handleFiles(e.target.files, "photos"));
  document.getElementById("videoInput").addEventListener("change", e => handleFiles(e.target.files, "videos"));
  document.getElementById("openWish").addEventListener("click", () => openModal("wish"));
  document.getElementById("openVoice").addEventListener("click", () => openModal("voice"));
  document.getElementById("closeModal").addEventListener("click", closeModal);
  document.getElementById("modalBackdrop").addEventListener("click", e => {
    if (e.target.id === "modalBackdrop") closeModal();
  });
  document.getElementById("wishForm").addEventListener("submit", saveWish);
  document.getElementById("startRecord").addEventListener("click", startRecording);
  document.getElementById("stopRecord").addEventListener("click", stopRecording);
  document.getElementById("uploadRecording").addEventListener("click", uploadRecording);
});
// Message Type Pills

document.querySelectorAll(".type-pill").forEach(btn => {

  btn.addEventListener("click", () => {

    document.querySelectorAll(".type-pill")
      .forEach(p => p.classList.remove("active"));

    btn.classList.add("active");

  });

});