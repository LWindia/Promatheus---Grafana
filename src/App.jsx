import { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Outcomes from "./components/Outcomes.jsx";
import Curriculum from "./components/Curriculum.jsx";
import Audience from "./components/Audience.jsx";
import Schedule from "./components/Schedule.jsx";
import Mentor from "./components/Mentor.jsx";
import Pricing from "./components/Pricing.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

const sections = [
  { id: "hero", Component: Hero },
  // Move curriculum above "Why this training" (About) per request
  { id: "curriculum", Component: Curriculum },
  { id: "about", Component: About },
  { id: "outcomes", Component: Outcomes },
  { id: "audience", Component: Audience },
  { id: "schedule", Component: Schedule },
  { id: "mentor", Component: Mentor },
  { id: "pricing", Component: Pricing },
  { id: "contact", Component: Contact },
];

const useSmoothScroll = () => {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    const onClick = (e) => {
      const targetId = e.currentTarget.getAttribute("href");
      if (targetId === "#" || !targetId) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    links.forEach((link) => link.addEventListener("click", onClick));
    return () => links.forEach((link) => link.removeEventListener("click", onClick));
  }, []);
};

const useRevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    const nodes = document.querySelectorAll("[data-animate]");
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
};

function App() {
  useSmoothScroll();
  useRevealOnScroll();

  return (
    <>
      <Nav />
      <main>
        {sections.map(({ id, Component }) => (
          <section key={id} id={id} className="section animate" data-animate>
            <div className="section-inner">
              <Component />
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default App;

