const addCardBtn = document.querySelector("#addCard");
const createBtn = document.querySelector("#createBtn");
const form = document.querySelector("#form");
let cards = [];
let cardNums = document.getElementsByTagName("span");
let definitions = document.getElementsByClassName("definition");
let terms = document.getElementsByClassName("term");
let title = document.querySelector("#title");
let studySets = document.querySelector("#studySets");
let headerText = document.querySelector("#headerText");
//Update card nums when one is deleted.
function updateNums(){
    if(cards.length > 0){
        for(let i = 0; i < cards.length; i++){
            cardNums[i].textContent = i + 1;
            terms[i].name = `term${i}`
            definitions[i].name = `def${i}`
        }
    }
}
//Add New Card Function
function addCard(){
    //Define elements
    const cardHeader = document.createElement("div");
    const cardNum = document.createElement("span");
    const del = document.createElement("img");
    const card = document.createElement("div");
    const row = document.createElement("div");
    const col1 = document.createElement("div");
    const term = document.createElement("textarea");
    const col2 = document.createElement("div");
    const definition = document.createElement("textarea");
    //Flesh out Elements
    card.classList.add("card");
    cardHeader.classList.add("cardHeader");
    cardNum.classList.add("cardNum");
    del.classList.add("delete");
    del.alt = "delete";
    del.src = "../imgs/bin.png";
    del.style.cursor = "pointer";
    row.classList.add("row");
    col1.classList.add("col");
    term.classList.add("term");
    term.rows = "2";
    term.placeholder = "Term";
    term.required = true;
    term.name = `term${cards.length}`
    col2.classList.add("col");
    definition.classList.add("definition");
    definition.placeholder = "Definition";
    definition.rows = "2";
    definition.name = `def${cards.length}`
    definition.required =true;
    //Assemble elements together
    cardHeader.appendChild(cardNum);
    cardHeader.appendChild(del);
    col1.appendChild(term);
    col2.appendChild(definition);
    row.appendChild(col1);
    row.appendChild(col2);
    card.appendChild(cardHeader);
    card.appendChild(row);

    //Append to form and cards.
    cards.push(card);
    cardNum.textContent = cards.length;
    form.appendChild(card);

    //Delete Card Function
    del.addEventListener('click', () => {
        form.removeChild(card);
        const index = cards.indexOf(card);
        if (index > -1) {
            cards.splice(index, 1);
        }
        updateNums();
    })
}



 
//Submit Function
//Create a new set, return {set# -> card# -> {term->def}}
function create(){
    //If set is null, set it to 1, else increment it.
    if(terms.length === 0 || definitions.length === 0 || title === ""){
        alert('Add terms or definitions');
    }
    else{
        if(localStorage.getItem('set#') === null){
            localStorage.setItem('set#', 1);
        }
        else{
            localStorage.setItem('set#', parseInt(localStorage.getItem('set#')) + 1);
        }
        let currentSet = localStorage.getItem('set#');
        let newSet = [{'title':title.value}];
        for(let i = 0; i < cards.length; i++){
        let newPair = {}; 
        newPair[terms[i].value] = definitions[i].value;
        newSet.push(newPair);
        }
        localStorage.setItem(currentSet, JSON.stringify(newSet));
    }
}



addCardBtn.addEventListener('click', addCard);
createBtn.addEventListener('click',create);
