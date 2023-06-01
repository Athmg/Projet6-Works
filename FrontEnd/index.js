// recupération de l'url works
const url = "http://localhost:5678/api/works";

// recupération de la gallery
const sectionGallery = document.querySelector(".gallery");

// recupération de ID 
const btnElt=document.getElementById("button");

/**
 * fetch get et trie de la gallery
 */

const main=async ()=>{
    const response=await fetch(url);
    const works=await response.json();
    displayWorks(works); // affichage des données (works)
    filterEvent(works);    
};
main();
// Parcourir tous les images  et affichage dans la gallery
function displayWorks(works){
    sectionGallery.innerHTML ="";
    works.forEach(work => {
       displayWork(work);
    });
}

//affichage d'une images dans la gallery
function displayWork(work){
    const modalContainer=document.querySelector('.modal_container');
    const modalTrigger=document.querySelectorAll('.modal_trigger');
    //données dans la modal
     modal=document.querySelector('.modal');
     modalGallery=document.querySelector('.modal_gallery');

    // affichage sur la page index
    sectionGallery.innerHTML +=`
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
    `
   // affichage sur la modal
    modalTrigger.forEach(trigger => 
        trigger.addEventListener('click',()=> {
            toggleModal();
            modalGallery.innerHTML +=`
                <figure>
                    <span class="dialog_icon_delete">
                    <i class="iconDelete fa-solid fa-trash-can"></i>
                    </span> 
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>éditer</figcaption>
                </figure>
            `
            const iconId=document.querySelector(".iconDelete");
                iconId.addEventListener('click',()=>{
                    let els = document.querySelector(".gallery");
                   // console.log('id icon::',els)
                    deleteWork();
                });
        }))
    //affichage modal active
    function toggleModal(){
        modalContainer.classList.toggle("active");                 
        
    }
}

// recupération de ID 
const btnsElt=document.querySelectorAll(".category button");

function filterEvent(works){
    btnsElt.forEach(btnElt =>{
        btnElt.addEventListener("click", () => {
            const categoryId = parseInt(btnElt.id);
            filterGallery(works,categoryId);
        });
    })
}

//filter dans la gallery par catégories Id
function filterGallery(works,idCategorie){
    const galleryFilters=works.filter(work => work.categoryId === idCategorie || idCategorie===0 );
    displayWorks(galleryFilters);

}

/**function pour recupérer le token*/
function getToken(){
    const tokenStorage=localStorage.getItem('token');
    console.log("token:" , tokenStorage);
}
getToken();

async function fetchWorks() {
    const response = await fetch(url);
    const works = await response.json();
    return works;
  }

fetchWorks().then(works => {
    console.log(works); // fetch works
    for (let i = 0; i < works.length; i++) {
      console.log(works[i].id);
      const idDelete = works[i].id; // Récupérer l'ID à supprimer  
      const icDelete = document.querySelector(".modal_gallery .iconDelete");
      console.log(icDelete);    
      // Ajout d'un événement de clic sur l'icône
      icDelete.addEventListener('click', () => {
        // Suppression de l'icône et de l'image
        icDelete.remove();
        // Supprimer l'élément avec l'ID idDelete
        deleteWork(idDelete);
      });
    }
  });

  function deleteWork(id){
  fetch(`http://localhost:5678/api/works/${id}`, {
  method: 'DELETE',
  headers: {
    "Accept": "application/json",
    Authorization: Bearer `${token}`
    },
  body: JSON.stringify(id),
})
.then(response => {
  if (response.ok) {
    console.log('response du fetch ok!!:', response);
    // Supprimer l'élément de la galerie côté client
    const figure = icDelete.closest("figure");
    if (figure) {
      figure.remove();
    }
  } else {
    console.log('response du fetch no ok!!:', console.error(error));
  }
})
.catch(error => {
  console.error(error);
});
}
