

const SECTIONS = [
    {
        name: "Systems", rows: [
            ["Part List Opinions Wanted", 159339, 847885, "My First Build-Parts Ordered"],
            ["Create A Part List For Me", 55354, 372999, "Need feedback on build"],
            ["Troubleshooting", 17947, 91460, "5800XT and P3.40 on the ASRock B550M Pro4"],
            ["Laptops", 2020, 10240, "Is 60D good for this laptop?"],
        ]
    },
    {
        name: "Hardware", rows: [
            ["CPUs", 12435, 100655, "i9-14900K or 9950x3d?"],
            ["CPU Coolers", 8534, 42845, "Case fan speed control question."],
            ["Motherboards", 12614, 48570, "MSI pro b650m + AMD liquid cooler troubleshooting"],
            ["Memory", 4976, 24246, "32gb to 64GB 2/4 sticks?"],
            ["Storage", 4990, 26376, "m.2 help please"],
            ["Video Cards", 20827, 111634, "Need best performance/aesthetic for vertical GPU"],
            ["Cases", 8761, 33782, "Fractal Design Pop Air"],
            ["Power Supplies", 6247, 35236, "Is this a good PSU for this build?"],
            ["Monitors", 7802, 28055, "Best brands for 27'' oled?"],
            ["Keyboards & Mice", 2710, 14826, "need some advice for the mice"],
            ["Audio", 1730, 8432, "IEM's for ~ $100"],
        ]
    },
    {
        name: "Software", rows: [
            ["Anti-Virus / Anti-Malware / Security", 363, 3998, "Best VPN overall?"],
            ["General Software", 1184, 6335, "Easiest 3D modeling software?"],
            ["Operating Systems", 2433, 14263, "Secure boot & linux issue"],
            ["Games / Gaming", 2420, 26003, "7600X3D in Battlefield 6"],
        ]
    },
    {
        name: "General", rows: [
            ["Announcements / Site News", 203, 10885, "Adding Back-Connect motherboard/case support"],
            ["Benchmark Blog", 22, 106, "New Storage Benchmark Methodology: Live"],
            ["Deals", 2333, 8944, "Core Ultra 7265K + Free AIO deal"],
            ["Request Part Additions / Corrections Here", 20917, 35945, "(Addition) Asus motherboards"],
            ["For Sale Or Trade", 5111, 26469, "What is my 3080 PC worth?"],
            ["Site Feedback And Feature Requests", 5816, 20520, "Add some merchants in Italy"],
            ["General Discussion", 9013, 63945, "How does pcpartpicker get live price updates?"],
        ]
    },
];

const ALL_TITLES = SECTIONS.flatMap(s => s.rows.map(r => r[0])).sort((a, b) => a.localeCompare(b));

const forumSectionsEl = document.getElementById("forumSections");
const searchInput = document.getElementById("forumSearch");
const searchBtn = document.getElementById("searchBtn");

const topicModal = document.getElementById("topicModal");
const topicTitle = document.getElementById("topicTitle");
const topicSubtitle = document.getElementById("topicSubtitle");
const postsList = document.getElementById("postsList");

const composerModal = document.getElementById("composerModal");
const postTopic = document.getElementById("postTopic");
const postText = document.getElementById("postText");
const postImage = document.getElementById("postImage");
const imagePreview = document.getElementById("imagePreview");
const removeImgBtn = document.getElementById("removeImg");
const savePostBtn = document.getElementById("savePostBtn");
const deletePostBtn = document.getElementById("deletePostBtn");
const editingId = document.getElementById("editingId");


const LS_KEY = "spc_forums_v1";
const LIKE_KEY = "spc_likes_v1";
const store = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; } };
const saveStore = (data) => localStorage.setItem(LS_KEY, JSON.stringify(data));
const likeMap = () => { try { return JSON.parse(localStorage.getItem(LIKE_KEY) || "{}"); } catch { return {}; } };
const saveLikeMap = (m) => localStorage.setItem(LIKE_KEY, JSON.stringify(m));

function topicData(slug) { const s = store(); return s[slug] || {}; }
function setTopicData(slug, obj) { const s = store(); s[slug] = obj; saveStore(s); }
function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function timeAgo(t) { if (!t) return "just now"; const s = Math.floor((Date.now() - t) / 1000); if (s < 60) return `${s}s`; const m = Math.floor(s / 60); if (m < 60) return `${m}m`; const h = Math.floor(m / 60); if (h < 24) return `${h}h`; const d = Math.floor(h / 24); return `${d}d`; }
function escapeHTML(str) { return str.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])); }
function fileToDataURL(file) { return new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(file); }); }


postTopic.innerHTML = `<option value="" disabled selected>Select a forum…</option>` + ALL_TITLES.map(t => `<option>${t}</option>`).join("");

