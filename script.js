document.addEventListener('DOMContentLoaded', () => {

     // Set up background music
     const audioMain = document.getElementById('road');
     audioMain.volume = 0.2; 
 

    /*Hard Mode Button Prompts*/
    let count = 0;
    const hardMode = document.getElementById('hard');

    let hardVal = localStorage.getItem('hardVal') === 'true';

    if(hardVal) {
        hardMode.style.visibility = 'visible';
    } else {
        hardMode.style.visibility = 'hidden';
    }

    hardMode.addEventListener('click', () => {
        const audioTwo = new Audio('./audio/pause.MP3');
        audioTwo.volume = 0.2;
        audioTwo.play();
        count ++;
        if(count % 2 === 0) {
            hardMode.textContent = 'Hard: No'
            localStorage.setItem('hardEnable', 'false');
        } else {
            hardMode.textContent = 'Hard: Yes'
            localStorage.setItem('hardEnable', 'true');
        }
        
    });

    if(count % 2 === 0) {
        hardMode.textContent = 'Hard: No'
        localStorage.setItem('hardEnable', 'false');
    } else {
        hardMode.textContent = 'Hard: Yes'
        localStorage.setItem('hardEnable', 'true');
    }



    /* this was programmed before I knew I could just make these constants */
    document.getElementById('player').addEventListener('click', () => {
        // Play the sound
        const audio = document.getElementById('playSound');
        audio.volume = 0.2;
        audio.play();
        audioMain.volume = 0.0;

        // Delay navigation
        setTimeout(() => {
            window.location.href = './game.html'; 
        }, 3000); 
    });

    document.getElementById('helper').addEventListener('click', () => {
        // Play the sound
        const audio = document.getElementById('playSound');
        audio.volume = 0.2;
        audio.play();
        audioMain.volume = 0.0;

        // Delay navigation
        setTimeout(() => {
            window.location.href = './help.html'; 
        }, 3000); 
    });

    /*Mute button logic*/

    const sound = document.getElementById('sound');
    let soundCount = 0;

    sound.addEventListener('click', () => {
        soundCount++;
       
        if (soundCount % 2 !== 0) {
            audioMain.volume = 0;
            sound.style.backgroundImage = "url('./images/soundOff.png')";
        } else {
            audioMain.volume = 0.2;
            sound.style.backgroundImage = "url('./images/soundOn.png')";
        }
    });

    if (soundCount % 2 !== 0) {
        audioMain.volume = 0;
        sound.style.backgroundImage = "url('./images/soundOff.png')";
    } else {
        audioMain.volume = 0.2;
        sound.style.backgroundImage = "url('./images/soundOn.png')";
    }
});
