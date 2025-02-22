document.addEventListener('DOMContentLoaded', () => {

    const ui = document.querySelector('.ui')

    new ResizeObserver(() => {
        document.documentElement.style.setProperty("--scale", Math.min(
            ui.parentElement.offsetWidth / ui.offsetWidth, 
            ui.parentElement.offsetHeight / ui.offsetHeight
        ))
    }).observe(ui.parentElement)

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
        if(timeCount % 2 == 0) {
            const audioTwo = new Audio('./audio/pause.mp3');
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
        } else {
            const audioThree = new Audio('./audio/wrong.mp3');
            audioThree.volume = 0.9;
            audioThree.play()
        }
        
    });

    if(count % 2 === 0) {
        hardMode.textContent = 'Hard: No'
        localStorage.setItem('hardEnable', 'false');
    } else {
        hardMode.textContent = 'Hard: Yes'
        localStorage.setItem('hardEnable', 'true');
    }

    /*Time Attack Button Prompts*/

    let timeCount = 0;
    const timeMode = document.getElementById('alt');

    timeMode.addEventListener('click', () => {
      
        if(count % 2 === 0) {
            timeCount ++;
            const audioTwo = new Audio('./audio/pause.mp3');
            audioTwo.volume = 0.2;
            audioTwo.play();
            if(timeCount % 2 === 0) {
                timeMode.textContent = 'Time Attack: No'
                localStorage.setItem('timeEnable', 'false');
            } else if(count % 2 === 0) { 
                timeMode.textContent = 'Time Attack: Yes'
                localStorage.setItem('timeEnable', 'true');
            }
        } else {
                const audioThree = new Audio('./audio/wrong.mp3');
                audioThree.volume = 0.9;
                audioThree.play()
        }
    });

    if(timeCount % 2 === 0) {
        timeMode.textContent = 'Time Attack: No'
        localStorage.setItem('timeEnable', 'false');
    } else {
        timeMode.textContent = 'Time Attack: Yes'
        localStorage.setItem('timeEnable', 'true');
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
