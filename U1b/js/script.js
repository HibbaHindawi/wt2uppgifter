/* Uppgift U1b */

// Globala konstanter och variabler
const wordList = ["BLOMMA", "LASTBIL", "SOPTUNNA", "KÖKSBORD", "RADIOAPPARAT", "VINTER", "SOMMAR", "DATORMUS", "LEJON", "ELEFANT", "JULTOMTE", "SKOGSHYDDA", "BILNUMMER", "BLYERTSPENNA", "SUDDGUMMI", "KLÄDSKÅP", "VEDSPIS", "LJUSSTAKE", "SKRIVBORD", "ELDGAFFEL", "STEKPANNA", "KASTRULL", "KAFFEBRYGGARE", "TALLRIK", "SOFFBORD", "TRASMATTA", "FLYGPLAN", "FLYGPLATS", "TANGENTBORD", "DATORSPEL", "WEBBPLATS", "TELEFON", "STJÄRNA", "KANELBULLE", "SEMLA", "ÄPPELPAJ", "BLÅBÄR", "LINGONSYLT", "TRAKTOR", "CYKELKEDJA", "BOKHYLLA", "BOKSTAV", "GRILLPLATS", "SOLSTOL", "BADPLATS", "SNÖGUBBE", "PARAPLY"]; // Lista (array) med ord som ska väljas slumpmässigt
let randomWord;	        // Textsträng med det ord som slumpmässigt väljs ur wordList
let boxElems;	        // Array med span-element för bokstäverna i ordet
let startBtn;	        // button-element för startknappen
let letterButtons;	    // Array med button-element för bokstavsknapparna
let hangmanImg;		    // img-elementet för bilder på galgen och gubben
let hangmanNr;		    // Nummer för aktuell bild som visas (0-6)
let msgElem			    // div-element för meddelanden
let startTime;		    // Tid då spelet startas
let button;             // Knappar för varje bokstav
let letterBoxes;        // array med varje span element
let count;              // Kollar hur många bokstäver av ordet är gissad korrekt
// --------------------------------------------------

// Initiering då webbsidan laddats in
function init() {
    startBtn = document.querySelector("#startBtn");
    startBtn.addEventListener("click", startGame);

    letterButtons = document.querySelectorAll("#letterButtons button");
    hangmanImg = document.querySelector("#hangman");
    msgElem = document.querySelector("#message");
    boxElems = document.querySelector("#letterBoxes");

    startBtn.disabled = false;
    for (let i = 0; i < letterButtons.length; i++) {
        button = letterButtons[i];
        button.addEventListener("click", guessLetter);
        button.disabled = true;
    }
} // Slut init
window.addEventListener("load", init);

// Initierar ett nytt spel.
function startGame() {
    count = 0;
    hangmanNr = 0;
    hangmanImg.src = "img/h" + hangmanNr + ".png";
    msgElem.innerText = "";
    let now = new Date();
    startTime = now.getTime();
    startBtn.disabled = true;
    for (let i = 0; i < letterButtons.length; i++) {
        button = letterButtons[i];
        button.disabled = false;
    }
    selectRandomWord();
} // Slut startGame

// Ord väljs slumpmässigt och skapar span element
function selectRandomWord() {
    let oldWord = randomWord;
    while (oldWord == randomWord) {
        let r = Math.floor(wordList.length * Math.random());
        randomWord = wordList[r];
    }
    let newSpan = "";
    for (let i = 0; i < randomWord.length; i++) {
        newSpan += "<span></span>";
    }
    boxElems.innerHTML = newSpan;
    letterBoxes = document.querySelectorAll("#letterBoxes span");
} // Slut selectRandomWord

//Kollar om valda bokstav finns med i ordet
function guessLetter() {
    if (hangmanNr == 6) { //Kolla och avsluta funktionen om man har fått 6 fel
        return;
    }
    this.disabled = true;
    let bokstav = this.innerText;
    let bokstavIx = [];
    for (let i = 0; i < randomWord.length; i++) { //Går igenom alla bokstäver i hela ordet och kollar om det valda bokstävet finns i ordet
        if (randomWord[i] == bokstav) {
            bokstavIx.push(i); // Sparar indexet i arrayen
        }
    }
    if (bokstavIx.length > 0) {
        for (let i = 0; i < bokstavIx.length; i++) {
            letterBoxes[bokstavIx[i]].innerHTML = bokstav; // Lägg till bokstaven i span-elementet
            letterBoxes[bokstavIx[i]].classList.toggle("correctLetter");
            count++;
        }
        if (count == (randomWord.length)) { //
            endGame(false);
            return;
        }
    }
    else {
        hangmanNr++;
        hangmanImg.src = "img/h" + hangmanNr + ".png";
        if (hangmanNr == 6) { //Anropar endgame() om man har fått 6 fel
            endGame(true);
        }
    }
} // Slut guessLetter

//Avslutar spelet och skriver ut tid + rätta ordet
function endGame(manHanged) {
    startBtn.disabled = false;
    let now = new Date();
    let stopTime = now.getTime();
    let totTime = Math.ceil((stopTime - startTime) / 100) / 10;
    for (let i = 0; i < letterButtons.length; i++) {
        button = letterButtons[i];
        button.disabled = true;
    }
    if (manHanged) {
        msgElem.innerHTML = ("Tyvärr, gubben hängdes. Rätt svar är " + randomWord + "<br>Det tog " + totTime + " sekunder.");
    }
    else {
        msgElem.innerHTML = ("Gratulerar. Du kom fram till rätt ord.<br>Det tog " + totTime + " sekunder.");
    }
} // Slut endGame