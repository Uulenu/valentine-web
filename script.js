let noClickCount = 0;
document.getElementById("yesBtn").disabled = true;
document.getElementById("noBtn").disabled = true;

document.addEventListener("DOMContentLoaded", function () {
    const introMusic = document.getElementById("introMusic");
    const keynoteVideo = document.getElementById("keynoteVideo");
    function startMusic() {
        introMusic.play().catch(error => console.log("Autoplay blocked:", error));
        document.removeEventListener("click", startMusic);
    }

    document.addEventListener("click", startMusic);
    // Play the "Get Ready" screen for 5 seconds
    setTimeout(() => {
        document.getElementById("slideContainer").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("slideContainer").style.display = "none";
            introMusic.pause();
            introMusic.currentTime = 0;

            // Show the video and enable controls
            keynoteVideo.style.display = "block";
            keynoteVideo.play();

            // When the video ends, show the main content
            keynoteVideo.addEventListener("ended", function () {
                keynoteVideo.style.display = "none";
                document.getElementById("mainContainer").style.display = "flex";
                document.getElementById("noBtn").disabled = false;
            });

        }, 10); // Fade out duration
    }, 6500); // "Get Ready" screen duration
});

function moveYesButton(event) {
    const yesBtn = document.getElementById("yesBtn");
    if (yesBtn.disabled) return;

    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const yesBtnRect = yesBtn.getBoundingClientRect();
    const yesBtnX = yesBtnRect.left + yesBtnRect.width / 2;
    const yesBtnY = yesBtnRect.top + yesBtnRect.height / 2;

    const distanceX = cursorX - yesBtnX;
    const distanceY = cursorY - yesBtnY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 100) {
        const maxX = window.innerWidth - yesBtn.offsetWidth - 20;
        const maxY = window.innerHeight - yesBtn.offsetHeight - 50;
        const newX = Math.random() * maxX;
        const newY = Math.min(Math.random() * maxY + 100, maxY);

        yesBtn.style.position = "absolute";
        yesBtn.style.left = newX + "px";
        yesBtn.style.top = newY + "px";
    }
}

function noClicked() {
    noClickCount++;

    if (noClickCount === 1) {
        document.querySelector("h2").style.opacity = "0";
        setTimeout(() => {
            document.querySelector("h2").style.display = "none";
        }, 500);
    }

    const messages = [
        "Are you serious? 😳",
        "Think again! 😡",
        "You must be joking! 🤨",
        "Guess you pressed the wrong one! 😏",
        "Think agaiiiiiiiiinnnnn🙂‍↕️",
        "Last chance! 🥺",
        "Fine, I'll make the 'Yes' button BIGGER! 😂",
        "Really?! You're still pressing No? 😭",
        "You're breaking my heart 💔🥹",
        "No more 'No' for you! 😈"
    ];

    document.getElementById("question").innerText = messages[Math.min(noClickCount - 1, messages.length - 1)];

    if (noClickCount <= 5) {
        document.getElementById("yesBtn").classList.add("unclickable");
        document.addEventListener("mousemove", moveYesButton);
    } else {
        document.getElementById("yesBtn").classList.remove("unclickable");
        document.removeEventListener("mousemove", moveYesButton);
    }

    if (noClickCount === 9) {
        document.getElementById("yesBtn").disabled = false;
    }

    if (noClickCount === 10) {
        document.getElementById("noBtn").remove();
        const yesBtn = document.getElementById("yesBtn");
        yesBtn.style.position = "static";
    }

    document.getElementById("sadViolin").play();
}

function yesClicked() {
    if (noClickCount < 9) {
        return;
    }

    document.querySelector(".container").innerHTML = "<h1>Yay! I knew you'd say YES! ❤️🥰</h1>";
    confettiExplosion();
    document.getElementById("loveMoment").play();

    document.removeEventListener("mousemove", moveYesButton);
    document.getElementById("yesBtn").style.position = "static";
}

function confettiExplosion() {
    const confettiContainer = document.getElementById("confettiContainer");
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

function createFlower() {
    const emojis = ["🌹", "😘", "🍇", "🍫", "❤️‍🔥"];
    emojis.forEach((emoji) => {
        const flower = document.createElement("div");
        flower.innerHTML = emoji;
        flower.classList.add("flower");
        flower.style.left = Math.random() * 100 + "vw";
        flower.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.getElementById("flowerContainer").appendChild(flower);
        setTimeout(() => flower.remove(), 5000);
    });
}

setInterval(createFlower, 300);

document.addEventListener("mousemove", (e) => {
    const trail = document.createElement("div");
    trail.classList.add("cursor-trail");
    trail.innerHTML = "❤️";
    trail.style.position = "absolute";
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    trail.style.fontSize = `${Math.random() * 15 + 15}px`;
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 1000);
});