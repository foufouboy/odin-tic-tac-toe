const Player = function(signArg) {
  const sign = signArg;
  
  const play = (field) => {
    // On récupère la case cliquée
    // On met le signe à l'intérieur
    // Et on le met aussi dans le tableau de la grille de Gameboard

    const caseNumber = +(field.getAttribute("data-attribute")) - 1;
    field.textContent = sign; 
    Gameboard.gridArray[caseNumber] = sign;

  }
  
  return {play, sign};
}

const Gameboard = (function() {
  const gridDisplay = document.querySelector(".grid");
  const gridFields = Array.from(document.querySelectorAll(".field"));
  const gridArray = ["", "", "", "", "", "", "", "", ""];
  
  let hasNoWinner = true;
  let isNotComplete = true;
  
  return {
    gridFields,
    gridArray,
    hasNoWinner,
    isNotComplete,
  };
  
})();

const Game = (function() {
  
  const players = [Player("O"), Player("X")];
  const output = document.querySelector(".output");
  const restartButton = document.querySelector(".restart-button");
  let toPlay = 0;
  
  const restart = () => {
    // On vide le plateau et
    // on met le tour au joueur X de jouer

    toPlay = 0;
    Gameboard.hasNoWinner = true;
    Gameboard.isNotComplete = true;
    Gameboard.gridArray = ["", "", "", "", "", "", "", "", ""];
    Gameboard.gridFields.forEach((field) => {
        field.textContent = "";
        field.style.color = "white";
    });
    output.textContent = `Player ${players[toPlay].sign}'s to play`;
    output.style.color = "white";
  }
  
  const init = () => {
    // On déclare les évènements sur les differents éléments de la grille visuelle
    // (Si on veut éventuellement encapsuler la fonction initiale pour l'appeler
    // dans l'espace global)
  }
  
  const positionCheck = () => {
    // À la fin de chaque tour, on vérifie la position (et on met à jour l'état du jeu)

    let winScheme = [];
    const possibleWins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    if (possibleWins.some((possibleWin) => {
        console.log(players[toPlay].sign);
        if (possibleWin.every(field => Gameboard.gridArray[field] === players[toPlay].sign)) {
            winScheme = possibleWin;
            return true;
        }
    })) {
        Gameboard.hasNoWinner = false;
        output.style.color = "rgb(99, 93, 199)";
        output.textContent = `Winner is... Player ${players[toPlay].sign}!`;

        winScheme.forEach((fieldNumber) => {
            Gameboard.gridFields[fieldNumber]
                .style
                .color = "rgb(99, 93, 199)";
        })
        return false;
    } 

    else if (Gameboard.gridArray.every(field => field !== "")) {
        isNotComplete = false;
        output.textContent = `That's a good ol' draw!`;
        return false;
    }

    return true;
  }
  
  output.textContent = `Player ${players[toPlay].sign}'s to play`;
  Gameboard.gridFields.forEach((field) => {
    field.addEventListener("click", (e) => {
      if (Gameboard.hasNoWinner && Gameboard.isNotComplete && !e.target.textContent) {
        console.log(e.target)
        let player = players[toPlay];
    
        player.play(e.target);
        if (positionCheck()) {
            (toPlay === 0) ? toPlay = 1 : toPlay = 0;
            output.textContent = `Player ${players[toPlay].sign}'s to play`;
        }

      } else {
        console.log("Nope !");
      }
    })
  });
  
  restartButton.addEventListener("click", restart);

})();

/*
 * Tic-Tac-Toe, V1
 *
 * Nous n'avons qu'une seule page avec 3 éléments principaux :
 * - La zone de message
 * - La grille
 * - Le bouton Restart
 * 
 * Le jeu commence dès l'affichage de la page. 
 * Clique sur le bouton Restart fait recommencer le jeu
 * (donc on le met dans le même état qu'au départ, sûrement la même option)
 *
 * On va avoir besoin de trois composants :
 * Le module qui contrôle le flux du jeu (les différents évenements rencontrés), [Game]
 * Le module de la grille de jeu [Gameboard]
 * Des objets joueurs [Player]
 *
 * Cela va s'articuler ainsi :
 *
 * Game initialise le jeu ;
 * Si restart est cliqué, on réinitialise le jeu;
 *
 * TANT QUE la grille n'est pas pleine ET qu'aucun joueur n'a gagné :
 * jouer()
 *
 * Jouer c'est :
 * Chacun son tour, les deux joueurs ajoutent la figure qui est la leur sur la grille
 * On renvoie à la fin de chaque tour l'état de la grille et on voit si on doit
 * arrêter le jeu ou non. */

