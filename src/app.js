import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

const sections = gsap.utils.toArray(".section");
const desktop = window.matchMedia("(min-width: 1024px)");

const digitsContainers = [
  {
    container: document.querySelector(".first-digit"),
    digits: [],
  },
  {
    container: document.querySelector(".second-digit"),
    digits: [],
  },
  {
    container: document.querySelector(".third-digit"),
    digits: [],
  },
  {
    container: document.querySelector(".fourth-digit"),
    digits: [],
  },
];

const getEachDigit = (year) => {
  const yearString = year.toString();
  return {
    first: yearString[0],
    second: yearString[1],
    third: yearString[2],
    fourth: yearString[3],
  };
};

const pushDigits = (year) => {
  let slicedDigits = getEachDigit(year.dataset.year);
  digitsContainers.forEach(({ digits }, i) =>
    digits.push(slicedDigits[["first", "second", "third", "fourth"][i]])
  );
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
  digitsContainers.forEach(({ digits, container }) =>
    appendUniqueDigits(getUniqueDigits(digits), container)
  );
};

const scrollTriggerConfig = (currentSection) => {
  return {
    trigger: currentSection,
    start: "top bottom",
    end: "50% bottom",
    scrub: true,
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

const handleDigitsScroll = () => {
  mm.add(desktop, () => {
    sections.forEach((currentSection) => {
      const { offsetHeight: sectionHeight } = currentSection;
      const imageElements = currentSection.querySelectorAll(".image");
      const speed = Array.from(imageElements).map(
        (image) => -1 * parseFloat(image.getAttribute("data-speed"))
      );
      gsap.to(imageElements, {
        y: (i) => speed[i] * sectionHeight,
        scrollTrigger: parallaxConfig(currentSection),
      });
    });
    sections.forEach((currentSection, i) => {
      switch (i) {
        case 0:
          gsap.to(".fourth-digit", {
            yPercent: 0,
            scrollTrigger: scrollTriggerConfig(currentSection),
          });
          break;
        case 1:
          gsap.to(".fourth-digit", {
            yPercent: -100,
            scrollTrigger: scrollTriggerConfig(currentSection),
          });
          break;
        case 2:
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
          break;
        default:
          break;
      }
    });
  });
};

const initializeComponent = () => {
  pushDigitsForEachSection();
  updateUniqueDigits();
  handleDigitsScroll();
};

initializeComponent();
