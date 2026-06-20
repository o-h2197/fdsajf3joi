document.addEventListener("DOMContentLoaded", () => {

    // フェードイン
    const lines = document.querySelectorAll(".line");
    let delay = 0;
    lines.forEach((line) => {
        setTimeout(() => line.style.opacity = 1, delay);
        delay += 2000;
    });

    // はい（本編）
    const yesBtn = document.getElementById("yesBtn");
    const yesMessage = document.getElementById("yesMessage");
    yesBtn.addEventListener("click", () => {
        yesMessage.classList.remove("hidden");
    });

    // いいえ → 別画面へ
    const noBtn = document.getElementById("noBtn");
    const overlay = document.getElementById("overlay");
    const overlayText = document.getElementById("overlayText");
    const overlayYes = document.getElementById("overlayYes");

    const messages = [
        "ほんとにいいの？",
        "後悔しない？",
        "まだ考え直せるよ？",
        "本当に押すの？"
    ];

    let step = 0;

    noBtn.addEventListener("click", () => {
        overlay.classList.remove("hidden");
        showNextOverlay();
    });

    function showNextOverlay() {
        if (step < messages.length) {
            overlayText.textContent = messages[step];
            overlayText.style.opacity = 0.2;
            overlayText.style.transform = "scale(1)";
            setTimeout(() => {
                overlayText.style.opacity = 0.5;
                overlayText.style.transform = "scale(1.2)";
            }, 50);

            // はいボタンを大きくする
            overlayYes.style.transform = `scale(${1 + step * 0.5})`;

            step++;
        } else {
            // 最終段階
            overlayText.textContent = "もう…押して？";
            overlayYes.style.transform = "scale(3)";
        }
    }

    // オーバーレイの「はい」
    overlayYes.addEventListener("click", () => {
        overlayText.textContent = "ありがとう。これからもよろしくね。";
        overlayYes.style.display = "none";
    });
});
