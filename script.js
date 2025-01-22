document.getElementById('player').addEventListener('click', () => {
    // Play the sound
    const audio = document.getElementById('playSound');
    audio.volume = 0.2;
    audio.play();

    // Delay navigation
    setTimeout(() => {
        window.location.href = 'http://127.0.0.1:5500/game.html'; // Replace with your target page
    }, 3000); // 2000ms delay (2 seconds)
});

document.getElementById('helper').addEventListener('click', () => {
    // Play the sound
    const audio = document.getElementById('playSound');
    audio.volume = 0.2;
    audio.play();

    // Delay navigation
    setTimeout(() => {
        window.location.href = 'http://127.0.0.1:5500/help.html'; // Replace with your target page
    }, 3100); // 2000ms delay (2 seconds)
});

