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

            player1.playerChoice = Number(cell.id[4]);

            if (Gameboard.boardArray.includes(player1.playerChoice)) {

                // cells selected by the players are removed from the array of possible choices.
                Gameboard.boardArray.splice(Gameboard.boardArray.indexOf(player1.playerChoice), 1);
                // records the player selections. 
                player1.choicesHistory.unshift(player1.playerChoice)

                document.querySelector(`#${cell.id} > p`).innerHTML = "X";

                // Its inside this IF to avoid an illegal move by the computer if the user clicks on an already filled cell.
                computerPlay("easy");
            }

            if (Gameboard.boardArray.includes(player2.playerChoice)) {

                // cells selected by the players are removed from the array of possible choices. 
                Gameboard.boardArray.splice(Gameboard.boardArray.indexOf(player2.playerChoice), 1);
                // records the player selections.
                player2.choicesHistory.unshift(player2.playerChoice);

                document.querySelector(`#cell${player2.playerChoice} > p`).innerHTML = "O";
            }

            winnerCheck();

        });
    });
    // Checks which player met the winningConditions first, then prints the winner and reset the game.
    const winnerCheck = () => {

        for (let i = 0; i < Gameboard.winningConditions.length; i++) {
            player1.winningConditionsMet = Gameboard.winningConditions[i].every((elemt) => player1.choicesHistory.includes(elemt));
            if (player1.winningConditionsMet == true) {
                break;
            };
            player2.winningConditionsMet = Gameboard.winningConditions[i].every((elemt) => player2.choicesHistory.includes(elemt));
            if (player2.winningConditionsMet == true) {
                break;
            };
        };
        if (player1.winningConditionsMet == true) {
            alert('Player1 is the winner!');
            resetGame(cells);
        } else if (player2.winningConditionsMet == true) {
            alert('Player2 is the winner!');
            resetGame(cells);
        } else if (Gameboard.boardArray.length == 0) {
            alert('Tie!');
            resetGame(cells);
        };
    };
    const resetGame = (gridHtml) => {
        player1.choicesHistory = [];
        player2.choicesHistory = [];
        Gameboard.boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        gridHtml.forEach((cell) => { document.querySelector(`#${cell.id} > p`).innerHTML = "" });
    };
    const computerPlay = (level) => {
        let counter = 0;
        const check = (elemt) => {
            counter += 1;
            console.log(counter);
            return player2.choicesHistory.includes(elemt);
        };
        if (level = "easy") {
            player2.playerChoice = Gameboard.boardArray[Math.floor(Math.random() * Gameboard.boardArray.length)];
        } else if (leve = "medium") {
            player2.winningConditionsMet = Gameboard.winningConditions[i].every((elemt) => check(elemt));
        } else {

        };
    };
    return { Gameboard, player1, player2 };
})();