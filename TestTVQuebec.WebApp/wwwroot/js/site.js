let characterList;
let renderingDiv;

window.addEventListener("DOMContentLoaded", (event) => {
    renderingDiv = document.getElementById("rendering");

    GetCharactersDataList('starwars');
});

function GetCharactersDataList(movie) {

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(result) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            characterList = JSON.parse(xhr.responseText);
            generateCharacterTable(characterList);
        }
    };

    let endPoint = "/characterlist/" + movie;

    xhr.open("GET", endPoint);

    xhr.send();
}

function generateCharacterTable() {
    let dataListElement = document.getElementById("dataListing");

    if(dataListElement !== null) { dataListElement.remove();}

    dataListElement = document.createElement("div");
    dataListElement.id = "dataListing";

    for (let i = 0; i < characterList.length; i++) {
        let character = characterList[i];
        dataListElement.appendChild(GenerateCharacterRow(character));
    }
    
    renderingDiv.appendChild(dataListElement);
}

function OrderString(field) {
    characterList = characterList.sort(function (a, b) {
        if(a[field].toUpperCase() > b[field].toUpperCase()){
            return 1;
        } else if (a[field].toUpperCase() > b[field].toUpperCase()) {
            return -1;
        } else {
            return 0;
        }
    });

    generateCharacterTable();
}

function OrderNumbers(field) {
    characterList = characterList.sort(function (a, b) {
        let aVal = parseInt(a[field].replace(',', ''));
        let bVal = parseInt(b[field].replace(',', ''));
        
        if(isNaN(aVal)) {
            return 1
        } else if(isNaN(bVal)) {
            return -1;
        } else if(aVal > bVal){
            return 1;
        } else if (aVal > bVal) {
            return -1;
        } else {
            return 0;
        }
    });

    generateCharacterTable();
}

function OrderListCount(field) {
    characterList = characterList.sort(function (a, b) {
        if(a[field].length > b[field].length){
            return 1;
        } else if (a[field].length > b[field].length) {
            return -1;
        } else {
            return 0;
        }
    });

    generateCharacterTable();
}

function GenerateCharacterRow(character)
{
    let parent = document.createElement("div");
    parent.className = "characterRow row d-flex justify-content-between";
    
    let name = document.createElement("div");
    name.className = "name std-width";
    name.innerText = character["name"];

    let height = document.createElement("div");
    height.className = "height std-width";
    
    if(character["height"] === "unknown") {
        height.innerText = "unknown size";
    } else {
        height.innerText = character["height"] + " cm";
    }
    
    let mass = document.createElement("div");
    mass.className = "mass std-width";
    
    if(character["mass"] === "unknown") {
        mass.innerText = "unknown weight";
    } else {
        mass.innerText = character["mass"] + " Kg";
    }

    let filmsCount = document.createElement("div");
    filmsCount.className = "filmsCount std-width";
    filmsCount.innerText = character["films"].length + " films";

    parent.appendChild(name);
    parent.appendChild(height);
    parent.appendChild(mass);
    parent.appendChild(filmsCount);
    
    return parent;    
}