import "./index.css";

class CopyButton {
  constructor(options = {}) {
    this.initialState = options.initialState;
    this.copiedState = options.copiedState;
    this.callback = options.callback;
  }

  "after:highlightElement"({ el, text }) {
    const button = document.createElement("button");

    button.innerHTML = this.initialState || this.defaultCopySVG();
    button.classList.add("hljs-custom-copy-button");

    button.dataset.copied = "false";

    el.parentElement.classList.add("hljs-custom-copy-wrapper");
    el.parentElement.appendChild(button);

    button.onclick = () => this.handleCopy(text, button);
  }

  handleCopy(text, button) {
    if (!navigator.clipboard) {
      console.error("Clipboard API not supported");
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        button.innerHTML = this.copiedState || this.defaultCheckSVG();
        button.dataset.copied = "true";

        if (typeof this.callback === "function") {
          this.callback(text, button);
        }

        setTimeout(() => {
          button.innerHTML = this.initialState || this.defaultCopySVG();
          button.dataset.copied = "false";
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  defaultCopySVG() {
    return `
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy">
         <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
         <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
       </svg>
     `;
  }

  defaultCheckSVG() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      `;
  }
}

if (typeof module !== "undefined") {
  module.exports = CopyButton;
}
