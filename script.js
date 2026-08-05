document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Zero-Delay Music Playback Setup ---
  const bgMusic = document.getElementById("bgMusic");

  if (bgMusic) {
    bgMusic.volume = 0.6; // Clean default volume
    
    // Force immediate pre-buffering
    bgMusic.load();

    const forcePlayAudio = () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          // Successfully playing
          removeAudioListeners();
        }).catch(() => {
          // Web browsers block un-muted audio before user interaction
        });
      }
    };

    // Attempt instant playback on page execution
    forcePlayAudio();

    // Listeners across all possible input events for instantaneous response
    const fastEvents = ["pointerdown", "touchstart", "mousedown", "keydown", "wheel", "scroll"];
    
    const triggerAudioOnUserAction = (e) => {
      forcePlayAudio();
    };

    const removeAudioListeners = () => {
      fastEvents.forEach((evt) => {
        window.removeEventListener(evt, triggerAudioOnUserAction);
      });
    };

    fastEvents.forEach((evt) => {
      window.addEventListener(evt, triggerAudioOnUserAction, { passive: true, capture: true });
    });
  }

  // --- 2. Side Navigation Toggle ---
  const menuBtn = document.getElementById("menuBtn");
  const navDrawer = document.getElementById("navDrawer");

  if (menuBtn && navDrawer) {
    menuBtn.addEventListener("click", () => {
      navDrawer.classList.toggle("open");
    });

    document.querySelectorAll(".nav-drawer a").forEach((link) => {
      link.addEventListener("click", () => {
        navDrawer.classList.remove("open");
      });
    });
  }

  // --- 3. Interactive Terminal Typing Animation ---
  const commandText = "fastboot erase lk";
  const typedTextElement = document.getElementById("typedText");
  const terminalOutput = document.getElementById("terminalOutput");
  let charIndex = 0;

  function typeCommand() {
    if (typedTextElement && charIndex < commandText.length) {
      typedTextElement.textContent += commandText.charAt(charIndex);
      charIndex++;
      setTimeout(typeCommand, 60); // Fast, realistic typing speed
    } else if (terminalOutput) {
      setTimeout(() => {
        terminalOutput.innerHTML = `
<span class="term-success">Erasing 'lk'...</span>
OKAY [  0.021s ]
<span class="term-highlight">Finished. Total time: 0.023s</span>
        `.trim();
      }, 300);
    }
  }

  // --- 4. Scroll Reveal Observer (Animations on Scroll Up & Down) ---
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Trigger terminal typing when scrolled into view
          if (entry.target.querySelector("#typedText") && charIndex === 0) {
            typeCommand();
          }
        } else {
          // Removes class when out of view so it re-animates on scroll back
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedElements.forEach((el) => scrollObserver.observe(el));

  // --- 5. Dynamic Mouse-Follow Particle & Glow Effect ---
  const cards = document.querySelectorAll(".card, .contact-item, .terminal-box");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
});
