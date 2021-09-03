const Players = () => {
    let playerChoice = "";
    let choicesHistory = [];

    let winningConditionsMet = false;

    return { playerChoice, choicesHistory, winningConditionsMet };
};
let player1 = Players();
let player2 = Players();

const Gameboard = (() => {

    let boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return { boardArray, winningConditions };

})();

const Gameflux = (() => {
    const cells = document.querySelectorAll('.cells');

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            player1.playerChoice = cell.id;
            let playerChoiceArrayElement = Number(player1.playerChoice[4]);


            if (Gameboard.boardArray.includes(playerChoiceArrayElement)) {
                Gameboard.boardArray.splice(Gameboard.boardArray.indexOf(playerChoiceArrayElement), 1); // cells selected by the players are removed from the array of possible choices. 
                player1.choicesHistory.push(playerChoiceArrayElement) // records the player selections.
                document.querySelector(`#${cell.id} > p`).innerHTML = "X";
                player2.playerChoice = Gameboard.boardArray[Math.floor(Math.random() * Gameboard.boardArray.length)]; // Computer play. Its inside this IF to avoid a move by the computer, even when a player choose a illegal move i.e. click on an already filled cell.
            }

            if (Gameboard.boardArray.includes(player2.playerChoice)) {
                Gameboard.boardArray.splice(Gameboard.boardArray.indexOf(player2.playerChoice), 1); // cells selected by the players are removed from the array of possible choices. 
                player2.choicesHistory.push(player2.playerChoice) // records the player selections.
                document.querySelector(`#cell${player2.playerChoice} > p`).innerHTML = "O";
            }

            // Checkes which player met the winningConditions first, then print the winner and reset the game.
            for (let i = 0; i < Gameboard.winningConditions.length; i++) {

                player1.winningConditionsMet = Gameboard.winningConditions[i].every((val) => player1.choicesHistory.includes(val));
                if (player1.winningConditionsMet == true) {
                    alert('Player1 is the winner!');
                };
                player2.winningConditionsMet = Gameboard.winningConditions[i].every((val) => player2.choicesHistory.includes(val));
                if (player2.winningConditionsMet == true) {
                    alert('Player2 is the winner!');
                };
                if (player1.winningConditionsMet == true || player2.winningConditionsMet == true || Gameboard.boardArray.length == 0) {
                    if (Gameboard.boardArray.length == 0) { alert('Tie!') };
                    player1.choicesHistory = [];
                    player2.choicesHistory = [];
                    Gameboard.boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

                    cells.forEach((cell) => { document.querySelector(`#${cell.id} > p`).innerHTML = "" });
                };
            };
        });
    });
    return { Gameboard, player1, player2 };
})();