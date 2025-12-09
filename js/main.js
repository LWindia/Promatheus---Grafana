import { navbar } from "./components/nav.js";
import { hero } from "./components/hero.js";
import { about } from "./components/about.js";
import { outcomes } from "./components/outcomes.js";
import { curriculum } from "./components/curriculum.js";
import { audience } from "./components/audience.js";
import { schedule } from "./components/schedule.js";
import { pricing } from "./components/pricing.js";
import { contact, initContactForm } from "./components/contact.js";
import { siteFooter } from "./components/footer.js";
import { enableAnimations } from "./utils/animations.js";
import { enableSmoothScroll } from "./utils/smoothScroll.js";

const sections = [
  navbar(),
  hero(),
  about(),
  outcomes(),
  curriculum(),
  audience(),
  schedule(),
  pricing(),
  contact(),
  siteFooter(),
];

const app = document.getElementById("app");
app.innerHTML = sections.join("");

enableSmoothScroll();
enableAnimations();
initContactForm();

