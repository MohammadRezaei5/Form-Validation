document.addEventListener("DOMContentLoaded", () => {
  const inputWrappers = document.querySelectorAll(".input-wrapper");
  const inputs = document.querySelectorAll(".input-wrapper input");
  const submitButton = document.querySelector(".button-wrapper button");
  const userGetWrapper = document.querySelector(".user-get-wrapper");
  const form = document.querySelector(".form-wrapper form");
  const userResultWrapper = document.querySelector(".user-result-wrapper");
  const reloadWrapper = document.querySelector(".reload-wrapper");

  inputWrappers.forEach((wrapper) => {
    const input = wrapper.querySelector("input");
    const errorMessage = wrapper.nextElementSibling;

    wrapper.addEventListener("mouseenter", () => {
      wrapper.style.borderColor = "#bfa8f0";
    });

    wrapper.addEventListener("mouseleave", () => {
      if (document.activeElement !== input) {
        wrapper.style.borderColor = "#e7e7e8";
      }
    });

    input.addEventListener("focus", () => {
      wrapper.style.borderColor = "#7f52e0";
    });

    input.addEventListener("blur", () => {
      wrapper.style.borderColor = "#e7e7e8";
    });

    input.addEventListener("input", () => {
      if (errorMessage) {
        errorMessage.textContent = "";
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    document.querySelectorAll(".error-message").forEach((msg) => {
      msg.textContent = "";
    });

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
        const errorMessageElement = input
          .closest("label")
          .querySelector(".error-message");
        if (errorMessageElement) {
          errorMessageElement.textContent = "نمی‌تواند خالی باشد!";
        }
      }
    });

    if (!isValid) {
      return;
    }

    submitButton.textContent = "درحال پردازش ...";
    submitButton.disabled = true;
    submitButton.style.cursor = "not-allowed";

    userGetWrapper.style.position = "relative";

    setTimeout(() => {
      const overlay = document.createElement("div");
      overlay.classList.add("blur-overlay");
      userGetWrapper.appendChild(overlay);

      const lockedText = document.createElement("div");
      lockedText.textContent = "قفل شد";
      lockedText.classList.add("locked-message");
      userGetWrapper.appendChild(lockedText);

      showUserInputs();
      reloadWrapper.style.display = "flex";
    }, 3000);
  });

  function showUserInputs() {
    userResultWrapper.innerHTML = "";

    const filledLabels = Array.from(
      document.querySelectorAll(".form-wrapper form label")
    ).filter((label) => {
      const inputElement = label.querySelector("input");
      return inputElement && inputElement.value.trim() !== "";
    });

    filledLabels.forEach((label, index) => {
      const inputTitleSpan = label.querySelector(".input-title");
      const inputElement = label.querySelector("input");

      const inputTitle = inputTitleSpan.textContent.trim();
      const inputValue = inputElement.value;

      const showResultDiv = document.createElement("div");
      showResultDiv.classList.add("show-result");

      const inputTitleShowSpan = document.createElement("span");
      inputTitleShowSpan.classList.add("input-title-show");
      inputTitleShowSpan.textContent = `${inputTitle}: `;

      const inputShowSpan = document.createElement("span");
      inputShowSpan.classList.add("input-show");
      inputShowSpan.textContent = `${inputValue} سانتی‌متر`;

      showResultDiv.appendChild(inputTitleShowSpan);
      showResultDiv.appendChild(inputShowSpan);

      if (index < filledLabels.length - 1) {
        const dividerSpan = document.createElement("span");
        dividerSpan.classList.add("divider");
        dividerSpan.textContent = "|";
        showResultDiv.appendChild(dividerSpan);
      }

      userResultWrapper.appendChild(showResultDiv);
    });
  }
});

function refreshPage() {
  window.location.reload();
}
