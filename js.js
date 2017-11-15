//Menu
function responsiveMenu() {
    var x = document.getElementById("tagmenu");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function getMenu() {
fetch("http://wp.dreamdev.lv/wp-json/wp/v2/tags/")
    .then(e=>e.json())
    .then(showMenu)
}

//Show menu
function showMenu(tags) {
    console.log(tags);
    let lt = document.querySelector("#linkTemplate").content;
    
    tags.forEach(function(tag){
        if(tag.count>0){
    let clone = lt.cloneNode(true);
    let parent = document.querySelector("#tagmenu");
    clone.querySelector("a").textContent=tag.name;
    clone.querySelector("a").setAttribute("href", "index.html?tagid="+tag.id);
    parent.appendChild(clone);
    }
        });
    
}

//Get all Events
function getAllEvents() {
    fetch("http://wp.dreamdev.lv/wp-json/wp/v2/huset?_embed")
        .then(res => res.json())
        .then(showBook);
}

function getEventsByTag(id) {
    fetch("http://wp.dreamdev.lv/wp-json/wp/v2/huset?_embed&tags="+id)
        .then(res => res.json())
        .then(showBook);
}

function showBook(data) {
    //console.log(data)
    let list = document.querySelector("#list");
    let template = document.querySelector("#bookTemplate").content;

data.forEach(function(theBook) {
        //console.log(theBook)
        let clone = template.cloneNode(true);
        let name = clone.querySelector("h1");
        let price = clone.querySelector(".price span");
        let content = clone.querySelector(".content");
        let link = clone.querySelector("a.read-more");
        let img = clone.querySelector("img");
        let date = clone.querySelector(".date");

        name.textContent = theBook.title.rendered;
        img.setAttribute("src", theBook._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url);
        content.innerHTML = theBook.content.rendered;
        link.setAttribute("href", "event.html?id=" + theBook.id);
        price.textContent = theBook.acf.price;
        date.querySelector(".date span").textContent = theBook.acf.date;
        list.appendChild(clone);
    })
}

//Get single event
function getEvent(myId) {
    //console.log(myId);
    fetch("http://wp.dreamdev.lv/wp-json/wp/v2/huset/" + myId + "/?_embed")
        .then(res => res.json())
        .then(showEvent);
}

function showEvent(json) {
    document.querySelector("#single h1").textContent = json.title.rendered;
    document.querySelector("#single .price span").textContent = json.acf.price;
    document.querySelector("#single img").setAttribute("src", json._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url);
    document.querySelector("#single .content").innerHTML = json.content.rendered;
    document.querySelector("#single .date span").textContent = json.acf.date;
}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let tagid = searchParams.get("tagid");
//console.log(id);

getMenu();
if (id) {
    getEvent(id);
}
if (tagid) {
    getEventsByTag(tagid);
} else {
    getAllEvents();
}