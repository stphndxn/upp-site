const form = document.querySelector(".waitlist-form");

if (form) {
  form.addEventListener("submit", () => {
    form.classList.add("is-submitting");
  });
}
