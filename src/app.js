import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".section");
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
    const yPercentValues = [0, -100, -200];
    const yPercent = yPercentValues[i];
    gsap.to(".fourth-digit", {
      yPercent,
      scrollTrigger: scrollTriggerConfig(currentSection),
    });
  });
};

const initializeComponent = () => {
  pushDigitsForEachSection();
  updateUniqueDigits();
  handleDigitsScroll();
};

initializeComponent();
