//button to category db
document.addEventListener('DOMContentLoaded', function() {
    const categoryForm = document.getElementById('categoryForm');
    categoryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.href = '/category';
    });
});


//button to index
document.addEventListener('DOMContentLoaded', function() {
    const indexBtn = document.getElementById('indexBtn');
    indexBtn.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.pathname = '/index';
    });
});    

//button to about
document.addEventListener('DOMContentLoaded', function() {
    const aboutBtn = document.getElementById('aboutBtn');
    aboutBtn.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.pathname = '/about';
    });
});    

//button to add_data
document.addEventListener('DOMContentLoaded', function() {
    const add_dataBtn = document.getElementById('add_dataBtn');
    add_dataBtn.addEventListener('submit', function(event) {
        event.preventDefault();
        window.location.pathname = '/add_data';
    });
});    

// random cat image api
const card = document.getElementById("card");
const url = "https://api.thecatapi.com/v1/images/search";
const data = async () => (await fetch(url)).json();
const loadMoreBtn = document.getElementById("load-more");
loadMoreBtn.addEventListener("click", () => {
    // remove previous images
    card.innerHTML = "";
    
    // load a new image
    data().then((res) => {
        let img = document.createElement("img");
        img.src = res[0].url;
        card.appendChild(img);
    }).catch((err) => {
        alert(err);
    });
});

