// js/profile.js
const $ = id => document.getElementById(id);
const SESSION_KEY = "skibidi_current_user";

function getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    try { return raw ? JSON.parse(raw) : { email: "user@email.com", uid: "local", name: "User" } } catch { return { email: "user@email.com", uid: "local", name: "User" } }
}
function keyProfile(email) { return `pf_${email}` }
function keyPosts(email) { return `userspc_${email}` }

function initials(s) { const src = (s || "").trim() || "user"; return src.slice(0, 2).toLowerCase() }

function loadProfile(email) {
    const raw = localStorage.getItem(keyProfile(email));
    return raw ? JSON.parse(raw) : { name: email, phone: "" }
}
function saveProfile(email, data) {
    localStorage.setItem(keyProfile(email), JSON.stringify(data))
}

function loadPosts(email) {
    const raw = localStorage.getItem(keyPosts(email));
    return raw ? JSON.parse(raw) : []
}
function savePosts(email, arr) {
    localStorage.setItem(keyPosts(email), JSON.stringify(arr))
}

function renderHeader(email, profile) {
    $("uAvatar").textContent = initials(profile.name || email);
    $("uNameTitle").textContent = email;
    $("uEmailUnder").textContent = email;
    $("nameInput").value = profile.name || "";
    $("phoneInput").value = profile.phone || "";
}

function renderPreview(file) {
    if (!file) { $("pcPreview").style.display = "none"; $("pcPreview").src = ""; return }
    const url = URL.createObjectURL(file);
    $("pcPreview").src = url;
    $("pcPreview").style.display = "block";
}

function renderPosts(container, posts) {
    container.innerHTML = posts.map(p => `
    <div class="pf-post">
      <img src="${p.img}" alt="pc">
      <div class="meta">
        <div>${p.specs || ""}</div>
        <div class="time">${new Date(p.ts).toLocaleString()}</div>
      </div>
    </div>
  `).join("");
}

const session = getSession();
const email = session.email || "user@email.com";
let profile = loadProfile(email);
renderHeader(email, profile);

$("saveProfileBtn").onclick = () => {
    profile.name = $("nameInput").value.trim() || email;
    profile.phone = $("phoneInput").value.trim();
    saveProfile(email, profile);
    renderHeader(email, profile);
};

$("pcFile").addEventListener("change", e => {
    const f = e.target.files?.[0] || null;
    renderPreview(f);
});

$("uploadPcBtn").onclick = () => {
    const f = $("pcFile").files?.[0];
    if (!f) { $("pcMsg").textContent = "Choose an image"; return }
    const reader = new FileReader();
    reader.onload = () => {
        const imgData = reader.result;
        const specs = $("pcSpecs").value.trim();
        const posts = loadPosts(email);
        posts.unshift({ img: imgData, specs, ts: Date.now() });
        savePosts(email, posts);
        renderPosts($("pcPosts"), posts);
        $("pcMsg").textContent = "Posted";
        $("pcFile").value = ""; $("pcSpecs").value = ""; $("pcPreview").style.display = "none";
    };
    reader.readAsDataURL(f);
};

renderPosts($("pcPosts"), loadPosts(email));
