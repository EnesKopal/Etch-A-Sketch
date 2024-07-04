const container=document.getElementById('container');
const grid= document.querySelector(".choose-grid-size");
const selection= document.querySelector('.selection-buttons');
const colorWheel= document.querySelector('#color-wheel');
const clearButton= document.getElementById('clear');


let gridSize=16;
const modes= {
    eraserMode:false,
    rainbowMode:true,
    colorMode:false,
}
window.onload=()=>{
createGrid();}

grid.addEventListener("click",()=>{
    const input= parseInt(prompt("Please enter a grid size"));
    while(container.firstChild){
        container.removeChild(container.lastChild);
    }   
    if(input<=100){
        gridSize=input;
        createGrid();
    }
    else {
        alert("Grid size must be 100 or less!");
    }
});

function createGrid(){
const styleString = `flex: 1 1 ${100/ gridSize}%;`;
    for(let i=0;i<(gridSize*gridSize);i++){
        const box = document.createElement("div");
        box.setAttribute("class","box");
        box.setAttribute("style",styleString);
        container.appendChild(box);
    }

}


selection.addEventListener("click",(event)=>{
let target= event.target;

document.querySelectorAll(".selection-buttons button").forEach((button)=>{
    button.style.backgroundColor ="#4914ff";
})
target.style.backgroundColor = "crimson";

let mode;
switch (target.id){
    case "eraser":
        mode="eraserMode";
    break;
    case "rainbow":
        mode="rainbowMode";
    break;
    case "one-color":
        mode="colorMode";
    break;
    }
    Object.keys(modes).forEach((key)=>{
        modes[key]=key===mode;
    })

});

clearButton.addEventListener("click",()=>clearBoard());
container.addEventListener("mouseover", (e)=>{
if (e.target.classList.contains("box")){
    for(const [key,value] of Object.entries(modes)){
        if(value===true){
            executeModeFunctionality(key,e.target);
            break;
        }
    }
}
})






function executeModeFunctionality(key,node){
    switch(key){
        case "eraserMode": node.style.backgroundColor="white";
        break;
        case "rainbowMode":node.style.backgroundColor=randomRGBVal();
        break;
        case "colorMode": node.style.backgroundColor=colorWheel.value;
        break;


    }


}

function randomRGBVal(){
    return `rgb(${randomInteger(255)} ${randomInteger(255)} ${randomInteger(255)})`
}
function randomInteger(max){
   return Math.floor(Math.random()*(max+1));
}

function clearBoard(){
    document.querySelectorAll(".box").forEach((node)=>{
        node.style.backgroundColor="white";
    })
}
