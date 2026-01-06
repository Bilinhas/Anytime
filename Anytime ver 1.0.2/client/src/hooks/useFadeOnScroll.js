//hook das animações de scroll

import { useEffect } from "react";

function useFadeOnScroll() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-on-scroll");
      const windowHeight = window.innerHeight;
      let cardIndex = 0;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isCard = el.classList.contains("card-fade");

        if (rect.top < windowHeight - 100 && rect.bottom > 100) {
          el.style.transitionDelay = isCard ? `${cardIndex * 100}ms` : "0ms";
          if (isCard) cardIndex++;
          el.classList.add("fade-visible");
          el.classList.remove("fade-hidden");
        } else {
          el.style.transitionDelay = "0ms";
          el.classList.remove("fade-visible");
          el.classList.add("fade-hidden");
        }
      });
    };

    const initElements = () => {
      const elements = document.querySelectorAll(".fade-on-scroll");
      elements.forEach((el) => el.classList.add("fade-hidden"));
      setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    initElements();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
}

export default useFadeOnScroll;
