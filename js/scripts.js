const toggle = document.getElementById("modeToggle");
if (toggle) {
  toggle.addEventListener("change", () => {
    document.body.classList.remove("theme-anim");
    void document.body.offsetWidth;
    document.body.classList.add("theme-anim");
    document.body.classList.toggle("light", toggle.checked);
    setTimeout(() => document.body.classList.remove("theme-anim"), 750);
  });
}



const dealCards = Array.from(document.querySelectorAll(".deal-card"));
dealCards.forEach((card) => {
  const images = (card.getAttribute("data-images") || "")
    .split(",").map(s => s.trim()).filter(Boolean);
  if (!images.length) return;
  const img = card.querySelector("img");
  let i = 0;
  img.src = images[i];
  setInterval(() => {
    i = (i + 1) % images.length;
    img.src = images[i];
  }, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("modeToggle");
  if (toggle) {
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("light", toggle.checked);
    });
  }
  const cards = document.querySelectorAll(".deal-card");
  cards.forEach((card) => {
    const list = (card.getAttribute("data-images") || "")
      .split(",").map(s => s.trim()).filter(Boolean);
    const img = card.querySelector("img");
    if (!img) return;
    if (list.length) img.src = list[0];
    let i = 0;
    if (list.length > 1) {
      setInterval(() => {
        i = (i + 1) % list.length;
        img.src = list[i];
      }, 3000);
    }
  });
});

