document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('backgroundMusic');
    audio.volume = 0.2; 

    document.getElementById('return').addEventListener('click', () => {
        // Play the sound
        const audioTwo = document.getElementById('pause');
        audioTwo.volume = 0.2;
        audioTwo.play();
    
        // Delay navigation
        setTimeout(() => {
            window.location.href = './index.html'; 
        }, 1000); 
    });


});