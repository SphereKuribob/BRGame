document.addEventListener('DOMContentLoaded', () => {
    /*high score calc*/
    let highScore = localStorage.getItem('highScore');

    if(highScore === null) {
      highScore = 0
    } else {
      highScore = parseInt(highScore);
    }

    let endScore = "000000";

    if(localStorage.getItem('score') !== null) {
        endScore = localStorage.getItem('score').toString().padStart(6,'0');
        if(endScore > highScore) {
          highScore = endScore;
          localStorage.setItem('highScore', highScore);
        }
        
    }

    highScore = localStorage.getItem('highScore').toString().padStart(6,'0');
    document.getElementById('high').innerHTML = `<h1>${highScore}</h1>`;
    document.getElementById('show').innerHTML = `<h1>${endScore}</h1>`;

    /*hard mode calc*/
    if(highScore > 50) {
      localStorage.setItem('hardVal', 'true');
    } else {
      localStorage.setItem('hardVal', 'false');
    }

    /*Mode Calculations */

    let modeWord = "Normal";
    let hardWord = localStorage.getItem('hardEnable') === 'true';
    let timeWord = localStorage.getItem('timeEnable') === 'true';

    if(hardWord) {
      modeWord =  "Hard";
    } else if (timeWord) {
      modeWord = "Time Attack";
    } else {
      modeWord = "Normal";
    }

    document.getElementById('mode').innerHTML = `<h1>${modeWord}</h1>`;

 

    // button hover stuff and bat
    const batGif1 = document.querySelector('#batGif img');
    const batGif2 = document.querySelector('#batGif2 img');
    const batGif3 = document.querySelector('#batGif3 img');
  

    const continueButton = document.querySelector('#continue button');
    const titleButton = document.querySelector('#title button');
    const helpButton = document.querySelector('#help button');
  
  
    continueButton.addEventListener('mouseenter', () => {
      batGif1.style.visibility = 'visible';
    });
    continueButton.addEventListener('mouseleave', () => {
      batGif1.style.visibility = 'hidden';
    });
  
    titleButton.addEventListener('mouseenter', () => {
      batGif2.style.visibility = 'visible';
    });
    titleButton.addEventListener('mouseleave', () => {
      batGif2.style.visibility = 'hidden';
    });
  
    helpButton.addEventListener('mouseenter', () => {
      batGif3.style.visibility = 'visible';
    });
    helpButton.addEventListener('mouseleave', () => {
      batGif3.style.visibility = 'hidden';
    });

    continueButton.addEventListener('click', () => {
        window.location.href ="./game.html"
    });

    titleButton.addEventListener('click', () => {
        window.location.href ="./index.html"
    });

    helpButton.addEventListener('click', () => {
        window.location.href ="./help.html"
    });



});
