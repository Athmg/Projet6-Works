// Récupération des projets pour la modale
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        const modalGallery = document.querySelector(".modal_gallery");
        const gallery = document.querySelector(".gallery");

        for (let i = 0; i < data.length; i++) {
            const project = data[i];

            //Création des éléments + les contenus HTML

            const imgElementModal = document.createElement("img");
            imgElementModal.src = project.imageUrl;
            imgElementModal.alt = project.title;

            const imgElementGallery = document.createElement("img");
            imgElementGallery.src = project.imageUrl;
            imgElementGallery.alt = project.title;

            const iconElement = document.createElement("i");
            iconElement.className = "fa-solid fa-trash-can";

            const figcaptionElementModal = document.createElement("figcaption");
            figcaptionElementModal.textContent = "Éditer";

            //Apporter les éléments dynamiquement

            const figureElementModal = document.createElement("figure");
            figureElementModal.appendChild(imgElementModal);
            figureElementModal.appendChild(iconElement);
            figureElementModal.appendChild(figcaptionElementModal);

            // L'événement de suppression au clic sur l'icône
            iconElement.addEventListener("click", () => {
                figureElementModal.remove();
                figureElementGallery.remove();
            });

            const figureElementGallery = document.createElement("figure");
            figureElementGallery.appendChild(imgElementGallery);
        }
// Mettre ou non la figcaption dans la galerie
    if (modalGallery === gallery) {
        figureElementGallery.appendChild(
            figcaptionElementModal.cloneNode(true)
        );
    } else {
        const figcaptionElementGallery =
            document.createElement("figcaption");
        figcaptionElementGallery.textContent = project.title;
        figureElementGallery.appendChild(figcaptionElementGallery);
    }

    if (modalGallery === gallery) {
        figureElementGallery.addEventListener("click", () => {
            figureElementModal.classList.add("show");
        });
    }

modalGallery.appendChild(figureElementModal);
gallery.appendChild(figureElementGallery);

})
.catch((error) => console.error(error));