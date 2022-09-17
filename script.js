// welementit
let riviBtn, sarakeBtn, otsikko, taulukko;

window.onload = exampleFunction;

/**
 * Alustetaan tarpeellisia
 * @param {Event} event 
 */
function exampleFunction(event) {
    const resObs = new  ResizeObserver( e => {
        let ta = e[0].target;
        let td = ta.parentElement;
        let tr = td.parentElement;
        for (let cell of tr.cells) {
            let el = cell.firstElementChild;
            copyStyle(ta, el, "height");
        }
        for (let rivi of taulukko.rows) {
            let el = rivi.cells[td.cellIndex].firstElementChild;
            copyStyle(ta, el, "width");
        }
    });

    document.querySelectorAll("textarea").forEach(el => resObs.observe(el))
    taulukko = document.getElementById("taulukko");

    riviBtn = document.getElementById("lisaa-rivi");
    riviBtn.addEventListener("click", e => lisaaRivi(taulukko, resObs));
    
    sarakeBtn = document.getElementById("lisaa-sarake");
    sarakeBtn.addEventListener("click", e => lisaaSarake(taulukko, resObs));

    // Dokumentin titlen päivitys pääotsikon perusteella.
    otsikko = document.getElementById("otsikko");
    otsikko.addEventListener("input", paivitaTitle);
}

/**
     * Päivitetään dokumentin title tapahtuman kohteen
     * tekstin mukaiseksi.
     * @param {Event} event 
     */
function paivitaTitle(event) {
    document.title = event.target.innerText;
}


/**
 * Lisätään taulukkoon rivi
 * @param {HTMLTableElement} taulukko 
 */
function lisaaRivi(taulukko, obs) {
    let cols = taulukko.lastElementChild.lastElementChild.cells;
    let row = taulukko.insertRow();
    for (sarake of cols) {
        let ta = document.createElement("textarea");
        row.insertCell().appendChild(ta);
        obs.observe(ta);
    }
    console.log("uusi rivi");
}


/**
 * Lisätään taulukkoon sarake
 * @param {HTMLTableElement} taulukko 
 */
function lisaaSarake(taulukko, obs) {
    for (row of taulukko.rows) {
        let ta = document.createElement("textarea");
        row.insertCell().appendChild(ta);
        obs.observe(ta);
    }
}


/**
 * Kopioidaan tyyli ominaisuus elementiltä toiselle.
 * @param {HTMLTextAreaElement} taFrom
 * @param {HTMLTextAreaElement} taTo
 * @param {string} prop
 */
function copyStyle(taFrom, taTo, prop) {
    if (!taFrom || !taTo || taFrom === taTo) {
        return;
    }
    taTo.style[prop] = taFrom.style[prop];
}