

//check if there is a color in the local storage
let mainColor = localStorage.getItem("color-option");


// change the color to the color in the local storage
if (mainColor !== null) {

    document.documentElement.style.setProperty('--main-color', mainColor);

    document.querySelectorAll(".colors-list li").forEach((e) => {
        e.classList.remove("active");
        if (e.dataset.color === mainColor) {
            e.classList.add("active");
        }
    });

}


// setting box
let settingBox = document.querySelector('.setting-box');
let toggleBox = document.querySelector('.toggle-box');
let gear = document.querySelector('.fa-gear');
toggleBox.addEventListener("click", function () {
    //spin gear
    gear.classList.toggle("fa-spin");
    //open setting box
    settingBox.classList.toggle("open");
});




// switch color
const colorsLi = document.querySelectorAll('.colors-list li');
colorsLi.forEach(element => {

    element.addEventListener("click", function (e) {

        // change the color to the color selected
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // save the selected color to the local storage
        localStorage.setItem("color-option", e.target.dataset.color);

        // remove class active from all colors
        e.target.parentElement.querySelectorAll(".active").forEach(e => {
            e.classList.remove("active");
        });

        // add class active to the selected color
        e.target.classList.add("active");
    })
});


// get arrays of images
let imgsArr = ["01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg", "05.jpeg"];
let arrayIndex = 0;
// select landingPage
let page = document.querySelector('.landing-page');
page.style.backgroundImage = localStorage.getItem("background");

// choose random image 
let backgroundInterval;
let backgroundOption;

let randomBackground = document.querySelectorAll('.random-background span');
randomBackground.forEach((span) => {
    span.addEventListener("click", (e) => {

        //remove class active from all spans
        e.target.parentElement.querySelectorAll('.active').forEach((ele) => {
            ele.classList.remove('active');
        });
        // add class active to the clicked span
        e.target.classList.add('active');

        // change background if the clicked span in yes
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomImage(backgroundOption);
            localStorage.setItem("background-option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);
        }
    });
});


function randomImage(check) {
    if (check) {
        backgroundInterval = setInterval(() => {

            // change background
            if (arrayIndex === imgsArr.length) {
                arrayIndex = 0;
            }
            page.style.backgroundImage = 'url("imgs/' + imgsArr[arrayIndex] + '")';
            localStorage.setItem("background", page.style.backgroundImage);

            //add active-image class to the button of the chosen image
            let selectImage = document.querySelectorAll('.backgrounds span');
            selectImage.forEach((ele) => {
                ele.classList.remove('active-image');
            });
            selectImage[arrayIndex].classList.add('active-image')
            arrayIndex++;

        }, 2000);
    }
};


// select an image
let chosenBackground = document.querySelectorAll('.backgrounds span');
chosenBackground.forEach((span) => {
    span.addEventListener("click", (e) => {

        // remove class active-image from all elements
        e.target.parentElement.querySelectorAll('.active-image').forEach((ele) => {
            ele.classList.remove('active-image');
        });

        // add class active-image to the selected element
        e.target.classList.add('active-image');

        //change the background according to the chosen button
        switch (e.target.dataset.image) {
            case 'first':
                page.style.backgroundImage = 'url("imgs/' + imgsArr[0] + '")';
                break;
            case 'second':
                page.style.backgroundImage = 'url("imgs/' + imgsArr[1] + '")';
                break;
            case 'third':
                page.style.backgroundImage = 'url("imgs/' + imgsArr[2] + '")';
                break;
            case 'fourth':
                page.style.backgroundImage = 'url("imgs/' + imgsArr[3] + '")';
                break;
            case 'fifth':
                page.style.backgroundImage = 'url("imgs/' + imgsArr[4] + '")';
                break;
        }
        localStorage.setItem("background", page.style.backgroundImage);
    });

});


/* progress bar */

let available = document.querySelector('.available');

window.onscroll = function () {
    let offsetTop = available.offsetTop;
    let offsetHeight = available.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;

    let allItems = document.querySelectorAll('.skill-progress span');

    if (windowScrollTop <= (offsetTop + offsetHeight - windowHeight + 800) && windowScrollTop >= (offsetTop + offsetHeight - windowHeight - 200)) {
        allItems.forEach((item) => {
            item.style.width = item.dataset.progress
        });
    } else {
        allItems.forEach((item) => {
            item.style.width = 0;
        });
    }

};


/* popup image */

let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach((img) => {
    img.addEventListener('click', (e) => {
        //create overlay element
        let overlay = document.createElement('div');
        // add class to overlay
        overlay.className = 'popup-overlay';
        // append overlay to body
        document.body.appendChild(overlay);
        //create the popup
        let popupBox = document.createElement("div");
        // add class to popup
        popupBox.className = "popup-box";
        // add header to the image
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        //create image
        let popupImage = document.createElement("img");
        //set image source
        popupImage.src = img.src;
        //add image to popup box
        popupBox.appendChild(popupImage)
        //append popup box to body
        document.body.appendChild(popupBox);
        // create close button
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");

        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);


    })
});

document.addEventListener('click', (e) => {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();
        document.querySelector('.popup-overlay').remove();
    }
})

// select all links

let allLinks = document.querySelectorAll('.links a');

allLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* toggle menu */

let toggleBtn = document.querySelector('.toggle-menu');
let links = document.querySelector('.links');

toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBtn.classList.toggle('menu-active');
    links.classList.toggle('open');

    
});

links.addEventListener('click',(e)=>{
    e.stopPropagation();
})

document.addEventListener('click',(e)=>{
    if (e.target !== toggleBtn && e.target !== links) {
        toggleBtn.classList.remove('menu-active');
        links.classList.remove('open');
    }

})







