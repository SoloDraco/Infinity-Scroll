const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'your_actual_api_key_here';
// https://unsplash.com/documentation
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all image were loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

//Helper Function to Set Atrributes on Dom Elements
function setAttributes(element, atrributes){
    for (const key in atrributes){
        element.setAttribute(key, atrributes[key]);
    }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listner, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then both inside image Container Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
        console.log(error);
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrolly >= document.body.offsethHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
