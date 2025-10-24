
import { db, ref, push, set } from "../FIREBASE.js";


const toggle = document.getElementById("modeToggle");
if (toggle) {
    toggle.addEventListener("change", () => {
        document.body.classList.remove("theme-anim");
        void document.body.offsetWidth;
        document.body.classList.add("theme-anim");
        document.body.classList.toggle("light", toggle.checked);
        setTimeout(() => document.body.classList.remove("theme-anim"), 750);
    });
}

const parts = {
    cpu: [
        { brand: "Intel", name: "Core i9-10900K", socket: "LGA1200", tdp: 125, price: 389, score: 125 },
        { brand: "Intel", name: "Core i9-10850K", socket: "LGA1200", tdp: 125, price: 349, score: 120 },
        { brand: "Intel", name: "Core i9-11900K", socket: "LGA1200", tdp: 125, price: 369, score: 128 },
        { brand: "Intel", name: "Core i7-10700K", socket: "LGA1200", tdp: 125, price: 319, score: 110 },
        { brand: "Intel", name: "Core i7-10700F", socket: "LGA1200", tdp: 65, price: 229, score: 98 },
        { brand: "Intel", name: "Core i5-10600K", socket: "LGA1200", tdp: 125, price: 249, score: 90 },
        { brand: "Intel", name: "Core i5-10400", socket: "LGA1200", tdp: 65, price: 179, score: 80 },
        { brand: "Intel", name: "Core i5-11400F", socket: "LGA1200", tdp: 65, price: 149, score: 85 },
        { brand: "Intel", name: "Core i9-12900K", socket: "LGA1700", tdp: 125, price: 469, score: 165 },
        { brand: "Intel", name: "Core i7-12700K", socket: "LGA1700", tdp: 125, price: 359, score: 150 },
        { brand: "Intel", name: "Core i5-12600K", socket: "LGA1700", tdp: 125, price: 279, score: 130 },
        { brand: "Intel", name: "Core i5-12400", socket: "LGA1700", tdp: 65, price: 179, score: 108 },
        { brand: "Intel", name: "Core i3-12100F", socket: "LGA1700", tdp: 58, price: 99, score: 80 },
        { brand: "Intel", name: "Core i9-13900K", socket: "LGA1700", tdp: 125, price: 569, score: 190 },
        { brand: "Intel", name: "Core i7-13700K", socket: "LGA1700", tdp: 125, price: 429, score: 170 },
        { brand: "Intel", name: "Core i5-13600K", socket: "LGA1700", tdp: 125, price: 299, score: 150 },
        { brand: "Intel", name: "Core i5-13500", socket: "LGA1700", tdp: 65, price: 249, score: 125 },
        { brand: "Intel", name: "Core i3-13100F", socket: "LGA1700", tdp: 58, price: 109, score: 85 },
        { brand: "Intel", name: "Core i9-14900K", socket: "LGA1700", tdp: 125, price: 589, score: 195 },
        { brand: "Intel", name: "Core i9-14900KF", socket: "LGA1700", tdp: 125, price: 569, score: 195 },
        { brand: "Intel", name: "Core i7-14700K", socket: "LGA1700", tdp: 125, price: 419, score: 180 },
        { brand: "Intel", name: "Core i5-14600K", socket: "LGA1700", tdp: 125, price: 299, score: 155 },
        { brand: "Intel", name: "Core i5-14400F", socket: "LGA1700", tdp: 65, price: 199, score: 120 },
        { brand: "AMD", name: "Ryzen 5 3500X", socket: "AM4", tdp: 65, price: 89, score: 75 },
        { brand: "AMD", name: "Ryzen 5 3600", socket: "AM4", tdp: 65, price: 99, score: 85 },
        { brand: "AMD", name: "Ryzen 5 5500", socket: "AM4", tdp: 65, price: 89, score: 95 },
        { brand: "AMD", name: "Ryzen 5 5600", socket: "AM4", tdp: 65, price: 129, score: 105 },
        { brand: "AMD", name: "Ryzen 7 5700X", socket: "AM4", tdp: 65, price: 179, score: 120 },
        { brand: "AMD", name: "Ryzen 7 5800X", socket: "AM4", tdp: 105, price: 199, score: 130 },
        { brand: "AMD", name: "Ryzen 7 5800X3D", socket: "AM4", tdp: 105, price: 279, score: 160 },
        { brand: "AMD", name: "Ryzen 9 5900", socket: "AM4", tdp: 65, price: 199, score: 150 },
        { brand: "AMD", name: "Ryzen 9 5900X", socket: "AM4", tdp: 105, price: 299, score: 165 },
        { brand: "AMD", name: "Ryzen 5 7600", socket: "AM5", tdp: 65, price: 199, score: 140 },
        { brand: "AMD", name: "Ryzen 5 7600X", socket: "AM5", tdp: 105, price: 229, score: 150 },
        { brand: "AMD", name: "Ryzen 7 7700", socket: "AM5", tdp: 65, price: 289, score: 160 },
        { brand: "AMD", name: "Ryzen 7 7700X", socket: "AM5", tdp: 105, price: 319, score: 170 },
        { brand: "AMD", name: "Ryzen 7 7800X3D", socket: "AM5", tdp: 120, price: 399, score: 210 },
        { brand: "AMD", name: "Ryzen 9 7900", socket: "AM5", tdp: 65, price: 349, score: 185 },
        { brand: "AMD", name: "Ryzen 9 7900X", socket: "AM5", tdp: 170, price: 399, score: 200 },
        { brand: "AMD", name: "Ryzen 9 7950X", socket: "AM5", tdp: 170, price: 549, score: 220 },
        { brand: "AMD", name: "Ryzen 9 7950X3D", socket: "AM5", tdp: 170, price: 649, score: 235 },
        { brand: "AMD", name: "Ryzen 5 9600X", socket: "AM5", tdp: 105, price: 299, score: 175 },
        { brand: "AMD", name: "Ryzen 7 9700X", socket: "AM5", tdp: 120, price: 449, score: 205 },
        { brand: "AMD", name: "Ryzen 7 9800X3D", socket: "AM5", tdp: 120, price: 599, score: 240 }
    ],
    cooler: [
        { brand: "Noctua", name: "NH-D15", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 220, price: 99 },
        { brand: "be quiet!", name: "Dark Rock Pro 4", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 250, price: 95 },
        { brand: "DeepCool", name: "AK400", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 150, price: 35 },
        { brand: "Cooler Master", name: "Hyper 212 Halo", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 150, price: 39 },
        { brand: "Corsair", name: "H100i 240mm", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 240, price: 129 },
        { brand: "Corsair", name: "H150i 360mm", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 300, price: 169 },
        { brand: "NZXT", name: "Kraken 240", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 250, price: 139 },
        { brand: "Lian Li", name: "Galahad 360", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 300, price: 159 },
        { brand: "Arctic", name: "Liquid Freezer II 360", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 300, price: 129 },
        { brand: "Thermalright", name: "Peerless Assassin 120", socket: ["LGA1200", "LGA1700", "AM4", "AM5"], tdp: 220, price: 39 }
    ],
    mobo: [
        { brand: "ASUS", name: "Prime B460M-A", socket: "LGA1200", ramGen: "DDR4", form: "mATX", price: 89 },
        { brand: "ASUS", name: "TUF Gaming B460-PLUS", socket: "LGA1200", ramGen: "DDR4", form: "ATX", price: 109 },
        { brand: "MSI", name: "Z490-A PRO", socket: "LGA1200", ramGen: "DDR4", form: "ATX", price: 169 },
        { brand: "ASRock", name: "H510M-HDV/M.2", socket: "LGA1200", ramGen: "DDR4", form: "mATX", price: 79 },
        { brand: "Gigabyte", name: "H610M S2H DDR4", socket: "LGA1700", ramGen: "DDR4", form: "mATX", price: 89 },
        { brand: "Gigabyte", name: "B660M DS3H DDR4", socket: "LGA1700", ramGen: "DDR4", form: "mATX", price: 119 },
        { brand: "MSI", name: "PRO B760M-A WIFI DDR4", socket: "LGA1700", ramGen: "DDR4", form: "mATX", price: 129 },
        { brand: "ASUS", name: "TUF Gaming Z690-PLUS D5", socket: "LGA1700", ramGen: "DDR5", form: "ATX", price: 229 },
        { brand: "MSI", name: "PRO B760M-A WIFI DDR5", socket: "LGA1700", ramGen: "DDR5", form: "mATX", price: 149 },
        { brand: "MSI", name: "PRO Z790-P WIFI", socket: "LGA1700", ramGen: "DDR5", form: "ATX", price: 259 },
        { brand: "ASUS", name: "TUF Gaming B550-PLUS", socket: "AM4", ramGen: "DDR4", form: "ATX", price: 129 },
        { brand: "MSI", name: "MAG B550M Mortar", socket: "AM4", ramGen: "DDR4", form: "mATX", price: 119 },
        { brand: "ASUS", name: "ROG Strix X570-F", socket: "AM4", ramGen: "DDR4", form: "ATX", price: 199 },
        { brand: "Gigabyte", name: "B650 AORUS Elite AX", socket: "AM5", ramGen: "DDR5", form: "ATX", price: 199 },
        { brand: "MSI", name: "B650 Tomahawk WIFI", socket: "AM5", ramGen: "DDR5", form: "ATX", price: 219 },
        { brand: "ASRock", name: "X670E Steel Legend", socket: "AM5", ramGen: "DDR5", form: "ATX", price: 289 },
        { brand: "ASUS", name: "ROG STRIX B650E-I", socket: "AM5", ramGen: "DDR5", form: "Mini-ITX", price: 269 }
    ],
    ram: [
        { brand: "Corsair", name: "Vengeance 16GB (2x8) DDR4-3200", gen: "DDR4", capacity: 16, price: 45 },
        { brand: "G.Skill", name: "Ripjaws V 32GB (2x16) DDR4-3600", gen: "DDR4", capacity: 32, price: 79 },
        { brand: "Kingston", name: "Fury Beast 64GB (2x32) DDR4-3600", gen: "DDR4", capacity: 64, price: 159 },
        { brand: "Team", name: "T-Force 128GB (4x32) DDR4-3200", gen: "DDR4", capacity: 128, price: 299 },
        { brand: "Corsair", name: "Vengeance 16GB (2x8) DDR5-5600", gen: "DDR5", capacity: 16, price: 79 },
        { brand: "Corsair", name: "Vengeance 32GB (2x16) DDR5-5600", gen: "DDR5", capacity: 32, price: 109 },
        { brand: "G.Skill", name: "Trident Z5 48GB (2x24) DDR5-6000", gen: "DDR5", capacity: 48, price: 149 },
        { brand: "G.Skill", name: "Trident Z5 64GB (2x32) DDR5-6000", gen: "DDR5", capacity: 64, price: 229 },
        { brand: "Kingston", name: "Fury Beast 96GB (2x48) DDR5-6000", gen: "DDR5", capacity: 96, price: 329 },
        { brand: "Crucial", name: "Pro 128GB (4x32) DDR5-5600", gen: "DDR5", capacity: 128, price: 399 }
    ],
    storage: [
        { brand: "Samsung", name: "870 EVO 1TB SATA", price: 79 },
        { brand: "Crucial", name: "MX500 2TB SATA", price: 119 },
        { brand: "Samsung", name: "980 1TB NVMe Gen3", price: 59 },
        { brand: "Samsung", name: "980 PRO 2TB Gen4", price: 149 },
        { brand: "WD", name: "Black SN770 1TB Gen4", price: 69 },
        { brand: "WD", name: "Black SN850X 2TB Gen4", price: 159 },
        { brand: "Crucial", name: "P3 Plus 2TB Gen4", price: 119 },
        { brand: "Sabrent", name: "Rocket 4 Plus 4TB Gen4", price: 299 },
        { brand: "Crucial", name: "T700 2TB Gen5", price: 299 },
        { brand: "Gigabyte", name: "AORUS Gen5 12000 2TB", price: 329 }
    ],
    gpu: [
        { brand: "NVIDIA", name: "GeForce GTX 1050 Ti 4GB", tdp: 75, price: 120, score: 60, vram: 4, gen: "Pascal" },
        { brand: "NVIDIA", name: "GeForce GTX 1650 4GB", tdp: 75, price: 149, score: 72, vram: 4, gen: "Turing" },
        { brand: "NVIDIA", name: "GeForce GTX 1660 Super 6GB", tdp: 125, price: 189, score: 100, vram: 6, gen: "Turing" },
        { brand: "NVIDIA", name: "GeForce RTX 2060 6GB", tdp: 160, price: 230, score: 110, vram: 6, gen: "Turing" },
        { brand: "NVIDIA", name: "GeForce RTX 2070", tdp: 175, price: 300, score: 135, vram: 8, gen: "Turing" },
        { brand: "NVIDIA", name: "GeForce RTX 2080", tdp: 215, price: 420, score: 155, vram: 8, gen: "Turing" },
        { brand: "NVIDIA", name: "GeForce RTX 2080 Ti", tdp: 260, price: 650, score: 185, vram: 11, gen: "Turing" },
        { brand: "NVIDIA", name: "GeForce RTX 3050 8GB", tdp: 130, price: 219, score: 135, vram: 8, gen: "Ampere" },
        { brand: "NVIDIA", name: "GeForce RTX 3060 12GB", tdp: 170, price: 290, score: 150, vram: 12, gen: "Ampere" },
        { brand: "NVIDIA", name: "GeForce RTX 3060 Ti", tdp: 200, price: 350, score: 165, vram: 8, gen: "Ampere" },
        { brand: "NVIDIA", name: "GeForce RTX 3070", tdp: 220, price: 420, score: 180, vram: 8, gen: "Ampere" },
        { brand: "NVIDIA", name: "GeForce RTX 3080 10GB", tdp: 320, price: 650, score: 210, vram: 10, gen: "Ampere" },
        { brand: "NVIDIA", name: "GeForce RTX 3090", tdp: 350, price: 1200, score: 235, vram: 24, gen: "Ampere" },
        { brand: "NVIDIA", name: "GeForce RTX 4060 8GB", tdp: 115, price: 299, score: 160, vram: 8, gen: "Ada" },
        { brand: "NVIDIA", name: "GeForce RTX 4060 Ti 16GB", tdp: 165, price: 449, score: 178, vram: 16, gen: "Ada" },
        { brand: "NVIDIA", name: "GeForce RTX 4070", tdp: 200, price: 549, score: 200, vram: 12, gen: "Ada" },
        { brand: "NVIDIA", name: "GeForce RTX 4070 Ti", tdp: 285, price: 749, score: 225, vram: 12, gen: "Ada" },
        { brand: "NVIDIA", name: "GeForce RTX 4070 Ti Super", tdp: 285, price: 799, score: 235, vram: 16, gen: "Ada" },
        { brand: "NVIDIA", name: "GeForce RTX 4080", tdp: 320, price: 1199, score: 245, vram: 16, gen: "Ada" },
        { brand: "NVIDIA", name: "GeForce RTX 4080 Super", tdp: 320, price: 999, score: 255, vram: 16, gen: "Ada" },
        { brand: "NVIDIA", name: "GeForce RTX 4090", tdp: 450, price: 1599, score: 300, vram: 24, gen: "Ada" },
        { brand: "AMD", name: "Radeon RX 6500 XT", tdp: 107, price: 149, score: 95, vram: 4, gen: "RDNA2" },
        { brand: "AMD", name: "Radeon RX 6600", tdp: 132, price: 229, score: 140, vram: 8, gen: "RDNA2" },
        { brand: "AMD", name: "Radeon RX 6650 XT", tdp: 176, price: 259, score: 155, vram: 8, gen: "RDNA2" },
        { brand: "AMD", name: "Radeon RX 6700 XT", tdp: 230, price: 379, score: 175, vram: 12, gen: "RDNA2" },
        { brand: "AMD", name: "Radeon RX 6750 XT", tdp: 250, price: 399, score: 185, vram: 12, gen: "RDNA2" },
        { brand: "AMD", name: "Radeon RX 6800", tdp: 250, price: 499, score: 200, vram: 16, gen: "RDNA2" },
        { brand: "AMD", name: "Radeon RX 6800 XT", tdp: 300, price: 599, score: 215, vram: 16, gen: "RDNA2" },
        { brand: "AMD", name: "Radeon RX 6900 XT", tdp: 300, price: 699, score: 230, vram: 16, gen: "RDNA2" },
        { brand: "AMD", name: "Radeon RX 7600", tdp: 165, price: 269, score: 160, vram: 8, gen: "RDNA3" },
        { brand: "AMD", name: "Radeon RX 7700", tdp: 220, price: 399, score: 185, vram: 12, gen: "RDNA3" },
        { brand: "AMD", name: "Radeon RX 7700 XT", tdp: 245, price: 449, score: 195, vram: 12, gen: "RDNA3" },
        { brand: "AMD", name: "Radeon RX 7800 XT", tdp: 263, price: 499, score: 210, vram: 16, gen: "RDNA3" },
        { brand: "AMD", name: "Radeon RX 7900 GRE", tdp: 260, price: 549, score: 220, vram: 16, gen: "RDNA3" },
        { brand: "AMD", name: "Radeon RX 7900 XT", tdp: 315, price: 699, score: 235, vram: 20, gen: "RDNA3" },
        { brand: "AMD", name: "Radeon RX 7900 XTX", tdp: 355, price: 999, score: 255, vram: 24, gen: "RDNA3" }
    ],
    psu: [
        { brand: "Corsair", name: "CV450 (Bronze) 450W", watt: 450, price: 49 },
        { brand: "Corsair", name: "CX550 (Bronze) 550W", watt: 550, price: 59 },
        { brand: "Corsair", name: "RM550x (Gold) 550W", watt: 550, price: 89 },
        { brand: "EVGA", name: "SuperNOVA 650 G6", watt: 650, price: 109 },
        { brand: "Seasonic", name: "FOCUS GX-750 (Gold)", watt: 750, price: 119 },
        { brand: "Corsair", name: "RM850x (Gold)", watt: 850, price: 139 },
        { brand: "MSI", name: "MPG A1000G (Gold)", watt: 1000, price: 169 },
        { brand: "Seasonic", name: "PRIME TX-1300 (Titanium)", watt: 1300, price: 329 }
    ],
    case: [
        { brand: "NZXT", name: "H5 Flow (ATX)", price: 89, form: "ATX" },
        { brand: "Corsair", name: "4000D Airflow (ATX)", price: 104, form: "ATX" },
        { brand: "Lian Li", name: "Lancool 216 (ATX)", price: 119, form: "ATX" },
        { brand: "Fractal", name: "Meshify 2 Compact (ATX)", price: 129, form: "ATX" },
        { brand: "Fractal", name: "Torrent Compact (ATX)", price: 169, form: "ATX" },
        { brand: "Cooler Master", name: "NR400 (mATX)", price: 69, form: "mATX" },
        { brand: "Thermaltake", name: "S100 (mATX)", price: 59, form: "mATX" },
        { brand: "Cooler Master", name: "NR200 (Mini-ITX)", price: 79, form: "Mini-ITX" }
    ],
    monitor: [
        { brand: "AOC", name: "24G2 1080p 144Hz", price: 159, res: "1080p", refresh: 144 },
        { brand: "ASUS", name: "TUF VG249Q 1080p 165Hz", price: 179, res: "1080p", refresh: 165 },
        { brand: "BenQ", name: "XL2546 1080p 240Hz", price: 329, res: "1080p", refresh: 240 },
        { brand: "Acer", name: "XV252QF 1080p 390Hz", price: 399, res: "1080p", refresh: 390 },
        { brand: "Dell", name: "G2724D 1440p 165Hz", price: 269, res: "1440p", refresh: 165 },
        { brand: "LG", name: "27GP850 1440p 180Hz", price: 349, res: "1440p", refresh: 180 },
        { brand: "Gigabyte", name: "M27QX 1440p 240Hz", price: 449, res: "1440p", refresh: 240 },
        { brand: "Alienware", name: "AW2725DF 1440p 360Hz OLED", price: 799, res: "1440p", refresh: 360 },
        { brand: "LG", name: "27GR95QE 1440p 240Hz OLED", price: 799, res: "1440p", refresh: 240 },
        { brand: "Samsung", name: "Odyssey G7 4K 144Hz", price: 799, res: "4K", refresh: 144 }
    ]
};

