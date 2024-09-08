# Copy Button Plugin for Highlight.js

A customizable copy button plugin for Highlight.js, featuring default SVG icons, clipboard functionality, and optional callbacks. This plugin adds a copy button to code blocks, allowing users to easily copy code snippets with a click.

## Features

- Default **SVG icons** for copy and check states (customizable).
- Utilizes the **Clipboard API** to copy text.
- Custom **callback function** after copying.
- **CSS-styled** button with smooth hover effects.

## Installation

You can install the package via npm:

```bash
npm install hljs-copy-button
```

## Usage
### Step 1: Import the Plugin and Styles
In your JavaScript file, import the plugin and CSS:

```javascript
import CopyButton from "hljs-copy-button";
```

### Step 2: Initialize the Plugin
Once imported, you can initialize the plugin and configure it as needed:

```javascript
const copyPlugin = new CopyButton({
  initialState: '<svg>Your custom SVG or text for the copy state</svg>',
  copiedState: '<svg>Your custom SVG or text for the copied state</svg>',
  callback: (text, button) => {
    console.log("Copied text:", text);
  }
});

hljs.addPlugin(copyPlugin);
```

Options
- `initialState`: The HTML or SVG content to display in the button's initial state (before copying).
- `copiedState`: The HTML or SVG content to display after the text has been copied.
- `callback`: A function executed after the text is copied. It receives the copied text and the button element as parameters.

## Example
```javascript
const copyPlugin = new CopyButton({
  initialState: '<span>Copy Code</span>',
  copiedState: '<span>Copied!</span>',
  callback: (text, button) => {
    alert("Copied to clipboard: " + text);
  }
});

hljs.addPlugin(copyPlugin);
```

## Default SVGs
The plugin provides default SVGs for the copy and check icons if no custom content is provided:

- Copy SVG: A simple copy icon.
- Check SVG: A checkmark icon that appears after copying.

## Styling
The plugin includes a default CSS file with the following styles:

```css
.hljs-custom-copy-wrapper {
    position: relative;
}

.hljs-custom-copy-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: inherit;
    color: white;
    border: 1px solid #e1e1e1;
    padding: 6px 8px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.hljs-custom-copy-button:hover {
    box-shadow: inset 0 0 0 10em rgba(255, 255, 255, 0.3);
}
```
You can override these styles in your project if needed.

## License
MIT License
