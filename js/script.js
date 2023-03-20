/**
 * L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
 */

// DOM ELEMENT
const myGridElem = document.querySelector(".grid");
const playButton = document.getElementById("play-button");
const mainText = document.getElementById("main-text");
// level selection
const lvlSelect = document.getElementById("level-select");
//point counter
let pointCounter = 0;

let bombs = [];

playButton.addEventListener("click", function(){
    //cleaning the prev grid
    myGridElem.classList.remove("hidden");
    mainText.classList.add("hidden");
    myGridElem.innerHTML = "";
    document.getElementById("point").innerHTML = "00";
    

    if (lvlSelect.value === "hard"){
        boxGeneration(49, "hard", myGridElem);
        bombs = bombArreygenerate(1, 49);
    }else if (lvlSelect.value === "medium"){
        boxGeneration(81, "medium", myGridElem);
        bombs = bombArreygenerate(16, 81);
    }else {
        boxGeneration(100, "easy", myGridElem);
        bombs = bombArreygenerate(16, 100);
    }
    console.log(bombs);
})


//do la possibilità all'utente di iniziare anche cliccando solo il testo
mainText.addEventListener("click", function(){
    //cleaning the prev grid
    myGridElem.classList.remove("hidden", "overlay");
    mainText.classList.add("hidden");
    myGridElem.innerHTML = "";
    document.getElementById("point").innerHTML = "00";

    if (lvlSelect.value === "hard"){
        boxGeneration(49, "hard", myGridElem);
        bombs = bombArreygenerate(16, 49);
    }else if (lvlSelect.value === "medium"){
        boxGeneration(81, "medium", myGridElem);
        bombs = bombArreygenerate(16, 81);
    }else {
        boxGeneration(100, "easy", myGridElem);
        bombs = bombArreygenerate(16, 100);
    }
    console.log(bombs);
})

/////////////////////////
// MY FUNCTION
/**
 * A funciont that generate my grid Box in myGrid
 * @param {numb} numbBox 
 * @param {string} lvlMode 
 * @param {string} myGrid //my dom elem where put my box
*/
function boxGeneration(numbBox, lvlMode, myGrid) {
    for(let i = 1; i <= numbBox; i++ ){
        let myBox = document.createElement("div");
        myBox.classList.add("box", lvlMode);
        myBox.innerHTML = i;
        myBox.addEventListener("click", boxClick);
        myGrid.append(myBox);
    }
    
    
    //box click handle
    function boxClick() {
        const myBoxArray = document.querySelectorAll(".box");
        console.log(this.innerHTML);
        if (bombs.includes(parseInt(this.innerHTML))){
            this.style.backgroundColor = "rgb(255,0,0)";
            //gestiamo la sconfitta
            mainText.innerText = "Mi discpiace, hai perso";
            mainText.classList.remove("hidden");
            myGridElem.classList.add("overlay");
            //coloriamo tutti i box in cui sono presenti bombe
            for (let i = 0; i < myBoxArray.length; i++){
                if (bombs.includes(parseInt(myBoxArray[i].innerHTML))){
                    myBoxArray[i].style.backgroundColor = "rgb(255,0,0)";
                }
            }
            pointCounter = 0;
        }else {
            pointCounter++
            this.style.backgroundColor = "rgb(26, 174, 233)";
            document.getElementById("point").innerHTML = pointCounter;
            if (myBoxArray.length - pointCounter - 1 === 0){
                mainText.innerText = "Congratulazioni, hai raggiunto il punteggio massimo";
                mainText.classList.remove("hidden");
            }
        }
    }
}

//generare arrey di bombe
function bombArreygenerate(bombNumb, cellNumb) {
    const bombArrey = [];
    let index = 0;
    while(index < bombNumb){
        let myBomb = getRndInteger(1, cellNumb);
        if (!bombArrey.includes(myBomb)){
            bombArrey.push(myBomb);
            index++;
        }
    }
    return bombArrey;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }