function getData(){
    fetch("http://wp.dreamdev.lv/wp-json/wp/v2/huset?_embed")
    .then(res=>res.json())
    .then(showBook);
}

function showBook(data){
    console.log(data)
    let list = document.querySelector("#list");
    let template = document.querySelector("#bookTemplate").content;
    
data.forEach(function(theBook){
        console.log(theBook)
        let clone = template.cloneNode(true);
        let name = clone.querySelector("h1");
    let price = clone.querySelector(".price span");
    let content = clone.querySelector(".content");
    let link = clone.querySelector(".link");
    let img = clone.querySelector("img");
       
    name.textContent = theBook.title.rendered;
    img.setAttribute("src", theBook._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url);
    content.innerHTML = theBook.content.rendered;
    link.innerHTML = "<a href="+theBook.link+">Continue reading</a>";
    price.textContent = theBook.acf.price;
    list.appendChild(clone); 
    })
}

getData();