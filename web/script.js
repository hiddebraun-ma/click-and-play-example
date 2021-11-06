// Alle knoppen ophalen
const startButton = document.getElementById('start-button');
const vooruitButton = document.getElementById('vooruit-button');
const achteruitButton = document.getElementById('achteruit-button');
const linksButton = document.getElementById('links-button');
const rechtsButton = document.getElementById('rechts-button');
const titel = document.querySelector('#linkerkolom h3');

// Foto
const image = document.getElementById('foto');

// Help tekst
let feedback = document.getElementById('feedback');

// Kaart / Plattegrond in multi dimensionale array (matrix)
// Hier kunnen we allerlei data in zetten (misschien inladen via andere JS files en in deze array plaatsen?)
// Of een losse JSON file maken (of te ingewikkeld?)
// Ook leuk: Randomizen van de arrays bij starten spel?
const plattegrond = [
    [ //0
        ["Lobby 1"], ["Rembrandt 1"], ["Van Gogh 1"], ["Picasso 1"], ["Mondriaan 1"], ["Van Eijck 1"]
        //0,0        //0,1            //0,2           //0,3          //0,4            //0,5
    ],
    [ //1
        ["Lobby 2"], ["Rembrandt 2"], ["Van Gogh 2"], ["Picasso 2"], ["Mondriaan 2"], ["Van Eijck 2"]
        //1,0        //1,1            //1,2           //1,3          //1,4            //1,5
    ],
    [ //2
        ["Lobby 3"], ["Rembrandt 3"], ["Van Gogh 3"], ["Picasso 3"], ["Mondriaan 3"], ["Van Eijck 3"]
        //2,0        //2,1            //2,2           //2,3          //2,4            //2,5
    ],
    [ //3
        ["Lobby 4"], ["Rembrandt 4"], ["Van Gogh 4"], ["Picasso 4"], ["Mondriaan 4"], ["Van Eijck 4"]
        //3,0        //3,1            //3,2           //3,3          //3,4            //3,5
    ],
    [ //4
        ["Lobby 5"], ["Rembrandt 5"], ["Van Gogh 5"], ["Picasso 5"], ["Mondriaan 5"], ["Van Eijck 5"]
        //4,0        //4,1            //4,2           //4,3          //4,4            //4,5
    ],
    [ //5
        ["Lobby 6"], ["Rembrandt 6"], ["Van Gogh 6"], ["Picasso 6"], ["Mondriaan 6"], ["Van Eijck 6"]
        //5,0        //5,1            //5,2           //5,3          //5,4            //5,5
    ]
];

let positie = false; // Na starten wordt dit een object met een x en y
// {x: 0, y: 0} 

// Knoppen koppelen aan functions
startButton.addEventListener('click', start);
vooruitButton.addEventListener('click', gaVooruit)
linksButton.addEventListener('click', gaLinksaf)
rechtsButton.addEventListener('click', gaRechtsaf)
achteruitButton.addEventListener('click', gaAchteruit)

function start() {
    // Start knop verbergen
    startButton.style.display = 'none';

    // Knoppen tonen
    const navigatie = document.getElementById('navigatie');
    navigatie.style.display = 'block';

    // Feedback leeg maken
    feedback.innerHTML = '';

    // Object met waar je wilt binnenkomen na starten
    positie = {
        x: 0,
        y: 5
    };

    // Naar positie gaan
    gaNaarPositie(positie)
}

/**
 * Hier kunnen allerlei interactieve dingen gebeuren
 */
function gaNaarPositie(positie) {
    // Lees de informatie uit de matrix
    // Misschien is dat wel een object met informatie over deze ruimte/dit punt?
    veranderFoto(positie);
    toonRuimte(positie);
    toonPositie(positie);
    toonHelpTekst(positie);
    // Speel geluid / voiceover / muziek?
    // Vind een schat?
    // Toon interessante links e.d.
    // Ga door een loophole naar andere plek op plattegrond
    // Omhoog / omlaag
    // Beantwoord een vraag
    // Klik iets aan
    // Doe een quiz
    // Voeg hotspots aan een foto toe met extra acties?
    // Toon extra opties bij deze plek
    // etc. etc.

}


function gaVooruit() {
    console.log("vooruit");
    const mogelijkheden = berekenMogelijkheden(positie);
    if (mogelijkheden.includes('vooruit')) {
        positie.y = positie.y-1;
        gaNaarPositie(positie);
    } else {
        toonFout("Sorry, je kunt nu niet vooruit!")
    }
}

function gaAchteruit() {
    console.log("achteruit");
    const mogelijkheden = berekenMogelijkheden(positie);
    if (mogelijkheden.includes('achteruit')) {
        positie.y = positie.y+1;
        gaNaarPositie(positie);
    } else {
        toonFout("Sorry, je kunt nu niet achteruit!")
    }
}

function gaLinksaf() {
    console.log("linksaf");
    const mogelijkheden = berekenMogelijkheden(positie);
    if (mogelijkheden.includes('linksaf')) {
        positie.x = positie.x-1;
        gaNaarPositie(positie);
    } else {
        toonFout("Sorry, je kunt nu niet linksaf!")
    }
}

function gaRechtsaf() {
    console.log("rechtsaf");
    const mogelijkheden = berekenMogelijkheden(positie);
    if (mogelijkheden.includes('rechtsaf')) {
        positie.x = positie.x+1;
        gaNaarPositie(positie);
    } else {
        toonFout("Sorry, je kunt nu niet rechtsaf!")
    }
}


function veranderFoto(positie) {
    const foto_file = `img/plattegrond/${positie.x}_${positie.y}.png`;
    console.log(foto_file)
    image.src = foto_file;
}

/**
 * Deze functie krijgt de huidige positie door
 * en berekent de mogelijke richtingen afhankelijk van die positie
 * 
 * Dit wordt teruggegeven als array, bijvoorbeeld: ['vooruit', 'links'] 
 * als je helemaal rechts onderin de matrix zit
 * 
 * @param {*} positie 
 */
function berekenMogelijkheden(positie) {
    let mogelijkheden = [];
    if (positie.y > 0) {
        mogelijkheden.push('vooruit');
    }
    if (positie.y < (plattegrond.length - 1)) {
        mogelijkheden.push('achteruit');
    }

    if (positie.x > 0) {
        mogelijkheden.push('linksaf');
    }

    if (positie.x < (plattegrond[positie.y].length - 1)) {
        mogelijkheden.push('rechtsaf');
    }

    return mogelijkheden;

}

function toonPositie(positie){
    feedback.innerHTML += `Positie ${positie.x},${positie.y}<br/>`;
}

function toonRuimte(positie){
    let ruimte = plattegrond[positie.y][positie.x];
    titel.innerHTML = ruimte;
    feedback.innerHTML+=`Je bent nu in de <strong>${ruimte}</strong> ruimte.<br/>`;
}

function toonHelpTekst(positie) {
    if (positie === false) {
        feedback.innerHTML = 'Welkom, ga het museum binnen door op Start te klikken';
        return;
    } else {
        let mogelijkheden = berekenMogelijkheden(positie);
        let tekst = mogelijkheden.join(', ');
        feedback.innerHTML += `Je kunt nu deze richtingen op: ${tekst}<br />`;
    }

}

function toonFout(foutmelding){
    let eerdereFeedback = feedback.innerHTML;
    feedback.innerHTML = "OEPS! " + foutmelding;
    setTimeout(() => {
        feedback.innerHTML = eerdereFeedback;
    }, 2000);
}

toonHelpTekst(positie);
