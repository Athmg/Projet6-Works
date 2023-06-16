// recupération de l'url works
const url = "http://localhost:5678/api/works";

// recupération de la gallery
const sectionGallery = document.querySelector(".gallery");
// recupération de la gallery modal
const modalGallery = document.querySelector(".modal_gallery");

// recupération de ID 
const btnElt = document.getElementById("button");
const btnChange=document.getElementById('btn-change');

/**
 * fetch get et trie de la gallery
 */

const main = async () => {
  const response = await fetch(url);
  const works = await response.json();
  displayWorks(works); // affichage les données (works)
  deleteWork();
  filterEvent(works);    
};
main();

///////////////////////////////////////////////////////////////////
// affichage des images dans la gallery
function displayWorks(works) {
  sectionGallery.innerHTML = "";
  works.forEach(work => {
    displayWork(work);
  });
}

//affichage d'un image dans la gallery
function displayWork(work) {
  // affichage sur la page index
  sectionGallery.innerHTML += `
            <figure>
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>
        `
  modalGallery.innerHTML += `
          <figure>
            <i class="iconDelete fa-solid fa-trash-can" data-id=${work.id}></i>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption class="caption-edit">éditer</figcaption>
          </figure>
        `
}
//////////////////////////////////////////////////////////////
// filter de la gallery 
const btnsElt = document.querySelectorAll(".category button");
function filterEvent(works) {
  btnsElt.forEach(btnElt => {
    btnElt.addEventListener("click", () => {
      const categoryId = parseInt(btnElt.id);
      filterGallery(works, categoryId);     
    });
  })
}

//filter dans la gallery par catégories Id
function filterGallery(works, idCategorie) {
  const galleryFilters = works.filter(work => work.categoryId === idCategorie || idCategorie === 0);
  displayWorks(galleryFilters);

}

//////////////////////////////////////////////////////////////////
// changement des couleurs sur les bouttons trier
function btnActive(btnsCategory){
  const btns = btnsCategory.querySelectorAll('.category button');

  btns.forEach(btn => {
    btn.addEventListener('click', function() {
      // supprimer la classe active de tous les boutons
      btns.forEach(btn => {
        btn.classList.remove('active');
      });
      // ajouter la classe active au bouton cliqué
      this.classList.add('active');

    });
  });
}

const btnsCategory = document.getElementById('categ');
btnActive(btnsCategory);

/////////////////////////////////////////////////////////////////
/**afficher ou cacher le mode édition suivant l'etat du token*/ 

window.addEventListener('DOMContentLoaded', () => {
  const sectionBlockHeader=document.getElementById('section_blockHeader');
  const btnsCategory=document.getElementById('categ');
  const editIconTxt  = document.querySelectorAll(".edit_icon_txt");
  console.log(editIconTxt);

  // vérifier le statut de la connexion
  const testToken = loginTestToken(); 

  if (testToken) {
      sectionBlockHeader.style.display = "block";
        btnsCategory.style.display = "none";
        console.log('connexion');
  } else {
    sectionBlockHeader.style.display = "none";
    btnsCategory.style.display = "block";
    editIconTxt.forEach(elt=> {
      elt.style.display = "none";
    });
  }
});

// vérifier le Token
function loginTestToken() {
  const token = localStorage.getItem('token');

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
// afficher les modals

 // Récupérer les éléments du DOM
 const btnEdit=document.querySelectorAll(".btn-edit");
 const modalDelete = document.getElementById("modal-delete");
 const modalAdd = document.getElementById("modal-add");
 const closeModalBtns = document.querySelectorAll(".close");
 const btnAddPhoto = document.getElementById("btn-add-photo");
 
 // afficher la modal de suppression
 function displayModalDelete() {
   modalDelete.style.display = "block";
 }
 //  afficher la modal d'ajout
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

//Récupérer l'image et l'afficher
const input = document.getElementById('image');
const previewImgBlock = document.getElementById('preview-img-block');
const previewImage = document.getElementById('preview-image');
const faImage = document.getElementById('fa-i-image');
const fileLabel = document.getElementById('img-label');
const typeImgLabel = document.getElementById('type-img-label');

// addEventListener pour le chargement de l'image
input.addEventListener('change', changeImage);

/* function upload l'image et l'afficher*/
function changeImage() {
  const file = input.files[0];
  let imageURL = '';
  // Vérifier si le fichier est sélectionné
  if (file) {
    console.log('Taille du fichier :', file.size, 'octets');
    // teste taille de l'image si < à 4Mo
    if(file.size<4){
       alert('verifier la taille de l image' );
       imageURL='';
     }
     else{

    // Créer l'URL pour le fichier sélectionné
    imageURL = URL.createObjectURL(file);
    // Afficher l'image dans l'aperçu du modal
    previewImage.setAttribute('src', imageURL);
    // Ouvrir le modal d'aperçu
    previewImgBlock.style.display = 'block';
    // cacher les données présent avant le upload
    faImage.style.display = 'none';
    fileLabel.style.display = 'none';
    input.style.display = 'none';
    typeImgLabel.style.display = 'none';
    }
  }
 
}

/* *
Envoyer les données dans le serveur
*/
const formAddImage = document.querySelector('#form');
formAddImage.addEventListener('submit', (e) => {
  e.preventDefault();
  const imageElt = document.getElementById('image').files[0];
  const titleElt = document.getElementById('title').value;
  const optionsCateg = document.getElementById('id_category');
// forma data pour l'ajout
  const formWork = new FormData(formAddImage);
  formWork.append('title', titleElt);
  console.log(titleElt);
  formWork.append('category', optionsCateg.value);
  console.log(optionsCateg);
  formWork.append('image', imageElt);
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
    .then((works) => {   
      // ajouter nouveau work     
        displayWork(formWork)  
      formAddImage.reset(); // mettre à zéro le formulaire une fois ajouter
    })
    .catch((error) => {
      console.log('Erreur lors de la requête fetch:', error);
    });
  e.stopPropagation();
});




////////////////////////////////////////////////////////////
// tester les champs du formulaire


 // Sélectionner le bouton "Valider"
 const btnValider = document.getElementById('btn-add');

 // Fonction de vérification input
 function testChamps() {
  const imageElt = document.querySelector("#image");
const titleElt = document.getElementById('title')
const optionsCateg = document.getElementById('id_category');
  btnValider.disabled= true;
  const inputs = form.querySelectorAll("input"); 
      inputs.forEach(function(input) {
        if (input.value.trim() === "" && optionsCateg.value === '') {
          btnValider.disabled= false;
          btnValider.style.backgroundColor='#1D6154';
        }
      });
  }

 window.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form");
  const idCategory=document.getElementById('id_category')
  console.log(idCategory);

  //form.addEventListener("input",testChamps);
 });

 /**/

 ///////////////////////////////////////////////
 // événement au clic arrow-left
 const arrowLeft = document.getElementById('arrow-left');
 arrowLeft.addEventListener("click", function () {
// masquer la modale ajout
  modalAdd.style.display = "none";  
// afficher la modale suppression
  modalDelete.style.display = "block";
  //formAddImage.reset();

});


  ////////////////////////////////////////////////////////////
  // bouton chargement
  btnChange.addEventListener('click',()=>{
    console.log('changer')
    displayWork();
  
  });
