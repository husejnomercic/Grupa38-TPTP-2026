
// Cijeli kod je raden uz pomoc asistencije AI (Google Gemini).AI je pomogao sa kreacijom logicke strukture ciji je svaki koncept naknadno i objasnjen (uz potrebna podpitanja),
// te je pomogao sa provjerom ispravnosti kasnije-ispisanog koda. Svaka linija koda osim regex patterns rucno je ispisana, karakter po karakter.

//____________VALIDACIJA FORME
const mojaForma = document.getElementById("mojaForma");

mojaForma.addEventListener("submit", function (event) {
    event.preventDefault();
    let sveOK = true;

    // IME I PREZIME
    const imePolje = document.getElementById("ime");
    const imeVrijednost = imePolje.value.trim();
    const imeKalup = /^[a-zA-ZčćžšđČĆŽŠĐ]+ [a-zA-ZčćžšđČĆŽŠĐ]+$/;
    // Regex patterns za ime i prezime, email i broj telefona sam copy-paste direktno od Gemini. Razumijem da /^ oznacava pocetak dok $/ oznacava kraj stringa. Unutar uglastih zagrada nalazi se opseg dozvoljenih slova za unos.
    // Ovdje dozvoljavamo sva mala i velika slova engleskog alfabeta te desno dopisujemo ostatak time neobuhvacenih slova nase abecede. Dva para zagrada nam omogucuju pattern za unos i imena i prezimena u isto polje i to sa jednim
    // razmakom izmedu, oznacenim poslije znaka '+' kojim nagovjestavamo obavezan unos barem jednog karaktera.

    if (!imeKalup.test(imeVrijednost)) {
        document.getElementById("imeGreska").textContent = "Koristite samo slova!";
        imePolje.style.border = "2px solid red";
        sveOK = false;
    }
    else {
        document.getElementById("imeGreska").textContent = "";
        imePolje.style.border = "";
    }
    // EMAIL
    const emailPolje = document.getElementById("email");
    const emailVrijednost = emailPolje.value.trim();
    const emailKalup = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Znak ^ unutar zagrada i na pocetku koristi se za zabranu unosenja svakog karaktera navedenog poslije (\s za zabranu razmaka te @ za zabranu karaktera "@"). "\." za obavezan unos tacke, bez "\" tacka bi se interpretirala kao 
    // "bilo koji karakter". 

    if (!emailKalup.test(emailVrijednost)) {
        document.getElementById("emailGreska").textContent = "Email forma nije ispravna! Molimo provjerite unos.";
        emailPolje.style.border = "2px solid red";
        sveOK = false;
    }
    else {
        document.getElementById("emailGreska").textContent = "";
        emailPolje.style.border = "";
    }
    // TELEFON
    const telPolje = document.getElementById("telefon");
    const telVrijednost = telPolje.value.trim();
    const telKalup = /^[\d\s-]+$/;
    // Ovdje koristimo \d kao skracenicu za bilo koju cifru od 0 do 9. Osim toga dozvoljavamo jos i unos razmaka sa \s te crtice koja se tipicno koristi u telefonskim brojevima.

    if (!telKalup.test(telVrijednost)) {
        document.getElementById("telGreska").textContent = "Molimo koristite samo brojeve i znak ' - '.";
        telPolje.style.border = "2px solid red";
        sveOK = false;
    }
    else {
        document.getElementById("telGreska").textContent = "";
        telPolje.style.border = "";
    }
    if (sveOK == true) {
        alert("Hvala Vam, " + imeVrijednost + "! Vasa poruka je uspjesno poslana.");
        mojaForma.reset();
    }
}
)
    // RESET
    mojaForma.addEventListener("reset", function () {
        document.getElementById("imeGreska").textContent = "";
        document.getElementById("emailGreska").textContent = "";
        document.getElementById("telGreska").textContent = "";

        document.getElementById("ime").style.border = "";
        document.getElementById("email").style.border = "";
        document.getElementById("telefon").style.border = "";
    })

    // FILTRIRANJE KARTICA
    function filtrirajKartice(odabranaKategorija) {
        const sveKartice = document.querySelectorAll('.card');
        sveKartice.forEach(function (kartica) {
            const kategorijaKartice = kartica.getAttribute('data-kategorija');
            if (odabranaKategorija === 'sve' || odabranaKategorija === kategorijaKartice) {
                kartica.style.display = 'block';
            }
            else { kartica.style.display = 'none'; }
        }
        )
    }
    // SMOOTH SCROLL
    const navigacijskiLinkovi = document.querySelectorAll('a[href^"#"]');
    navigacijskiLinkovi.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const ciljniID = this.getAttribute('href');
            const ciljniElement = document.querySelector(ciljniID);
            if (ciljniElement) {
                ciljniElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }
        }
        )
    })

    // DARK MODE .....................




    // FUN FACTS GENERATOR (izbacuje po nasumicnom redoslijedu zanimljive cinjenice od kojih se u jednom krugu ista ne moze ponoviti)

    const sveCinjenice = [
        //prostor za niz buducih cinjenica  
    ];
    let spil = [...sveCinjenice];

    function osvjeziSpil() {
        const ispis = document.getElementById("prikaz-cinjenice");

        if (spil.length === 0) {
            spil = [...sveCinjenice];
            //resetujemo krug cinjenica
            alert("---neka poruka---");
        }

        const indeks = Math.floor(Math.random() * spil.length);
        // funkcija Math.random() daje random broj od 0 do 1 dok Math.floor() sijece decimalni dio broja, posto nama treba neki cijeli broj karte iz niza/spila bitna nam je ova druga funkcija. S obzirom da Math.random() funckija
        // generise brojeve u intervalu [0,1), nikad ne moze dati broj 1. Mnozenjem dobijenog broja sa spil.length osiguravamo da je CIJELI dio naseg decimalnog broja uvijek manji od broja zanimljivih 
        // cinjenica (ukoliko bi bio veci doslo bi do greske).
        const factKarta = spil.splice(indeks, 1)[0];
        let prikaz = factKarta.tekst;

        if (factKarta.funkcija !== null) {
            prikaz += "<strong>" + factKarta.funkcija() + "</strong >";
            // ukoliko fact karta ima neku dinamicku funkciju ovdje se izvrsava
        }
        ispis.innerHTML = prikaz;

    }
