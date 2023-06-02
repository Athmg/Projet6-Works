// recupération de l'url works
const url = "http://localhost:5678/api/works";

// recupération de la gallery
const sectionGallery = document.querySelector(".gallery");

// recupération de ID 
const btnElt=document.getElementById("button");

/**
 * fetch get et trie de la gallery
 */
/*
const main=async ()=>{
    const response=await fetch(url);
    const works=await response.json();
     displayWorks(works); // affichage des données (works)
    filterEvent(works);
      
};main();*/

async function fetchWorks() {
    const response = await fetch(url);
    const works = await response.json();
    return works;
  }

fetchWorks().then(works => {
    displayWorks(works); // affichage des données (works)
    filterEvent(works); 
})
// Parcourir tous les images  et affichage dans la gallery
function displayWorks(works){
    sectionGallery.innerHTML ="";
    works.forEach(work => {
       displayWork(work);
    });
}

//affichage d'une images dans la gallery
function displayWork(work){
      // affichage sur la page index
    sectionGallery.innerHTML +=`
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
    `


   // affichage sur la modal
   const modalContainer=document.querySelector('.modal_container');
   const modalTrigger=document.querySelectorAll('.modal_trigger');
   //données dans la modal
    modal=document.querySelector('.modal');
    modalGallery=document.querySelector('.modal_gallery');

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


// Delete de la gallery
fetchWorks().then(works => {
    console.log(works); // fetch works
    for (let i = 0; i < works.length; i++) {
        console.log(works[i].id);
        const idDelete = works[i].id; // Récupérer l'id à supprimer 

        const token = localStorage.getItem('token');
        if(token) {
            fetch(`http://localhost:5678/api/works/${idDelete}`, {
            method: 'DELETE',
            headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`
                    },
            body: JSON.stringify(idDelete),
            })
            .then(response => {
                if (response.ok) {
                    console.log('response du fetch ok!!:', response);
                    // Supprimer l'élément de la galerie côté client
                    const iconDelete=document.querySelector(".iconDelete");
                    const figure = iconDelete.closest("figure");
                    if (figure) {
                        figure.remove();
                        iconToDelete();
                        }
                } else {
                        console.log('response du fetch no ok!!:', console.error(error));
                    }
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
});

/* delete des icones suivant le click*/
function iconToDelete(){
    const iconDeletes=document.querySelectorAll(".iconDelete");
    console.log('les icon poubelle::',iconDeletes); 
    iconDeletes.forEach(iconDelete =>
        iconDelete.addEventListener('click',()=> {
            console.log('icon pubelle delete::',iconDelete);  
            iconDelete.remove();         
        })
    )
}
// fin delete//

/**
 * Ajout work
 */

function addWork(){ 
    const imageElt=document.querySelector("#image").value;
    const titleElt=document.getElementById('title').value;
    const idCategoryElt=document.getElementById('id_category').value; 

    const formAddImage=document.querySelector('#form');
    const formWork=new FormData(formAddImage);
   
    formWork.append('imageUrl',imageElt);
    console.log(formWork.getAll('imageUrl'));

    formWork.append('title',titleElt);
    console.log(formWork.getAll('title'));

    formWork.append('categoryId',idCategoryElt);
   console.log(formWork.getAll('categoryId'));

    const work=new URLSearchParams(formWork);
      console.log(work);

    fetch('http://localhost:5678/api/works',{
        method:'POST',
        headers:{ 
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data'
            },
        body:JSON.stringify(formWork)
    })
    .then((response) => response.json())
    .then((works) => console.log( 'les données sont ok!!:' , works))
}

const formAddImage=document.querySelector('#form');
    formAddImage.addEventListener('submit', (e)=> {
        e.preventDefault();
        addWork();
    })
