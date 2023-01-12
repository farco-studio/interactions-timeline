import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".section");

const firstDigit = document.querySelector(".first-digit");
const secondDigit = document.querySelector(".second-digit");
const thirdDigit = document.querySelector(".third-digit");
const fourthDigit = document.querySelector(".fourth-digit");

let firstDigits = [];
let secondDigits = [];
let thirdDigits = [];
let fourthDigits = [];

let uniqueFirstDigits = [];
let uniqueSecondDigits = [];
let uniqueThirdDigits = [];
let uniqueFourthDigits = [];

const getEachDigit = (year) => {
  return {
    first: year.toString().charAt(0),
    second: year.toString().charAt(1),
    third: year.toString().charAt(2),
    fourth: year.toString().charAt(3),
  };
};

const pushDigits = (year) => {
  let slicedDigits = getEachDigit(year.dataset.year);
  firstDigits.push(slicedDigits.first);
  secondDigits.push(slicedDigits.second);
  thirdDigits.push(slicedDigits.third);
  fourthDigits.push(slicedDigits.fourth);
};

const pushDigitsForEachSection = () => sections.map((year) => pushDigits(year));

const getUniqueDigits = (digits) => [...new Set(digits)];

const appendUniqueDigits = (digits, container) => {
  digits.forEach((digit) => {
    const digitContainer = document.createElement("div");
    digitContainer.innerHTML = `${digit}`;
    container.appendChild(digitContainer);
  });
};

const updateUniqueDigits = () => {
  uniqueFirstDigits = getUniqueDigits(firstDigits);
  uniqueSecondDigits = getUniqueDigits(secondDigits);
  uniqueThirdDigits = getUniqueDigits(thirdDigits);
  uniqueFourthDigits = getUniqueDigits(fourthDigits);

  appendUniqueDigits(uniqueFirstDigits, firstDigit);
  appendUniqueDigits(uniqueSecondDigits, secondDigit);
  appendUniqueDigits(uniqueThirdDigits, thirdDigit);
  appendUniqueDigits(uniqueFourthDigits, fourthDigit);
};

const scrollTriggerConfig = (currentSection) => {
  return {
    trigger: currentSection,
    start: "top bottom",
    end: "50% bottom",
    scrub: true,
    markers: true
  };
};

const parallaxConfig = (currentSection) => {
  return {
    trigger: currentSection,
    start: "top bottom",
    end: "bottom -20%",
    scrub: true,
  };
};

// const imagesParallax = (currentSection) => {
//   let images = gsap.utils.toArray(".image");
//   images.map((image) => {
//     gsap.to(image, {
//       y: function() {return (1 - parseFloat(el.getAttribute("data-speed"))) * (ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0))},
//       scrollTrigger: parallaxConfig(currentSection),
//     });
//   });
// };

// apply parallax effect to any element with a data-speed attribute
// gsap.utils.toArray("[data-speed]").forEach(el => {
//   gsap.to(el, {
//     y: function() {return (1 - parseFloat(el.getAttribute("data-speed"))) * (ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : 0))},
//     ease: "none",
//     scrollTrigger: {
//       trigger: el,
//       start: "top center",
//       end: "max",
//       invalidateOnRefresh: true,
//       scrub: true
//     }
//   });
// });

const handleDigitsScroll = () => {
  sections.map((section, index) => {
    let currentSection = section;
    let sectionHeight = currentSection.offsetHeight;

      gsap.to(currentSection.querySelector('.image-2'), {
        y: function () {
          return (
            (-1 * parseFloat(currentSection.querySelector('.image-2').getAttribute("data-speed"))) * (currentSection.offsetHeight)
          );
        },
        scrollTrigger: parallaxConfig(currentSection),
      });

      gsap.to(currentSection.querySelector('.image-3'), {
        y: function () {
          return (
            (-1 * parseFloat(currentSection.querySelector('.image-3').getAttribute("data-speed"))) * (currentSection.offsetHeight)
          );
        },
        scrollTrigger: parallaxConfig(currentSection),
      });      
  
    if (index === 0) {
      gsap.to(".fourth-digit", {
        yPercent: 0,
        scrollTrigger: scrollTriggerConfig(currentSection),
      });
    }

    if (index === 1)
      gsap.to(".fourth-digit", {
        yPercent: -100,
        scrollTrigger: scrollTriggerConfig(currentSection),
      });

    if (index === 2) {
      gsap.fromTo(
        ".fourth-digit",
        {
          yPercent: -100,
        },
        {
          yPercent: -200,
          scrollTrigger: scrollTriggerConfig(currentSection),
        }
      );
    }
  });
};

// apply parallax effect to any element with a data-speed attribute
// gsap.utils.toArray("[data-speed]").forEach((el) => {
//   gsap.to(el, {
//     y: function () {
//       return (
//         (1 - parseFloat(el.getAttribute("data-speed"))) *
//         (ScrollTrigger.maxScroll(window) -
//           (this.scrollTrigger ? this.scrollTrigger.start : 0))
//       );
//     },
//     ease: "none",
//     scrollTrigger: {
//       trigger: el,
//       start: "top center",
//       end: "max",
//       invalidateOnRefresh: true,
//       scrub: true,
//     },
//   });
// });

const init = () => {
  pushDigitsForEachSection();
  updateUniqueDigits();
  handleDigitsScroll();
};

init();
