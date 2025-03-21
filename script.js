function dropdownKlickad() {
    var dropdownAktiverad = document.getElementById("dropdown");
    dropdownAktiverad.classList.toggle("klickad");
}

//*******************************************************
//                      VARUKORG MED LOCAL STORAGE
//*******************************************************

// Hämtar HTML-element
const ul = document.querySelector("ul");
const varukorgStatus = document.getElementById("varukorg-status");
const varukorgKostnad = document.getElementById("kostnad");

// Variabel för att hålla koll på varukorgens antal produkter
let antalProdukter = 0;

// Hämta varukorgen från localStorage, eller skapa en tom lista om ingen data finns
let varukorg = JSON.parse(localStorage.getItem("varukorg")) || [];
uppdateraVarukorg(); // Laddar varukorgen direkt vid sidans inladdning

// Funktion för att lägga till en vara i varukorgen
function läggTill(namn, pris) {
    let produkt = { namn, pris };
    
    varukorg.push(produkt);
    localStorage.setItem("varukorg", JSON.stringify(varukorg)); // Spara uppdaterad varukorg i localStorage
    uppdateraVarukorg(); // Uppdatera gränssnittet
}

// Funktion för att visa varukorgen och uppdatera gränssnittet
function uppdateraVarukorg() {
    ul.innerHTML = ""; // Rensa listan för att undvika dubbletter
    let totalKostnad = 0;

    if (varukorg.length === 0) {
        varukorgStatus.textContent = "Produkter du valt hamnar här";
    } else {
        varukorgStatus.textContent = ""; // Rensa statusmeddelandet om varukorgen inte är tom
    }

    varukorg.forEach((produkt, index) => {
        let li = document.createElement("li");
        li.textContent = `${produkt.namn} - Pris: ${produkt.pris} kr`;

        // Skapa en knapp för att ta bort produkten
        let taBortKnapp = document.createElement("button");
        taBortKnapp.textContent = "Ta bort";
        taBortKnapp.onclick = () => taBort(index);

        // Lägg till produktens pris till den totala kostnaden
        totalKostnad += produkt.pris;

        // Lägg till knappen och listobjektet till DOM
        li.appendChild(taBortKnapp);
        ul.appendChild(li);
    });
    
    // Uppdaterar antalet produkter
    antalProdukter = varukorg.length;
    
    // Visa den totala kostnaden
    varukorgKostnad.textContent = `Total kostnad: ${totalKostnad} kr`;
}

// Funktion för att ta bort en produkt från varukorgen
function taBort(index) {
    varukorg.splice(index, 1); // Ta bort produkten från arrayen
    localStorage.setItem("varukorg", JSON.stringify(varukorg)); // Uppdatera localStorage
    uppdateraVarukorg(); // Uppdatera gränssnittet
}
