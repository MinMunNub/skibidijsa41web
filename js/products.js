let FB = null;
(async () => {
    try { FB = await import("../FIREBASE.js"); } catch (e) { console.error(e); }
})();

const modeToggle = document.getElementById("modeToggle");
if (modeToggle) {
    modeToggle.addEventListener("change", () => {
        document.body.classList.remove("theme-anim");
        void document.body.offsetWidth;
        document.body.classList.add("theme-anim");
        document.body.classList.toggle("light", modeToggle.checked);
        setTimeout(() => document.body.classList.remove("theme-anim"), 750);
    });
}

const LS_KEYS = { PRODUCTS: "spc_products", CART: "spc_cart", SEEDED: "spc_seeded_v3" };
const categoriesOrder = ["CPU", "GPU", "Motherboard", "RAM", "Storage", "PSU", "Case", "Cooler", "Monitor"];
const MIN_PER_CAT = 24;

function $(q, root = document) { return root.querySelector(q) }
function $all(q, root = document) { return [...root.querySelectorAll(q)] }
function money(n) { return `$${Number(n).toFixed(2)}` }
function save(k, v) { localStorage.setItem(k, JSON.stringify(v)) }
function load(k) { try { return JSON.parse(localStorage.getItem(k)) } catch { return null } }
function uid() { return (crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`) }
function discounted(p) { return p.discount ? +(p.price * (1 - p.discount / 100)).toFixed(2) : p.price }

async function waitForFB(ms = 5000) {
    const start = Date.now();
    while (!(FB?.db && FB?.ref && FB?.set) && Date.now() - start < ms) {
        await new Promise(r => setTimeout(r, 50));
    }
    return !!(FB?.db && FB?.ref && FB?.set);
}

async function pushWholeCatalogToFirebase(list) {
    const ok = await waitForFB();
    if (!ok) return;
    const byId = {};
    for (const p of list) byId[p.id] = p;
    try { await FB.set(FB.ref(FB.db, "catalog"), byId); } catch (e) { console.error("catalog write failed", e); }
    try {
        const now = Date.now(); let i = 0;
        for (const p of list) {
            const ts = now - i++;
            const feedKey = `${-ts}_${p.id}`;
            await FB.set(FB.ref(FB.db, `products/${feedKey}`), { ...p, productId: p.id, action: "seed", updatedAt: ts });
        }
    } catch (e) { console.error("feed seed failed", e); }
}

function seedProducts() {
    const pic = s => `https://picsum.photos/seed/${encodeURIComponent(s)}/600/400`;
    const rows = [
        {
            c: "CPU", items: [
                ["Intel Core i3-12100F", "Intel", 129, "4C/8T 4.3GHz"],
                ["Intel Core i5-12400F", "Intel", 159, "6C/12T 4.4GHz"],
                ["Intel Core i5-13400F", "Intel", 199, "10C/16T 4.6GHz"],
                ["Intel Core i7-12700F", "Intel", 279, "12C/20T 4.9GHz"],
                ["Intel Core i9-12900K", "Intel", 399, "16C/24T 5.2GHz"],
                ["AMD Ryzen 5 5600", "AMD", 129, "6C/12T 4.4GHz"],
                ["AMD Ryzen 5 5600X", "AMD", 149, "6C/12T 4.6GHz"],
                ["AMD Ryzen 7 5800X3D", "AMD", 329, "8C/16T 3D V-Cache"],
                ["AMD Ryzen 5 7600", "AMD", 219, "6C/12T 5.1GHz"],
                ["AMD Ryzen 7 7700", "AMD", 329, "8C/16T 5.3GHz"],
                ["AMD Ryzen 7 7800X3D", "AMD", 399, "8C/16T 3D V-Cache"],
                ["Intel Core i3-14100F", "Intel", 139, "4C/8T 4.7GHz"]
            ]
        },
        {
            c: "GPU", items: [
                ["GeForce RTX 3050 6GB", "NVIDIA", 199, "6GB GDDR6"],
                ["GeForce RTX 3060 12GB", "NVIDIA", 279, "12GB GDDR6"],
                ["GeForce RTX 4060 8GB", "NVIDIA", 299, "8GB GDDR6"],
                ["GeForce RTX 4060 Ti 8GB", "NVIDIA", 399, "8GB GDDR6"],
                ["GeForce RTX 4070 12GB", "NVIDIA", 549, "12GB GDDR6X"],
                ["Radeon RX 6600 8GB", "AMD", 199, "8GB GDDR6"],
                ["Radeon RX 6650 XT 8GB", "AMD", 229, "8GB GDDR6"],
                ["Radeon RX 6700 XT 12GB", "AMD", 329, "12GB GDDR6"],
                ["Radeon RX 6750 XT 12GB", "AMD", 369, "12GB GDDR6"],
                ["Radeon RX 7700 XT 12GB", "AMD", 449, "12GB GDDR6"],
                ["Radeon RX 7800 XT 16GB", "AMD", 499, "16GB GDDR6"],
                ["GeForce RTX 4070 Super 12GB", "NVIDIA", 599, "12GB GDDR6X"]
            ]
        },
        {
            c: "Motherboard", items: [
                ["ASUS PRIME B660M-A", "ASUS", 129, "LGA1700 mATX"],
                ["MSI PRO Z690-A", "MSI", 189, "LGA1700 ATX"],
                ["Gigabyte B650 AORUS ELITE", "Gigabyte", 179, "AM5 ATX"],
                ["ASRock B550 Steel Legend", "ASRock", 149, "AM4 ATX"],
                ["ASUS TUF B650-PLUS", "ASUS", 179, "AM5 ATX"],
                ["MSI MAG B550 Tomahawk", "MSI", 159, "AM4 ATX"],
                ["Gigabyte Z790 UD", "Gigabyte", 229, "LGA1700 ATX"],
                ["ASRock Z690 Phantom Gaming", "ASRock", 219, "LGA1700 ATX"],
                ["ASUS ROG STRIX B760-F", "ASUS", 239, "LGA1700 ATX"],
                ["MSI B650M Mortar", "MSI", 179, "AM5 mATX"],
                ["Gigabyte A520M S2H", "Gigabyte", 59, "AM4 mATX"],
                ["ASRock B760 Pro RS", "ASRock", 149, "LGA1700 ATX"]
            ]
        },
        {
            c: "RAM", items: [
                ["Corsair Vengeance 16GB 3200", "Corsair", 49, "DDR4 2x8 CL16"],
                ["Corsair Vengeance 32GB 5600", "Corsair", 119, "DDR5 2x16 CL36"],
                ["G.SKILL Trident Z5 32GB 6000", "G.SKILL", 139, "DDR5 2x16 CL36"],
                ["G.SKILL Ripjaws V 16GB 3600", "G.SKILL", 55, "DDR4 2x8 CL18"],
                ["Kingston Fury Beast 16GB 3200", "Kingston", 45, "DDR4 2x8 CL16"],
                ["Kingston Fury 32GB 6000", "Kingston", 129, "DDR5 2x16 CL36"],
                ["TEAMGROUP T-Force 32GB 3600", "TEAMGROUP", 82, "DDR4 2x16 CL18"],
                ["ADATA XPG Lancer 32GB 6400", "ADATA", 149, "DDR5 2x16 CL40"],
                ["Patriot Viper Steel 16GB 3600", "Patriot", 55, "DDR4 2x8 CL18"],
                ["Crucial Pro 32GB 5600", "Crucial", 109, "DDR5 2x16 CL46"],
                ["Corsair Dominator Titanium 32GB 7200", "Corsair", 219, "DDR5 2x16 CL34"],
                ["TEAMGROUP Vulcan 16GB 3200", "TEAMGROUP", 42, "DDR4 2x8 CL16"]
            ]
        },
        {
            c: "Storage", items: [
                ["Samsung 990 PRO 1TB", "Samsung", 119, "NVMe PCIe 4.0"],
                ["Samsung 990 PRO 2TB", "Samsung", 179, "NVMe PCIe 4.0"],
                ["WD Black SN850X 1TB", "Western Digital", 109, "NVMe PCIe 4.0"],
                ["Crucial P5 Plus 1TB", "Crucial", 89, "NVMe PCIe 4.0"],
                ["Crucial T500 2TB", "Crucial", 159, "NVMe PCIe 4.0"],
                ["WD Blue 2TB HDD", "Western Digital", 59, "3.5\" 5400RPM"],
                ["Seagate Barracuda 4TB", "Seagate", 79, "3.5\" 5400RPM"],
                ["Kingston NV2 1TB", "Kingston", 69, "NVMe PCIe 4.0"],
                ["ADATA SX8200 Pro 1TB", "ADATA", 79, "NVMe PCIe 3.0"],
                ["Samsung 870 EVO 1TB", "Samsung", 89, "SATA SSD"],
                ["Lexar NM790 2TB", "Lexar", 139, "NVMe PCIe 4.0"],
                ["Sabrent Rocket 4 1TB", "Sabrent", 99, "NVMe PCIe 4.0"]
            ]
        },
        {
            c: "PSU", items: [
                ["Cooler Master 650W", "Cooler Master", 69, "80+ Bronze"],
                ["Seasonic Focus 750W", "Seasonic", 119, "80+ Gold"],
                ["Corsair RM850x", "Corsair", 139, "80+ Gold"],
                ["EVGA 600 BR", "EVGA", 59, "80+ Bronze"],
                ["be quiet! Pure Power 11 600W", "be quiet!", 89, "80+ Gold"],
                ["Thermaltake Toughpower GF1 750W", "Thermaltake", 119, "80+ Gold"],
                ["MSI MAG A750GL", "MSI", 109, "80+ Gold"],
                ["ASUS ROG Strix 850G", "ASUS", 169, "80+ Gold"],
                ["Super Flower Leadex III 750W", "Super Flower", 129, "80+ Gold"],
                ["FSP Hydro G Pro 850W", "FSP", 149, "80+ Gold"],
                ["NZXT C850", "NZXT", 139, "80+ Gold"],
                ["Antec NeoECO 650W", "Antec", 79, "80+ Bronze"]
            ]
        },
        {
            c: "Case", items: [
                ["NZXT H5 Flow", "NZXT", 99, "ATX Mid Tower"],
                ["Lian Li Lancool 215", "Lian Li", 89, "ATX Mid Tower"],
                ["Corsair 4000D Airflow", "Corsair", 104, "ATX Mid Tower"],
                ["Phanteks P400A", "Phanteks", 89, "ATX Mid Tower"],
                ["Fractal Pop Air", "Fractal", 99, "ATX Mid Tower"],
                ["Cooler Master TD500 Mesh", "Cooler Master", 109, "ATX Mid Tower"],
                ["DeepCool CK560", "DeepCool", 99, "ATX Mid Tower"],
                ["Montech X3 Mesh", "Montech", 69, "ATX Mid Tower"],
                ["Fractal Meshify 2", "Fractal", 149, "ATX Mid Tower"],
                ["Phanteks G360A", "Phanteks", 109, "ATX Mid Tower"],
                ["Lian Li O11 Dynamic", "Lian Li", 159, "ATX Mid Tower"],
                ["NZXT H7 Flow", "NZXT", 129, "ATX Mid Tower"]
            ]
        },
        {
            c: "Cooler", items: [
                ["DeepCool AK400", "DeepCool", 34, "Tower Air"],
                ["Cooler Master Hyper 212", "Cooler Master", 29, "Tower Air"],
                ["Noctua NH-D15", "Noctua", 99, "Dual Tower Air"],
                ["be quiet! Pure Rock 2", "be quiet!", 39, "Tower Air"],
                ["Corsair iCUE H100i", "Corsair", 129, "240mm AIO"],
                ["NZXT Kraken 240", "NZXT", 139, "240mm AIO"],
                ["Arctic Liquid Freezer II 280", "Arctic", 119, "280mm AIO"],
                ["MSI MAG CoreLiquid 240R", "MSI", 99, "240mm AIO"],
                ["Thermalright Peerless Assassin 120", "Thermalright", 36, "Tower Air"],
                ["Noctua NH-U12S redux", "Noctua", 49, "Tower Air"],
                ["ID-COOLING SE-214-XT", "ID-COOLING", 25, "Tower Air"],
                ["DeepCool LT520", "DeepCool", 119, "240mm AIO"]
            ]
        },
        {
            c: "Monitor", items: [
                ["AOC 24G2 24\"", "AOC", 149, "1080p 144Hz IPS"],
                ["LG 27GP850 27\"", "LG", 279, "1440p 165Hz IPS"],
                ["Gigabyte M27Q 27\"", "Gigabyte", 259, "1440p 170Hz IPS"],
                ["ASUS VG259QM 24.5\"", "ASUS", 229, "1080p 280Hz IPS"],
                ["Dell S2721DGF 27\"", "Dell", 299, "1440p 165Hz IPS"],
                ["MSI G274QPF 27\"", "MSI", 269, "1440p 170Hz IPS"],
                ["Samsung Odyssey G5 27\"", "Samsung", 249, "1440p 144Hz VA"],
                ["BenQ EX2510S 24.5\"", "BenQ", 199, "1080p 165Hz IPS"],
                ["Acer Nitro XV272U 27\"", "Acer", 269, "1440p 170Hz IPS"],
                ["Gigabyte M32Q 32\"", "Gigabyte", 379, "1440p 170Hz IPS"],
                ["ASUS TUF VG27AQ 27\"", "ASUS", 269, "1440p 165Hz IPS"],
                ["LG UltraGear 32GR63Q 32\"", "LG", 299, "1440p 165Hz VA"]
            ]
        }
    ];

    let out = [];
    for (const row of rows) {
        let i = 0;
        for (const [name, brand, price, specs] of row.items) {
            out.push({
                id: uid(),
                name, brand, category: row.c, price,
                specs, image: pic(`${row.c}-${i++}`),
                rating: +((Math.random() * 1.2) + 3.7).toFixed(1),
                discount: [0, 0, 5, 10, 15, 20, 25][Math.floor(Math.random() * 7)]
            });
        }
    }

    for (const c of categoriesOrder) {
        let pool = out.filter(p => p.category === c);
        const brands = [...new Set(pool.map(p => p.brand))];
        let idx = 0;
        while (pool.length < MIN_PER_CAT) {
            const base = pool[idx % pool.length];
            const variant = {
                ...base,
                id: uid(),
                name: `${base.name} ${["SE", "Pro", "Plus", "Elite", "V2", "Black", "RGB", "Max", "Ultra", "X", "Prime", "Neo"][idx % 12]}`,
                price: Math.max(10, Math.round(base.price * (0.9 + (idx % 7) * 0.03))),
                image: pic(`${c}-v-${idx}`),
                brand: brands[idx % brands.length],
                rating: +((Math.random() * 1.2) + 3.8).toFixed(1),
                discount: [0, 5, 10, 15, 20, 25, 30][idx % 7]
            };
            out.push(variant);
            pool.push(variant);
            idx++;
        }
    }
    return out;
}

let products = load(LS_KEYS.PRODUCTS);
if (!Array.isArray(products) || products.length === 0) {
    if (!localStorage.getItem(LS_KEYS.SEEDED)) {
        products = seedProducts();
        save(LS_KEYS.PRODUCTS, products);
        localStorage.setItem(LS_KEYS.SEEDED, "1");
        (async () => { try { await pushWholeCatalogToFirebase(products); } catch (e) { console.error(e); } })();
    } else {
        products = [];
    }
}
let cart = load(LS_KEYS.CART) || [];
let sellerMode = false;

const wrap = $("#productsWrap");
const searchInput = $("#searchInput");
const searchBtn = $("#searchBtn");
const categoryFilter = $("#categoryFilter");
const sellerToggle = $("#sellerToggle");
const addProductBtn = $("#addProductBtn");

const brandList = $("#brandList");
const priceMin = $("#priceMin");
const priceMax = $("#priceMax");
const priceMinVal = $("#priceMinVal");
const priceMaxVal = $("#priceMaxVal");
const saleOnly = $("#saleOnly");
const sideSortKey = $("#sideSortKey");
const applyFiltersBtn = $("#applyFilters");

const editModal = $("#editModal");
const editForm = $("#editForm");
const editTitle = $("#editTitle");

const filters = {
    q: "",
    category: "all",
    brands: new Set(),
    price: [0, 999999],
    ratingMin: 0,
    saleOnly: false,
    sort: "relevance"
};

function buildBrandFilter() {
    brandList.innerHTML = "";
    const all = [...new Set(products.map(p => p.brand))].sort();
    all.forEach(b => {
        const row = document.createElement("label");
        row.className = "brand-item";
        row.innerHTML = `<input type="checkbox" value="${b}"> <span>${b}</span>`;
        const cb = row.querySelector("input");
        cb.checked = filters.brands.has(b);
        cb.addEventListener("change", () => {
            if (cb.checked) filters.brands.add(b); else filters.brands.delete(b);
            render();
        });
        brandList.appendChild(row);
    });
}

(function initRanges() {
    const maxPrice = Math.ceil((products.length ? Math.max(...products.map(p => discounted(p))) : 1000) * 1.2);
    priceMin.min = 0; priceMin.max = maxPrice; priceMin.value = 0;
    priceMax.min = 0; priceMax.max = maxPrice; priceMax.value = maxPrice;
    priceMinVal.textContent = `$${priceMin.value}`; priceMaxVal.textContent = `$${priceMax.value}`;
    filters.price = [Number(priceMin.value), Number(priceMax.value)];
    priceMin.addEventListener("input", () => {
        if (+priceMin.value > +priceMax.value) priceMax.value = priceMin.value;
        priceMinVal.textContent = `$${priceMin.value}`;
    });
    priceMax.addEventListener("input", () => {
        if (+priceMax.value < +priceMin.value) priceMin.value = priceMax.value;
        priceMaxVal.textContent = `$${priceMax.value}`;
    });
})();
$all('input[name="star"]').forEach(r => {
    r.addEventListener("change", () => {
        filters.ratingMin = Number(r.value);
        render();
    });
});
saleOnly?.addEventListener("change", () => { filters.saleOnly = saleOnly.checked; render(); });

searchInput.addEventListener("input", () => { filters.q = searchInput.value.trim().toLowerCase(); });
searchBtn.addEventListener("click", () => render());
categoryFilter.addEventListener("change", () => { filters.category = categoryFilter.value; render(); });
applyFiltersBtn.addEventListener("click", () => {
    filters.price = [Number(priceMin.value), Number(priceMax.value)];
    filters.sort = sideSortKey.value;
    render();
});

function render() {
    const q = filters.q;
    const list = products
        .filter(p => (filters.category === "all" || p.category === filters.category))
        .filter(p => !q || `${p.name} ${p.brand} ${p.category} ${p.specs}`.toLowerCase().includes(q))
        .filter(p => (filters.brands.size === 0 || filters.brands.has(p.brand)))
        .filter(p => discounted(p) >= filters.price[0] && discounted(p) <= filters.price[1])
        .filter(p => p.rating >= filters.ratingMin)
        .filter(p => !filters.saleOnly || p.discount > 0);

    const sorted = sortList(list, filters.sort);

    wrap.innerHTML = "";
    const grouped = {};
    for (const c of categoriesOrder) grouped[c] = [];
    for (const p of sorted) grouped[p.category].push(p);

    for (const cat of categoriesOrder) {
        const arr = grouped[cat];
        if (!arr || arr.length === 0) continue;
        const block = document.createElement("section");
        block.className = "category-block";
        block.innerHTML = `
      <div class="category-head">
        <h2>${cat}</h2>
      </div>
      <div class="grid"></div>
    `;
        const grid = block.querySelector(".grid");
        arr.forEach(p => grid.appendChild(productCard(p)));
        wrap.appendChild(block);
    }
    syncCartBadge();
    toggleSellerUI();
}

function sortList(arr, key) {
    const a = [...arr];
    if (key === "priceAsc") a.sort((x, y) => discounted(x) - discounted(y));
    else if (key === "priceDesc") a.sort((x, y) => discounted(y) - discounted(x));
    else if (key === "nameAsc") a.sort((x, y) => x.name.localeCompare(y.name));
    else if (key === "nameDesc") a.sort((x, y) => y.name.localeCompare(x.name));
    else if (key === "ratingDesc") a.sort((x, y) => y.rating - x.rating);
    else if (key === "discountDesc") a.sort((x, y) => y.discount - x.discount);
    return a;
}

function starsHTML(r) {
    const full = Math.floor(r);
    const half = r - full >= 0.5;
    let s = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= full) s += `<span class="star-on">★</span>`;
        else if (i === full + 1 && half) s += `<span class="star-on">☆</span>`;
        else s += `<span>☆</span>`;
    }
    return `${s} <span class="small">(${r.toFixed(1)})</span>`;
}

