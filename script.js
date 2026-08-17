/* =========================================
   WILLIEM COIN — INTERACTIVE WEBSITE
========================================= */


/* =========================
   WALLET CONNECT
========================= */

const walletButton = document.getElementById("connectWallet");

let walletConnected = false;

walletButton.addEventListener("click", function () {

    if (!walletConnected) {

        walletConnected = true;

        walletButton.innerHTML = "✓ WALLET CONNECTED";

        walletButton.style.borderColor = "#35d98b";
        walletButton.style.color = "#35d98b";

        showModal(
            "WALLET CONNECTED",
            "Your wallet has been successfully connected to the WILLIEM ecosystem."
        );

    } else {

        walletConnected = false;

        walletButton.innerHTML = "▣ CONNECT WALLET";

        walletButton.style.borderColor = "";
        walletButton.style.color = "";

    }

});


/* =========================
   BUY BUTTON
========================= */

function buyCoin() {

    showModal(
        "BUY $WLM 🚀",
        "WILLIEM COIN is preparing for launch. Trading information will appear here when the token goes live."
    );

}


/* =========================
   CONTRACT
========================= */

function showContract() {

    showModal(
        "WILLIEM CONTRACT",
        "Contract address has not been deployed yet. This is currently the official WILLIEM COIN demo website."
    );

}


/* =========================
   AIRDROP
========================= */

function checkAirdrop() {

    const wallet =
        document.getElementById("walletAddress").value.trim();

    const status =
        document.getElementById("airdropStatus");

    const message =
        document.getElementById("airdropMessage");


    if (wallet.length < 10) {

        status.textContent = "INVALID WALLET";

        status.style.color = "#ff5c7a";

        message.textContent =
            "Please enter a valid wallet address.";

        return;
    }


    status.textContent = "ELIGIBLE ✓";

    status.style.color = "#35d98b";

    message.textContent =
        "Congratulations! Your wallet is eligible for the WILLIEM COIN airdrop.";

}


/* =========================
   MODAL
========================= */

function showModal(title, message) {

    document.getElementById("modalTitle").textContent =
        title;

    document.getElementById("modalText").textContent =
        message;

    document.getElementById("modal").classList.add("show");

}


function closeModal() {

    document.getElementById("modal").classList.remove("show");

}


/* =========================
   CLOSE MODAL WHEN CLICKING
   OUTSIDE
========================= */

document.getElementById("modal").addEventListener(
    "click",
    function (event) {

        if (event.target === this) {

            closeModal();

        }

    }
);


/* =========================
   NAVBAR ACTIVE STATE
========================= */

const navLinks =
    document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", function () {

    let current = "";

    document.querySelectorAll("section[id]").forEach(
        section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        }
    );


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================
   FLOATING COINS
========================= */

const floatingCoins =
    document.querySelectorAll(".floating-coin");

floatingCoins.forEach((coin, index) => {

    coin.addEventListener("mouseenter", function () {

        this.style.transform =
            "scale(1.25) rotate(25deg)";

    });

    coin.addEventListener("mouseleave", function () {

        this.style.transform = "";

    });

});


/* =========================
   RANDOM HERO PARTICLES
========================= */

const hero =
    document.querySelector(".hero");


for (let i = 0; i < 20; i++) {

    const particle =
        document.createElement("div");

    particle.style.position = "absolute";

    particle.style.width = "2px";
    particle.style.height = "2px";

    particle.style.borderRadius = "50%";

    particle.style.background = "#a855ff";

    particle.style.boxShadow =
        "0 0 10px #a855ff";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.top =
        Math.random() * 100 + "%";

    particle.style.opacity =
        Math.random();

    particle.style.animation =
        `particleFloat ${3 + Math.random() * 5}s ease-in-out infinite`;

    particle.style.animationDelay =
        Math.random() * 3 + "s";

    hero.appendChild(particle);

}


/* =========================
   PARTICLE ANIMATION
========================= */

const particleStyle =
document.createElement("style");

particleStyle.innerHTML = `

@keyframes particleFloat {

    0%,100% {
        transform: translateY(0);
        opacity: .2;
    }

    50% {
        transform: translateY(-30px);
        opacity: 1;
    }

}

`;

document.head.appendChild(particleStyle);