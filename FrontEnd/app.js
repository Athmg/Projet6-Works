// recupération de l'url works
const url = "http://localhost:5678/api/works";

// recupération de la gallery
const sectionGallery = document.querySelector(".gallery");

const sectionGalleryDialog=document.querySelector(".dialog_delete");
console.log(sectionGalleryDialog);

const btnEdit=document.querySelector('.modal_icon_edit');

btnEdit.addEventListener('click',()=>{
    modalShow();
    let type=sectionGalleryDialog;


});

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
    let figureElt='';
    figureElt=`
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
            <span id="dialog_icon_delete">
            <i class="iconDelete fa-solid fa-trash-can"></i>
            </span>
        </figure>
    `    
    if(sectionGallery){
    sectionGallery.innerHTML +=figureElt;
    }
    if(sectionGalleryDialog){
        sectionGalleryDialog.innerHTML +=figureElt;
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

/**
 * Affichage de la modal
*/

//bouton acces au dialog Edit

const dialog = document.querySelector('dialog'); 

/**/
function modalShow() { 
    dialog.showModal(); 
  //  getWork();
}


const imageElt=document.getElementById("image").value;

console.log(imageElt)

const titleElt=document.getElementById("title").value;
console.log(titleElt);

const idCategoryElt=document.querySelectorAll("#id_category").item; 
console.log(idCategoryElt);


/*
function addWork(){
 
const outputImage=document.querySelector('output');
let imagesArr = [];

//upload image
imageElt.addEventListener("change", () => {
    const fileImage = input.files
    imagesArr.push(fileImage[0])
    const arryImage=imagesArr[0]
    arryImage.value
  
  })

  const formAddImage=document.querySelector('#form_add_image');
  console.log(formAddImage);

  formAddImage.addEventListener('submit', e =>{
    e.preventDefault();
    console.log(titleElt);
    console.log(idCategoryElt);
    console.log(imagesArr);

    const formaData=new formaData(formAddImage);
    const data=new URLSearchParams(formaData);
    console.log(data);

    fetch('http://localhost:5678/api/works',{
        method:'POST',
        headers:{ 
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data'
            },
        body:data
    })
    .then((response)=> {
        if(response.ok){
            console.log(response)
        }
  })
    
    .then((data) => {
        if(data){
            console.log( data);
        }else {
            console.log('erreur :', data);
        }
    })
        
  })

    
        // else affichage message erreur pour l'utilisteur;
    
}*/
//addWork();

function fetchAdd(){
    const formAddImage=document.querySelector('#form_add_image');
    const formData=new FormData(formAddImage);
    const data=new URLSearchParams(formData);
    console.log(data);

    fetch('http://localhost:5678/api/works',{
        method:'POST',
        headers:{ 
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data'
            },
        body:data,
    })
    .then((response)=> {
        if(response.ok){
            console.log(response)
        }else console.log('erreur de la reponse:',response)
  })
    
    .then((data) => {
        if(data){
            console.log( data);
        }else {
            console.log('erreur sur les donées :', data);
        }
    })
}

fetchAdd();

function eventSubmit() { 
    const formAddImage=document.querySelector('#form_add_image');
    console.log(formAddImage);
    formAddImage.addEventListener('submit', ()=> {
       
            console.log('addok ok!!')
            console.log(imageElt);
            console.log(titleElt);
            console.log(idCategoryElt);
    
    })
}
eventSubmit();

/*

// afficher iamges sera dans le 2modal sur l'ajout
 image
function displayImages() {
    let images = ""
    imagesArr.forEach((image, index) => {
      images += `<div class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                  <span onclick="deleteImage(${index})">&times;</span>
                </div>`
    })
    outputImage.innerHTML = images;
  }
*/




/*

/**afficher et cacher les données suivant l'etat du toke*/ 

//chargement de l'index avec le token
//window.addEventListener("load", token());
/*
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
*/
/*
* les functions pour affichage et cacher les element suivant la connexion
*

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
*/



 



/*


const token=localStorage.getItem('token');   
if(token){
    const myDataObject ={ userId: 3}
    fetch(`http://localhost:5678/api/works/${ myDataObject}`, {
        method: 'DELETE',
        headers: {
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(myDataObject),
    })
    .then(response => {
        return response.json( )
    })
    .then(data => {
    // this is the data we get after doing the delete request, do whatever you want with this data
        
        if(data){
            console.log(data); 
            console.log('suppression ok');
        } 
        else{
            console.log('suppression nono'); 
        }
    })
}
else{
    console.log('probleme sur le token');
}
    


//const iconDelete=document.querySelector('#dialog_icon_delete').value;
//console.log(iconDelete);

//iconDelete.addEventListener('click',);
/*
const baseURL="http://localhost:5678/api/works/1";
function supprimerWork(){
    const token=localStorage.getItem('token');    
    const workId =1;/* get the ID of the work to be deleted 
const requestOptions = {
    method: 'DELETE',
    headers: { 
       // accept: "*y*",
        Authorization: `Bearer ${token}`
    },
    body:null
};
    if(token){

        fetch(`${baseURL}`, requestOptions)
        .then(  res() =res.json())
            console.log(res);
            

        const result = {
            status: res.status + "-" + res.statusText,
            headers: { "Content-Type": res.headers.get("Content-Type") },
            data: data,
        };
        this.deleteResult = this.fortmatResponse(result);
    
      
       /* fetch(`http://localhost:5678/api/works/${workId}`, requestOptions )
        .then(response => console.log(response))
        .then(response => console.log(response.json()));
        console.log(response);
        console.log('suppression ok');*/
        /*
        if(response){
            console.log('suppression ok');
        } 
        else{
            console.log('suppression nono'); 
        }
    }
    else{
        console.log('probleme sur le token');
    }
}
supprimerWork();*/
////////////////////////////////////////////:




/** suppression  *

function deleteWorks(){   
    const response = fetch('http://localhost:5678/api/works/1', {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    });
    const data = response.json( );
    console.log(data);
    console.log('suppression ok');
}


/*
//suprimer
const IconDelete=document.querySelectorAll('.dialog_icon_delete');
console.log(IconDelete);

//IconDelete.addEventListener('click', deleteWorks);


Gallien Alexis , dans la fonction qui te permet de créer tes works, tu vas définir un type = gallery 

function createWork(work, container, type = "gallery") {

 de sorte que lorsque tu crée tes éléments,  avec un if, tu donne comme condition if (type === "gallery") {} 

et 

  if (type === "modal") {}

tu peux donc avec un seul appel obtenir des éléments différents selon que tu est dans la gallery ou la modal...
*/