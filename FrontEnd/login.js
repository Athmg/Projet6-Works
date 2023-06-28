const url = 'http://localhost:5678/api/users/login';

const formElt = document.getElementById('form');
const emailElt = document.getElementById('email');
const passwordElt = document.getElementById('password');

formElt.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailElt.value;
    const password = passwordElt.value;

    testLogin(email, password);
});

async function testLogin(email, password) {
    if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
// appeller fetch
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        console.log(result);
// tester si token ok
        if (result.token) {
            localStorage.setItem('token', result.token);
            window.location.href = 'index.html';
        } else {
           // Afficher erreur dans la connexion
            console.log('Erreur de connexion');
           
        }
    } else {
       // Afficher dans l'identification
        console.log('Identifiant ou mot de passe invalide'); 
    }
}
