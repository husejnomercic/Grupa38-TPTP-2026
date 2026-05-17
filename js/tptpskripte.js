// Cijeli kod je raden uz pomoc asistencije AI (Google Gemini).AI je pomogao sa kreacijom logicke strukture ciji je svaki koncept naknadno i objasnjen (uz potrebna podpitanja),
// te je pomogao sa provjerom ispravnosti kasnije-ispisanog koda. Svaka linija koda osim regex patterns rucno je ispisana, karakter po karakter.


//____________VALIDACIJA FORME

const mojaForma = document.getElementById("mojaForma");

if (mojaForma) {
    // Koristimo if() kako bismo izbjegli gresku prilikom ucitavanja skripte na pogresnoj stranici
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
            document.getElementById("telGreska").textContent = "Molimo koristite samo brojeve, razmake i ' - '.";
            telPolje.style.border = "2px solid red";
            sveOK = false;
        }
        else {
            document.getElementById("telGreska").textContent = "";
            telPolje.style.border = "";
        }
        if (sveOK == true) {
            alert("Hvala Vam, " + imeVrijednost + "! Vaša poruka je uspješno poslana.");
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
}


// FILTRIRANJE KARTICA

function filtrirajKartice(odabranaKategorija)
{
        const sveKartice = document.querySelectorAll('.card');
        sveKartice.forEach(function (kartica) {
            const kategorijaKartice = kartica.getAttribute('data-kategorija');

            if (odabranaKategorija === 'sve' || odabranaKategorija === kategorijaKartice)
            {
                kartica.style.display = 'block';
            }
            else { kartica.style.display = 'none'; }
        }
        )
}
const filterDugmad = document.querySelectorAll('.filter-btn');

filterDugmad.forEach(dugme => {
    dugme.addEventListener('click', function () {
        const kategorija = this.getAttribute('data-filter');
        filtrirajKartice(kategorija);
    });
});


   // SMOOTH SCROLL


const navigacijskiLinkovi = document.querySelectorAll('a[href^="#"]');
navigacijskiLinkovi.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const ciljniID = this.getAttribute('href');

        if (ciljniID === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const ciljniElement = document.querySelector(ciljniID);
        if (ciljniElement) {
            ciljniElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            const bocniNav = document.getElementById('secondary-nav');
            if (bocniNav && this.closest('#secondary-nav')) {
                bocniNav.style.display = 'none';
            }
        }
    });
});


// DARK MODE

const themeToggleBtn = document.getElementById('theme-toggle');
const trenutnaTema = localStorage.getItem('tema');

if (trenutnaTema === 'dark'){
    document.body.classList.add('dark-mode');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('tema', 'dark');
        } else {
            localStorage.setItem('tema', 'light');
        }
    });
}


// INDIKATOR
// Prati skrolovanje stranice i racuna procenat procitanog sadrzaja te ga ispisuje na ekranu
window.addEventListener('scroll', function () {
    const trenutniSkrol = document.documentElement.scrollTop || document.body.scrollTop;
    const ukupnaVisina = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    if (ukupnaVisina > 0) {
        const procenat = Math.round((trenutniSkrol / ukupnaVisina) * 100);

        const tekstualniPrikaz = document.getElementById('procenat-procitano');
        if (tekstualniPrikaz) {
            tekstualniPrikaz.textContent = procenat + "%";
        }
    }
});


    // FUN FACTS GENERATOR (izbacuje po nasumicnom redoslijedu zanimljive cinjenice od kojih se u jednom krugu ista ne moze ponoviti)


