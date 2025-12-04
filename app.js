// Denna funktion simulerar att hämta API-nyckeln från en server.
// I verkligheten kan det vara en fetch(), här är den statisk men dynamisk i struktur.
async function getApiKey() {
    return "solarishbg"; // Detta är API-nyckeln som API:et kräver
}

// Variabel där API-nyckeln ska lagras efter att den hämtats
let API_KEY = "";

// Bas-URL för API:et. Alla API-anrop bygger på denna URL.
const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/planets/";

// En startfunktion som körs direkt när appen laddar
async function init() {
    try {
        // Hämtar API-nyckeln från config.js (VG-krav)
        API_KEY = await getApiKey();

        // När API-nyckeln hämtats: ladda planetlistan
        loadPlanets();
    } catch (err) {
        // Om något går fel visas fel i konsolen
        console.error("Kunde inte hämta API-nyckel.", err);
    }
}
// Kör init() direkt
init();


//deklarerar en asynkron funktion som heter fetchKeys
async function fetchKeys () { 
  let resp = await fetch(
    "https://4a610o1px9.execute-api.eu-north-1.amazonaws.com/key"
  );
}
//anropar funktionen fetchKeys och loggar resultatet till konsolen
fetchKeys();
console.log(fetchKeys());

//Fel i Console???
let resp = await fetch('https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com/bodies', {
    method: 'GET',
    headers: { 'x-zocom': 'solaris-zaCmZA74PLKCrD8Y' } //API nyckel har korrekt format, header namn är rätt
});
//Väntar på svaret från servern, json
let data = await resp.json();

console.log(data);

async function loadPlanets() {
    try {
        // Skickar GET-request till API:et
        const response = await fetch(BASE_URL, {
            headers: {
                "x-zocom": API_KEY // API:et kräver denna header
            }
        });

        // Kollar om svaret är OK (status 200-299)
        if (!response.ok) throw new Error("Fel vid hämtning av planeter");

        // Gör om svaret till JSON
        const data = await response.json();

        // Skickar vidare planetlistan till funktion som ritar ut dem på sidan
        renderPlanetList(data);

    } catch (err) {
        // Felhantering vid problem med fetch eller JSON
        console.error(err);
        document.getElementById("planet-list").innerHTML =
            "<p>Kunde inte ladda planeter.</p>";
    }
}

//Vsisning av planetlista på sidan
function renderPlanetList(planets) {
    // Hämtar containern där planeterna ska visas
    const list = document.getElementById("planet-list");

    // Rensar gamla element (om sidan laddas om på nytt)
    list.innerHTML = "";

    // Loopar igenom alla planeter som kom från API:et
    planets.forEach(planet => {
        // Skapar ett nytt div-element för varje planet
        const el = document.createElement("div");

        // Lägger till CSS-klassen .planet som styr utseendet
        el.classList.add("planet");

        // Sätter texten på "knappen" till planetens namn
        el.textContent = planet.name;

        // Lägger till klick-event: när man klickar → hämta mer info
        el.addEventListener("click", () => loadPlanetInfo(planet.id));

        // Lägger till planeten i listan på sidan
        list.appendChild(el);
    });
}