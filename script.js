// Tonggle
ScrollTrigger.create({
  animation: gsap.from(".play", {
    y: "50vh",
    gap: 100,
    yPercent: 200,
  }),
  scrub: true,
  trigger: ".endTonggle",
  start: "top bottom",
  endTrigger: ".endTonggle",
  end: "top center",
});

//  Song
const button = document.querySelector(".play-button");
const audio = document.getElementById("audio");
const icon = button.querySelector("i");

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    button.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
  } else {
    audio.pause();
    button.innerHTML = '<i class="fa-solid fa-music"></i> Play';
  }
});

// Image Slider
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create(
    "hop",
    "M0, 0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
  );

  const sliderImage = document.querySelector(".slide-image");
  const counter = document.querySelector(".counter");
  const title = document.querySelector(".slide-title-wrapper");
  const indicator = document.querySelectorAll(".slide-indicator p");
  const prevSlide = document.querySelectorAll(".slide-previw .previw");
  const slidePreviw = document.querySelector(".slide-previw");

  let currentImg = 1;
  const totalSlide = 5;
  let indicatorRotation = 0;

  const updateCounterAndTitlePosition = () => {
    const counterY = -20 * (currentImg - 1);
    const titleY = -60 * (currentImg - 1);

    gsap.to(counter, { y: counterY, duration: 1, ease: "hop" });
    gsap.to(title, { y: titleY, duration: 1, ease: "hop" });
  };

  const updateActiveSlidePreviw = () => {
    prevSlide.forEach((prev) => prev.classList.remove("active"));
    prevSlide[currentImg - 1].classList.add("active");
  };

  const animateSlide = (direction) => {
    const currentSlide =
      document.querySelectorAll(".img")[
        document.querySelectorAll(".img").length - 1
      ];

    const slideImg = document.createElement("div");
    slideImg.classList.add("img");

    const slideImgElem = document.createElement("img");
    slideImgElem.src = `./imageSlider/bg${currentImg}.jpg`;
    gsap.set(slideImgElem, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    });

    slideImg.appendChild(slideImgElem);
    sliderImage.appendChild(slideImg);

    gsap.to(currentSlide.querySelector("img"), {
      x: direction === "left" ? 300 : -300,
      duration: 1.5,
      ease: "power4.out",
    });

    gsap.fromTo(
      slideImg,
      {
        clipPath:
          direction === "left"
            ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
            : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power4.out",
      }
    );
    gsap.to(slideImg, { x: 0, duration: 1.5, ease: "power4.out" });

    cleaneupSlide();

    indicatorRotation += direction === "left" ? -90 : 90;
    gsap.to(indicator, { rotate: indicatorRotation, duration: 1, ease: "hop" });
  };

  document.addEventListener("click", (event) => {
    const slideWidth = document.querySelector(".slider").clientWidth;
    const clickPosition = event.clientX;

    if (slidePreviw.contains(event.target)) {
      const clickedPrev = event.target.closest(".previw");
      if (clickedPrev) {
        const clickedIndex = Array.from(prevSlide).indexOf(clickedPrev) + 1;

        if (clickedIndex !== currentImg) {
          if (clickedIndex < currentImg) {
            currentImg = clickedIndex;
            animateSlide("left");
          } else {
            currentImg = clickedIndex;
            animateSlide("right");
          }
          updateActiveSlidePreviw();
          updateCounterAndTitlePosition();
        }
      }
      return;
    }

    if (clickPosition < slideWidth / 2 && currentImg !== 1) {
      currentImg--;
      animateSlide("left");
    } else if (clickPosition > slideWidth / 2 && currentImg !== totalSlide) {
      currentImg++;
      animateSlide("right");
    }
    updateActiveSlidePreviw();
    updateCounterAndTitlePosition();
  });

  const cleaneupSlide = () => {
    const imgElement = document.querySelectorAll(".slide-image .img");
    if (imgElement.length > sliderImage) {
      imgElement[0].remove();
    }
  };
});

// Rating
const slider = document.getElementById("rating-slider");
const ratingValue = document.getElementById("rating-value");
const ratingImg = document.getElementById("rating-img");

const ratingImages = [
  "/image/src/angry.svg",
  "/image/src/frown.svg",
  "/image/src/meh.svg",
  "/image/src/suprise.svg",
  "/image/src/grin-star.svg",
];

// Load from localStorage if exists
const savedRating = localStorage.getItem("lastRating");
if (savedRating) {
  slider.value = savedRating;
  ratingValue.textContent = parseFloat(savedRating).toFixed(1);
  const index = Math.min(Math.floor(savedRating / 2), ratingImages.length - 1);
  ratingImg.src = ratingImages[index];
}

slider.addEventListener("input", () => {
  const value = parseFloat(slider.value).toFixed(1);
  ratingValue.textContent = value;
  const index = Math.min(Math.floor(value / 2), ratingImages.length - 1);
  ratingImg.src = ratingImages[index];
});

slider.addEventListener("change", () => {
  localStorage.setItem("lastRating", slider.value);
});