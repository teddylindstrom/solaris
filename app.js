// Denna funktion simulerar att hämta API-nyckeln från en server.
// I verkligheten kan det vara en fetch(), här är den statisk men dynamisk i struktur.
// async function getApiKey() {
//     return "solarishbg"; // Detta är API-nyckeln som API:et kräver
// }

// Variabel där API-nyckeln ska lagras efter att den hämtats
let API_KEY = "";

// Bas-URL för API:et. Alla API-anrop bygger på denna URL.
const BASE_URL = "https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com";

// // En startfunktion som körs direkt när appen laddar
// async function init() {
//     try {
//         // Hämtar API-nyckeln från config.js (VG-krav)
//         //API_KEY = await getApiKey(); //VG

//         // När API-nyckeln hämtats: ladda planetlistan
//         loadPlanets();
//     } catch (err) {
//         // Om något går fel visas fel i konsolen
//         console.error("Kunde inte hämta API-nyckel.", err);
//     }
// }
// Kör init() direkt
//init();


// //deklarerar en asynkron funktion som heter fetchKeys
// //async function fetchKeys () { 
// //  let resp = await fetch(
// //    "https://4a610o1px9.execute-api.eu-north-1.amazonaws.com/key"
// //  );
// }
// //anropar funktionen fetchKeys och loggar resultatet till konsolen
// fetchKeys();
// console.log(fetchKeys());

//Fel i Console???
async function fetchBodies() {
    //console.log("hej")
    try {
        let resp = await fetch(`${BASE_URL}/bodies`, {
    method: 'GET',
    headers: { 'x-zocom': 'solaris-zaCmZA74PLKCrD8Y' } //API nyckel har korrekt format, header namn är rätt
});
//console.log("hej2")
// Kollar om svaret är OK (status 200-299)
console.log(resp);
//if (!response.ok) throw new Error("Fel vid hämtning av planeter");

//Väntar på svaret från servern, json

const data = await resp.json();
console.log(data);

renderPlanetList(data.bodies); //anropar renderPlanetList med data som argument
    } catch (error) {
    console.log(error.message)}
}

// async function loadPlanets() {
// try {
//     // Skickar GET-request till API:et
//     const response = await fetch(BASE_URL, {
//         headers: {
//             "x-zocom": API_KEY // API:et kräver denna header
//         }
//     });

//     // Gör om svaret till JSON
//     const data = await response.json();

//     // Skickar vidare planetlistan till funktion som ritar ut dem på sidan
//     renderPlanetList(data);
//     //console.log("hwja");

// } catch (err) {
//     // Felhantering vid problem med fetch eller JSON
//     console.error(err);
//     document.getElementById("planet-list").innerHTML =
//         "<p>Kunde inte ladda planeter.</p>";
// }
// }

//Vsisning av planetlista på sidan
function renderPlanetList(planets) {
    // Hämtar containern där planeterna ska visas
    const list = document.getElementById("planet-list");

    // Rensar gamla data (om sidan laddas om på nytt)
    list.innerHTML = "";

    // Loopar igenom alla planeter som kom från API:et
    planets.forEach(planet => {
        // Skapar ett nytt div-element för varje planet
        const el = document.createElement("div");

        // Lägger till CSS-klassen .planet som styr utseendet
        //el.classList.add("planet");
        el.className = planet.name.toLowerCase(); //lägger till planetens namn som klassnamn för att kunna styla med css

        // Sätter texten på "knappen" till planetens namn
        el.textContent = planet.name;

        // Lägger till klick-event: när man klickar → hämta mer info
        el.addEventListener("click", () => loadPlanetInfo(planet.id));

        // Lägger till planeten i listan på sidan
        list.appendChild(el);
    });
    console.log("hej");
    //Overlay
    function on() {
    document.getElementById("overlay").style.display = "flex";
    }

    function off() {
    document.getElementById("overlay").style.display = "none";
    }
}

// Funktion för att ladda och visa mer info om en planet
window.addEventListener("load", fetchBodies);