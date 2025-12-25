// --- 1. SETTINGS BOX LOGIC ---

// Toggle Settings Box (Open/Close)
const settingBox = document.querySelector(".setting-box");
const toggleGear = document.querySelector(".toggle-settings .fa-gear");

document.querySelector(".toggle-settings").onclick = function () {
    toggleGear.classList.toggle("fa-spin"); // Rotates the gear
    settingBox.classList.toggle("open");    // Opens/Closes the box
};

// --- 2. COLOR OPTION LOGIC ---

// Check Local Storage for Color
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);
    
    // Remove active class from all children
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // Add active class to element with current data-color
        if (element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        const selectedColor = e.target.dataset.color;
        document.documentElement.style.setProperty('--main-color', selectedColor);
        localStorage.setItem("color_option", selectedColor);
        
        // Handle Active Class
        handleActive(e);
    });
});

// --- 3. BACKGROUND OPTION LOGIC ---

let backgroundOption = true;
let backgroundInterval;

// Check Local Storage for Background Preference
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
    document.querySelectorAll(".option-btu span").forEach(element => element.classList.remove("active"));
    
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
        document.querySelector(".option-btu .yes").classList.add("active");
    } else {
        backgroundOption = false;
        document.querySelector(".option-btu .no").classList.add("active");
    }
}

// Function to Randomize Backgrounds
function randomizeImgs() {
    if (backgroundOption === true) {
        let landingPage = document.querySelector(".landing-page");
        let imgsArray = ["oasissiwah.jpeg", "Agiba.jpg", "Matrouh.jpg"]; // Ensure these exist in your images folder

        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
        }, 10000);
    }
}
randomizeImgs();

// Switch Background Toggle
const randomBackEl = document.querySelectorAll(".option-btu span");
randomBackEl.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// --- 4. NAVIGATION LOGIC (Fixes the Icon Click Issue) ---

// Reusable Scrolling Function
function scrollToSection(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            // Use currentTarget to ensure we get the div/anchor even if the icon is clicked
            const targetSection = document.querySelector(e.currentTarget.dataset.section);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Apply to Bullets and Nav Links
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links li a");

scrollToSection(allBullets);
scrollToSection(allLinks);

// --- 5. BULLET DISPLAY LOGIC ---

let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    document.querySelectorAll(".bullets-option span").forEach(span => span.classList.remove("active"));
    
    if (bulletLocalItem === 'block') {
        bulletContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

document.querySelectorAll(".bullets-option span").forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        } else {
            bulletContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
        }
        handleActive(e);
    });
});

// --- 6. IMAGE POPUP LOGIC ---

let ourGallery = document.querySelectorAll(".FPM img");

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // Create Overlay
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        // Create Popup Box
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';

        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }

        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        // Create Close Button
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);
    });
});

// Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className == 'close-button' || e.target.className == 'popup-overlay') {
        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();
    }
});

// --- 7. RESPONSIVE MENU LOGIC ---

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
};

// --- 8. HELPER FUNCTIONS ---

// Function to handle the 'active' class switch
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

// Reset Options Button
document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();
    window.location.reload();
};