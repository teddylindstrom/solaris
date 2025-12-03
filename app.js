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

//console.log("hej");
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