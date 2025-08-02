const codeSecret = "0711";
let code = "";

function appendNumber(num) {
    if (code.length < 8) {
    code += num;
    updateDotsDisplay();
}
}

function clearCode() {
    code = "";
    document.getElementById("result").textContent = "";
    updateDotsDisplay();
}

function validateCode() {
    if (code === codeSecret) {
    window.location.href = "page2.html";
    } else {
        document.getElementById("result").textContent = "Code incorrect";
        clearCode();
    }
}

function updateDotsDisplay() {
    document.getElementById("dotsDisplay").textContent = "●".repeat(code.length);
}

function openLightbox(src) {
    document.getElementById("lightbox-img").src = src;
    document.getElementById("lightbox").style.display = "flex";
  }

  function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
  }

  // Ajoute un event à chaque image de la galerie
  document.querySelectorAll(".galerie img").forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      openLightbox(img.src);
    });
  });

  const uploadInput = document.getElementById('upload');
  const galerie = document.getElementById('galerie');

  uploadInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const newImg = document.createElement('img');
      newImg.src = e.target.result;
      newImg.alt = "Nouvelle photo";
      galerie.appendChild(newImg);
    };
    reader.readAsDataURL(file);
  });
  const upload = document.getElementById('upload');
  const galerie = document.getElementById('galerie');

  // Charger les images stockées
  window.addEventListener('load', () => {
    const savedImages = JSON.parse(localStorage.getItem('images') || '[]');
    savedImages.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      galerie.appendChild(img);
    });
  });

  // Ajouter une nouvelle image
  upload.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const src = e.target.result;

      // Ajouter visuellement
      const img = document.createElement('img');
      img.src = src;
      galerie.appendChild(img);

      // Sauvegarder
      let saved = JSON.parse(localStorage.getItem('images') || '[]');
      saved.push(src);
      localStorage.setItem('images', JSON.stringify(saved));
    };
    reader.readAsDataURL(file);
  });