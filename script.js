const connectWalletButtons = [
    document.getElementById("connectWallet"),
    document.getElementById("heroWallet")
];

const claimButton = document.getElementById("claimBtn");


function connectWallet() {

    alert(
        "Wallet connection will be available soon.\n\n" +
        "Next step: Solana wallet integration."
    );

}


connectWalletButtons.forEach(function(button) {

    if (button) {

        button.addEventListener(
            "click",
            connectWallet
        );

    }

});


claimButton.addEventListener(
    "click",
    function() {

        alert(
            "Connect your wallet first to check your GYM airdrop eligibility."
        );

    }
);