function productCard(p) {
    const priceNow = discounted(p);
    const el = document.createElement("article");
    el.className = "product";
    el.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <div class="p-body">
      <div class="p-top">
        <span class="p-brand">${p.brand}</span>
        <span class="p-cat">${p.category}</span>
      </div>
      <div class="p-name">${p.name}</div>
      <div class="stars">${starsHTML(p.rating)}</div>
      <div class="badges">
        ${p.discount ? `<span class="badge discount">-${p.discount}%</span>` : ""}
        <span class="badge">${p.specs || ""}</span>
      </div>
      <div class="p-foot">
        <span class="price">
          ${p.discount ? `<span>${money(priceNow)}</span><del>${money(p.price)}</del>` : `<span>${money(p.price)}</span>`}
        </span>
        <button class="card-btn add">Add to Cart</button>
        <div class="seller-controls" style="display:none; gap:6px">
          <button class="card-btn alt btn-good upd">Update</button>
          <button class="card-btn alt btn-danger del">Delete</button>
        </div>
      </div>
    </div>
  `;
    const addBtn = el.querySelector(".add");
    const sellerCtrls = el.querySelector(".seller-controls");
    const updBtn = el.querySelector(".upd");
    const delBtn = el.querySelector(".del");

    addBtn.addEventListener("click", () => addToCart(p.id));
    updBtn?.addEventListener("click", () => openEditModal(p));
    delBtn?.addEventListener("click", () => {
        products = products.filter(x => x.id !== p.id);
        cart = cart.filter(i => i.id !== p.id);
        save(LS_KEYS.PRODUCTS, products);
        save(LS_KEYS.CART, cart);
        buildBrandFilter();
        render();
    });

    addBtn.style.display = sellerMode ? "none" : "inline-flex";
    sellerCtrls.style.display = sellerMode ? "flex" : "none";
    return el;
}

const ADMIN_EMAILS = ["admin@gmail.com"];

function normEmail(e) { return (e || "").toString().trim().toLowerCase(); }
function isAdmin(email) { return ADMIN_EMAILS.includes(normEmail(email)); }

function getSignedInEmail() {
    try {
        const fbEmail = FB?.auth?.currentUser?.email || FB?.getAuth?.()?.currentUser?.email;
        if (fbEmail) return fbEmail;
        const sess = JSON.parse(localStorage.getItem("skibidi_current_user") || "null");
        if (sess?.email) return sess.email;
        const fromObj = JSON.parse(localStorage.getItem("spc_user") || "null");
        if (fromObj?.email) return fromObj.email;
        const fallbacks = [
            localStorage.getItem("spc_auth_email"),
            localStorage.getItem("auth_email"),
            localStorage.getItem("userEmail")
        ].filter(Boolean)[0];
        if (fallbacks) return fallbacks;
        const domHit =
            document.querySelector('[data-email]')?.getAttribute('data-email') ||
            document.querySelector('#userEmail')?.textContent ||
            document.querySelector('.auth .email')?.textContent ||
            [...document.querySelectorAll('.auth *,[class*="email"],[id*="email"]')]
                .map(n => n.textContent?.trim() || "")
                .find(t => /\S+@\S+\.\S+/.test(t));
        return domHit || "";
    } catch {
        return "";
    }
}

function requireAdminOrWarn() {
    const email = normEmail(getSignedInEmail());
    if (!isAdmin(email)) {
        alert(`Seller Mode is restricted to ${ADMIN_EMAILS[0]}`);
        return false;
    }
    return true;
}

sellerToggle.addEventListener("click", () => {
    if (!sellerMode) {
        if (!requireAdminOrWarn()) {
            sellerMode = false;
            toggleSellerUI();
            return;
        }
    }
    sellerMode = !sellerMode;
    toggleSellerUI();
    render();
});

function toggleSellerUI() {
    addProductBtn.hidden = !sellerMode;
    sellerToggle.textContent = sellerMode ? "Exit Seller Mode" : "Seller Mode";
    $all(".seller-controls").forEach(el => el.style.display = sellerMode ? "flex" : "none");
    $all(".card-btn.add").forEach(el => el.style.display = sellerMode ? "none" : "inline-flex");
}

let editingId = null;
addProductBtn.addEventListener("click", () => { if (sellerMode) openEditModal(); });
function openEditModal(p = null) {
    editingId = p?.id || null;
    editTitle.textContent = editingId ? "Update Product" : "Add Product";
    editForm.name.value = p?.name || "";
    editForm.category.value = p?.category || "CPU";
    editForm.price.value = p?.price ?? "";
    editForm.brand.value = p?.brand || "";
    editForm.image.value = "";
    editForm.specs.value = p?.specs || "";
    editModal.showModal();
}

async function reportToFirebase(obj, action = "update") {
    const ok = await waitForFB();
    if (!ok) return;
    const ts = Date.now();
    const feedKey = `${-ts}_${obj.id}`;
    try { await FB.set(FB.ref(FB.db, `catalog/${obj.id}`), { ...obj, updatedAt: ts }); } catch (e) { console.error("catalog upsert failed", e); }
    try {
        await FB.set(FB.ref(FB.db, `products/${feedKey}`), { ...obj, productId: obj.id, action, updatedAt: ts });
    } catch (e) { console.error("feed append failed", e); }
}

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(editForm);
    const obj = {
        id: editingId || uid(),
        name: data.get("name").toString(),
        category: data.get("category").toString(),
        price: Number(data.get("price")),
        brand: data.get("brand").toString(),
        specs: data.get("specs").toString(),
        rating: +((Math.random() * 1.2) + 3.8).toFixed(1),
        discount: [0, 5, 10, 15, 20, 25, 30][Math.floor(Math.random() * 7)]
    };
    const file = data.get("image");
    if (file && file.size && file.type.startsWith("image/")) {
        obj.image = await fileToDataURL(file);
    } else if (!editingId) {
        obj.image = `https://picsum.photos/seed/new${Math.floor(Math.random() * 9999)}/600/400`;
    } else {
        const old = products.find(x => x.id === editingId);
        obj.image = old?.image || `https://picsum.photos/seed/fallback/600/400`;
    }
    if (editingId) {
        products = products.map(x => x.id === editingId ? obj : x);
        await reportToFirebase(obj, "update");
    } else {
        products.unshift(obj);
        await reportToFirebase(obj, "add");
    }
    save(LS_KEYS.PRODUCTS, products);
    buildBrandFilter();
    editModal.close();
    render();
});

