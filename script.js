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

    // 「いいえ」ボタンが逃げる
    const noBtn = document.getElementById("noBtn");

    noBtn.addEventListener("mouseover", () => {
        const x = Math.random() * 200 - 100; // -100〜100px
        const y = Math.random() * 200 - 100;

        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    });
});
