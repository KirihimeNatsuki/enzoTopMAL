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


const addNewItemToTop = () => {
    let div = document.createElement("div");
    div.classList.add("form");
    div.classList.add("item");
    let inputAnime = document.createElement("input");
    let selectGenre = document.createElement("select");
    let inputURL = document.createElement("input");
    let inputDescription = document.createElement("input");
    let inputImageURL = document.createElement("input");

    inputAnime.setAttribute("type", "text");
    inputAnime.setAttribute("placeholder", "Nom Anime");
    inputAnime.setAttribute("id", "itemAnime" + document.getElementsByClassName("item").length);

    genre = ['Action', 'Romance', 'Comedie', 'Drame', 'Fantasy'];

    while(genre.length)
    {
        let genres = genre.pop();
        let opt = new Option(genres, genres);
        selectGenre.options[selectGenre.options.length] = opt;
    }

    selectGenre.id = "itemGenre" + document.getElementsByClassName("item").length;

    inputURL.setAttribute("type", "text");
    inputURL.setAttribute("placeholder", "URL de l'anime/manga");
    inputURL.id = "itemURL" + document.getElementsByClassName("item").length;

    inputDescription.setAttribute("type", "text");
    inputDescription.setAttribute("placeholder", "Description de l'anime");
    inputDescription.id = "itemDescription" + document.getElementsByClassName("item").length;

    inputImageURL.setAttribute("type", "file");
    inputImageURL.setAttribute("accept", "image/png, image/jpeg");
    inputImageURL.id = "itemImg" + document.getElementsByClassName("item").length;

    div.appendChild(inputAnime);
    div.appendChild(selectGenre);
    div.appendChild(inputURL);
    div.appendChild(inputDescription);
    div.appendChild(inputImageURL);
    document.getElementById("items").appendChild(div);
}

const effacerChamps = () => {
    document.getElementById("items").innerHTML = "";
    document.getElementById("inputNomListe").value = "";
}
const checkTops = () => {
    if(window.localStorage.getItem("topAnime") === null) {
        window.localStorage.setItem("topAnime", "[]");
    }
    
    createNewListe2();
}
const createNewListe = () => {
    let NomListe = document.getElementById("inputNomListe").value;
    let topAnime = JSON.parse(window.localStorage.getItem("topAnime"));
    if(topAnime.indexOf(NomListe) === -1) {
        topAnime.push(NomListe);
        window.localStorage.setItem("topAnime", JSON.stringify(topAnime));
    }
    let animes = [];
    for (let i = 0; i<document.getElementsByClassName("item").length; i++) {
        animes.push(document.getElementsByClassName("item")[i].value);
    }
    window.localStorage.setItem(NomListe, JSON.stringify(animes));
    effacerChamps();
    document.getElementById("form_page").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}

const createNewListe2 = () => {
    let NomListe = document.getElementById("inputNomListe").value;
    let topAnime = new Object();
    let listefinale;

    for (let i = 0; i <= document.getElementById("item"); i++) {
        topAnime.nomAnime = document.getElementById("itemAnime" + document.getElementsByClassName("item").length).value;
        topAnime.genre = document.getElementById("itemGenre" + document.getElementsByClassName("item").length-1).value;
        topAnime.url = document.getElementById("itemURL" + document.getElementsByClassName("item").length-2).value;
        topAnime.description = document.getElementById("itemDescription" + document.getElementsByClassName("item").length-3).value;
        topAnime.image = document.getElementById("itemImg" + document.getElementsByClassName("item").length-4).value;
        console.log(JSON.stringify(topAnime))
        if (i = 0) {
            listefinale = JSON.stringify(topAnime);
        }
        else {
            console.log(listefinale);
            console.log(TypeOf(listefinale));
            listefinale = listefinale + "," + JSON.stringify(topAnime);
            console.log(listefinale);
        };
    }
    let listefinaleString = JSON.stringify(listefinale);
    let listefinaleParsed = JSON.parse(listefinaleString);
    listefinaleParsed = "[" + listefinaleParsed + "]";

    window.localStorage.setItem(NomListe, listefinaleParsed);

    let liste = JSON.parse(window.localStorage.getItem("topAnimeList"));
    console.log(liste);
    Object.assign(liste, {[NomListe]: NomListe});
    localStorage.setItem("topAnimeList", JSON.stringify(liste));
}

function showTopList(element)
{
    let index = element.selectedIndex;
    let value = element.options[index].value;

    document.getElementById("top").innerHTML = "";
    
    let topAnime = JSON.parse(window.localStorage.getItem("topAnime"));
    for(let i = 0; i < topAnime.length; i++) {
        let div = document.createElement("div");
        div.classList.add("list-item");

        let item = document.createElement("span");
        item.classList.add("item");
        item.innerText = topAnime[i];
        div.appendChild(item);

        let button = document.createElement("button");
        button.innerText = "Description -->";
        button.onclick = () => {
            show_list(topAnime[i])
        }
        div.appendChild(button);

        document.getElementById("top").appendChild(div);
    }

 }

 const divAnime = `
<div class="anime">
    <p style="text-align: left; font-weight: bold; padding: 5px; margin: 5px">__compteur__</p>
    <h4>__name__</h4>
    <div class="anime_content">
        <img src="__src__" class="anime_image" />
        <p class="anime_genre">
            __genre__
        </p>
        <a href="__url__">link</a>
    </div>
</div>
`;

const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
};

function show_list(NomListe){
    console.log(NomListe);
    document.getElementById("home").classList.add("hidden");
    document.getElementById("detail_page").classList.remove("hidden");

    let topAnime = JSON.parse(window.localStorage.getItem(NomListe));

    let topAnimeActive = document.getElementById("details");
    topAnimeActive.innerHTML = "";
    topAnime.forEach((element, i) => {
        const newDivAnime = divAnime
            .replace("__compteur__", i+1)
            .replace("__name__", element.name)
            .replace("__src__", element.img)
            .replace("__genre__", element.genre)
            .replace("__url__", element.url);

            topAnimeActive.appendChild(htmlToElement(newDivAnime));
        i++;
    });
}

document.getElementById("addItem").onclick = addNewItemToTop;
document.getElementById("newListe").onclick = checkTops;
document.getElementById("cancel_top").onclick = effacerChamps;


