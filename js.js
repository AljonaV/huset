function getAllEvents() {
    fetch("http://wp.dreamdev.lv/wp-json/wp/v2/huset?_embed")
        .then(res => res.json())
        .then(showBook);
}

function getEvent(myId) {
    console.log(myId);
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


function showBook(data) {
    console.log(data)
    let list = document.querySelector("#list");
    let template = document.querySelector("#bookTemplate").content;

    data.forEach(function(theBook) {
        console.log(theBook)
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

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
//console.log(id);

if (id) {
    getEvent(id);
} else {
    getAllEvents();

}