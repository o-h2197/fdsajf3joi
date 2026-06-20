document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("container");

    const texts = [
        "あなたに伝えたいことがあります。<br>一番自分に合う形を考えたときに、この方法を取りました。<br>機械的でごめんなさい。",
        "思えば小学生から始まり、すごく長い付き合いになったね。",
        "あの頃、あなたにもらったラブレターから、あなたを意識しない日はなくなりました。",
        "恥ずかしくて、渡せず鞄に潜めていたラブレターの返事もあったな。。(ほんとごめん)",
        "改めて出会いなおして早3年.....",
        "日々笑い合ったり、時には、喧嘩をしたり。。",
        "その一つ一つの出来事を、あなたと迎えられることが幸せです。",
        "長くなりましたが、改めて。",
        "苗字、沖崎にしませんか"
    ];

    texts.forEach((t, i) => {
        const div = document.createElement("div");
        div.className = "line";
        if (i === texts.length - 1) div.classList.add("final");
        div.innerHTML = t;
        container.appendChild(div);
    });

    const lines = document.querySelectorAll(".line");
    let delay = 0;
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = 1;
            if (index === lines.length - 1) {
                setTimeout(() => {
                    document.getElementById("buttons").style.opacity = 1;
                }, 1500);
            }
        }, delay);
        delay += 2000;
    });

    /* ===== BGM ===== */
    const bgm = new Audio("bgm.mp3");
    bgm.loop = true;

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    function startBgm() {
        if (bgm.paused) bgm.play().catch(() => {});
    }

    /* ===== はいが押されたら共通で動く処理 ===== */
    function onYesPressed() {
        startBgm();

        overlayButtons.style.opacity = 0;
        overlayText.style.opacity = 0;

        setTimeout(() => {
            overlayText.textContent = "これからも、末永くすえながぁぁぁぁぁぁくよろしくお願いします。";
            overlayText.style.opacity = 1;
        }, 300);
    }

    /* ===== 最初のはい（オーバーレイを開くように修正） ===== */
    yesBtn.addEventListener("click", () => {
        startBgm();
    
        // ★ 最初のはいは、質問スキップして最終処理へ
        overlay.style.display = "flex";
        overlayBg.style.opacity = 1;
    
        onYesPressed();
    });

    /* ===== オーバーレイ ===== */

    const overlay = document.getElementById("overlay");
    const overlayBg = document.getElementById("overlayBg");
    const overlayText = document.getElementById("overlayText");
    const overlayButtons = document.getElementById("overlayButtons");
    const overlayYes = document.getElementById("overlayYes");
    const overlayNo = document.getElementById("overlayNo");
    const overlayContent = document.getElementById("overlayContent");

    const messages = [
        "結婚してくれるよね？",
        "え、、、？",
        "してくれる....よね？"
    ];

    let step = 0;
    let yesScale = 1;
    let escapeMode = false;

    /* ===== 最初のいいえ ===== */
    noBtn.addEventListener("click", () => {

        startBgm();
        document.getElementById("buttons").style.display = "none";

        overlay.style.display = "flex";
        setTimeout(() => overlayBg.style.opacity = 1, 10);

        step = 0;
        yesScale = 1;
        escapeMode = false;

        overlayNo.style.position = "relative";
        overlayNo.style.left = "0px";
        overlayNo.style.top = "0px";

        showNextMessage();
    });

    function showNextMessage() {
        overlayText.style.opacity = 0;
        overlayButtons.style.opacity = 0;

        setTimeout(() => {
            if (step < messages.length) {
                overlayText.textContent = messages[step];
                overlayText.style.opacity = 1;

                yesScale += 0.3;
                if (yesScale > 1.7) yesScale = 1.7;
                overlayYes.style.transform = `scale(${yesScale})`;

                setTimeout(() => overlayButtons.style.opacity = 1, 300);
                step++;
            } else {
                overlayText.textContent = "最後のチャンスです。結婚してくれますか？";
                overlayText.style.opacity = 1;

                escapeMode = true;

                const rect = overlayContent.getBoundingClientRect();
                const w = overlayNo.offsetWidth;
                const h = overlayNo.offsetHeight;

                overlayNo.style.position = "absolute";
                overlayNo.style.left = `${rect.width / 2 - w / 2}px`;
                overlayNo.style.top = `${rect.height - h - 40}px`;

                setTimeout(() => {
                    overlayButtons.style.opacity = 1;
                    overlayButtons.style.pointerEvents = "auto";
                }, 300);
            }
        }, 300);
    }

    /* ===== いいえの動作 ===== */
    overlayNo.addEventListener("click", () => {

        if (escapeMode) {
            warpNoButton();
            return;
        }

        overlayButtons.style.opacity = 0;
        setTimeout(showNextMessage, 300);
    });

    overlayNo.addEventListener("mousemove", () => {
        if (escapeMode) warpNoButton();
    });

    overlayNo.addEventListener("touchstart", () => {
        if (escapeMode) warpNoButton();
    });

    function warpNoButton() {
        const rect = overlayContent.getBoundingClientRect();
        const w = overlayNo.offsetWidth;
        const h = overlayNo.offsetHeight;

        const minX = 20;
        const maxX = rect.width - w - 20;
        const minY = rect.height / 2;
        const maxY = rect.height - h - 20;

        overlayNo.style.left = `${Math.random() * (maxX - minX) + minX}px`;
        overlayNo.style.top = `${Math.random() * (maxY - minY) + minY}px`;
    }

    /* ===== オーバーレイのはい（共通処理） ===== */
    overlayYes.addEventListener("click", () => {
        onYesPressed();
    });
});
