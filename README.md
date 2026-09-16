# ✨ Neumorphic Login & Sign-Up UI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A modern, ultra-clean **3D Flipping Neumorphic Login & Sign-Up** interface built with pure Vanilla HTML, CSS, and JavaScript. Features authentic soft-clay extrusion aesthetics, a seamless 3D left-flip transition, multi-theme surface switcher, and a dynamic **thin blue light** that continuously races around active input fields in a loop.

---

## 🌟 Key Features

- 🧊 **Pure Neumorphic Realism (Claymorphism)**:
  - Engineered with the **unified material surface principle** (`#e0e0e0`), where the canvas, card, sunken wells, and raised controls share identical surface tones for true soft-clay extrusion illusion.
  - Authentic debossed / sunken (*"khadda"* effect) inset shadows for input slots and the iconic top circular dish.
  - Tactile convex (*"ubhrah hua"*) raised buttons with physical press depression and subtle ripple animations.

- 🔄 **Smooth 3D Card Flip to the Left**:
  - Clicking **"SIGN UP"** smoothly rotates the entire card $180^\circ$ to the left (`rotateY(-180deg)`) using 3D perspective physics.
  - Clicking **"LOG IN"** on the signup card seamlessly flips it back to the login interface.

- ⚡ **Dynamic Looping Blue Light Focus Effect**:
  - When an input field is selected/focused to enter data, a thin, glowing neon blue light beam (`#38bdf8` / `#2563eb`) appears around the rounded border and **continuously moves around the box in an infinite loop**.
  - Smoothly fades out when the field is unfocused.

- 🔐 **Dual Form Support**:
  - **Login Card**:
    - Username or Email debossed slot with user avatar icon.
    - Password slot with lock icon and show/hide visibility toggle.
    - Custom Neumorphic "Remember me" checkbox.
    - "Forgot password?" trigger with toast notifications.
    - Tactile "LOG IN" button with loading spinner state.
  - **Sign-Up Card**:
    - Full Name input slot.
    - Email Address input slot (with regex format validation).
    - Password & Confirm Password slots with show/hide eye toggles and match validation.
    - Terms & Privacy agreement checkbox.
    - Tactile "CREATE ACCOUNT" button.

- 🎨 **Multi-Theme Surface Switcher**:
  - **Clay (Default)**: Classic soft warm grey (`#e0e0e0`).
  - **Soft Blue**: Sleek, modern cool-grey tone (`#e4eaf2`).
  - **Dark Clay**: Futuristic dark neumorphic mode (`#26282e`).

- 📱 **Fully Responsive & Accessible**:
  - Optimized for desktop, tablet, and mobile screens.
  - Built-in form validation with shake animations and custom Neumorphic success confirmation modal.

---

## 📂 Project Structure

```bash
Login-UI/
├── assets/
│   └── lock.jpg        # Top security lock icon asset
├── index.html          # Semantic HTML5 dual-sided 3D flipping card structure
├── style.css           # Neumorphic design system, 3D flip physics & looping blue light
├── app.js              # 3D flip triggers, form validation, password toggles & themes
├── server.ps1          # Lightweight native PowerShell HTTP development server
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

No Node.js, external libraries, or build steps required! You can run this project locally using any modern web browser or lightweight HTTP server.

### 1. Clone the Repository

```bash
git clone https://github.com/jawad453/Login-UI.git
cd Login-UI
```

### 2. Run Locally

#### Option A: Using the Included PowerShell Server (Windows)
Open PowerShell in the project directory and run:
```powershell
.\server.ps1
```
Then open your browser and navigate to:
```
http://localhost:5000/
```

#### Option B: Using VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

#### Option C: Direct File Access
Simply double-click `index.html` in your file explorer to open it directly in any browser.

---

## 🛠️ Technology Stack

| Technology | Usage |
| :--- | :--- |
| **HTML5** | Accessible, semantic structure with 3D perspective wrapper and SVG overlays |
| **CSS3** | CSS Variables, 3D Transforms (`perspective`, `rotateY`), `@keyframes`, Inset & Drop Shadows |
| **JavaScript (ES6+)** | DOM manipulation, card flipping state, form validation, password toggles |
| **Google Fonts** | Modern typography using [*Plus Jakarta Sans*](https://fonts.google.com/specimen/Plus+Jakarta+Sans) |

---

## 💡 How the Looping Blue Light Works

Each input slot contains an embedded high-precision SVG overlay conforming to the exact border radius:

```css
.beam-rect {
  rx: 16px;
  ry: 16px;
  stroke: var(--beam-cyan);
  stroke-width: 2.2px;
  stroke-dasharray: 24 76;
  filter: drop-shadow(0 0 3px var(--beam-blue)) drop-shadow(0 0 6px var(--beam-cyan));
}

.neumorphic-input-box:focus-within .beam-rect {
  animation: loopBlueLight 2.2s linear infinite;
}

@keyframes loopBlueLight {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -100; }
}
```

When an input is selected, the dashoffset smoothly animates from `0` to `-100`, continuously tracing the perimeter in a loop.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/jawad453/Login-UI/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
