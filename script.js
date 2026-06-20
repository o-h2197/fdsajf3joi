// 一行ずつフェードイン
document.addEventListener("DOMContentLoaded", () => {
    const lines = document.querySelectorAll(".line");
    let delay = 0;

    lines.forEach((line) => {
        setTimeout(() => {
            line.style.opacity = 1;
        }, delay);
        delay += 2000;
    });

    // 「はい」ボタン
    const yesBtn = document.getElementById("yesBtn");
    const yesMessage = document.getElementById("yesMessage");

    yesBtn.addEventListener("click", () => {
        yesMessage.classList.remove("hidden");
    });

    // 「いいえ」ボタン（段階式）
    const noBtn = document.getElementById("noBtn");
    let noCount = 0;

    const messages = [
        "ほんとにいいの？",
        "後悔しない？",
        "もう一度考えて？",
        "押さない方がいいと思うよ？"
    ];

    noBtn.addEventListener("click", () => {
        noCount++;

        if (noCount <= messages.length) {
            // メッセージを切り替える
            noBtn.textContent = messages[noCount - 1];
        } else {
            // 5回目以降は逃げるモード
            noBtn.textContent = "逃げるよ！";
        }
    });

    // 逃げる動き（5回目以降のみ）
    noBtn.addEventListener("mouseover", () => {
        if (noCount > messages.length) {
            const x = Math.random() * 300 - 150;
            const y = Math.random() * 300 - 150;
            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
});
