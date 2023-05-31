const url = 'http://localhost:5678/api/users/login';


const emailElt = document.getElementById('email');
const passwordElt = document.getElementById('password');
//const tokenelt=localStorage.getItem('token',JSON.parse(token));

function eventSubmit() {
    const formElt = document.getElementById('form');
    formElt.addEventListener('submit', postForm);
}
eventSubmit();

const optionReq = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

const usersPost = async (body) => {
    optionReq.body=body;
    const response = await fetch(url, optionReq );
    const result = await response.json();
    console.log(result);
    if(result.token){
    localStorage.setItem('token',result.token);
    window.location='modalDelete.html'
    }

    // else affichage message erreur pour l'utilisteur;
}

function testLogin(email, password) {
    if ((email != null) && (password != null)) {
        email = document.getElementById('email').value;
        password = document.getElementById('password').value;
        if ((email === 'sophie.bluel@test.tld') && (password === 'S0phie')) {
            alert('identifiant ou le mot de passe OK!!');
            // les indentifiants stockées dans le stroge
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            alert('les informations sont enregisrteés dans le localStorage');
            // redirection dans la page index
            document.location.assign('index.html');  
        }
        else {
            alert('Erreur de connexion !!');
            document.location.reload();
        }
    }
     else{
         alert('Erreur dans identifiant ou le mot de passe');
    }
}

function postForm(e) {
    e.preventDefault();
    const email = emailElt.value;
    const password = passwordElt.value;
    const users = {
        email: email,
        password: password
    }
    const usersJson = JSON.stringify(users);
    console.log(usersJson);

   // testLogin(email, password);

    //appel function pour le  fetch
    usersPost(usersJson);
}