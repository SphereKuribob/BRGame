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
    
    // Create a div to display coordinates
    const coordDiv = document.createElement('div');
    coordDiv.style.position = 'fixed';
    coordDiv.style.top = '10px';
    coordDiv.style.left = '10px';
    coordDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    coordDiv.style.color = 'white';
    coordDiv.style.padding = '5px';
    coordDiv.style.zIndex = '10000';
    document.body.appendChild(coordDiv);

    // Update coordinates on mouse move
    document.addEventListener('mousemove', function(event) {
        coordDiv.textContent = `X: ${event.pageX}, Y: ${event.pageY}`;
    });

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

    /*score variable*/
    let score = 0;

    /*time variable*/
    let timeVal = 60;
    let timeMax = 60;

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
                window.location.href = './help.html';
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timeInterval);
        
        if(score >= 55) {
            timeVal = 3;
        }else if(score % 5 === 0) {
            timeVal = Math.max(60 -score, 3);
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
           resetTimer();

        } else {
            // Incorrect guess: redirect to game over page
            window.location.href = './help.html';
        }
    }

    // Attach event listeners to buttons
    document.querySelector('#safeOne').addEventListener('click', () => handleButtonClick('safeOne'));
    document.querySelector('#safeTwo').addEventListener('click', () => handleButtonClick('safeTwo'));
    document.querySelector('#safeThree').addEventListener('click', () => handleButtonClick('safeThree'));
    document.querySelector('#safeFour').addEventListener('click', () => handleButtonClick('safeFour'));
    document.querySelector('#safeFive').addEventListener('click', () => handleButtonClick('safeFive'));

    timeTally.innerHTML = `<h1>${timeVal}</h1>`;
    timeStart();


});
