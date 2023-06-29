// Récupérer l'url works
const url = "http://localhost:5678/api/works";

// Récupérer le token
const token = localStorage.getItem('token');

// Récupérer éléments de la gallery
const sectionGallery = document.querySelector(".gallery");

// Récupérer btn pour filter la gallery suivant les boutons
const btnsCateg = document.querySelectorAll(".category button");

// Récupérer élément bouton des categories
const idBtnsCateg = document.getElementById('categ');

// Récupérer éléments mode édition
const sectionBlockHeader = document.getElementById('section_blockHeader');
// const btnsCategory=document.getElementById('categ');
const editIconTxt = document.querySelectorAll(".edit_icon_txt");
const logout=document.getElementById('logout');
const login=document.getElementById('login');

// Récupérer éléments de la gallery modal
const modalGallery = document.querySelector(".modal_gallery");

// Récupérer éléments(id) du formulaire 
/* */
const form = document.getElementById("form");
const imageElt = document.getElementById('image');
const titleElt = document.getElementById('title');
const optionsCateg = document.getElementById('id_categ_form');/**/
// Sélectionner le bouton "Valider pour l'ajout"
const btnValider = document.getElementById('btn-add');

// Récupérer éléments des modals
const modalDelete = document.getElementById("modal-delete");
const modalAdd = document.getElementById("modal-add");
const closeModalBtns = document.querySelectorAll(".close");
const btnAddPhoto = document.getElementById("btn-add-photo");
const btnEdit = document.querySelectorAll(".btn-edit");
const errorMessage = document.getElementById("error-message");

//Récupérer éléments pour l'image et l'afficher(chargment img) dans modal ajout
const formImgBlock=document.getElementById('form_img_block')
const input = document.getElementById('image');
const previewImgBlock = document.getElementById('preview-img-block');
const previewImage = document.getElementById('preview-image');
const faImage = document.getElementById('fa-i-image');
const fileLabel = document.getElementById('img-label');
const typeImgLabel = document.getElementById('type-img-label');


//const formAddImage = document.querySelector('#form');
const arrowLeft = document.getElementById('arrow-left');

/*** main : fonction principale *****/

const main = async () => {
  const response = await fetch(url);
  const works = await response.json();
  displayWorks(works); // afficher works
  deleteWork();        // suppression works
  addWorks()    //ajout works
  filterGallery(works);  // filtrer works
};
main();

///////////////////////////////////////////////////////////////////
// afficher images dans la gallery
function displayWorks(works) {
  sectionGallery.innerHTML = "";
  works.forEach(work => {
    displayWork(work);
  });
}

//afficher une image dans la gallery
function displayWork(work) {
  // afficher sur la page index
  sectionGallery.innerHTML += `
            <figure>
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>
        `
  // afficher sur la modal
  modalGallery.innerHTML += `
          <figure>
            <div id="id-icon"><i class="iconDelete fa-solid fa-trash-can" data-id=${work.id}></i></div>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption class="caption-edit">éditer</figcaption>
          </figure>
        `
}

//////////////////////////////////////////////////////////////
// filter la gallery 
function  filterGallery(works) {
  btnsCateg.forEach(btnCateg => {
    btnCateg.addEventListener("click", () => {
      const categoryId = parseInt(btnCateg.id);
      filterEvent(works, categoryId);
    });
  })
}

//filter dans la gallery par catégories Id
function filterEvent(works, idCategorie) {
  const galleryFilters = works.filter(work => work.categoryId === idCategorie || idCategorie === 0);
  displayWorks(galleryFilters);

}

//////////////////////fin/////////////////////////////////
function deleteWork() {
  const iconDeletes = document.querySelectorAll(".iconDelete");
  const idGallery = document.querySelectorAll('.gallery figure');

  iconDeletes.forEach((iconDelete, index) => {
    iconDelete.addEventListener('click', (e) => {
      e.preventDefault();
      const idDelete = iconDelete.dataset.id;
      const figure = iconDelete.parentNode.parentNode;

      if (token) {
        fetch(`http://localhost:5678/api/works/${idDelete}`, {
          method: 'DELETE',
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            if (response.ok) {  // Suppression réussie 
             // Supprimer la galerie dans la modal
              figure.remove();
              // Supprimer la galerie dans la page index
              if (idGallery[index]) {
                idGallery[index].remove();
              }
              console.log('Réponse fetch delete', response.json);
            } else {
              console.log('Erreur de suppression sur le serveur:', response.statusText);
            }
          })
          .catch(error => {
            console.error('Erreur de suppression:', error);
          });
      }

      // Empêcher la fermeture automatique de la modal
      e.stopPropagation();
    });
  });
}

//////////////////////////////////////////////////////////////////////
// Ajouter work dans le Dom et dans le server

// événement pour le chagement de l'image
input.addEventListener('change', changeImage);