const sveCinjenice = [

    {
        tekst: "Današnji globalni internet se prenosi laserskim zrakama kroz podvodne optičke kablove na dnu okeana.",
        funkcija: async function () {
            const pocetakMjerenja = performance.now();

            try {
                // Pokusavamo izmjeriti ping trenutno
                await fetch("/", { method: "HEAD" });
                const trenutniPing = Math.round(performance.now() - pocetakMjerenja);
                const brzina = 200;
                const predeniPut = trenutniPing * brzina;

                return "Dok je signal otišao do servera i nazad za Vaš ping od " + trenutniPing + " ms, svjetlost je unutar optičkog kabla prešla " + predeniPut.toLocaleString() + " kilometara oko okeana.";
            }
            catch (e) {
                const prosjecniBalkanskiPing = 40;
                const prosjecniPut = prosjecniBalkanskiPing * 200;
                // Ukoliko ne mozemo pristupiti trenutnom pingu

                return "Sa prosječnim balkanskim pingom od " + prosjecniBalkanskiPing + " ms, signal u optičkom kablu pređe oko " + prosjecniPut.toLocaleString() + " kilometara.";
            }
        }
    },


    {
        tekst: "Prvi elektronski računar ENIAC trošio je nevjerovatnih 150 kW struje, toliko da su svjetla u cijelom kvartu Philadelphije treperila kada se on upali.",
        funkcija: async function () {
            // Ako browser ne dozvoljava pristup bateriji
            if (!navigator.getBattery) {
                const Procenat = 100;
                const Mikrosekunde1 = Math.round((Procenat / 100) * 360000);

                return "Ako Vam je mobitel na " + Procenat + " % baterije – ENIAC bi tu punu bateriju potrošio za svega " + Mikrosekunde1.toLocaleString() + " mikrosekunde.";
            }

            try {
                // Ako browser dozvoljava hvatamo stvarno stanje uzivo
                const battery = await navigator.getBattery();
                const nivoBaterije = battery.level;

                const procenatBaterije = Math.round(nivoBaterije * 100);
                const mikrosekunde = Math.round(nivoBaterije * 360000);

                return "Vaš uređaj je trenutno na " + procenatBaterije + " % baterije. Sa tom količinom energije, gigantski ENIAC bi mogao raditi svega " + mikrosekunde.toLocaleString() + " mikrosekunde.";
            } catch (error) {
                // Za svaki slucaj ukoliko unutar try-catch nesto drugo ne radi, vracamo alternativni tekst
                return "Sa 100 % baterije jednog prosječnog laptopa, gigantski ENIAC bi radio jedva 360.000 mikrosekundi prije nego što sve ugasi!";
            }
        }
    },
    
    {
        tekst: "Prvi veb-sajt na svijetu kreiran je u CERN-u i zvanično pušten u javnost 6. augusta 1991. godine od strane Tima Berners-Leeja. ",
        funkcija: function ()
        {
            const prviSajtDatum = new Date("1991-08-06");
            const danasnjiDatum = new Date();
            const razlika= danasnjiDatum - prviSajtDatum;
            const brojDana = Math.floor(razlika / (1000 * 60 * 60 * 24));
            // 1000ms * 60s * 60min * 24h = broj milisekundi u jednom danu
            const godine = Math.floor(brojDana / 365);
            const preostaliDani = brojDana % 365;
            return "Od tog historijskog trenutka pa sve do ovog sekunda prošlo je tačno " + godine + " godina i " + preostaliDani + " dana, a taj sajt je i dan-danas živ i aktivan.";
        }
    },

    {
        tekst: "Globalna industrija mobilnih telefona nikada ne spava: širom svijeta se svake sekunde proda oko 42 pametna telefona, od čega oko 7 komada otpada na Appleove iPhone uređaje, a oko 8 na Samsung telefone. ",
        funkcija: function ()
        {
            const protekleSekunde = Math.floor(performance.now() / 1000) || 1;
            const prodatoMobitela = protekleSekunde * 42;
            const Iphone = protekleSekunde * 7;
            const Samsung = protekleSekunde * 8;
            // Racunamo broj prodanih mobitela za vrijeme boravka na sajtu na osnovu statistike
            return "Otkako ste otvorili ovaj sajt prije " + protekleSekunde + " sekundi, na planeti je već prodano otprilike " + prodatoMobitela.toLocaleString() + " pametnih telefona, uključujući oko " + Iphone.toLocaleString() + " iPhonea i " + Samsung.toLocaleString() + " Samsung uređaja!";
        }
    },

    {
        tekst: "Prvi računarski 'bug' bio je pravi moljac kojeg je 9. septembra 1947. godine programerka Grace Hopper pronašla zaglavljenog u releju računara Harvard Mark II. ",
        funkcija: function () {
            return "";
        }
    },

    {
        tekst: "Googleov prvi server iz 1996. godine imao je kućište napravljeno od LEGO kockica jer je osnivačima trebalo jeftino i lako proširivo kućište za 10 hard diskova od po 4 GB (ukupno 40 GB). ",
        funkcija: function () {
            return "";
        }
    },

    {
        tekst: "Prva veb-kamera na svijetu izmišljena je 1991. godine na Univerzitetu Cambridge samo zato što su naučnici bili lijeni da silaze sprat niže kako bi provjerili da li je bokal s kafom prazan. ",
        funkcija: function () {
            return "";
        }
    },

    {
        tekst: "Računar Apollo Guidance Computer (AGC), koji je 1969. godine odveo ljude na Mjesec, imao je radnu memoriju od svega 4 KB. ",
        funkcija: function () {

            const detektovanRam = navigator.deviceMemory;
            const koristenRam = detektovanRam || 8;
            const kolikoPutaVise = (koristenRam * 1024 * 1024) / 4;

            if (detektovanRam) {
                return "Vaš uređaj trenutno ima " + koristenRam + " GB RAM-a, što znači da ima tačno " + kolikoPutaVise.toLocaleString() + " puta više radne memorije od letjelice koja je sletjela na Mjesec.";
            } else {
                // Ukoliko je informacija sakrivena mijenjamo ispis kako bi kod ostao tacan
                return "Jedan prosječan uređaj danas ima oko " + koristenRam + " GB RAM-a, što znači da posjeduje otprilike " + kolikoPutaVise.toLocaleString() + " puta više radne memorije od letjelice koja je sletjela na Mjesec!";
            }
        }
    }

];

    let spil = [...sveCinjenice];

   async function osvjeziSpil() {
        const ispis = document.getElementById("prikaz-cinjenice");

        if (spil.length === 0)
        {
            spil = [...sveCinjenice];
            // Resetujemo krug cinjenica
            alert("Pogledali ste sve :)");
        }

        const indeks = Math.floor(Math.random() * spil.length);
        // Funkcija Math.random() daje random broj od 0 do 1 dok Math.floor() sijece decimalni dio broja, posto nama treba neki cijeli broj karte iz niza/spila bitna nam je ova druga funkcija. S obzirom da Math.random() funckija
        // generise brojeve u intervalu [0,1), nikad ne moze dati broj 1. Mnozenjem dobijenog broja sa spil.length osiguravamo da je CIJELI dio naseg decimalnog broja uvijek manji od broja zanimljivih 
        // cinjenica (ukoliko bi bio veci doslo bi do greske).
        const factKarta = spil.splice(indeks, 1)[0];
        let prikaz = factKarta.tekst;
        const dodatak = await factKarta.funkcija();

        if (dodatak !== "") {
            prikaz += "<strong>" + dodatak + "</strong>";
        // Ukoliko fact karta ima neku dinamicku funkciju ovdje se izvrsava
        }
        ispis.innerHTML = prikaz;
}

const factDugme = document.getElementById("sljedeca-cinjenica");

if (factDugme) {
        osvjeziSpil(); 
    factDugme.addEventListener("click", osvjeziSpil); 
    // Koristimo if() za istu svrhu kao i na pocetku koda, kako bismo izbjegli gresku prilikom ucitavanja skripte na pogresnoj stranici. 
}

// KONTROLA MOBILNOG MENIJA (SIDEBAR)
// Omogucava otvaranje i zatvaranje navigacije na manjim ekranima

const otvoriMeniBtn = document.querySelector('.toggle-sidebar-btn');
const zatvoriMeniBtn = document.querySelector('.close-sidebar-btn');
const bocniNavZaMeni = document.getElementById('secondary-nav');

if (otvoriMeniBtn && bocniNavZaMeni)
{
    otvoriMeniBtn.addEventListener('click', function () {
        bocniNavZaMeni.style.display = 'block';
    });
    // Omogucava otvaranje menija na klik
}
if (zatvoriMeniBtn && bocniNavZaMeni)
{
    zatvoriMeniBtn.addEventListener('click', function () {
        bocniNavZaMeni.style.display = 'none';
    });
    // Omogucava zatvaranje menija na klik ikonice X
}