function renderTables(filter = "") {
    forumSectionsEl.innerHTML = "";
    const q = filter.trim().toLowerCase();
    SECTIONS.forEach(sec => {
        const rows = sec.rows.filter(r => !q || r[0].toLowerCase().includes(q));
        if (!rows.length) return;
        const wrap = document.createElement("div");
        wrap.innerHTML = `
      <h3>${sec.name}</h3>
      <table class="table">
        <thead><tr><th>Forum</th><th>Topics</th><th>Posts</th><th class="most-recent">Most Recent Topic</th></tr></thead>
        <tbody>
          ${rows.map(([name, topics, posts, recent]) => `
            <tr data-forum="${name}">
              <td class="forum-title">${name}</td>
              <td>${topics.toLocaleString()}</td>
              <td>${posts.toLocaleString()}</td>
              <td class="most-recent"><a href="javascript:void(0)">${recent}</a></td>
            </tr>`).join("")}
        </tbody>
      </table>`;
        forumSectionsEl.appendChild(wrap);
    });
}
renderTables();

searchBtn.addEventListener("click", () => renderTables(searchInput.value));
searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") renderTables(searchInput.value) });
forumSectionsEl.addEventListener("click", (e) => {
    const tr = e.target.closest("tr[data-forum]"); if (!tr) return;
    openTopic(tr.getAttribute("data-forum"));
});


function openTopic(title) {
    topicTitle.textContent = title;
    topicSubtitle.textContent = "Latest posts";
    postsList.innerHTML = "";

    const seeds = [
        { id: "seed1", user: "Guest Builder", avatar: "https://i.pravatar.cc/80?img=12", text: "What do you think about this parts list for 1080p high refresh?", img: "", likes: 4, createdAt: Date.now() - 2 * 3600e3 },
        { id: "seed2", user: "PixelPusher", avatar: "https://i.pravatar.cc/80?img=25", text: "Micro-ATX vs ITX airflow opinions?", img: "", likes: 7, createdAt: Date.now() - 5 * 3600e3 },
        { id: "seed3", user: "VR_Nerd", avatar: "https://i.pravatar.cc/80?img=7", text: "Anyone running this with VR? Share frame timing pls.", img: "https://picsum.photos/seed/vr/700/380", likes: 15, createdAt: Date.now() - 24 * 3600e3 },
    ];
    seeds.forEach(p => postsList.appendChild(postCard(title, p, true)));

    const tKey = slug(title);
    const posts = Object.values(topicData(tKey)).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    posts.forEach(p => postsList.appendChild(postCard(title, p, false)));

    topicModal.hidden = false;
}
topicModal.addEventListener("click", (e) => { if (e.target.matches(".overlay,[data-close]")) topicModal.hidden = true; });


document.getElementById("makePostBtn").addEventListener("click", () => openComposer());
composerModal.addEventListener("click", (e) => { if (e.target.matches(".overlay,[data-close]")) composerModal.hidden = true; });
removeImgBtn.addEventListener("click", () => { imagePreview.hidden = true; imagePreview.querySelector("img").src = ""; delete imagePreview.dataset.keep; });
postImage.addEventListener("change", () => {
    const f = postImage.files?.[0]; if (!f) return;
    const url = URL.createObjectURL(f);
    imagePreview.hidden = false;
    imagePreview.querySelector("img").src = url;
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if (!topicModal.hidden) topicModal.hidden = true; if (!composerModal.hidden) composerModal.hidden = true; } });

function openComposer(existing) {
    composerModal.hidden = false;
    document.getElementById("composerTitle").textContent = existing ? "Edit Post" : "Create Post";
    postTopic.value = existing?.topic || "";
    postText.value = existing?.text || "";
    editingId.value = existing?.id || "";
    deletePostBtn.hidden = !existing;
    savePostBtn.textContent = existing ? "Update" : "Post";
    if (existing?.img) {
        imagePreview.hidden = false;
        imagePreview.querySelector("img").src = existing.img;
        imagePreview.dataset.keep = "1";
    } else {
        imagePreview.hidden = true;
        imagePreview.querySelector("img").src = "";
        delete imagePreview.dataset.keep;
    }
}