/* function upload l'image et l'afficher*/

  function changeImage() {
    const file = imageElt.files[0];
    let imageURL = '';
    // Vérifier si le fichier est sélectionné
    if (file) {
      console.log('Taille du fichier :', file.size, 'octets');
      fileLabel.style.display = 'block';
      // Vérifier la taille de l'image si elle est inférieure à 4Mo (* 1048576)
      if (file.size < 4 ) {
        alert("L'image doit être inférieure à 4 Mo");
        imageURL = '';
      } else {
        // Créer l'URL pour le fichier sélectionné
        imageURL = URL.createObjectURL(file);
        previewImage.setAttribute('src', imageURL);
  
        // Afficher l'image dans l'aperçu du modal
        previewImgBlock.style.display = 'block';
        previewImage.style.display = 'block';
        formImgBlock.style.flexDirection = 'initial';
  
        // Cacher les données présentes avant le upload
        faImage.style.display = 'none';
        fileLabel.style.display = 'none';
        imageElt.style.display = 'none';
        typeImgLabel.style.display = 'none';
      }
    }
  }
 

/** envoyer les données dans le serveur et ajout dans le dom**/
function addWorks() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // FormData pour l'ajout
    const formWork = new FormData(form);
    formWork.append('title', titleElt.value);
    formWork.append('category', optionsCateg.value);
    formWork.append('image', imageElt.files[0]);

    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formWork,
    })
      .then((response) => {
        return response.json();
      })
      .then((work) => {
        // ajouter nouveau work
        displayWork(work);
        form.reset(); // mettre à zéro le formulaire une fois ajouté
        previewImage.style.display = 'none'; // Cacher l'aperçu de l'image
        // Cacher les données présentes avant le upload
        faImage.style.display = 'block';
        fileLabel.style.display = 'block';
        imageElt.style.display = 'block';
        typeImgLabel.style.display = 'block';
        formImgBlock.style.flexDirection = 'column';
        
      })
      .catch((error) => {
        console.log('Erreur lors de la requête fetch:', error);
      });
    e.stopPropagation();
  });
}

//////////////////////////////////////////////////////////////////
// changement des couleurs sur les bouttons filtrer
function btnActive(idCateg) {
  btnsCateg.forEach(btn => {
    btn.addEventListener('click', function () {
      // supprimer la classe active de tous les boutons
      btnsCateg.forEach(btn => {
        btn.classList.remove('active');
      });
      // ajouter la classe active au bouton cliqué
      this.classList.add('active');

    });
  });
}
btnActive(idBtnsCateg);

/////////////////////////////////////////////////////////////////
/**afficher ou cacher : mode édition suivant l'etat du token*/

// vérifier le statut de la connexion
const testToken = loginTestToken();

if (testToken) {
  sectionBlockHeader.style.display = "block";
  idBtnsCateg.style.display = "none";
  login.style.display="none";
  console.log('connexion');
} else {
  sectionBlockHeader.style.display = "none";
  idBtnsCateg.style.display = "block";
  logout.style.display="none";
  editIconTxt.forEach(elt => {
    elt.style.display = "none";
  });
}

// vérifier le Token
function loginTestToken() {
  // Vérifier si token existe
  if (token) {
    // L'utilisateur est connecté
    return true;
  } else {
    // L'utilisateur est déconnecté
    return false;
  }
}

////////////////////////////////////////////////////////////
// tester les champs du formulaire pour activer le bouton valider
function testChamps() {

  if (imageElt.files.length > 0 && titleElt.value.trim() !== '' && optionsCateg.value !== '0') {
    btnValider.disabled = false;
    afficherAlerte("", "success", errorMessage);
   
  } else {
    afficherAlerte("Veuillez remplir tous les champs.", "danger", errorMessage);
    btnValider.disabled = true;
    
  }
}

btnValider.disabled = true;

imageElt.addEventListener('change', testChamps);
titleElt.addEventListener('change', testChamps);
optionsCateg.addEventListener('change', testChamps);

// événement formulaire rempli

  if (!testChamps()) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
/////////////////////////////////////////////////////////////////

function afficherAlerte(message, type, element) {
  element.innerHTML = ""; // Effacer le contenu précédent
  const alerte = document.createElement("div");
  alerte.classList.add("alert", `alert-${type}`);
  alerte.textContent = message;
  element.appendChild(alerte);
}

///////////////////////////////////////////////
// événement au clic arrow-left
arrowLeft.addEventListener("click", function () {
  // masquer la modale ajout
  modalAdd.style.display = "none";
  // afficher la modale suppression
  modalDelete.style.display = "block";
  //formAddImage.reset();
});

///////////////////////////////////////////////
// afficher la modal suppression
function displayModalDelete() {
  modalDelete.style.display = "block";
}
//  afficher la modal ajout
function displayModalAdd() {
  modalAdd.style.display = "block";
}
// fermer  les modals
function fermerModals() {
  modalDelete.style.display = "none";
  modalAdd.style.display = "none";
}
// événement pour le bouton ajout photo
btnAddPhoto.addEventListener("click", displayModalAdd);

// événement pour le bouton supprimer work
btnEdit.forEach((button) => {
  button.addEventListener("click", displayModalDelete);
});
// événement pour les boutons fermer modals
closeModalBtns.forEach((button) => {
  button.addEventListener("click", fermerModals);
});

// événement pour fermer la modal en dehors
window.addEventListener("click", (event) => {
  if (event.target === modalDelete || event.target === modalAdd) {
    fermerModals();
  }
});

////////////////////////////////////////////////////////////
// nettoyer le localstorage

logout.addEventListener("click", () => {
  localStorage.clear();
 
});
