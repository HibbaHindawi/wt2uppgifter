/* Uppgift U3 */
/*------------Globala Variabel------------*/
let newBtn; // Knappen för ett nytt spel
let newTilesBtn; // Knappen för nya brickor
let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]; //Array med alla tal som ska finnas med
let tilesCopy; //Kopierar arrayen
let currentTiles = 0; //Kontrollpunkt för funktionen newTiles

/*------------Funktioner------------*/
// Funktion som anropas när sidan laddas in
function init(){
    newBtn = document.querySelector("#newGameBtn");
    newTilesBtn = document.querySelector("#newTilesBtn");
    newBtn.addEventListener("click", newGame);
    newTiles.disabled = true;
}
window.addEventListener("load", init);

//Initerar ett nytt spel
function newGame(){
    newBtn.disabled = true;
    newTiles.disabled = false;
    console.log("initializing new game")
    tilesCopy = tiles.slice(0);
}

//Avslutar spelet
function endGame(){
    newBtn.disabled = false;
}

function newTiles(){
    if (currentTiles == 0) {
        
        currentTiles = 4;
    }
    else{
        return;
    }
}

