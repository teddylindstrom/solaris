// Bas-URL för API:et
const BASE_URL = "https://4a6l0o1px9.execute-api.eu-north-1.amazonaws.com";

// Dynamisk API-nyckel (VG-krav)
async function getApiKey() {
    // Kan bytas mot riktig server senare
    return "solaris-zaCmZA74PLKCrD8Y";
}


// Hämta planet-data från API:et
async function fetchBodies() {
    try {

        const key = await getApiKey();

        const resp = await fetch(`${BASE_URL}/bodies`, {
            method: "GET",
            headers: { "x-zocom": key }
        });

        if (!resp.ok) {
            throw new Error("Fel vid hämtning av planeter");
        }

        const data = await resp.json();

        renderPlanetList(data.bodies);

    } catch (err) {
        console.error("Kunde inte hämta planeter:", err);
    }
}


// Rendera planet-listan

function renderPlanetList(planets) {
    const list = document.getElementById("planet-list");
    list.innerHTML = "";

    planets.forEach(planet => {
        const el = document.createElement("div");

        // CSS-klasserna matchar dina planet-klasser
        el.classList.add(planet.name.toLowerCase());

        // Ingen text, planeterna är bara cirklar enligt Figma
        el.setAttribute("title", planet.name);

        el.addEventListener("click", () => loadPlanetInfo(planet));

        list.appendChild(el);
    });
}

// planet-info overlay
function loadPlanetInfo(planet) {
    const overlay = document.getElementById("overlay");

    overlay.innerHTML = `
        <div class="planet-info">
            <h2>${planet.name}</h2>
            <p>Typ: ${planet.type}</p>
            <p>Radie: ${planet.radius} km</p>
            <p>Omkrets: ${planet.circumference} km</p>
            <p>Max temperatur: ${planet.temp.max} °C</p>
            <button id="close">Stäng</button>
        </div>
    `;

    overlay.classList.remove("hidden");

    document.getElementById("close").addEventListener("click", () => {
        overlay.classList.add("hidden");
    });
}


//Starta appen när sidan är laddad

window.addEventListener("load", fetchBodies);
