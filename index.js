class CopyButton {
  constructor(options = {}) {
    this.initialState = options.initialState;
    this.copiedState = options.copiedState;
    this.callback = options.callback;
  }

  "after:highlightElement"({ el, text }) {
    const button = document.createElement("button");
    button.innerHTML = this.initialState || "Copy";

    button.dataset.copied = "false";
    el.parentElement.classList.add("hljs-custom-copy-wrapper");
    el.parentElement.appendChild(button);

    button.onclick = () => this.handleCopy(text, button);
  }

  handleCopy(text, button) {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(text).then(() => {
      button.innerHTML = this.copiedState || "Copied!";
      button.dataset.copied = "true";
      setTimeout(() => {
        button.innerHTML = this.initialState || "Copy";
      }, 2000);
    });
  }
}

if (typeof module != "undefined") {
  module.exports = CopyButton;
}
