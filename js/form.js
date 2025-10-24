// form.js (type="module")

// ------------- Firebase imports -------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
    getDatabase,
    set,
    ref,
    update,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// ------------- Firebase config -------------
const firebaseConfig = {
    apiKey: "AIzaSyAbhrm5M-ObzigDzg1wPal8nm8eIPAyLmY",
    authDomain: "skibidipc-d428d.firebaseapp.com",
    databaseURL: "https://skibidipc-d428d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "skibidipc-d428d",
    storageBucket: "skibidipc-d428d.firebasestorage.app",
    messagingSenderId: "24231362521",
    appId: "1:24231362521:web:f96e474dba7faaf36ba3c8",
    measurementId: "G-4YK6WG0HSJ"
};

// ------------- Init -------------
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// ------------- DOM refs (present on either page) -------------
const usernameLoginEl = document.getElementById("username_input_login");
const passwordLoginEl = document.getElementById("password_input_login");
const usernameRegisterEl = document.getElementById("username_input_register");
const passwordRegisterEl = document.getElementById("password_input_register");
const loginBtn = document.getElementById("login_btn");
const registerBtn = document.getElementById("register_btn");


function setSession(email) {
    const user = { username: email, email: email };
    localStorage.setItem("skibidi_current_user", JSON.stringify(user));
    localStorage.setItem("name", email);

    if (window.HeaderAuth && typeof HeaderAuth.refresh === "function") {
        HeaderAuth.refresh();
    }
}


function disable(el, on) {
    if (!el) return;
    el.disabled = !!on;
    el.style.opacity = on ? "0.6" : "";
    el.style.pointerEvents = on ? "none" : "";
}

function redirectHome() {
    // replace so back button doesn’t return to auth form
    location.replace("index.html");
}

// ------------- Actions -------------
async function handleRegister() {
    const email = (usernameRegisterEl?.value || "").trim();
    const password = passwordRegisterEl?.value || "";

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {
        disable(registerBtn, true);

        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const user = cred.user;

        // store basic profile; (Note: storing raw password is not recommended)
        await set(ref(database, "user/" + user.uid), {
            id: user.uid,
            username: email,
            password: password,
            createdAt: Date.now()
        });

        setSession(email);
        alert("Account created successfully");
        redirectHome();
    } catch (err) {
        alert(err.message);
    } finally {
        disable(registerBtn, false);
    }
}

async function handleLogin() {
    const email = (usernameLoginEl?.value || "").trim();
    const password = passwordLoginEl?.value || "";

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {
        disable(loginBtn, true);

        const cred = await signInWithEmailAndPassword(auth, email, password);
        const user = cred.user;

        await update(ref(database, "user/" + user.uid), { lastLogin: Date.now() });

        setSession(email);
        alert("Logged in successfully");
        redirectHome();
    } catch (err) {
        alert(err.message);
    } finally {
        disable(loginBtn, false);
    }
}

// ------------- Wire up (only where elements exist) -------------
registerBtn?.addEventListener("click", handleRegister);
loginBtn?.addEventListener("click", handleLogin);

// Submit on Enter in inputs
[usernameLoginEl, passwordLoginEl].forEach(el => {
    el?.addEventListener("keydown", e => { if (e.key === "Enter") handleLogin(); });
});
[usernameRegisterEl, passwordRegisterEl].forEach(el => {
    el?.addEventListener("keydown", e => { if (e.key === "Enter") handleRegister(); });
});
