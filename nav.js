// nav.js — reusable header + theme + auth UI
(function () {
  const THEME_KEY = "skibidi_theme";
  const SESSION_KEY = "skibidi_current_user";

  function headerTemplate(brandLink = "index.html") {
    // fixed nested <a>: use ONE link for the brand
    return `
<header>
  <div class="container navbar">
    <a class="logo" href="${brandLink}">
      <div class="logo-box">SC</div>
      <span class="brand">SkibidiPC</span>
    </a>

    <nav class="main-nav">
      <ul>
        <li><a href="builder.html">Builder</a></li>
        <li><a href="products.html">Products</a></li>
        <li><a href="guide.html">Guides</a></li>
        <li><a href="benchmark.html">Benchmark</a></li>
        <li><a href="Forums.html">Forums</a></li>
        <li><a href="accessories.html">Accessories</a></li>
      </ul>
    </nav>

    <div class="auth">
      <a class="btn login" href="login.html">Log In</a>
      <a class="btn signup" href="signup.html">Sign Up</a>

      <div class="userbox" style="display:none">
  <button class="user-btn" type="button" aria-expanded="false">
    <img class="user-avatar" src="img/profile-user.png" alt="User" width="28" height="28">
    <span class="user-name"></span>
    <img class="user-caret" src="img/resume.png" alt="Menu" width="18" height="18">
  </button>
  <div class="user-menu" hidden>
    <a href="profile.html" class="user-item">
      <img src="img/resume.png" alt="Profile" width="18" height="18">
      <span>Profile</span>
    </a>
    <button class="user-item logout" type="button">
      <img src="img/logout.png" alt="Log Out" width="18" height="18">
      <span>Log Out</span>
    </button>
  </div>
</div>


      <label class="switch" title="Light / Dark">
        <input type="checkbox" id="modeToggle">
        <span class="slider"></span>
      </label>
    </div>
  </div>
</header>`;
  }

  window.buildHeader = function (opts = {}) {
    const mount = document.getElementById("site-header");
    if (!mount) return;
    mount.innerHTML = headerTemplate(opts.brandLink || "index.html");

    const headerEl = mount.querySelector("header");
    if (headerEl) {
      const h = headerEl.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--header-h", h + "px");
    }


    // Theme boot/persist
    const saved = localStorage.getItem(THEME_KEY) || "dark";
    document.body.classList.toggle("light", saved === "light");
    const toggle = document.getElementById("modeToggle");
    if (toggle) {
      toggle.checked = saved === "light";
      toggle.addEventListener("change", () => {
        const light = toggle.checked;
        document.body.classList.remove("theme-anim");
        void document.body.offsetWidth;
        document.body.classList.add("theme-anim");
        document.body.classList.toggle("light", light);
        localStorage.setItem(THEME_KEY, light ? "light" : "dark");
        setTimeout(() => document.body.classList.remove("theme-anim"), 750);
      });
    }

    HeaderAuth.init();
  };

  window.HeaderAuth = {
    init() {
      const loginBtn = document.querySelector(".auth .login");
      const signupBtn = document.querySelector(".auth .signup");
      const userbox = document.querySelector(".auth .userbox");
      const userName = document.querySelector(".auth .user-name");
      const userBtn = document.querySelector(".auth .user-btn");
      const menu = document.querySelector(".auth .user-menu");
      const logout = document.querySelector(".auth .logout");

      let session = null;
      try { session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { }

      if (session && session.username) {
        if (userName) userName.textContent = session.username;
        if (loginBtn) loginBtn.style.display = "none";
        if (signupBtn) signupBtn.style.display = "none";
        if (userbox) userbox.style.display = "inline-flex";
      } else {
        if (loginBtn) loginBtn.style.display = "inline-flex";
        if (signupBtn) signupBtn.style.display = "inline-flex";
        if (userbox) userbox.style.display = "none";
      }

      if (userBtn && menu) {
        userBtn.addEventListener("click", () => {
          const open = !menu.hasAttribute("hidden");
          if (open) { menu.setAttribute("hidden", ""); userBtn.setAttribute("aria-expanded", "false"); }
          else { menu.removeAttribute("hidden"); userBtn.setAttribute("aria-expanded", "true"); }
        });
        document.addEventListener("click", (e) => {
          if (!menu.contains(e.target) && !userBtn.contains(e.target)) {
            menu.setAttribute("hidden", ""); userBtn.setAttribute("aria-expanded", "false");
          }
        });
      }

      if (logout) {
        logout.addEventListener("click", async () => {
          const SESSION_KEY = "skibidi_current_user";

          // Try to sign out of Firebase (if Auth is on this page)
          try {
            const { getAuth, signOut } =
              await import("https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js");
            await signOut(getAuth());
          } catch (_) {
            // Firebase not present or not initialized on this page — ignore
          }

          // Clear header session & refresh UI
          localStorage.removeItem(SESSION_KEY);
          this.init();
          location.href = "index.html";
        });
      }

    },
    refresh() { this.init(); }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('site-header');
  if (!mount) return;
  const brand = mount.getAttribute('data-brand') || 'index.html';
  buildHeader({ brandLink: brand });
});

// Keep header session in sync with Firebase auth (runs on every page with nav.js)
(async () => {
  try {
    const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js");
    const auth = getAuth();
    const SESSION_KEY = "skibidi_current_user";

    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ username: user.email, email: user.email }));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
      if (window.HeaderAuth && typeof HeaderAuth.refresh === "function") HeaderAuth.refresh();
    });
  } catch (_) {
    // Firebase not present on this page — nothing to sync, safe to ignore
  }
})();
