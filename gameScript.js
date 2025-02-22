document.addEventListener('DOMContentLoaded', () => {
    // Set up background music
    const audio = document.getElementById('backgroundMusic');
    audio.volume = 0.2; 

    let isMusicStarted = false;
    function startMusic() {
        if (!isMusicStarted) {
            audio.play().catch(error => {
                console.error("Audio playback failed: ", error);
            });
            isMusicStarted = true; // Ensure it only plays once
        }
    }
    
    const positions = [
        { left: '825px', top: '82px' },   // Position 1
        { left: '604px', top: '138px' }, // Position 2
        { left: '1039px', top: '138px' },// Position 3
        { left: '1088px', top: '414px' },// Position 4
        { left: '544px', top: '414px' }, // Position 5
        { left: '825px', top: '460px' }  // Position 6
    ];

    const dracImg = document.querySelector('.dracImg');
    const scoreTally = document.getElementById('scoreTally');
    const timeTally = document.getElementById('timeTally'); 
    const hardEnable = localStorage.getItem('hardEnable') === 'true';
    const timeEnable = localStorage.getItem('timeEnable') === 'true';

    /*score variable*/
    let score = 0;

    /*time variable*/
    let timeVal = 30;
    let timeMax = 30;

    if(hardEnable) {
        timeval = 2;
        timeMax = 2;
    }

    if(timeEnable) {
        timeval = 60;
        timeMax = 60;
    }

    /*drac variables*/
    let currentDracPosition = positions[0];
    dracImg.style.left = currentDracPosition.left;
    dracImg.style.top = currentDracPosition.top;

    // Button-to-expected-position mapping
    const buttonMappings = {
        safeOne: positions[0],  
        safeTwo: positions[4],  
        safeThree: positions[1], 
        safeFour: positions[2], 
        safeFive: positions[3], 
    }

    /*Timer Logic */

    function timeStart() {
        timeInterval = setInterval(() => {
            timeVal--;
            timeTally.innerHTML = `<h1>${timeVal}</h1>`;

            if(timeVal <= 0) {
                clearInterval(timeInterval);
                const audioTwo = document.getElementById('goSound');
                audioTwo.volume = 0.2;
                audioTwo.play();
                audio.volume = 0.0;
                hideAllButtons();
                localStorage.setItem('score', score);
                setTimeout(() => {
                    window.location.href = './endScreen.html';
                }, 4500); 
                
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timeInterval);
        
        if(score >= 25) {
            timeVal = 3;
        }else if(score % 5 === 0 && !hardEnable && !timeEnable) {
            timeVal = Math.max(30 -score, 3);
            timeMax = timeVal;
        }else {
            timeVal = timeMax;
        }
        timeTally.innerHTML = `<h1>${timeVal}</h1>`;
        timeStart();
    }

    /* Score and button logic */
    function handleButtonClick(buttonId) {
        startMusic();
        const expectedPosition = buttonMappings[buttonId];

        if ((currentDracPosition.left === expectedPosition.left && currentDracPosition.top === expectedPosition.top) || (buttonId === 'safeThree' && currentDracPosition === positions[5])) {
            // Correct guess: randomize Dracula's position
            const otherPositions = positions.filter(pos => pos !== currentDracPosition);
            const randomIndex = Math.floor(Math.random() * otherPositions.length);
            currentDracPosition = otherPositions[randomIndex];
            dracImg.style.left = currentDracPosition.left;
            dracImg.style.top = currentDracPosition.top;
            score++;
            document.getElementById('scoreTally').innerHTML=`<h1>${score}</h1>`;
           /*
            timer = 60
            if score mod 5 == 0 && score <= 54
                timner-=score;
            else 
                timer = 5;
            */
           if(!timeEnable) {
            resetTimer();
           }

        } else {
         
            const audioThree = document.getElementById('goSound');
            audioThree.volume = 0.2;
            audioThree.play();
            audio.volume = 0.0;
            hideAllButtons();
            clearInterval(timeInterval);
            localStorage.setItem('score', score);
            setTimeout(() => {
                window.location.href = './endScreen.html';
            }, 4500); 
        }
    }

    
    document.querySelector('#safeOne').addEventListener('click', () => handleButtonClick('safeOne'));
    document.querySelector('#safeTwo').addEventListener('click', () => handleButtonClick('safeTwo'));
    document.querySelector('#safeThree').addEventListener('click', () => handleButtonClick('safeThree'));
    document.querySelector('#safeFour').addEventListener('click', () => handleButtonClick('safeFour'));
    document.querySelector('#safeFive').addEventListener('click', () => handleButtonClick('safeFive'));

    timeTally.innerHTML = `<h1>${timeVal}</h1>`;
    timeStart();


    window.onload = () => {
      
        
        score = 0;

        timeVal = 30;

        if(hardEnable) {
            timeVal = 2;
        }
        if(timeEnable) {
            timeVal = 60;
        }
    
       
        document.getElementById('scoreTally').innerHTML = `<h1>${score}</h1>`;
        document.getElementById('timeTally').innerHTML = `<h1>${timeVal}</h1>`;
    };

    function hideAllButtons() {
        const buttons = document.querySelectorAll('button'); 
        buttons.forEach(button => {
            button.style.display = 'none'; 
        });
    }
     /*Mute button logic*/

     const sound = document.getElementById('sound');
     let soundCount = 0;
 
     sound.addEventListener('click', () => {
         soundCount++;
        
         if (soundCount % 2 !== 0) {
             audio.volume = 0;
             sound.style.backgroundImage = "url('./images/soundOff.png')";
         } else {
             audio.volume = 0.2;
             sound.style.backgroundImage = "url('./images/soundOn.png')";
         }
     });
 
     if (soundCount % 2 !== 0) {
         audio.volume = 0;
         sound.style.backgroundImage = "url('./images/soundOff.png')";
     } else {
         audio.volume = 0.2;
         sound.style.backgroundImage = "url('./images/soundOn.png')";
     }
 
});
