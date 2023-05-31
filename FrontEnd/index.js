// recupération de l'url works
const url = "http://localhost:5678/api/works";

// recupération de la gallery
const sectionGallery = document.querySelector(".gallery");

// recupération de ID 
const btnElt=document.getElementById("button");


/**
 * fetch get et trie de la gallery
 */

/**/
const main=async ()=>{
    const response=await fetch(url);
    const works=await response.json();
    displayWorks(works); // affichage les données (works)
    filterEvent(works);    
    //token();
   // console.log(works.token);
};
main();
/**/

// Parcourir tous les images  et affichage de la gallery
function displayWorks(works){
    sectionGallery.innerHTML ="";
    works.forEach(work => {
       displayWork(work);
      // console.log(work);
    });

}

//affichage d'une images dans la gallery
function displayWork(work){
    const modalContainer=document.querySelector('.modal_container');
    const modalTrigger=document.querySelectorAll('.modal_trigger');
    //modal cloner images
     modal=document.querySelector('.modal');
     modalGallery=document.querySelector('.modal_gallery');

    // affichage sur le DOM index
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
                const iconDelete=document.querySelectorAll('.iconDelete');
                iconDelete.addEventListener('click',()=>{
                    console.log('suppp:' ,iconDelete);
                })
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

/**afficher et cacher les données suivant l'etat du toke*/ 

//chargement de l'index avec le token
//window.addEventListener("load", token());

function cacherBtnCategory(){
    const tokenStorage=localStorage.getItem('token');
    const sectionBlockHeader=document.getElementById('section_blockHeader');
    const btnsCategory=document.getElementById('categ');

    console.log(tokenStorage);   
   // console.log(sectionBlockHeader);
    // test du token   
    if (tokenStorage) { 
        console.log('login OK!!'); 
        sectionBlockHeader.style.display ='block';
       // donnesCacher(btnsCategory);
        btnsCategory.style.display='none';
       // donneesVisible(sectionBlockHeader);
    } else { 
        console.log('login erreur'); 
        sectionBlockHeader.style.display ='none'
       // donnesCacher(sectionBlockHeader);
       // document.location.reload();
    } 
}

/*
* les functions pour affichage et cacher les element suivant la connexion
*/

function donneesVisible(sec){
    //const eltVisible= document.getElementById(sec);
   // console.log(eltVisible);
   return (document.getElementById(sec).style.display ='block');
}
function donnesCacher(sec){
  const eltInvisible= document.getElementById(sec);
  return (eltInvisible.style.display = "none");
   //console.log(elt.values);
}




// suppression
function deleteW(){
    const element = document.querySelector('#delete-request-set-headers .status');
    const tokenStorage=localStorage.getItem('token');
const requestOptions = {
    method: 'DELETE',
    headers: { 
        'Authorization': 'Bearer tokenStorage',
        'My-Custom-Header': 'foobar'
    }
};
    fetch('http://localhost:5678/api/works/1', )
    .then(() => element.innerHTML = 'Delete successful');
    console.log();
}



//suprimer
const IconDelete=document.querySelectorAll('.dialog_icon_delete');
console.log(IconDelete);

//IconDelete.addEventListener('click', deleteWorks);

/**
 * Affichage de la modal
*/

//bouton acces au dialog Edit
const btnEdit=document.querySelector('.modal_icon_edit');
const dialog = document.querySelector('dialog'); 

//btnEdit.addEventListener('click',modalShow);

/**
function modalShow() { 
    dialog.showModal(); 
    getWork();
}*/


function addIconDelete(){
    const faRegularIcon=document.querySelector('.fa-regular');
    console.log(faRegularIcon);
    faRegularIcon.addEventListener('click',addIconDelete);
    const figureElt=document.querySelector('figure');
    console.log(figureElt);
    const span=document.createElement('span');
    span.innerHTML+=` 
        <span class="dialog_icon_delete">
        <i class="iconDelete fa-solid fa-trash-can" onclick="deleteW()"></i>
        </span>               
    `
    figureElt.appendChild(span);
}