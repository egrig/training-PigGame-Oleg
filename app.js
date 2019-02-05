/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, unactivePlayer, gamePlaying;

init();
var score=0;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM1 = document.querySelector('#dice1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        var diceDOM2 = document.querySelector('#dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        document.getElementById('player1').style.display = 'none';
        document.getElementById('player2').style.display = 'none';


        //3. Update the round score IF the rolled number was NOT a 1
        if ((dice1 !== 1 && dice2 !== 1) && (dice1 !== 6 || dice2 !== 6)) {
            //Add score
            roundScore = roundScore + dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    } 
    if (score <= 0 || score % 1 !== 0){
        alert('The input field value is incorrect');
        init();
    }    
});

function nextPlayer() {
    //Next player
    if (activePlayer === 0){
        activePlayer = 1;
        unactivePlayer = 0;
    } else {
        activePlayer = 0;
        unactivePlayer = 1;
    }
    //activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

}

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= score) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#name-' + unactivePlayer).textContent = 'loser!';
            document.getElementById('dice1').style.display = 'none';
            document.getElementById('dice2').style.display = 'none';
            document.getElementById('player1').style.display = 'inline';
            document.getElementById('player2').style.display = 'inline';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + unactivePlayer + '-panel').classList.add('looser');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
    if (score <= 0){
        alert("You can't hold, because the game has not began!");
        init();
    }
});


//Edward Grigorovich

document.querySelector('.btn-new').addEventListener('click', init)
function init() {
    scores = [0, 0];
    activePlayer = 0;
    unactivePlayer = 1;
    roundScore = 0;
    gamePlaying = true;
    // score = 0;
    score = document.getElementById('input').value;
    
    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = document.getElementById('player1').value;
    document.getElementById('name-1').textContent = document.getElementById('player2').value;
    if (document.getElementById('player1').value == "" ){
        document.getElementById('name-0').textContent = "Player1";
    }
    if (document.getElementById('player2').value == ""){
        document.getElementById('name-1').textContent = "Player2";
    }
    // document.getElementById('name-0').textContent = 'Player 1';
    // document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('looser');
    document.querySelector('.player-1-panel').classList.remove('looser');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

// document.getElementById('name-0').textContent = document.getElementById('player1').value;
