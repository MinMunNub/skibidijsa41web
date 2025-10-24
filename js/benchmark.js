// js/benchmark.js
const keyboards = [
    { name: "Razer BlackWidow V4 Pro", hz: 8000, switch: "Razer Orange" },
    { name: "Corsair K70 RGB Pro", hz: 8000, switch: "OPX" },
    { name: "SteelSeries Apex Pro", hz: 1000, switch: "OmniPoint" },
    { name: "Logitech G915", hz: 1000, switch: "GL Tactile" },
    { name: "Wooting 60HE", hz: 8000, switch: "Lekker" },
    { name: "HyperX Alloy Origins", hz: 1000, switch: "Aqua" },
    { name: "Akko 5075B", hz: 1000, switch: "Cream Yellow" },
    { name: "Keychron K8 Pro", hz: 1000, switch: "Gateron G Pro 2.0" },
    { name: "Ducky One 3", hz: 1000, switch: "Cherry MX Speed" },
    { name: "Razer Huntsman V3 Pro", hz: 8000, switch: "Analog" }
]
const mice = [
    { name: "ASUS ROG Harpe II Ace", hz: 8000, dpi: 42000 },
    { name: "Razer Viper 8KHz", hz: 8000, dpi: 20000 },
    { name: "Logitech G Pro X Superlight 2", hz: 2000, dpi: 32000 },
    { name: "Zowie EC2", hz: 1000, dpi: 3200 },
    { name: "Glorious Model O 2", hz: 4000, dpi: 26000 },
    { name: "SteelSeries Aerox 5", hz: 1000, dpi: 18000 },
    { name: "Razer DeathAdder V3 Pro", hz: 4000, dpi: 30000 },
    { name: "Corsair M65 Ultra", hz: 8000, dpi: 26000 },
    { name: "Finalmouse Ultralight", hz: 1000, dpi: 3200 },
    { name: "Logitech G502 X Plus", hz: 1000, dpi: 25000 }
]
const monitors = [
    { name: "ASUS ROG Strix XG27AQM", hz: 270, rt: 0.8 },
    { name: "Alienware AW2524H", hz: 500, rt: 1.0 },
    { name: "Samsung Odyssey G7 32", hz: 240, rt: 1.0 },
    { name: "LG 27GP850", hz: 180, rt: 1.5 },
    { name: "BenQ Zowie XL2566K", hz: 360, rt: 0.5 },
    { name: "AOC AG274QG", hz: 240, rt: 1.0 },
    { name: "MSI Oculux NXG253R", hz: 360, rt: 1.0 },
    { name: "Gigabyte M27Q", hz: 170, rt: 1.0 },
    { name: "ViewSonic XG2431", hz: 240, rt: 1.0 },
    { name: "ASUS TUF VG279QM", hz: 280, rt: 1.0 }
]
const routers = [
    { name: "ASUS RT-AX88U Pro", add: 1, wifi: "WiFi 6" },
    { name: "TP-Link Archer AX11000", add: 2, wifi: "WiFi 6" },
    { name: "Ubiquiti UXG Pro", add: 0.5, wifi: "Ethernet" },
    { name: "Generic ISP Router", add: 3, wifi: "WiFi 5" },
    { name: "Netgear Nighthawk XR1000", add: 1.5, wifi: "WiFi 6" },
    { name: "ASUS GT-AXE16000", add: 0.8, wifi: "WiFi 6E" },
    { name: "TP-Link Deco XE75", add: 1.2, wifi: "WiFi 6E" },
    { name: "Google Nest WiFi Pro", add: 2.2, wifi: "WiFi 6E" },
    { name: "MikroTik hEX S", add: 0.6, wifi: "Ethernet" },
    { name: "Linksys MR9600", add: 2.0, wifi: "WiFi 6" }
]
const servers = [
    { name: "Valorant Singapore", region: "SEA", lat: 1.3521, lon: 103.8198 },
    { name: "CS2 Tokyo", region: "Japan", lat: 35.6762, lon: 139.6503 },
    { name: "Fortnite Sydney", region: "Oceania", lat: -33.8688, lon: 151.2093 },
    { name: "League Seoul", region: "Korea", lat: 37.5665, lon: 126.9780 },
    { name: "Dota2 Frankfurt", region: "EU Central", lat: 50.1109, lon: 8.6821 },
    { name: "Warzone London", region: "UK", lat: 51.5072, lon: -0.1276 },
    { name: "Overwatch Paris", region: "EU West", lat: 48.8566, lon: 2.3522 },
    { name: "Apex Virginia", region: "NA East", lat: 38.9072, lon: -77.0369 },
    { name: "Valorant Ohio", region: "NA Central", lat: 39.9612, lon: -82.9988 },
    { name: "CS2 Los Angeles", region: "NA West", lat: 34.0522, lon: -118.2437 },
    { name: "League Dallas", region: "NA South", lat: 32.7767, lon: -96.7970 },
    { name: "Apex São Paulo", region: "Brazil", lat: -23.5558, lon: -46.6396 },
    { name: "BGMI Mumbai", region: "India", lat: 19.076, lon: 72.8777 },
    { name: "CS2 Johannesburg", region: "Africa", lat: -26.2041, lon: 28.0473 },
    { name: "Valorant Dubai", region: "Middle East", lat: 25.2048, lon: 55.2708 },
    { name: "PUBG Hong Kong", region: "HK", lat: 22.3193, lon: 114.1694 },
    { name: "League Moscow", region: "EU East", lat: 55.7558, lon: 37.6173 },
    { name: "Valorant Istanbul", region: "Turkey", lat: 41.0082, lon: 28.9784 },
    { name: "Apex Singapore 2", region: "SEA", lat: 1.29, lon: 103.85 },
    { name: "CS2 Toronto", region: "Canada", lat: 43.65107, lon: -79.347015 }
]
const el = (q) => document.querySelector(q)
const fill = (id, arr, fmt = (x) => x.name) => { const s = el(id); s.innerHTML = arr.map((x, i) => `<option value="${i}">${fmt(x)}</option>`).join("") }
fill("#keyboardSelect", keyboards); fill("#mouseSelect", mice); fill("#monitorSelect", monitors); fill("#routerSelect", routers); fill("#serverSelect", servers, (x) => `${x.name}`)
const sync = () => {
    const k = keyboards[el("#keyboardSelect").value]; el("#kbHz").textContent = k.hz + "Hz"; el("#kbSwitch").textContent = k.switch
    const m = mice[el("#mouseSelect").value]; el("#msHz").textContent = m.hz + "Hz"; el("#msDpi").textContent = m.dpi
    const mn = monitors[el("#monitorSelect").value]; el("#mnHz").textContent = mn.hz + "Hz"; el("#mnRt").textContent = mn.rt + "ms"
    const r = routers[el("#routerSelect").value]; el("#rtAdd").textContent = "+" + r.add + "ms"; el("#rtWifi").textContent = r.wifi
    const sv = servers[el("#serverSelect").value]; el("#svRegion").textContent = sv.region; el("#svCoords").textContent = sv.lat.toFixed(2) + ", " + sv.lon.toFixed(2)
}
    ;["#keyboardSelect", "#mouseSelect", "#monitorSelect", "#routerSelect", "#serverSelect"].forEach(id => el(id).addEventListener("change", sync)); sync()
