/* =========================================
   WILLIEM COIN — INTERACTIVE WEBSITE
   WALLET DEMO VERSION
========================================= */


/* =========================
   GLOBAL STATE
========================= */

let walletConnected = false;


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

    const walletInput =
        document.getElementById("walletAddress");

    const status =
        document.getElementById("airdropStatus");

    const message =
        document.getElementById("airdropMessage");


    if (!walletInput || !status || !message) {
        return;
    }


    const wallet =
        walletInput.value.trim();


    if (wallet.length < 10) {

        status.textContent =
            "INVALID WALLET";

        status.style.color =
            "#ff5c7a";

        message.textContent =
            "Please enter a valid wallet address.";

        return;
    }


    status.textContent =
        "ELIGIBLE ✓";

    status.style.color =
        "#35d98b";

    message.textContent =
        "Congratulations! Your wallet is eligible for the WILLIEM COIN airdrop.";

}


/* =========================
   MAIN MODAL
========================= */

function showModal(title, message) {

    const modal =
        document.getElementById("modal");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalText =
        document.getElementById("modalText");


    if (!modal || !modalTitle || !modalText) {
        return;
    }


    modalTitle.textContent =
        title;

    modalText.textContent =
        message;

    modal.classList.add("show");

}


function closeModal() {

    const modal =
        document.getElementById("modal");


    if (!modal) {
        return;
    }


    modal.classList.remove("show");

}


/* =========================
   CLOSE MAIN MODAL
   WHEN CLICKING OUTSIDE
========================= */

const mainModal =
    document.getElementById("modal");


if (mainModal) {

    mainModal.addEventListener(
        "click",
        function (event) {

            if (event.target === this) {

                closeModal();

            }

        }
    );

}


/* =========================
   NAVBAR ACTIVE STATE
========================= */

const navLinks =
    document.querySelectorAll(".navbar nav a");


const navTargetIds =
    Array.from(navLinks).map(
        link =>
            link.getAttribute("href").replace("#", "")
    );


window.addEventListener(
    "scroll",
    function () {

        let current = "";


        navTargetIds.forEach(
            id => {

                const target =
                    document.getElementById(id);


                if (!target) {
                    return;
                }


                const targetTop =
                    target.offsetTop - 150;


                if (window.scrollY >= targetTop) {

                    current = id;

                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.remove("active");


                if (
                    link.getAttribute("href") ===
                    "#" + current
                ) {

                    link.classList.add("active");

                }

            }
        );

    }
);


/* =========================
   FLOATING COINS
========================= */

const floatingCoins =
    document.querySelectorAll(".floating-coin");


floatingCoins.forEach(
    coin => {

        coin.addEventListener(
            "mouseenter",
            function () {

                this.style.transform =
                    "scale(1.25) rotate(25deg)";

            }
        );


        coin.addEventListener(
            "mouseleave",
            function () {

                this.style.transform = "";

            }
        );

    }
);


/* =========================
   RANDOM HERO PARTICLES
========================= */

const hero =
    document.querySelector(".hero");


if (hero) {

    for (let i = 0; i < 20; i++) {

        const particle =
            document.createElement("div");


        particle.style.position =
            "absolute";

        particle.style.width =
            "2px";

        particle.style.height =
            "2px";

        particle.style.borderRadius =
            "50%";

        particle.style.background =
            "#a855ff";

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

}


/* =========================
   PARTICLE ANIMATION
========================= */

const particleStyle =
    document.createElement("style");


particleStyle.innerHTML = `

@keyframes particleFloat {

    0%, 100% {

        transform: translateY(0);

        opacity: .2;

    }

    50% {

        transform: translateY(-30px);

        opacity: 1;

    }

}

`;


document.head.appendChild(
    particleStyle
);


/* =====================================================
   FAKE PHANTOM WALLET
   DEMO ONLY — DOES NOT CONNECT TO REAL PHANTOM
===================================================== */


/* =========================
   RANDOM FAKE ADDRESS
========================= */

function randomFakeAddress() {

    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";


    const rand = (length) => {

        return Array.from(
            { length: length },
            () =>
                chars[
                    Math.floor(
                        Math.random() * chars.length
                    )
                ]
        ).join("");

    };


    return `${rand(4)}...${rand(4)}`;

}


/* =========================
   OPEN PHANTOM MODAL
========================= */

function openPhantomModal() {

    const phantomModal =
        document.getElementById(
            "phantomModal"
        );


    const phantomStepConnect =
        document.getElementById(
            "phantomStepConnect"
        );


    const phantomStepConnected =
        document.getElementById(
            "phantomStepConnected"
        );


    if (!phantomModal) {
        return;
    }


    if (phantomStepConnect) {

        phantomStepConnect.classList.remove(
            "hidden"
        );

    }


    if (phantomStepConnected) {

        phantomStepConnected.classList.add(
            "hidden"
        );

    }


    phantomModal.classList.add(
        "show"
    );

}


/* =========================
   CLOSE PHANTOM MODAL
========================= */

function closePhantomModal() {

    const phantomModal =
        document.getElementById(
            "phantomModal"
        );


    if (phantomModal) {

        phantomModal.classList.remove(
            "show"
        );

    }

}


/* =========================
   FAKE PHANTOM CONNECT
========================= */

function doPhantomConnect() {

    const btn =
        document.getElementById(
            "phantomConnectBtn"
        );


    const address =
        document.getElementById(
            "phantomAddress"
        );


    const stepConnect =
        document.getElementById(
            "phantomStepConnect"
        );


    const stepConnected =
        document.getElementById(
            "phantomStepConnected"
        );


    if (!btn) {
        return;
    }


    btn.textContent =
        "Connecting...";

    btn.disabled =
        true;


    setTimeout(
        () => {

            walletConnected =
                true;


            if (address) {

                address.textContent =
                    randomFakeAddress();

            }


            if (stepConnect) {

                stepConnect.classList.add(
                    "hidden"
                );

            }


            if (stepConnected) {

                stepConnected.classList.remove(
                    "hidden"
                );

            }


            btn.textContent =
                "Connect";

            btn.disabled =
                false;


            updateWalletButton();

        },
        1200
    );

}


/* =========================
   PHANTOM MODAL OUTSIDE CLICK
========================= */

const phantomModal =
    document.getElementById(
        "phantomModal"
    );


if (phantomModal) {

    phantomModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === phantomModal
            ) {

                closePhantomModal();

            }

        }
    );

}


/* =========================
   UPDATE WALLET BUTTON
========================= */

function updateWalletButton() {

    const button =
        document.getElementById(
            "connectWallet"
        );


    if (!button) {
        return;
    }


    if (walletConnected) {

        button.innerHTML =
            "✓ WALLET CONNECTED";

        button.style.borderColor =
            "#35d98b";

        button.style.color =
            "#35d98b";

    } else {

        button.innerHTML =
            "▣ CONNECT WALLET";

        button.style.borderColor =
            "";

        button.style.color =
            "";

    }

}


/* =========================
   MAIN CONNECT WALLET BUTTON
========================= */

const mainConnectButton =
    document.getElementById(
        "connectWallet"
    );


if (mainConnectButton) {

    mainConnectButton.addEventListener(
        "click",
        () => {

            if (!walletConnected) {

                openPhantomModal();

            } else {

                walletConnected =
                    false;

                updateWalletButton();

            }

        }
    );

}


/* =========================
   INITIAL STATE
========================= */

updateWalletButton();