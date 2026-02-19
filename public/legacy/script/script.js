// intro
// document.body.classList.add("intro-active");
// setTimeout(() => {
//   document.body.classList.remove("intro-active");
//   const introElement = document.querySelector(".intro");
//   if (introElement) introElement.style.display = "none";
// }, 3500);

const swiperSlides = document.querySelectorAll(".rolling");

swiperSlides.forEach(function (element, index) {
  element.classList.add("swiper-" + index);
  let swiper = new Swiper(".swiper-" + index, {
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    speed: 15000,
    loop: true,
    simulateTouch: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      1400: {
        slidesPerView: 1,
      },
    },
  });
});

const header = document.querySelector(".header");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const isScrollingDown = currentScrollY > lastScrollY;

  header.classList.toggle("on", isScrollingDown);

  lastScrollY = currentScrollY;
});

var swiper = new Swiper(".product-list", {
  slidesPerView: 1.75,
  speed: 2000,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1.2,
    },
    1400: {
      slidesPerView: 1.75,
    },
  },
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(anchor.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelector(".newsletter").addEventListener("click", function () {
  document.querySelector(".news").classList.add("on");
  document.querySelector("body").classList.add("freeze");
});
document.querySelector(".subscribe").addEventListener("click", function () {
  document.querySelector(".news").classList.add("on");
  document.querySelector("body").classList.add("freeze");
});
document.querySelector(".news .close").addEventListener("click", function () {
  document.querySelector(".news").classList.remove("on");
  document.querySelector("body").classList.remove("freeze");
});

// silde
// var swiper = new Swiper(".product-list", {
//   slidesPerView: 1.75,
//   freeMode: true,
// });
// const cursor = document.createElement("div");
// cursor.classList.add("custom-cursor");
// document.body.appendChild(cursor);

// let cursorX = 0,
//   cursorY = 0,
//   targetX = 0,
//   targetY = 0;
// let isHovering = false;

// mouse
// const productList = document.querySelector(".product-list");

// document.addEventListener("mousemove", (e) => {
//   const rect = productList.getBoundingClientRect();

//   if (
//     e.clientX >= rect.left &&
//     e.clientX <= rect.right &&
//     e.clientY >= rect.top &&
//     e.clientY <= rect.bottom
//   ) {
//     isHovering = true;
//     targetX = e.clientX;
//     targetY = e.clientY;
//   } else {
//     isHovering = false;
//   }
// });

// function animateCursor() {
//   if (isHovering) {
//     cursorX += (targetX - cursorX) * 0.1;
//     cursorY += (targetY - cursorY) * 0.1;
//     cursor.style.transform = `translate(${cursorX - 50}px, ${cursorY - 50}px)`;
//     cursor.style.opacity = "1";
//   } else {
//     cursor.style.opacity = "0";
//   }
//   requestAnimationFrame(animateCursor);
// }

// animateCursor();
