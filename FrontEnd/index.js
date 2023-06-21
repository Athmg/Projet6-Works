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

// Récupérer éléments de la gallery modal
const modalGallery = document.querySelector(".modal_gallery");

// Récupérer éléments(id) du formulaire 
/*
const form = document.getElementById("form");
const imageElt = document.getElementById('image');
const titleElt = document.getElementById('title');
const optionsCateg = document.getElementById('id_categ_form');*/

// Récupérer éléments des modals
const modalDelete = document.getElementById("modal-delete");
const modalAdd = document.getElementById("modal-add");
const closeModalBtns = document.querySelectorAll(".close");
const btnAddPhoto = document.getElementById("btn-add-photo");
const btnEdit = document.querySelectorAll(".btn-edit");

//Récupérer éléments pour l'image et l'afficher(chargment img) dans modal ajout
const input = document.getElementById('image');
const previewImgBlock = document.getElementById('preview-img-block');
const previewImage = document.getElementById('preview-image');
const faImage = document.getElementById('fa-i-image');
const fileLabel = document.getElementById('img-label');
const typeImgLabel = document.getElementById('type-img-label');

// Sélectionner le bouton "Valider"
const btnValider = document.getElementById('btn-add');
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

//////////////////////////////////////////////////////////////////
// changement des couleurs sur les bouttons trier
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

console.log('l id gategory', idBtnsCateg);

console.log('l id gategory btn', btnsCateg);
btnActive(idBtnsCateg);

/////////////////////////////////////////////////////////////////
/**afficher ou cacher le mode édition suivant l'etat du token*/

//window.addEventListener('DOMContentLoaded', () => {

console.log(editIconTxt);

// vérifier le statut de la connexion
const testToken = loginTestToken();

if (testToken) {
  sectionBlockHeader.style.display = "block";
  idBtnsCateg.style.display = "none";
  console.log('connexion');
} else {
  sectionBlockHeader.style.display = "none";
  idBtnsCateg.style.display = "block";
  editIconTxt.forEach(elt => {
    elt.style.display = "none";
  });
}
//});

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

////////////////////////////////////////////////////

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


///////////////////////////////////////////////////////////////////////////
// Supprimer work dans le Dom et dans le server
function deleteWork() {
  const iconDeletes = document.querySelectorAll(".iconDelete");
  iconDeletes.forEach(iconDelete => {
    iconDelete.addEventListener('click', (e) => {
      e.preventDefault();
      // Empêcher la fermeture automatique de la modal
      e.stopPropagation();
      const idDelete = iconDelete.dataset.id;
      const figure = document.getElementById(idDelete);
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`http://localhost:5678/api/works/${idDelete}`, {
          method: 'DELETE',
          headers: {
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            if (response.ok) {
              // Suppression réussie 
              figure.remove();
              console.log(response.json);
            } else {
              console.log('Erreur de suppression sur le serveur:', response.statusText);
            }
          })
          .catch(error => {
            console.error('Erreur  de suppression:', error);
          });
      }
    });
  });
}


//////////////////////////////////////////////////////////////////////
// Ajouter work dans le Dom et dans le server

// événement pour le chagement de l'image
input.addEventListener('change', changeImage);

/* function upload l'image et l'afficher*/
function changeImage() {
  const file = input.files[0];
  let imageURL = '';
  // Vérifier si le fichier est sélectionné
  if (file) {
    console.log('Taille du fichier :', file.size, 'octets');
    fileLabel.style.display = 'blo';
    // teste taille de l'image si < à 4Mo
    if (file.size < 4) {
      alert('verifier la taille de l image');
      imageURL = '';
    }
    else {
      // Créer l'URL pour le fichier sélectionné
      imageURL = URL.createObjectURL(file);
      // Afficher l'image dans l'aperçu du modal
      previewImage.setAttribute('src', imageURL);
      // Ouvrir le modal d'aperçu
      previewImgBlock.style.display = 'block';
      // Cacher les données présent avant le upload
      faImage.style.display = 'none';
      fileLabel.style.display = 'none';
      input.style.display = 'none';
      typeImgLabel.style.display = 'none';
    }
  }

}

/** envoyer les données dans le serveur **/
function addWorks(){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // forma data pour l'ajout
    const formWork = new FormData(form);
    formWork.append('title', titleElt.value);
    console.log(titleElt);
    formWork.append('category', optionsCateg.value);
    console.log(optionsCateg);
    formWork.append('image', imageElt.files[0]);
    console.log(imageElt);

    const token = localStorage.getItem('token');

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
        displayWork(work)
        form.reset(); // mettre à zéro le formulaire une fois ajouter
      })
      .catch((error) => {
        console.log('Erreur lors de la requête fetch:', error);
      });
    e.stopPropagation();
  });
}
////////////////////////////////////////////////////////////
// tester les champs du formulaire pour activer le bouton valider

const form = document.getElementById("form");
const imageElt = document.getElementById('image');
const titleElt = document.getElementById('title');
const optionsCateg = document.getElementById('id_categ_form');
btnValider.disabled = true;

function testChamps() {


  if (imageElt.file[0] !== '' && titleElt.value.trim() !== '' && optionsCateg.value.trim() !== '') {
    btnValider.disabled = false;
  } else {
    btnValider.disabled = true;
  }
}

imageElt.addEventListener('change', testChamps);
titleElt.addEventListener('change', testChamps);
optionsCateg.addEventListener('change', testChamps);

///////////////////////////////////////////////
// événement au clic arrow-left
arrowLeft.addEventListener("click", function () {
  // masquer la modale ajout
  modalAdd.style.display = "none";
  // afficher la modale suppression
  modalDelete.style.display = "block";
  //formAddImage.reset();
});
