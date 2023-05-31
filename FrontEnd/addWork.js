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
    sectionGallery.innerHTML +=`
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
    `
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
/*
    *afficher et cacher les données suivant l'etat du toke
*/ 

//chargement de l'index avec le token
//window.addEventListener("load", token());

function token(){
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
* les functions pour affichage et cacher les element suisvant la connexion
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





/** suppression  */

//suprimer
const IconDelete=document.querySelector('#delete_img');
console.log(IconDelete);
IconDelete.addEventListener('click', deleteWorks);

//bouton acces au dialog Edit
const modalIconEdit=document.querySelector('.modal_icon_edit');
console.log(modalIconEdit);

modalIconEdit.addEventListener('click',modalShow);

const deleteWorks = async () =>{   

        const response = await fetch('http://localhost:5678/api/works/1', {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });
        const data = await response.json( );
        console.log(data);
        console.log('suppression ok');
}

/**
 * function pour recupérer le token
 */

function getToken(){
    const tokenStorage=localStorage.getItem('token');
    console.log("token:" , tokenStorage);

}
getToken();



/**
 * Affichage de la modal
 */
const btnEdit=document.querySelector('.modal_icon_edit');
const dialogAddWork =document.querySelector('.dialog_ajout_work');
const dialog = document.querySelector('dialog'); 
function modalShow() { 
    dialog.showModal(); 
}




/**/ 
function modalShow() { 
    dialog.showModal(); 
    getWork();
}
/**/


/*
function closeModal(){
    dialog.closeModal();
}
*/

/*
*/
function modalGallery(){
    modalShow();
}

function modalAddGallery() { 
    modalShow();
}
/**/










/**
 * affichage de la galerie dans la Modal
 *

function addModalWork(){
    const sectionDialogAdd=document.querySelectorAll('dialog');
    alert(sectionDialogAdd);

}

*/