function fileToDataURL(file) {
    return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
    });
}
editModal.addEventListener("click", (e) => {
    if (e.target === editModal) editModal.close();
});

const cartFab = $("#cartFab");
const cartCount = $("#cartCount");
const cartModal = $("#cartModal");
const cartList = $("#cartList");
const buySelectedBtn = $("#buySelectedBtn");
const shipModal = $("#shipModal");
const shipInfo = $("#shipInfo");
const progressBar = $("#progressBar");
const progressLabel = $("#progressLabel");
const cancelShipBtn = $("#cancelShipBtn");

cartFab.addEventListener("click", () => {
    buildCartList();
    cartModal.showModal();
});

function addToCart(id) {
    const item = cart.find(c => c.id === id);
    if (item) item.qty += 1;
    else cart.push({ id, qty: 1, selected: true });
    save(LS_KEYS.CART, cart);
    syncCartBadge();
}

function syncCartBadge() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    cartCount.textContent = String(total);
}

function cleanCartAgainstProducts() {
    const before = cart.length;
    cart = cart.filter(i => products.some(p => p.id === i.id));
    if (cart.length !== before) save(LS_KEYS.CART, cart);
}

function buildCartList() {
    cleanCartAgainstProducts();
    cartList.innerHTML = "";
    if (cart.length === 0) {
        const empty = document.createElement("div");
        empty.className = "small";
        empty.textContent = "Your cart is empty.";
        cartList.appendChild(empty);
        return;
    }
    for (const item of cart) {
        const p = products.find(x => x.id === item.id);
        if (!p) continue;
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
      <input type="checkbox" class="sel">
      <img src="${p.image}" alt="${p.name}">
      <div>
        <div><b>${p.name}</b></div>
        <div class="small">${p.brand} • ${p.category}</div>
      </div>
      <div class="qty">
        <button class="icon-btn dec">−</button>
        <span>${item.qty}</span>
        <button class="icon-btn inc">+</button>
        <span style="margin-left:8px;font-weight:800">${money(discounted(p) * item.qty)}</span>
        <button class="icon-btn rm" title="Remove">🗑</button>
      </div>
    `;
        const sel = row.querySelector(".sel"); sel.checked = !!item.selected;
        sel.addEventListener("change", () => { item.selected = sel.checked; save(LS_KEYS.CART, cart); });
        row.querySelector(".dec").addEventListener("click", () => { item.qty = Math.max(1, item.qty - 1); save(LS_KEYS.CART, cart); buildCartList(); syncCartBadge(); });
        row.querySelector(".inc").addEventListener("click", () => { item.qty++; save(LS_KEYS.CART, cart); buildCartList(); syncCartBadge(); });
        row.querySelector(".rm").addEventListener("click", () => { cart = cart.filter(c => c !== item); save(LS_KEYS.CART, cart); buildCartList(); syncCartBadge(); });
        cartList.appendChild(row);
    }
}

buySelectedBtn.addEventListener("click", () => {
    const first = cart.find(i => i.selected);
    if (!first) return;
    const p = products.find(x => x.id === first.id);
    startShippingSim({ ...p, qty: first.qty });
});

let simTimer = null;
let simProgress = 0;

function startShippingSim(order) {
    shipInfo.textContent = `${order.name} ×${order.qty} — ${money(discounted(order) * order.qty)}`;
    simProgress = 0;
    setProgress(0, "Preparing… 0%");
    shipModal.showModal();
    const stages = [
        { until: 25, label: "Preparing…" },
        { until: 55, label: "Packing…" },
        { until: 75, label: "Handing to courier…" },
        { until: 90, label: "In transit…" },
        { until: 100, label: "Delivered ✓" }
    ];
    clearInterval(simTimer);
    simTimer = setInterval(() => {
        simProgress = Math.min(100, simProgress + Math.random() * 6 + 2);
        const stage = stages.find(s => simProgress <= s.until) || stages.at(-1);
        setProgress(simProgress, `${stage.label} ${Math.floor(simProgress)}%`);
        if (simProgress >= 100) {
            clearInterval(simTimer);
            cart = cart.filter(i => !(i.id === order.id && i.selected));
            save(LS_KEYS.CART, cart);
            buildCartList();
            syncCartBadge();
        }
    }, 350);
}
function setProgress(val, label) {
    progressBar.style.width = `${val}%`;
    progressLabel.textContent = label;
}
cancelShipBtn.addEventListener("click", () => {
    clearInterval(simTimer);
    setProgress(0, "Order canceled.");
});

async function reportDeletionToFirebase(obj) {
    const ok = await waitForFB();
    if (!ok) return;
    const ts = Date.now();
    const feedKey = `${-ts}_${obj.id}`;
    const tombstone = {
        ...obj,
        productId: obj.id,
        action: "delete",
        deleted: true,
        deletedAt: ts,
        updatedAt: ts
    };
    try { await FB.set(FB.ref(FB.db, `catalog/${obj.id}`), tombstone); } catch (e) { console.error("catalog delete mark failed", e); }
    try { await FB.set(FB.ref(FB.db, `products/${feedKey}`), tombstone); } catch (e) { console.error("feed append delete failed", e); }
}

toggleSellerUI();
buildBrandFilter();
render();
syncCartBadge();
