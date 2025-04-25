const words = ["apple", "banana", "grape", "orange", "peach"];
let secret = words[Math.floor(Math.random() * words.length)];
let attempts = 5;

console.log("Secret Word:", secret);
document.getElementById("hint-letter").textContent = secret.charAt(0).toUpperCase();

document.getElementById("submitBtn").addEventListener("click", guessWord);
document.getElementById("restartBtn").addEventListener("click", restartGame);
document.getElementById("userGuess").addEventListener("keydown", e => {
  if (e.key === "Enter") guessWord();
});

document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

function guessWord() {
  const input = document.getElementById("userGuess").value.trim().toLowerCase();
  const msg = document.getElementById("message");

  if (!input) {
    attempts--;
    msg.textContent = `⚠️ Please enter a guess! ${attempts} ${attempts === 1 ? "try" : "attempts"} left.`;
    msg.style.color = "#e65100";
  } else if (input === secret) {
    msg.textContent = "🎉 Congratulations! You guessed the secret word!";
    msg.style.color = "green";
    document.body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--success-bg');
    launchConfetti();
    endGame();
  } else {
    attempts--;
    if (attempts > 0) {
      msg.textContent = `❌ Incorrect guess. You have ${attempts} ${attempts === 1 ? "try" : "attempts left."} Try again!`;
      msg.style.color = "#d84315";
    } else {
      msg.textContent = `💀 Game over! The secret word was '${secret}'.`;
      msg.style.color = "red";
      document.body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--fail-bg');
      endGame();
    }
  }

  document.getElementById("userGuess").value = "";
}

function endGame() {
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("restartBtn").style.display = "inline-block";
}

function restartGame() {
  secret = words[Math.floor(Math.random() * words.length)];
  attempts = 5;
  document.getElementById("userGuess").value = "";
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("message").textContent = "";
  document.getElementById("hint-letter").textContent = secret.charAt(0).toUpperCase();
  document.body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--main-bg');
  console.log("Secret Word:", secret);
}

function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;
  const canvas = document.getElementById('confettiCanvas');
  const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });

  (function frame() {
    myConfetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff80ab', '#ea80fc', '#b388ff', '#8c9eff']
    });
    myConfetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff80ab', '#ea80fc', '#b388ff', '#8c9eff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