document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const topic = postTopic.value.trim();
    const text = postText.value.trim();
    if (!topic || !text) return;

    const tKey = slug(topic);
    const all = store();
    if (!all[tKey]) all[tKey] = {};

    let id = editingId.value || uid();
    let imgData = "";

    const file = postImage.files?.[0];
    if (file) imgData = await fileToDataURL(file);
    else if (imagePreview.dataset.keep) imgData = imagePreview.querySelector("img").src;

    const payload = {
        id, topic, user: "You", avatar: "https://i.pravatar.cc/80?u=you",
        text, img: imgData, likes: all[tKey][id]?.likes || 0, createdAt: all[tKey][id]?.createdAt || Date.now()
    };

    all[tKey][id] = payload;
    saveStore(all);

    if (!topicModal.hidden && topicTitle.textContent === topic) {
        const existing = postsList.querySelector(`[data-post-id="${id}"]`);
        if (existing) existing.replaceWith(postCard(topic, payload, false));
        else postsList.prepend(postCard(topic, payload, false));
    }

    e.target.reset();
    imagePreview.hidden = true;
    imagePreview.querySelector("img").src = "";
    delete imagePreview.dataset.keep;
    editingId.value = "";
    composerModal.hidden = true;
});

deletePostBtn.addEventListener("click", () => {
    const id = editingId.value;
    const topic = postTopic.value;
    if (!id) return;
    const tKey = slug(topic);
    const all = store();
    if (all[tKey]) { delete all[tKey][id]; saveStore(all); }
    const node = postsList.querySelector(`[data-post-id="${id}"]`);
    if (node) node.remove();
    composerModal.hidden = true;
});


function postCard(topic, p, isSeed = false) {
    const el = document.createElement("article");
    el.className = "post-card";
    el.dataset.postId = p.id || "";
    el.innerHTML = `
    <div class="post-top">
      <img class="pfp" src="${p.avatar || "https://i.pravatar.cc/80?img=1"}" alt="">
      <div>
        <div><strong>${p.user || "Anonymous"}</strong> • <span class="muted">${timeAgo(p.createdAt)}</span></div>
        <div class="muted">${topic}</div>
      </div>
    </div>
    <div class="post-body">
      <div>${escapeHTML(p.text || "")}</div>
      ${p.img ? `<img class="media" src="${p.img}" alt="image">` : ""}
    </div>
    <div class="post-actions">
      <button class="action like" data-like>👍 <span>${p.likes || 0}</span></button>
      <button class="action" data-comment>💬 Comment</button>
      <button class="action" data-share>↗ Share</button>
      ${!isSeed ? `<button class="action" data-edit>Edit</button>` : ``}
    </div>
    <div class="comments" hidden></div>
  `;

    const tKey = slug(topic);
    const postId = p.id;
    const liked = likeMap();
    const likeBtn = el.querySelector("[data-like]");
    const likeCountEl = likeBtn.querySelector("span");
    const likeKey = `${tKey}/${postId}`;
    if (liked[likeKey]) likeBtn.classList.add("liked");

    likeBtn.addEventListener("click", () => {
        if (isSeed || !postId) return;
        const all = store();
        const nowLiked = !likeBtn.classList.contains("liked");
        likeBtn.classList.toggle("liked", nowLiked);
        likeBtn.classList.add("pop"); setTimeout(() => likeBtn.classList.remove("pop"), 230);
        const delta = nowLiked ? 1 : -1;
        likeCountEl.textContent = Math.max(0, (+likeCountEl.textContent || 0) + delta);
        if (!all[tKey] || !all[tKey][postId]) return;
        all[tKey][postId].likes = Math.max(0, (all[tKey][postId].likes || 0) + delta);
        saveStore(all);
        if (nowLiked) liked[likeKey] = 1; else delete liked[likeKey];
        saveLikeMap(liked);
    });

    el.querySelector("[data-comment]")?.addEventListener("click", () => {
        const box = el.querySelector(".comments");
        box.hidden = false;
        if (!box.dataset.ready) {
            box.innerHTML = `
        <div style="display:flex;gap:8px;margin-top:8px">
          <input type="text" placeholder="Write a comment..." style="flex:1;padding:8px;border-radius:8px;background:var(--bg-2);border:1px solid var(--card-border);color:var(--text)">
          <button class="action" data-send>Send</button>
        </div>
        <div class="comment-list" style="margin-top:8px;display:grid;gap:6px"></div>`;
            box.dataset.ready = "1";
            box.querySelector("[data-send]").addEventListener("click", () => {
                const input = box.querySelector("input");
                const text = input.value.trim(); if (!text) return;
                const row = document.createElement("div");
                row.innerHTML = `<span class="muted">${new Date().toLocaleString()}</span> · ${escapeHTML(text)}`;
                box.querySelector(".comment-list").prepend(row);
                input.value = "";
            });
        }
    });

    el.querySelector("[data-share]")?.addEventListener("click", async () => {
        const url = `${location.origin}${location.pathname}#${tKey}:${postId || "seed"}`;
        try { await navigator.clipboard.writeText(url) } catch { }
        alert("Post link copied!");
    });

    el.querySelector("[data-edit]")?.addEventListener("click", () => {
        openComposer({ id: postId, topic, text: p.text || "", img: p.img || "" });
    });

    return el;
}