const hav = (a, b) => {
    const R = 6371
    const dLat = (b.lat - a.lat) * Math.PI / 180
    const dLon = (b.lon - a.lon) * Math.PI / 180
    const s1 = Math.sin(dLat / 2) ** 2
    const s2 = Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLon / 2) ** 2
    return 2 * R * Math.asin(Math.sqrt(s1 + s2))
}
const deviceLag = () => {
    const k = keyboards[el("#keyboardSelect").value]
    const m = mice[el("#mouseSelect").value]
    const mn = monitors[el("#monitorSelect").value]
    const kb = 1000 / k.hz
    const ms = 1000 / m.hz
    const mnLag = (1000 / mn.hz) / 2 + mn.rt
    return { kb, ms, mn: mnLag }
}
const tier = (t) => {
    if (t < 15) return { tag: "Esports Ready", desc: "Exceptional responsiveness suitable for high-level competitive play.", cls: "green" }
    if (t < 30) return { tag: "Competitive", desc: "Great performance for competitive gaming with minimal input delay.", cls: "gold" }
    return { tag: "Casual Gaming", desc: "Good for casual play; consider upgrading display or network for faster response.", cls: "red" }
}
const vsAvg = (t) => Math.max(0, Math.round((30 - t) / 30 * 100)) + "% Faster"
const bars = (kb, ms, mn, nt) => {
    const sum = kb + ms + mn + nt
    const w = (v) => Math.min(100, Math.round(v / sum * 100)) + "%"
    el("#bKb").style.width = w(kb)
    el("#bMs").style.width = w(ms)
    el("#bMn").style.width = w(mn)
    el("#bNt").style.width = w(nt)
    el("#vKb").textContent = kb.toFixed(3) + "ms"
    el("#vMs").textContent = ms.toFixed(3) + "ms"
    el("#vMn").textContent = mn.toFixed(3) + "ms"
    el("#vNt").textContent = nt.toFixed(3) + "ms"
}
const geocode = async (q) => {
    const u = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`
    const r = await fetch(u, { headers: { "Accept": "application/json", "User-Agent": "SkibidiPC-Benchmark" } })
    const j = await r.json()
    if (!Array.isArray(j) || j.length === 0) throw new Error("notfound")
    const top = j[0]
    return { name: top.display_name, lat: parseFloat(top.lat), lon: parseFloat(top.lon) }
}
const netPing = async (user, server, router) => {
    const d = hav({ lat: user.lat, lon: user.lon }, { lat: server.lat, lon: server.lon })
    const base = d * 0.01
    const overhead = 5
    return base + overhead + router.add
}
const calc = async () => {
    const q = el("#locationInput").value.trim()
    if (!q) return
    const loc = await geocode(q)
    el("#locResolved").textContent = loc.name.split(",").slice(0, 3).join(", ")
    el("#locCoords").textContent = loc.lat.toFixed(2) + ", " + loc.lon.toFixed(2)
    const sv = servers[el("#serverSelect").value]
    const r = routers[el("#routerSelect").value]
    const nt = await netPing(loc, sv, r)
    const d = deviceLag()
    const total = d.kb + d.ms + d.mn + nt
    el("#totalMs").textContent = total.toFixed(3)
    const t = tier(total)
    el("#tierTag").textContent = t.tag
    el("#tierDesc").textContent = t.desc
    el("#pvA").textContent = vsAvg(total)
    el("#totalWrap").classList.remove("green", "gold", "red")
    el("#totalWrap").classList.add(t.cls)
    bars(d.kb, d.ms, d.mn, nt)
    el("#results").classList.remove("hidden")
}
el("#calcBtn").addEventListener("click", () => { calc().catch(() => { }) })
