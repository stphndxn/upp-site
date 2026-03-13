const form = document.querySelector(".waitlist-form");
const success = document.querySelector("#waitlist-success");

const encodeForm = (formData) => new URLSearchParams(formData).toString();
const trackEvent = (name) => {
  if (window.fathom && typeof window.fathom.trackEvent === "function") {
    window.fathom.trackEvent(name);
  }
};

document.querySelectorAll("[data-fathom-event]").forEach((element) => {
  element.addEventListener("click", () => {
    const eventName = element.getAttribute("data-fathom-event");
    if (eventName) {
      trackEvent(eventName);
    }
  });
});

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    form.classList.add("is-submitting");

    try {
      const formData = new FormData(form);
      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodeForm(formData),
      });

      form.reset();
      form.hidden = true;
      trackEvent("waitlist_submitted");

      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } catch (error) {
      form.classList.remove("is-submitting");
    }
  });
}
