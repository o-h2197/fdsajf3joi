document.addEventListener("DOMContentLoaded", () => {

    /* ===== BGM ===== */
    const startBgm = new Audio("start.mp3");
    const yesBgm = new Audio("yes.mp3");
    const noBgm = new Audio("no.mp3");

    startBgm.loop = true;
    yesBgm.loop = true;
    noBgm.loop = true;

    function stopAllBgm() {
        [startBgm, yesBgm, noBgm].forEach(a => {
            a.pause();
            a.currentTime = 0;
        });
    }

    /* ===== 要素取得 ===== */
    const container = document.getElementById("container");
    const buttons = document.getElementById("buttons");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    const tapStart = document.getElementById("tapStart");

    const overlay = document.getElementById("overlay");
    const overlayBg = document.getElementById("overlayBg");
    const overlayText = document.getElementById("overlayText");
    const overlayButtons = document.getElementById("overlayButtons");
    const overlayYes = document.getElementById("overlayYes");
    const overlayNo = document.getElementById("overlayNo");
    const overlayContent = document.getElementById("overlayContent");

    /* ===== メインメッセージ（1行ずつ） ===== */
    const texts = [
        "あなたに伝えたいことがあります。",
        "一番自分に合う形を考えたときに、この方法を取りました。",
        "機械的でごめんなさい。",
        "思えば小学生から始まり、",
        "すごく長い付き合いになったね。",
        "あの頃、あなたにもらったラブレターから、",
        "あなたを意識しない日はなくなりました。",
        "渡せず鞄に潜めていたラブレターの返事もあったな。。(ほんとごめん)",
        "改めて出会いなおして早3年.....",
        "日々笑い合ったり、時には喧嘩をしたり、、",
        "日常にあなたが居て当たり前になりました。",
        "そんなわけで....改めて。",
        "同じ苗字を名乗るなんてどうでしょうか？"
    ];

    texts.forEach((t, i) => {
        const div = document.createElement("div");
        div.className = "line";
        if (i === texts.length - 1) div.classList.add("final");
        div.textContent = t;
        container.appendChild(div);
    });

    const lines = document.querySelectorAll(".line");

    /* ===== 自動縮小ロジック（初回のみ） ===== */
    let textFitted = false;

    function fitTextToWidth() {
        if (textFitted) return; // ← 2回目以降は実行しない

        lines.forEach(line => {
            const parentWidth = line.parentElement.offsetWidth;
            let fontSize = parseFloat(window.getComputedStyle(line).fontSize);

            while (line.scrollWidth > parentWidth && fontSize > 10) {
                fontSize -= 0.5;
                line.style.fontSize = fontSize + "px";
            }
        });

        textFitted = true;
    }

    window.addEventListener("load", fitTextToWidth);
    window.addEventListener("resize", fitTextToWidth);

    /* ===== フェードイン ===== */
    function startMainSequence() {
        let delay = 0;
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = 1;
                if (index === lines.length - 1) {
                    setTimeout(() => {
                        buttons.style.opacity = 1;
                    }, 1500);
                }
            }, delay);
            delay += 2000;
        });
    }

    /* ===== 最初のタップ ===== */
    let started = false;
    tapStart.addEventListener("click", () => {
        if (started) return;
        started = true;

        stopAllBgm();
        startBgm.play().catch(() => {});

        tapStart.style.display = "none";
        startMainSequence();
    });

    /* ===== はい共通処理 ===== */
    function onYesPressed() {
        stopAllBgm();
        yesBgm.play().catch(() => {});

        /* ① メイン文字をふわっと消す */
        document.querySelectorAll(".line").forEach(line => {
            line.style.transition = "opacity 1.2s ease";
            line.style.opacity = 0;
        });

        /* ② messageContainer（黒い縁）を少し遅れて消す */
        setTimeout(() => {
            const msgBox = document.getElementById("messageContainer");
            msgBox.style.transition = "opacity 1.2s ease";
            msgBox.style.opacity = 0;
        }, 600);

        /* ③ 背景を白い光に切り替える */
        setTimeout(() => {
            document.body.style.transition = "background-image 2s ease, background-color 2s ease";
            document.body.style.backgroundImage = 'url("background_yes.jpg")';
            document.body.style.backgroundColor = "rgba(255,255,255,0.8)";
        }, 600);

        /* ④ ボタン消す */
        overlayNo.style.display = "none";
        overlayButtons.style.display = "none";

        /* ⑤ オーバーレイ背景を柔らかく */
        overlayBg.style.transition = "opacity 1.5s ease";
        overlayBg.style.opacity = 0.3;

        /* ⑥ 「ありがとう」演出 */
        overlayText.style.opacity = 0;
        overlayText.style.transition = "opacity 2s ease, transform 2s ease";
        overlayText.style.transform = "translateY(10px)";

        setTimeout(() => {
            overlayText.innerHTML = `
                <span style="font-size:1.6rem; display:block; margin-bottom:12px;">
                    ありがとう。
                </span>
                <span style="font-size:1.2rem; opacity:0.9;">
                    これからも、よろしくお願いします！
                </span>
            `;
            overlayText.style.opacity = 1;
            overlayText.style.transform = "translateY(0)";
        }, 900);

        /* ⑦ 余韻の光 */
        setTimeout(() => {
            overlayBg.style.opacity = 0.15;
        }, 2500);
    }

    /* ===== いいえルート ===== */
    const messages = [
        "結婚してくれるよね？",
        "え、、、？",
        "してくれる....よね？"
    ];

    let step = 0;
    let yesScale = 1;
    let escapeMode = false;

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

    /* ===== 最初のはい ===== */
    yesBtn.addEventListener("click", () => {
        buttons.style.display = "none";
        overlay.style.display = "flex";
        overlayBg.style.opacity = 1;
        onYesPressed();
    });

    /* ===== 最初のいいえ ===== */
    noBtn.addEventListener("click", () => {
        stopAllBgm();
        noBgm.play().catch(() => {});

        buttons.style.display = "none";

        overlay.style.display = "flex";
        setTimeout(() => overlayBg.style.opacity = 1, 10);

        step = 0;
        yesScale = 1;
        escapeMode = false;

        overlayNo.style.display = "inline-block";
        overlayButtons.style.display = "flex";
        overlayButtons.style.opacity = 1;
        overlayYes.style.transform = "scale(1)";
        overlayNo.style.position = "relative";
        overlayNo.style.left = "0px";
        overlayNo.style.top = "0px";

        showNextMessage();
    });

    /* ===== オーバーレイのいいえ ===== */
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

    /* ===== オーバーレイのはい ===== */
    overlayYes.addEventListener("click", () => {
        onYesPressed();
    });
});