function fill(id, arr) {
    const sel = document.getElementById(id);
    sel.innerHTML = `<option value="">Select</option>` +
        arr.map((p, i) => `<option value="${i}">${(p.brand ? p.brand + ' ' : '') + p.name}${p.price ? ` — $${p.price}` : ''}</option>`).join('');
}

["cpu", "cooler", "mobo", "ram", "storage", "gpu", "psu", "case", "monitor"].forEach(k => fill(k, parts[k] || []));
document.querySelectorAll("select").forEach(s => s.addEventListener("change", update));

function update() {
    let price = 0, tdp = 0, compat = [];
    const cpu = pick("cpu"), gpu = pick("gpu"), mobo = pick("mobo"), cooler = pick("cooler"), ram = pick("ram"), psuSel = pick("psu");
    document.querySelectorAll("select").forEach(s => {
        const v = s.value;
        if (v !== "") {
            const item = parts[s.id][v];
            price += item.price || 0;
            if (item.tdp) tdp += item.tdp;
        }
    });
    document.getElementById("price").textContent = "$" + price.toFixed(2);
    const estWatts = tdp + 60;
    document.getElementById("watts").textContent = estWatts + "W";
    const rec = Math.ceil((estWatts * 1.5) / 50) * 50;
    document.getElementById("psuRec").textContent = rec + "W+";
    if (cpu && mobo && cpu.socket !== mobo.socket) compat.push("CPU and motherboard sockets mismatch");
    if (cpu && cooler && Array.isArray(cooler.socket) && !cooler.socket.includes(cpu.socket)) compat.push("Cooler not compatible with CPU socket");
    if (ram && mobo && ram.gen && mobo.ramGen && ram.gen !== mobo.ramGen) compat.push("RAM generation not supported by motherboard");
    if (psuSel && psuSel.watt < rec) compat.push("PSU wattage is below recommendation");
    document.getElementById("compat").innerHTML = compat.length ? compat.map(c => `<li>${c}</li>`).join("") : "<li>No issues</li>";
    const b = bottleneck(cpu?.score, gpu?.score);
    document.getElementById("bneck").textContent = b;
    const fpsHeader = document.querySelector('.card h3');
    if (fpsHeader && fpsHeader.textContent.toLowerCase().includes('estimated fps')) fpsHeader.textContent = "Estimated FPS in Esports (1080p)";
    renderEsportsFps(cpu, gpu, ram);
}

