    async function getPhotographers() {
        

        try {
            let photographers = []
            const JSONFile = 'data/photographers.json'
    
            const res = await fetch(JSONFile)
            
            if (res.ok) {
                const data = await res.json() // retourne la reponse en tant que object
                photographers = data.photographers
            }
            return photographers
        } catch (err) {
            console.log(err)
            return new Error('impossible de contacter le serveur')
        }
        
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            // eslint-disable-next-line no-undef
            const photographerModel = photographerFactory(photographer); //no-undef ESLint def in factories/photographer.js
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // pour utilisation de Promise //
        
        // Récupère les données des photographes
        const photographers = await getPhotographers()
        // Affiche les Photographes
        displayData(photographers);
    }
    
    init();
    
