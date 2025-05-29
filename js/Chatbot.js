
// Fonction pour récupérer et traiter le JSON
function fetchJSON(url) {
    // Récupérer le JSON à partir de l'URL fournie
    fetch(url)
    //then est une méthode qui retourne une promesse et prend en paramètre une
        //fonction callback qui sera exécutée une fois la promesse résolue
        .then(response => {
        // Vérifier si la réponse est correcte
        if (!response.ok) {
            // Si la réponse n'est pas correcte, lancer une erreur
            throw new Error('Network response was not ok');
        }
        // Si la réponse est correcte, retourner le JSON
        return response.json();
        })
        //then ici permettra de récupérer le JSON retourné par la promesse
        .then(data => {
        // Vérifier si le JSON est vide ou mal formé
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            // Si le JSON est vide ou mal formé, lancer une erreur
            throw new Error('Empty JSON or malformed JSON');
        }
        //On affiche le JSON dans la console. Il s'agit d'un objet contenant les
        // intentions du chatbot
        console.log(data);
        // Passer les intentions à la fonction sendMessage qui sera définie plus tard
        sendMessage(data.intents);
        })
        //catch est une méthode qui retourne une promesse et prend en paramètre une
        //fonction callback qui sera exécutée en cas d’erreur
        .catch(error => {
        // En cas d’erreur, afficher un message d’erreur dans la console
        console.error('There was a problem with the fetch operation:', error);
        }) ;
}

function sendMessage(intents){
    const userInput = document.getElementById("user_input").value;
    const repContainer = document.getElementById("chat-box");
    const userInputElement = document.createElement("p");
    userInputElement.textContent = "Vous: " + userInput;
    repContainer.appendChild(userInputElement);

    // Ajouter le message utilisateur à l'historique
    historyMessages.addMessage({ message: "Vous: " + userInput, sender: "user" });

    const botResponse = processMessage(intents, userInput);
    showMessage("Chatbot: " + botResponse, "bot");

    // Ajouter la réponse du bot à l'historique
    historyMessages.addMessage({ message: "Chatbot: " + botResponse, sender: "bot" });

    // Effacer le champ de saisie
    document.getElementById("user_input").value = "";
    // Faire défiler vers le bas pour afficher la dernière réponse
    repContainer.scrollTop = repContainer.scrollHeight;
}

function showMessage(message, type) {
    const repContainer = document.getElementById("chat-box");
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.className = type;
    repContainer.appendChild(messageElement);
    // Faire défiler vers le bas pour afficher la dernière réponse
    repContainer.scrollTop = repContainer.scrollHeight;
}

function processMessage(intents, message) {
    let response = "Je suis désolé, je ne suis pas sûr de comprendre.";
    // Parcourir les intentions du chatbot
    intents.forEach((intent) => {
        // Vérifier si le message de l'utilisateur correspond à l'un des motifs
        intent.patterns.forEach((pattern) => {
        // Vérifier si le message de l'utilisateur contient le motif
        if (message.toLowerCase().includes(pattern.toLowerCase())) {
            // Sélectionner une réponse aléatoire parmi les réponses possibles
            response =
            intent.responses[Math.floor(Math.random() * intent.responses.length)];
        }
        });
    });
    // Retourner la réponse
    return response;
}

// Classe pour gérer l'historique des messages du chat
class ChatHistory {
    constructor() {
        this.messages = [];
    }

    // Ajoute un message à l'historique
    addMessage(message) {
        this.messages.push(message);
    }

    // Retourne l'historique complet des messages
    getHistory() {
        return this.messages;
    }
}

window.addEventListener('beforeunload', saveMessages);
window.addEventListener('DOMContentLoaded', loadMessages);

// Créer une instance globale de ChatHistory
const historyMessages = new ChatHistory();

// Fonction pour sauvegarder l'historique dans la session navigateur
function saveMessages() {
    console.log('Saving chat history...');
    console.log(historyMessages.getHistory());
    sessionStorage.setItem(
        'chatHistory',
        JSON.stringify(historyMessages.getHistory())
    );
}

// Fonction pour charger les messages de la session navigateur
function loadMessages() {
    // Récupérer l'historique des messages de la session navigateur
    const chatHistory = JSON.parse(sessionStorage.getItem('chatHistory'));
    if (chatHistory) {
        chatHistory.forEach(message => {
        showMessage(message.message, message.sender);
        historyMessages.addMessage(message); // Recharge aussi dans l'objet
        });
    }
}

//Pour que le bouton entrée puisse envoyer le message
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("user_input");

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Empêche le comportement par défaut (souvent envoyer un formulaire)
        fetchJSON("../json/intents.json"); // Appelle ta fonction existante
      }
    });
});