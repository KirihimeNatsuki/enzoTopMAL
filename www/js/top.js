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

    inputImageURL.setAttribute("type", "text");
    inputImageURL.setAttribute("placeholder", "URL d'image (1 seule)");
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
    if(window.localStorage.getItem("topAnimeList") === null) {
        window.localStorage.setItem("topAnimeList", "[]");
    }
    
    createNewListe();
}

const createNewListe = () => {
    let NomListe = document.getElementById("inputNomListe").value;
    let topAnime = new Object();
    let listefinale;

    for (let i = 0; i < document.getElementsByClassName("item").length; i++) {
        topAnime.nomAnime = document.getElementById("itemAnime" + i).value;
        topAnime.genre = document.getElementById("itemGenre" + i).value;
        topAnime.url = document.getElementById("itemURL" + i).value;
        topAnime.description = document.getElementById("itemDescription" + i).value;
        topAnime.image = document.getElementById("itemImg" + i).value;
        if (i === 0) {
            listefinale = JSON.stringify(topAnime);
        }
        else {
            listefinale = listefinale + "," + JSON.stringify(topAnime);
        };
    }
    let listefinaleString = JSON.stringify(listefinale);
    let listefinaleParsed = JSON.parse(listefinaleString);
    listefinaleParsed = "[" + listefinaleParsed + "]";

    window.localStorage.setItem(NomListe, listefinaleParsed);

    let liste = JSON.parse(window.localStorage.getItem("topAnimeList"));
    liste.push(NomListe);
    localStorage.setItem("topAnimeList", JSON.stringify(liste));

    effacerChamps();
    document.getElementById("form_page").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}

function showTopList(element)
{
    let index = element.selectedIndex;
    let value = element.options[index].value;
    document.getElementById("top").innerHTML = "";

    let topAnimeList = JSON.parse(window.localStorage.getItem("topAnimeList"));
    let topAnime;
    let tabGenre = [];
    let tri = new Boolean(false);
    for(let i = 0; i < topAnimeList.length; i++) {
        tabGenre = [];
        topAnime = JSON.parse(window.localStorage.getItem(topAnimeList[i]));
        topAnime.forEach((top) => {
            tabGenre.push(top.genre);
        });
        tabGenre.forEach((genre) => {
            if (value === genre) {
                tri = true;
            }
        });
        if (tri === true) {
            let div = document.createElement("div");
            div.classList.add("list-item");

            let item = document.createElement("span");
            item.classList.add("item");
            item.innerText = topAnimeList[i];
            div.appendChild(item);

            let button = document.createElement("button");
            button.innerText = "Description -->";
            button.onclick = () => {
                show_list(topAnimeList[i])
            }
            div.appendChild(button);

            document.getElementById("top").appendChild(div);
        }
        else if (value === "All") {
            let div = document.createElement("div");
            div.classList.add("list-item");

            let item = document.createElement("span");
            item.classList.add("item");
            item.innerText = topAnimeList[i];
            div.appendChild(item);

            let button = document.createElement("button");
            button.innerText = "Description -->";
            button.onclick = () => {
                show_list(topAnimeList[i])
            }
            div.appendChild(button);

            document.getElementById("top").appendChild(div);
        }
        tri = false;
    }
 }

const divAnime = `
<div class="anime">
    <p style="font-size: 30px; font-weight: bold; padding: 5px">__compteur__</p>
    <h4>__name__ :</h4>
    <div>
        <img src="__src__" class="anime_image" />
        <p class="anime_content">
            Genre : __genre__
        </p>
        <p class="anime_content">
            Description : __description__
        </p>
        <button class="link" onclick="inAppAnime('__url__')">--Lien--</button>
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
    document.getElementById("home").classList.add("hidden");
    document.getElementById("detail_page").classList.remove("hidden");

    let topAnime = JSON.parse(window.localStorage.getItem(NomListe));

    let topAnimeActive = document.getElementById("details");
    topAnimeActive.innerHTML = "";
    let uri = "";
    let encoded;
    topAnime.forEach((element, i) => {
        uri = element.url;
        encoded = encodeURIComponent(uri);
        const newDivAnime = divAnime
            .replace("__compteur__", i+1)
            .replace("__name__", element.nomAnime)
            .replace("__src__", element.image)
            .replace("__genre__", element.genre)
            .replace("__description__", element.description)
            .replace("__url__", encoded);

            topAnimeActive.appendChild(htmlToElement(newDivAnime));
        i++;
    });
    setRandomColor();
}

function inAppAnime(url){
    console.log("ENCODED URL :", url);
    let decoded = decodeURIComponent(url);
    console.log("DECODED URL :", decoded);
    let devicePlatform = device.platform;
    if (devicePlatform === "browser"){
        window.open(decoded, '_blank', 'location=yes');
    }
    else {
        let ref = cordova.InAppBrowser.open(decoded, '_blank', 'location=yes');
        ref.open();
    }
}


