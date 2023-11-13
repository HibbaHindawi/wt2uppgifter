/* Uppgift U1b */

// Globala konstanter och variabler
const wordList = ["BLOMMA"];/*["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANT", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD", "DATORSPEL", "WEBBPLATS", "TELEFON", "STJÄRNA", "KANELBULLE", "SEMLA", "ÄPPELPAJ", "BLÅBÄR", "LINGONSYLT", "TRAKTOR", "CYKELKEDJA", "BOKHYLLA", "BOKSTAV", "GRILLPLATS", "SOLSTOL", "BADPLATS", "SNÖGUBBE", "PARAPLY"];*/ // Lista (array) med ord som ska väljas slumpmässigt
let randomWord;	        // Textsträng med det ord som slumpmässigt väljs ur wordList
let boxElems;	        // Array med span-element för bokstäverna i ordet
let startBtn;	        // button-element för startknappen
let letterButtons;	    // Array med button-element för bokstavsknapparna
let hangmanImg;		    // img-elementet för bilder på galgen och gubben
let hangmanNr;		    // Nummer för aktuell bild som visas (0-6)
let msgElem			    // div-element för meddelanden
let startTime;		    // Tid då spelet startas
let button;
// --------------------------------------------------

// Initiering då webbsidan laddats in
function init() {
    startBtn = document.querySelector("#startBtn");
    startBtn.addEventListener("click", startGame);
    letterButtons = document.querySelectorAll("#letterButtons button");
    hangmanImg = document.querySelector("#hangman");
    msgElem = document.querySelector("#message");
    for (let i = 0; i<letterButtons.length; i++) {
        button = letterButtons[i];
        button.addEventListener("click", guessLetter);
        button.disabled = true;
    }
} // Slut init
window.addEventListener("load", init);

// --------------------------------------------------
// Initiera ett nytt spel. Visa första bilden (h0.png),
// sätt bildnummer till 0, inaktivera startknapp och aktivera bokstavsknappar.
function startGame() {
    hangmanImg.src = "img/h0.png";
    startBtn.disabled = true;
    for (let i = 0; i<letterButtons.length; i++) {
        button = letterButtons[i];
        button.disabled = false;
    }
    selectRandomWord();
    console.log("Spelet har börjats");
} // Slut startGame
// --------------------------------------------------
// Ett ord väljs slumpmässigt. Visa en ruta för varje bokstav i ordet
function selectRandomWord() {
    
} // selectRandomWord
// --------------------------------------------------
// Kontrollera om bokstaven finns i ordet och skriv i så fall ut den.
// Om bokstaven ej finns, uppdateras bilden med galgen och gubben
// Om alla bokstäver är gissade eller om den sista bilden visades, avslutas spelet
function guessLetter() {
    this.disabled = true;
    console.log(this.innerText);
} // Slut guessLetter
// --------------------------------------------------
// Avsluta spelet genom att skriva ut ett meddelande och
// sedan aktivera startknappen och inaktivera bokstavsknapparna
function endGame(manHanged) { // manHanged är true eller false
    
} // Slut endGame
// --------------------------------------------------
