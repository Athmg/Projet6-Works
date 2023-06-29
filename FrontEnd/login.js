const url = 'http://localhost:5678/api/users/login';

const formElt = document.getElementById('form');
const emailElt = document.getElementById('email');
const passwordElt = document.getElementById('password');
const errorMessage = document.getElementById("error-message");

formElt.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailElt.value;
    const password = passwordElt.value;
    testLogin(email, password);
});

async function testLogin(email, password) {
    // Réinitialiser le message d'erreur
    errorMessage.innerHTML = "";
    const erreur = false;
      
    if ((email.trim() === "") || (password.trim() === "")) {
        afficherAlerte("Veuillez remplir tous les champs.", "danger", errorMessage);
        erreur = true;
    }
    else {
        if(email !== emailElt.value || password !== passwordElt.value){
            // Afficher l'erreur de connexion si le token est invalide
            afficherAlerte('Email ou mot de passe incorrect.', "danger", errorMessage);
        }
    }

    if (email === emailElt.value && password === passwordElt.value) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);   
        // appeler fetch
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        console.log(result);

        // tester si le token est valide
        if (result.token) {
            localStorage.setItem('token', result.token);
            window.location.href = 'index.html';
        } else {
            // Afficher l'erreur de connexion si le token est invalide
            afficherAlerte('Email ou mot de passe incorrect.', "danger", errorMessage);
        }
    }
}    

function afficherAlerte(message, type, element) {
    element.innerHTML = ""; // Effacer le contenu précédent
    const alerte = document.createElement("div");
    alerte.classList.add("alert", `alert-${type}`);
    alerte.textContent = message;
    element.appendChild(alerte);
}

function logout() {
    // Réinitialiser les champs 
    emailElt.value = '';
    passwordElt.value = '';
    // Evénement avant de quitter la page
    window.addEventListener("beforeunload", () => {
        // Réinitialiser les valeurs dans le stockage local
        localStorage.removeItem('email');
        localStorage.removeItem('password');
    });
}

function displayErrorMessage(message) {
    var errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
  }
  
  function hideErrorMessage() {
    var errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = "";
    errorMessageElement.style.display = "none";
  }
  
  