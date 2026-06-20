document.addEventListener("DOMContentLoaded", () => {
    const lines = document.querySelectorAll(".line");
    let delay = 0;

    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = 1;
        }, delay);
        delay += 2000; // 2秒ごとに次の行を表示
    });
});
