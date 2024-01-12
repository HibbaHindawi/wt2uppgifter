/* Uppgift U3 */
/*------------Globala Variabel------------*/
let newBtn; // Knappen för ett nytt spel
let newTilesBtn; // Knappen för nya brickor

let pointMsg; //Elementet där det totala poänget för varje spel skrivs ut
let gamesMsg; //Elementet där antal spel skrivs ut
let msgElem; //Elementet där nurvarande poäng skrivs ut

let newTilesDiv; //Alla div med nya brickor
let dropZones; //Alla delar där man kan flytta brickor till

let tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]; //Array med alla tal som ska finnas med
let tilesCopy; //Kopierar arrayen
let totTiles; //Räknar antalet brickor som har genererats

let dragElem; //Element som dras
let currentTiles; //antalet nya brickor som finns

let points = 0; //Totala poäng efter varje spel
let currentPoints; //antal poäng för nurvarande spel
let gamesAmnt = 0; //Antalet spel som har gått.

/*------------Funktioner------------*/
// Funktion som anropas när sidan laddas in
function init(){
    //Knappar
    newBtn = document.querySelector("#newGameBtn");
    newTilesBtn = document.querySelector("#newTilesBtn");
    
    //Brickor
    newTilesDiv = document.querySelectorAll("#newTiles div");
    dropZones = document.querySelectorAll("#board div.tile");

    //Meddelande
    pointMsg = document.querySelector("#totPoints");
    gamesMsg = document.querySelector("#countGames");
    msgElem = document.querySelector("#message");

    //Händelselyssnare knappar
    newTilesBtn.addEventListener("click", newTiles);
    newBtn.addEventListener("click", newGame);

    //Avaktivera knappar
    newTilesBtn.disabled = true;
}//Slut init
window.addEventListener("load", init);

//Initerar ett nytt spel
function newGame(){
    let markSeries; //blir referens till divs med klass s1-s8
    totTiles = 0;
    
    for(let i = 1; i < 9; i++){
        markSeries = document.querySelector("div.mark.s" + i);
        markSeries.classList.remove("check");
        markSeries.classList.remove("cross");
    }
    
    for(let i = 0; i < dropZones.length; i++){
        dropZones[i].innerHTML = "";
    }
    
    newBtn.disabled = true;
    tilesCopy = tiles.slice(); //Kopierar original arrayen
    msgElem.innerHTML = "";
    newTiles();
} //slut newGame

//Avslutar spelet
function endGame(){
    newBtn.disabled = false;
    newTilesBtn.disabled = true;
    msgElem.innerHTML = "Du fick " + currentPoints + " poäng.";
} //slut endGame

//Skapar fyra nya brickor
function newTiles(){
    for(let i = 0; i< newTilesDiv.length; i++){
        let randomIx = Math.floor(Math.random() * tilesCopy.length); //Hämtar slumpmässig position
        let randomNmb = tilesCopy[randomIx]; // Sätter randomNmb till det slumpmäsiga nummret
        tilesCopy.splice(randomIx, 1); //Tar bort det slumpmässiga nummret från arrayen

        newTilesDiv[i].innerHTML = randomNmb;
        newTilesDiv[i].draggable = true; //Brickan kan dras
        newTilesDiv[i].addEventListener("dragstart", dragStart);
        newTilesDiv[i].addEventListener("dragend", dragStart);
    }
    currentTiles = 4;
    newTilesBtn.disabled = true;
} //slut newTiles

// Hanterar en drag-operation
function dragStart(e){
    dragElem = this; // Det element som dras
    
    for (let i = 0; i < dropZones.length; i++) {
        dropZones[i].addEventListener("dragover", dropZone);
        dropZones[i].addEventListener("dragenter", dropZone);
        dropZones[i].addEventListener("dragleave", dropZone);
        dropZones[i].addEventListener("drop", dropZone);
    }
} //slut dragStart

// Avslutar drag-operationen
function dragEnd(e){
    dragElem.removeEventListener("dragend", dragEnd);
    
    for (let i = 0; i < dropZones.length; i++) {
        dropZones[i].removeEventListener("dragover", dropZone);
        dropZones[i].removeEventListener("dragenter", dropZone);
        dropZones[i].removeEventListener("dragleave", dropZone);
        dropZones[i].removeEventListener("drop", dropZone);
    }
} //slut dragEnd

// Hanterar händelser för drop zones
function dropZone(e){
    e.preventDefault();
    let dropElem = this; // Det element som man släppt på
    
    switch (e.type) {
        case "dragenter":
            if(dropElem.innerHTML == ""){
                dropElem.classList.add("hiliteDropZone");
            }
            break;
        case "dragleave":
            dropElem.classList.remove("hiliteDropZone");
            break;
        case "drop":
            if (dropElem.innerHTML == "") {
                dropElem.classList.remove("hiliteDropZone");
                dropElem.innerHTML = dragElem.innerHTML;
                dragElem.innerHTML = "";
                dragElem.draggable = false; // Elementet kan inte längre dras
                currentTiles--;
                totTiles++;
            }
            break;
    }
    
    if(totTiles == 16){ //Kollar om spelet är över
        calculate();
    }
    else if (currentTiles == 0 && tilesCopy.length >= 24){ //Kollar om spelet pågår och om nya brickor är tomma
        newTilesBtn.disabled = false;
    }
} //slut dropZone

//Jämför alla tal och räknar antal poäng
function calculate(){
    let currentSeries; //Hämtar varje div med klassen .tile och .s1 - .s8
    let scoreSeries; //Hämtar varje div med klassen .mark och .s1 - .s8
    let previousPoints; //Hämtar det gamla värdet från localStorage för poäng
    let previousGame; //Hämtar det gamla värdet från localStorage för antal spel
    let isRising; //Bool som säger om det blir 1 poäng eller ej
    
    currentPoints = 0;
    
    for(let i = 1; i < 9; i++){ //går igenom alla div med samma serie class
        currentSeries = (document.querySelectorAll("#board div.tile.s" + i));
        scoreSeries = document.querySelector("div.mark.s" + i);
        
        const x1 = Number(currentSeries[0].innerText);
        const x2 = Number(currentSeries[1].innerText);
        const x3 = Number(currentSeries[2].innerText);
        const x4 = Number(currentSeries[3].innerText);

        if (x4 > x3 && x3 > x2 && x2 > x1) { //Jämför alla värden
            isRising = true;
        }
        else{
            isRising = false;
        }
    
        if (isRising) { //Sätter poäng och check eller cross klassen
            currentPoints++;
            scoreSeries.classList.add("check");
        }
        else{
            scoreSeries.classList.add("cross");
        }
    }

    if (localStorage.getItem("savedPoints") != null) { //Kontrollerar om "savedPoints" har ett värde
        previousPoints = Number(localStorage.getItem("savedPoints"));
        pointMsg.innerText = previousPoints + currentPoints;
        previousGame = Number(localStorage.getItem("savedGames"));
    }
    else{
        previousPoints = 0;
        pointMsg.innerText = currentPoints;
        previousGame = 0;
    }
    
    points = previousPoints + currentPoints;
    gamesMsg.innerText = previousGame + 1;
    gamesAmnt++;
    localStorage.setItem("savedPoints", points);
    localStorage.setItem("savedGames", gamesAmnt);
    endGame()
} //slut calculate