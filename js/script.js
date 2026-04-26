const codeSecret = "0711";
let code = "";

document.addEventListener("DOMContentLoaded", () => {

  const result = document.getElementById("result");
  const dotsDisplay = document.getElementById("dotsDisplay");
  const galerie = document.getElementById("galerie");
  const upload = document.getElementById("upload");

  function appendNumber(num) {
    if (code.length < 8) {
      code += num;
      updateDotsDisplay();
    }
  }

  function clearCode() {
    code = "";
    if (result) result.textContent = "";
    updateDotsDisplay();
  }

  function validateCode() {
    if (code === codeSecret) {
      window.location.href = "page2.html";
    } else {
      if (result) result.textContent = "Code incorrect";
      clearCode();
    }
  }

  function updateDotsDisplay() {
    if (dotsDisplay) {
      dotsDisplay.textContent = "●".repeat(code.length);
    }
  }

  function openLightbox(src) {
    const img = document.getElementById("lightbox-img");
    const box = document.getElementById("lightbox");
    if (img && box) {
      img.src = src;
      box.style.display = "flex";
    }
  }

  function closeLightbox() {
    const box = document.getElementById("lightbox");
    if (box) box.style.display = "none";
  }

  // 🔥 Correction ici (le point manquait)
  document.querySelectorAll(".galerie img").forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      openLightbox(img.src);
    });
  });

  // Charger les images sauvegardées
  if (galerie) {
    const savedImages = JSON.parse(localStorage.getItem('images') || '[]');
    savedImages.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      galerie.appendChild(img);
    });
  }

  // Upload image (UNE SEULE VERSION)
  if (upload && galerie) {
    upload.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const src = e.target.result;

        const img = document.createElement('img');
        img.src = src;
        img.style.cursor = "zoom-in";

        img.addEventListener("click", () => {
          openLightbox(src);
        });

        galerie.appendChild(img);

        // sauvegarde
        let saved = JSON.parse(localStorage.getItem('images') || '[]');
        saved.push(src);
        localStorage.setItem('images', JSON.stringify(saved));
      };
      reader.readAsDataURL(file);
    });
  }

  // rendre fonctions globales si utilisées dans HTML
  window.appendNumber = appendNumber;
  window.clearCode = clearCode;
  window.validateCode = validateCode;
  window.closeLightbox = closeLightbox;

});