function pick(id) { const i = document.getElementById(id).value; return i === "" ? null : parts[id][i]; }
function bottleneck(c, g) { if (!c || !g) return "—"; if (c < g - 20) return "CPU Bottleneck"; if (g < c - 20) return "GPU Bottleneck"; return "Balanced"; }
function vramFactor(v) { if (!v) return 1; return v >= 16 ? 1.06 : v >= 12 ? 1.03 : v >= 8 ? 1 : 0.9 }
function genBoost(gen) { if (!gen) return 1; const s = (gen + "").toLowerCase(); if (s.includes("ada") || s.includes("rdna3")) return 1.05; if (s.includes("ampere") || s.includes("rdna2") || s.includes("turing")) return 1.02; return 1; }

function renderEsportsFps(cpu, gpu, ram) {
    const box = document.getElementById("fps"); box.innerHTML = "";
    if (!cpu || !gpu) return;

    const cpuScore = cpu.score || 60;
    const gpuScore = (gpu.score || 60) * vramFactor(gpu.vram) * genBoost(gpu.gen);
    const sysFactor = (ram?.capacity >= 32 ? 1.04 : 1) * (ram?.gen === "DDR5" ? 1.03 : 1);

    const perf = (cpuScore * 0.45 + gpuScore * 0.55) * sysFactor; // balanced weight

    const games = [
        { name: "CS2", diff: 0.60 },
        { name: "Valorant", diff: 0.45 },
        { name: "Overwatch 2", diff: 0.80 },
        { name: "Rainbow Six Siege", diff: 0.85 },
        { name: "Apex Legends", diff: 1.10 },
        { name: "Fortnite", diff: 1.10 },
        { name: "Call of Duty: Warzone", diff: 1.35 },
        { name: "PUBG: Battlegrounds", diff: 1.25 },
        { name: "Escape from Tarkov", diff: 1.60 },
        { name: "Halo Infinite", diff: 1.40 },
        { name: "Team Fortress 2", diff: 0.50 },
        { name: "Paladins", diff: 0.55 }
    ];

    games.forEach(g => {
        const fps = Math.max(45, Math.round((perf * 1.2) / g.diff)); // toned-down scale
        box.innerHTML += `<div><b>${g.name}</b><br>${fps} FPS</div>`;
    });
}


document.getElementById("shareBtn").addEventListener("click", async () => {
    const params = new URLSearchParams();
    const keys = ["cpu", "cooler", "mobo", "ram", "storage", "gpu", "psu", "case", "monitor"];

    const selections = {};
    keys.forEach((k) => {
        const sel = document.getElementById(k).value;
        if (sel !== "") {
            const item = parts[k][sel];
            params.set(k, sel);
            selections[k] = {
                index: Number(sel),
                name: (item.brand ? item.brand + " " : "") + item.name,
                price: item.price ?? null
            };
        }
    });

    const id = Math.random().toString(36).slice(2, 10);
    const url = `${location.origin}${location.pathname}?${params.toString()}#${id}`;

    const a = document.getElementById("shareLink");
    a.textContent = url;
    a.href = url;

    const parent = ref(db, "shared_builds");
    const newRef = push(parent);
    await set(newRef, {
        id,
        url,
        selections,
        totals: {
            price: document.getElementById("price").textContent,
            watts: document.getElementById("watts").textContent,
            psuRec: document.getElementById("psuRec").textContent,
            bottleneck: document.getElementById("bneck").textContent
        },
        ts: Date.now(),
        page: "builder"
    });
});

update();
