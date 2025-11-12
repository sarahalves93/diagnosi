const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const navLinks = document.querySelectorAll(".nav-link");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }

  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

const examesByLetter = {
  A: ["Análise de Sangue", "Audiometria", "Alergia"],
  B: ["Biópsia", "Bioquímica"],
  C: ["Colesterol", "Coagulação", "Colonoscopia"],
  D: ["Densitometria", "Dermatologia"],
  E: ["Eletrocardiograma", "Endoscopia"],
  F: ["Flebografia", "Fluoroscopia"],
  G: ["Gastroscopia", "Glicemia"],
  H: ["Hematologia", "Hemograma"],
  I: ["Imunologia", "Insulina"],
  J: ["Joelho - Ressonância"],
  K: ["Kinesiologia"],
  L: ["Lipidograma", "Laparoscopia"],
  M: ["Mamografia", "Metabolismo"],
  N: ["Neurografia", "Nefrologia"],
  O: ["Oftalmologia", "Oncologia"],
  P: ["Papanicolau", "Proctologia"],
  Q: ["Química do Sangue"],
  R: ["Ressonância Magnética", "Radiografia"],
  S: ["Sangue", "Sorologia"],
  T: ["Tomografia", "Teste de Esforço"],
  U: ["Ultrassom", "Urologia"],
  V: ["Videocapsuloscopia"],
  W: [],
  X: ["Radiografia X"],
  Y: [],
  Z: ["Zoologia Médica"],
};

let currentLetter = null;

document.addEventListener("DOMContentLoaded", () => {
  createAlphabetButtons();

  const slider = document.querySelector(".hero-slider");
  if (slider) {
    const slides = document.querySelectorAll(".hero-img");
    const prevBtn = document.querySelector(".hero-prev");
    const nextBtn = document.querySelector(".hero-next");

    let index = 0;
    const totalSlides = slides.length;
    const intervalTime = 7000;
    let autoSlide;

    function showSlide(idx) {
      slider.style.transform = `translateX(-${idx * 100}%)`;
    }

    function nextSlide() {
      index = (index + 1) % totalSlides;
      showSlide(index);
    }

    function prevSlide() {
      index = (index - 1 + totalSlides) % totalSlides;
      showSlide(index);
    }

    function startAutoSlide() {
      autoSlide = setInterval(nextSlide, intervalTime);
    }

    function resetAutoSlide() {
      clearInterval(autoSlide);
      startAutoSlide();
    }

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });

    prevBtn?.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });

    let startX = 0;
    slider.addEventListener("mousedown", (e) => {
      startX = e.pageX;
      clearInterval(autoSlide);
      slider.style.cursor = "grabbing";
    });

    slider.addEventListener("mouseup", (e) => {
      slider.style.cursor = "grab";
      const diff = e.pageX - startX;
      if (diff > 50 && index > 0) prevSlide();
      else if (diff < -50 && index < totalSlides - 1) nextSlide();
      resetAutoSlide();
    });

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      clearInterval(autoSlide);
    });

    slider.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].pageX - startX;
      if (diff > 50 && index > 0) prevSlide();
      else if (diff < -50 && index < totalSlides - 1) nextSlide();
      resetAutoSlide();
    });

    startAutoSlide();
  }
});

function createAlphabetButtons() {
  const alphabetGrid = document.getElementById("alphabetGrid");
  if (!alphabetGrid) return;

  const letters = Object.keys(examesByLetter);

  letters.forEach((letter) => {
    const button = document.createElement("button");
    button.className = "letter-btn";
    button.textContent = letter;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      toggleLetter(letter);
    });
    alphabetGrid.appendChild(button);
  });
}

function toggleLetter(letter) {
  const examsContent = document.getElementById("examsContent");

  if (currentLetter === letter) {
    currentLetter = null;
    examsContent.innerHTML = `
      <div class="exams-placeholder">
        <p>Clique em uma letra acima para ver os exames disponíveis</p>
      </div>
    `;
    updateActiveButton(null);
    return;
  }

  currentLetter = letter;
  updateActiveButton(letter);

  const exams = examesByLetter[letter].filter((exam) => exam.length > 0);

  if (exams.length === 0) {
    examsContent.innerHTML = `
      <div class="exams-placeholder">
        <p>Nenhum exame disponível para a letra <strong>${letter}</strong></p>
      </div>
    `;
  } else {
    let html = `
      <div class="exams-list active">
        <h3 class="exams-list-title">Exames que começam com a letra 
          <span class="letter">${letter}</span>
        </h3>
        <div class="exams-items">
    `;

    exams.forEach((exam) => {
      html += `<div class="exam-item">${exam}</div>`;
    });

    html += `
        </div>
      </div>
    `;

    examsContent.innerHTML = html;
  }
}

function updateActiveButton(letter) {
  const buttons = document.querySelectorAll(".letter-btn");
  buttons.forEach((btn) => {
    if (btn.textContent === letter) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}
