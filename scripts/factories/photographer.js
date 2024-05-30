/* eslint-disable no-unused-vars */
function photographerFactory(data) { //is defined but never use /  it's been used into page/photographer.js and page/index.js
    const {name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    //  Header Photographer's single page
    function getPhotographerBannerDOM() {
        const banner = document.createElement('div')
        banner.classList.add('banner');
        banner.innerHTML = `
        <div class="identityPhotographer">
            <h1 class="bannerName"  tabIndex="0">${name}</h1>
            <h3 class="bannerLocation"  tabIndex="0">${city}, ${country}</h3>
            <p class="bannerTagline"   tabIndex="0">${tagline}</p>
        </div>
        <div class="bannerModal">
            <button class="contact_button" aria-haspopup="dialog"
            aria-controls="dialog" onclick="displayModal()" tabIndex="0">Contactez-moi</button>
        </div>
        <div class="bannerPicture">
            <img class="bannerPicture" src="${picture}" alt="${name}"  tabIndex="0"></img>
        </div>
        `
        return banner
    } 
   
    function getUserCardDOM() {
        // article
        const article = document.createElement( 'article' );
        article.tabIndex = "-1";

         // link for photographer page by id
         const linkUrl = document.createElement("a")
         linkUrl.classList.add("linkPage")
         linkUrl.tabIndex = "0";
         linkUrl.href = `./photographer.html?id=${id}` 
		article.append(linkUrl); 
       

        // picture
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.tabIndex = "0";
        img.alt = `Photo de ${name}`
        article.appendChild(img)
        linkUrl.appendChild(img);
       
        // name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.tabIndex = "0";
        article.appendChild(h2);
        linkUrl.appendChild(h2); // put <h2> into <a>

        // localisation
        const localisation = document.createElement( 'h3' );
        localisation.tabIndex = "0";
        localisation.textContent = city + ', ' + country
        localisation.classList.add("photograph-localisation");
        article.appendChild(localisation);
 
        // paragraph
        const paragraph = document.createElement('h4')
        paragraph.textContent = tagline
        paragraph.classList.add("photograph-tagline");
        paragraph.tabIndex = "0";
        article.appendChild(paragraph)

        // price
        const pricing = document.createElement('span')
        pricing.textContent =  price + '€/jour'
        pricing.classList.add("photograph-price");
        pricing.tabIndex = "0";
        article.appendChild(pricing)

        
      
        return (article);
    }
    return { picture,  getUserCardDOM, getPhotographerBannerDOM }
}