document.getElementById("create_list").onclick = function() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("form_page").classList.remove("hidden");
}

document.getElementById("back_form").onclick = function() {
    document.getElementById("form_page").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}

document.getElementById("back_detail").onclick = function() {
    document.getElementById("detail_page").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}

document.getElementById("cancel_top").onclick = function() {
    document.getElementById("formTopList").innerHTML = "";
    document.getElementById("listName").value = "";
}
console.log("test2");

const addNewItemToTop = () => {
    console.log("test");
    let div = document.createElement("div");
    let inputAnime = document.createElement("input");
    let inputGenre = document.createElement("input");
    let inputURL = document.createElement("input");
    let inputImageURL = document.createElement("input");

    let newName = "item-" + document.getElementsByClassName("itemNumber").length;
    let newPlaceholder = "item " + document.getElementsByClassName("itemNumber").length;

    inputAnime.setAttribute("type", "text");
    inputAnime.setAttribute("name", newName);
    inputAnime.setAttribute("placeholder", newPlaceholder);
    inputAnime.classList.add("itemNumber");

    inputGenre.setAttribute("selectBoxOptions", "Action, Romance, Comedie, Drame, Aventure, Ecchi");
    inputGenre.setAttribute("type", "text");

    inputURL.setAttribute("type", "text");
    inputURL.setAttribute("placeholder", "URL de l'anime/manga");

    inputImageURL.setAttribute("type", "file");
    inputImageURL.setAttribute("accept", "image/png, image/jpeg");

    div.classList.add("form");
    div.appendChild(inputAnime);
    div.appendChild(inputGenre);
    div.appendChild(inputURL);
    div.appendChild(inputImageURL);
    document.getElementById("items").appendChild(div);
}


document.getElementById("addItem").onclick = addNewItemToTop;


