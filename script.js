let noClickCount = 0;

// Disable "Yes" button at the start
document.getElementById("yesBtn").disabled = true;

// Move "Yes" button away from the cursor (but keep inside screen)
function moveYesButton(event) {
    const yesBtn = document.getElementById("yesBtn");
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

// No Button Clicked
function noClicked() {
    noClickCount++;

    if (noClickCount === 1) {
        document.querySelector("h2").style.opacity = "0"; // Fade out
        setTimeout(() => {
            document.querySelector("h2").style.display = "none"; // Remove it
        }, 500); // Wait for fade effect
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
        document.getElementById("yesBtn").disabled = false; // Enable Yes button on last attempt
    }

    if (noClickCount === 10) {
        document.getElementById("noBtn").remove();
        const yesBtn = document.getElementById("yesBtn");
        yesBtn.style.position = "static"; // Put it back to normal
    }

    document.getElementById("sadViolin").play();
}

// Yes Button Clicked
function yesClicked() {
    if (noClickCount < 9) {
        return; // Do nothing if "No" hasn't been pressed 9 times
    }
    
    document.querySelector(".container").innerHTML = "<h1>Yay! I knew you'd say YES! ❤️🥰</h1>";
    confettiExplosion();
    document.getElementById("loveMoment").play();
    
    // Stop moving the "Yes" button
    document.removeEventListener("mousemove", moveYesButton);
    document.getElementById("yesBtn").style.position = "static"; // Reset position
}

// Confetti Effect
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

// Create Flower and Emoji Rain
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

// Heart Cursor Trail Effect
document.addEventListener("mousemove", (e) => {
    const trail = document.createElement("div");
    trail.classList.add("cursor-trail");
    trail.innerHTML = "❤️";
    trail.style.position = "absolute";
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    trail.style.fontSize = `${Math.random() * 15 + 15}px`; // Randomize size
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 1000); // Allow hearts to be visible for 1 second before fading
});