class CopyButton {
  constructor(options = {}) {
    this.initialState = options.initialState || this.defaultCopySVG();
    this.copiedState = options.copiedState || this.defaultCheckSVG();
    this.callback = options.callback;
    this.includeStyling = options.includeStyling !== false;
    this.customClasses = options.customClasses || {
      wrapper: "hljs-custom-copy-wrapper",
      button: "hljs-custom-copy-button",
    };

    if (this.includeStyling) {
      this.injectCSS();
    }
  }

  injectCSS() {
    if (!document.getElementById("hljs-custom-copy-button-style")) {
      const style = document.createElement("style");
      style.id = "hljs-custom-copy-button-style";
      style.innerHTML = `
        .${this.customClasses.wrapper} {
          position: relative;
        }
        .${this.customClasses.button} {
          position: absolute;
          border: none !important;
          top: 0.5rem;
          right: 0.5rem;
          background-color: transparent !important;
          color: white;
          border: 1px solid #e1e1e1;
          padding: 2px 3px;
          cursor: pointer;
          border-radius: 4px;
          transition: box-shadow 0.3s ease;
        }
        .${this.customClasses.button}:focus {
          outline: none;
          background-color: rgba(255, 255, 255, 0.3);
        }
        .${this.customClasses.button}:hover {
          box-shadow: inset 0 0 0 10em rgba(255, 255, 255, 0.3);
        }
      `;
      document.head.appendChild(style);
    }
  }

  "after:highlightElement"({ el, text }) {
    const button = document.createElement("button");

    button.innerHTML = this.initialState;
    button.classList.add(this.customClasses.button);

    button.dataset.copied = "false";

    el.parentElement.classList.add(this.customClasses.wrapper);
    el.parentElement.appendChild(button);

    button.onclick = () => this.handleCopy(text, button);
  }

  handleCopy(text, button) {
    if (!navigator.clipboard) {
      console.error("Clipboard API not supported");
      return;
    } else if (button.dataset.copied === "true") {
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        button.innerHTML = this.copiedState;
        button.dataset.copied = "true";

        if (typeof this.callback === "function") {
          this.callback(text, button);
        }

        setTimeout(() => {
          button.innerHTML = this.initialState;
          button.dataset.copied = "false";
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }

  defaultCopySVG() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed">
        <path d="M360-240q-29.7 0-50.85-21.15Q288-282.3 288-312v-480q0-29.7 21.15-50.85Q330.3-864 360-864h384q29.7 0 50.85 21.15Q816-821.7 816-792v480q0 29.7-21.15 50.85Q773.7-240 744-240H360Zm0-72h384v-480H360v480ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-552h72v552h456v72H216Zm144-216v-480 480Z"/>
      </svg>
    `;
  }

  defaultCheckSVG() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed">
        <path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z"/>
      </svg>
    `;
  }
}

if (typeof module !== "undefined") {
  module.exports = CopyButton;
}
