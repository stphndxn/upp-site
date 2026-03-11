const form = document.querySelector(".waitlist-form");
const success = document.querySelector("#waitlist-success");

const encodeForm = (formData) => new URLSearchParams(formData).toString();

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

      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } catch (error) {
      form.classList.remove("is-submitting");
    }
  });
}
