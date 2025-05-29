function toggleChapter(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    const isOpen = content.style.display === 'block';
    content.style.display = isOpen ? 'none' : 'block';
    arrow.classList.toggle('open', !isOpen);
}

console.log("Je suis la console !");
function quizAlert(){
    alert("Vous êtes sur le point de commencer le quiz !");
    quizConfirm();
}
var réponse;
function quizConfirm() {
    // Vérifie que tous les champs du formulaire sont remplis
    var inputs = document.querySelectorAll("#informations input, #informations select");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            alert("Veuillez remplir tous les champs !");
            return;
        }
    }

    var res = confirm("Etes-vous sûr de vouloir continuer ?");
    if (res == true) {
        alert("Le quiz va commencer dans 5 secondes !");
        var timer = 5;

        var confirmation = document.createElement("p");
        confirmation.textContent = timer + " secondes";
        confirmation.style.color = "red";
        confirmation.style.fontSize = "1.5em";
        confirmation.style.fontWeight = "bold";
        confirmation.style.textAlign = "center";

        var start = document.getElementById("informations");
        start.appendChild(confirmation);

        var interval = setInterval(function () {
            timer--;
            console.log(timer);
            confirmation.textContent = timer + " secondes";
            if (timer == 0) {   
                clearInterval(interval);
                confirmation.textContent = "C'est parti ! Bonne chance !";
                document.getElementsByClassName("quiz")[0].style.display = "block";
                document.querySelector('.bquiz').style.display = "block";

                //Désactive la saisie
                let infoFieldset = document.getElementById("informations");
                let children = infoFieldset.querySelectorAll("input, select");
                children.forEach(child => child.disabled = true);

                // Cache le bouton "Commencer le quiz"
                let startButton = infoFieldset.querySelector('input[type="submit"]');
                startButton.style.display = "none";
            }
        }, 1000);
    } else {
        alert("Vous allez être redirigé vers la page d'accueil !");
        window.location.href = "accueil.html";
    }
}

var essai = 1; // compteur

function submitQuiz() {
    let score = 0;

    // Q1
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === "a") {
        score += 4;
    }

    // Q2
    const q2 = document.querySelectorAll('input[name="q2"]:checked');
    q2.forEach(el => {
        if (el.value === "a" || el.value === "b") {
            score += 3;
        } else if (el.value === "c") {
            score -= 3;
        }
    });

    // Q3
    const texte = document.getElementById("exemple").value.toLowerCase();
    const motsCles = ["réduire", "alléger", "faciliter", "optimiser", "exploiter"];
    if (motsCles.some(mot => texte.includes(mot))) {
        score += 10;
    }

    //Ajouter au tableau
    const tableau = document.getElementById("result").getElementsByTagName("tbody")[0];
    const ligne = tableau.insertRow();
    const cellule1 = ligne.insertCell(0);
    const cellule2 = ligne.insertCell(1);
    cellule1.textContent = essai;
    cellule2.textContent = score;
    document.getElementById("QuizId").reset();
    essai++;

    if (essai > 3) {
        alert("Vous avez réalisé trop d'essais")
        document.querySelector('.bquiz').disabled = true;
    }
}
