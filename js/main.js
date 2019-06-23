const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const close = document.getElementById('close');


const scoreboard = {
	player: 0,
	computer: 0
}

// Play Game
function play(e) {
	restart.style.display = 'inline-block';
	const playerChoice = e.target.id;
	const cptChoice = getCptChoice();
	const winner = getWinner(playerChoice, cptChoice);
	showWinner(winner, cptChoice, playerChoice);	
}

// Get Computer Choice
function getCptChoice() {
	const rand = Math.random();
	if (rand < 0.34) {
		return 'rock';
	} else if (rand <= 0.67) {
		return 'paper';
	} else {
		return 'scissors';
	}
}

// Get game winner
function getWinner(p, c) {
	if (p === c) {
		return 'nobody';
	} else if (p === 'rock') {
		if (c === 'paper') {
			return 'computer';
		} else {
			return 'player';
		}
	} else if (p === 'paper') {
		if (c === 'scissors') {
			return 'computer';
		} else {
			return 'player';
		}
	} else if (p = 'scissors') {
		if (c === 'rock') {
			return 'computer';
		} else {
			return 'player';
		}
	}
}

// Show Winner
function showWinner(winner, cptChoice, playerChoice) {

	const scoreResult = `
		<i class = "modal-choice fas fa-hand-${playerChoice} fa-10x"></i>
		<span class="vs">vs</span>
		<i class = "modal-choice fas fa-hand-${cptChoice} fa-10x"></i>
		<p>Computer chose <strong>
			${cptChoice.charAt(0).toUpperCase() + cptChoice.slice(1)}
		</strong></p>
	`;

	if (winner === 'player') {
		// Inc player score
		scoreboard.player++;
		// Show modal result
		let res = result.innerHTML = `<h1 class = "text-win">You Win</h1>` + scoreResult;
	} else if (winner === 'computer') {
		// Inc computer score
		scoreboard.computer++;
		// Show modal result
		let res = result.innerHTML = `<h1 class = "text-lose">You Lose</h1>` + scoreResult;
	} else {
		let res = result.innerHTML = `<h1 class = "text-draw">Its a Draw</h1>` + scoreResult;
	}
	// Show Score
	score.innerHTML = `
		<p>Player: ${scoreboard.player}</p>
		<p>Computer: ${scoreboard.computer}</p>
	`;

	modal.style.display = 'block';

	// console.log(result);
}

// Restart Game
function restartGame() {
	scoreboard.player = 0;
	scoreboard.computer = 0;
	score.innerHTML = `
		<p>Player: 0</p>
		<p>Computer: 0</p>
	`;
}

// Clear Modal
function clearModal(e) {
	if (e.target == modal || e.target == close) {
		modal.style.display = 'none';
	}
}

// Event Listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
close.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);