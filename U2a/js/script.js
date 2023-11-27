/* Uppgift U2a */
// Globala konstanter och variabler
const roomPrice = [600, 800, 950];		// Pris för rumstyperna
const facilityPrice = [40, 80, 100];    // Pris för tilläggen
let formElem;   // Elementet med hela formuläret (form-elementet)
let totCost; // Elementet där kostnaden skrivs ut

// Initiera globala variabler och händelsehanterare.
function init() {
	document.querySelector("#send").addEventListener("click", calculateCost);
	formElem = document.querySelector("#booking");
	totCost = document.querySelector("#totalCost");
	
	//Rumtyp
	for (let i = 0; i < formElem.roomType.length; i++) { /* Gå igenom alla radioknappar för rumstyp */
		let priceInfo = "(" + roomPrice[i] + " kr)";
		formElem.roomType[i].parentElement.querySelector(".price").innerText = priceInfo; // Lägg till prisuppgift
		formElem.roomType[i].addEventListener("click", function () { calculateCost(), checkIfFamilyRoom() });
	}
	
	//Tillägg
	for (let i = 0; i < formElem.facility.length; i++) { /* Gå igenom alla kryssrutor för tillägg */
		let priceInfo = "(" + facilityPrice[i] + " kr)";
		formElem.facility[i].parentElement.querySelector(".price").innerText = priceInfo; // Lägg till prisuppgift
		formElem.facility[i].addEventListener("click", calculateCost);
	}

	formElem.nrOfNights.addEventListener("change", calculateCost);

	// Händelsehanterare för textfält som ska kontrolleras
	formElem.zipcode.addEventListener("blur", checkField);
	formElem.telephone.addEventListener("blur", checkField);
	
	// Händelsehanterare för kampanjkod
	formElem.campaigncode.addEventListener("focus", checkCampaign);
	formElem.campaigncode.addEventListener("keyup", checkCampaign);
	formElem.campaigncode.addEventListener("blur", endCheckCampaign);
	
	//Anrop av funktioner
	checkIfFamilyRoom();
	calculateCost();
} // Slut init
window.addEventListener("load", init);

// Beräkna total kostnad för valda alternativ
function calculateCost() {
	let sumPrice, totRoomPrice, totNights; //Får totala värdet av alla respektiva val
	let totFacilityPrice = 0; // totala värdet av alla tillägg, återställer värdet först
	
	//Rumtyp
	for (let i = 0; i < formElem.roomType.length; i++) {
		if (formElem.roomType[i].checked) {
			totRoomPrice = roomPrice[i];
		}
	}
	
	//Tillägg
	for (let i = 0; i < formElem.facility.length; i++) {
		if (formElem.facility[i].checked) {
			totFacilityPrice += Number(facilityPrice[i]);
		}
	}

	totNights = formElem.nrOfNights.value;
	sumPrice = (Number(totRoomPrice) + Number(totFacilityPrice)) * Number(totNights);
	totCost.innerText = sumPrice;
} // Slut calculateCost

// Kontrollera om familjerum är valt och ändrar tillgänglighet till andra val
function checkIfFamilyRoom() {
	if (formElem.roomType[2].checked) {
		formElem.facility[2].disabled = true;
		formElem.facility[2].checked = false;
		formElem.persons.disabled = false;
	}
	else {
		formElem.facility[2].disabled = false;
		formElem.persons.disabled = true;
	}
} // Slut checkIfFamilyRoom

// Kontrollera innehållet i de fält som namnges i fieldNames
function checkField(e, field) {
	if (!field) {
		field = this;
	}
	const fieldNames = ["zipcode", "telephone"];
	const re = [ //Array med reguljära uttryck för fälten
		/^\d{3} ?\d{2}$/, //postnummer
		/^0\d{1,3}[-/]?\d{5,8}$/ //Telefonnummer
	];
	const errMsg = [ //Array med felmeddelanden
		"Postnumret måste bestå av fem siffror.",
		"Telnr måste börja med en 0:a och följas av 6-11 siffror."
	];
	let ix = fieldNames.indexOf(field.name); //Index till re och errMsg
	let errMsgElem = field.nextElementSibling; //Element för felmeddelande
	if (!re[ix].test(field.value)) {
		errMsgElem.innerText = errMsg[ix];
		return false; //Fel i fältet
	}
	else {
		errMsgElem.innerText = "";
		return true; //Fältet är OK
	}
} // Slut checkField

// Kontrollera kampanjkoden för varje tecken som skrivs i fältet
function checkCampaign() {
	const CmpCode = /^[A-ZÅÄÖ]{3}-\d{2}-[A-ZÅÄÖ]\d$/i; //Reguljära uttryck för kampanj kod.
	if (CmpCode.test(this.value)) {
		this.style.backgroundColor = "#6F9";
	}
	else {
		this.style.backgroundColor = "#F99";
	}
} // Slut checkCampaign

// Avsluta kontroll av kampanjkod
function endCheckCampaign() {
	formElem.campaigncode.style.backgroundColor = "";
	formElem.campaigncode.value = formElem.campaigncode.value.toUpperCase();
	formElem.campaigncode.innerText = formElem.campaigncode.value;
} // Slut endCheckCampaign