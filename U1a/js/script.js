/* Uppgift U1 */
// Globala variabler
let optionsDialog;	    // Element för inställningsdialog
let rollElem;           // Element för utskrift av antal omkast som återstår
let resElem;	        // Element för resultat
let stopBtn;            // Knapp för att stanna
let playerName = "Du";  // Spelarens namn
let maxNrOfRolls = 3;   // Valt max antal omkast av tärningar
let nrOfRolls = 0;      // Antal omkast som återstår
let sum = 0;            // Summan av kastade tärningar
// --------------------------------------------------

//Initiering då webbsidan laddats in
function init() {
    document.querySelector("#optionsBtn").addEventListener("click", showOptionsDialog); //Knappen för inställningar
    document.querySelector("#optionsOkBtn").addEventListener("click", closeOptionsDialog); //knappen OK i inställningar
    //New Game och End Game
    document.querySelector("#newBtn").addEventListener("click", newGame);
    document.querySelector("#stopBtn").addEventListener("click", endGame);
    document.querySelector("#stopBtn").disabled = true; // Stänger av knappen end game
    // Händelselyssnare för tärningar
    document.querySelector("#die1").addEventListener("click", throwOneDie);
    document.querySelector("#die2").addEventListener("click", throwOneDie);
    document.querySelector("#die3").addEventListener("click", throwOneDie);
    document.querySelector("#die4").addEventListener("click", throwOneDie);
    document.querySelector("#die5").addEventListener("click", throwOneDie);
    // Referenser
    optionsDialog = document.querySelector("#options");
    rollElem = document.querySelector("#rollCounter");
    resElem = document.querySelector("#result");
    stopBtn = document.querySelector("#stopBtn");
} // Slut init
window.addEventListener("load", init); //Kör igång init när sidan laddas färdigt

//Öppnar inställningar
function showOptionsDialog() {
    optionsDialog.showModal();
}

//Stänger inställningar och sparar variabler
function closeOptionsDialog() {
    playerName = document.getElementById("player").value;
    maxNrOfRolls = document.getElementById("nrOfReroll").value;
    optionsDialog.close();
}

// Startar ett nytt spel
function newGame() {
    stopBtn.disabled = false;
    nrOfRolls = maxNrOfRolls;
    rollElem.innerText = nrOfRolls;
    throwAllDice();
}

//Avslutar spelet och räknar ut poäng
function endGame() {
    switch (sum){     //kollar hur många poäng man fick på tärningarna och omvandlar till spel poäng
        case 21:
            points = 3;
            break;
        case 20:
            points = 2;
            break;
        case 19:
            points = 1;
            break;
        default: points = 0;
    }
    nrOfRolls = 0;
    rollElem.innerText = nrOfRolls;
    resElem.innerText = playerName + ", summan blev " + sum + ", så du fick " + points + " poäng";
    stopBtn.disabled = true;
}

// Kastar en tärning
function throwOneDie() {
    if (nrOfRolls > 1) {
        sum -= this.alt;
        sum += throwDie(this.id);
        nrOfRolls--;
        rollElem.innerText = nrOfRolls;
        resElem.innerText = "Summa = " + sum;
    }
    else if (nrOfRolls == 1) {
        sum -= this.alt;
        sum += throwDie(this.id);
        nrOfRolls--;
        rollElem.innerText = nrOfRolls;
        resElem.innerText = "Summa = " + sum;
        endGame();
    }
}

//Kastar alla tärningar
function throwAllDice() {
    sum = throwDie("die1") + throwDie("die2") + throwDie("die3") + throwDie("die4") + throwDie("die5");
    resElem.innerText = "Summa = " + sum;
}

//Genererar en värde och ändrar tärningens id + värde
function throwDie(id) {
    let dieElem = document.querySelector("#" + id);
    dieElem.classList.toggle("rotateDie");
    let dieValue = Math.floor(6 * Math.random()) + 1;
    dieElem.src = "img/dice/" + dieValue + ".png";
    dieElem.alt = dieValue;
    return dieValue;
}