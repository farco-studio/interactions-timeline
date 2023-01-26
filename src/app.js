import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

// const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
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

const digitsConfig = (currentSection) => {
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

const parallaxMobileConfig = (currentSection) => {
  return {
    trigger: currentSection,
    start: "80% 100%",
    end: "bottom 10%",
    scrub: true,
  };
};

const handleScroll = () => {
  mm.add(
    {
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)",
    },
    (context) => {
      let { isDesktop } = context.conditions;

      sections.forEach((currentSection) => {
        const { offsetHeight: sectionHeight } = currentSection;
        const imageElements = currentSection.querySelectorAll(".image");
        const speed = Array.from(imageElements).map(
          (image) => -1 * parseFloat(image.getAttribute("data-speed"))
        );
        gsap.fromTo(
          imageElements,
          {
            opacity: isDesktop ? 1 : 0,
            y: (i) => (isDesktop ? 0 : -(speed[i] * sectionHeight / 2)),
          },
          {
            y: (i) => (isDesktop ? speed[i] * sectionHeight : 0),
            opacity: 1,
            scrollTrigger: isDesktop ? parallaxConfig(currentSection) : parallaxMobileConfig(currentSection),
          }
        );
      });
      if (isDesktop) {
        sections.forEach((currentSection, i) => {
          switch (i) {
            case 0:
              gsap.to(".fourth-digit", {
                yPercent: 0,
                scrollTrigger: digitsConfig(currentSection),
              });
              break;
            case 1:
              gsap.to(".fourth-digit", {
                yPercent: -100,
                scrollTrigger: digitsConfig(currentSection),
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
                  scrollTrigger: digitsConfig(currentSection),
                }
              );
              break;
            default:
              break;
          }
        });
      }
    }
  );
};

const initializeComponent = () => {
  pushDigitsForEachSection();
  updateUniqueDigits();
  handleScroll();
};

initializeComponent();

window.addEventListener("resize", () => {
  gsap.matchMediaRefresh();
});
