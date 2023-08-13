let element = document.querySelectorAll(".element");
let content = document.querySelector(".containerView");


let posX;
let posY;
let rect;
let elementY;
let elementX;

//Detectar el movimiento para bloquear otros movimientos
let flagKeyW = true;
let flagKeyA = true;
let flagKeyS = false;
let flagKeyD = true;

//Detectar el movimiento para moverse a ese punto
let flagW = true;
let flagA;
let flagS;
let flagD;

let speed = 2;

let score = 0;

let contSpaces = 0;

let checkMovement;

let audioChocarse = document.querySelector(".chocarse");
let audioPunto = document.querySelector(".punto");

for(let i = 1; i <= 4; i++){
    createSnakeBody();
}


document.addEventListener("keydown", (event) =>{
    if(event.key == " "){
        contSpaces++;
        if(contSpaces % 2 == 0){
            checkMovement = setInterval(updateSnakePosition, 15);
        }else{
            clearInterval(checkMovement);
        }
    }
});


function generarColorRGB() {
    const r = Math.floor(Math.random() * (256 - 50) + 50);
    const g = Math.floor(Math.random() * (256 - 50) + 50);
    const b = Math.floor(Math.random() * (256 - 50) + 50);
    
    return `rgb(${r},${g},${b})`;
}



function gameOver(){
    audioChocarse.play();  
    clearInterval(checkMovement);

    for(let i = 0 ; i < element.length; i++){
        element.item(i).style.backgroundColor = "tomato";
    }

setTimeout(() => {
    for(let i = 0; i < element.length; i++){
        if(i >= 2){
            element.item(i).remove();
        }
    }

    for(let i = 1; i <= 5; i++){
        createSnakeBody();
    }

    element.item(0).style.top = "48%";
    element.item(0).style.left = "50%";
    element.item(1).style.top = "51.8%";
    element.item(1).style.left = "50%";


    flagKeyW = true;
    flagKeyA = true;
    flagKeyS = false;
    flagKeyD = true;

    flagW = true;
    flagA = false;
    flagS = false;
    flagD = false;

    speed = 2;

    score = 0;
    document.querySelector(".numScore").textContent = score;
    document.querySelector(".numSpeed").textContent = speed - 1;

    if(document.querySelector(".point") != undefined){

        document.querySelector(".point").remove();
        createPoint();
    }else{
        console.log("No existe point");
    }

    checkMovement = setInterval(updateSnakePosition, 15);
    for(let i = 0 ; i < element.length; i++){
        element.item(i).style.backgroundColor = "rgb(10, 193, 50)";
    }

}, 2000);
}

function createSnakeBody(){
    const newElement = document.createElement('div');
    newElement.className = "element";
    newElement.style.top = (element.item(element.length - 1).offsetTop ) + "px";
    newElement.style.left = (element.item(element.length - 1).offsetleft ) + "px";
    document.querySelector(".containerView").appendChild(newElement);
    element = document.querySelectorAll(".element");
}

function getPoint(x,y){

    if(document.querySelector(".point") != undefined){
        let point = document.querySelector(".point");    
        let posPointY = point.offsetTop;
        let posPointX = point.offsetLeft;

        let snake = element.item(0);
        let snakeY = y;
        let snakeX = x;

        if(Math.abs(posPointX - snakeX) <= 20 && Math.abs(posPointY - snakeY) <= 20){
            score++;
            audioPunto.play();  
            point.remove();
            createPoint();
            for(let i = 1; i <= 2; i++){
                createSnakeBody();
            }

            document.querySelector(".numScore").textContent = score;
             if(score % 5 == 0){
                speed += 1;
             }
             document.querySelector(".numSpeed").textContent = speed - 1;

             const colorRGB = generarColorRGB();
             document.querySelector(".point").style.backgroundColor = colorRGB;
             document.querySelector(".point").style.boxShadow = "0px 0px 5px "+colorRGB+", 0px 0px 5px "+colorRGB;


        }


    }else{
        console.log("No existe point");
    }

}

function createPoint(){
    let posPointX;
    let posPointY;
    let flagPointSpawn = false;

    let widthContent = parseFloat(content.offsetWidth);
    let heightContent = parseFloat(content.offsetHeight);

    let leftContent = parseFloat(content.offsetLeft);
    let topContent = parseFloat(content.offsetTop);

    while(flagPointSpawn == false){
        posPointY = Math.floor(Math.random() * ((heightContent - topContent - 20) - topContent - 20 + 1) + topContent - 20);
        posPointX = Math.floor(Math.random() * ((widthContent - leftContent - 20) - leftContent - 20 + 1) + leftContent - 20);

        if(posPointX % 20 === 0 && posPointY % 20 === 0){
            flagPointSpawn = true;
        }else{
            flagPointSpawn = false;
        }

    }
    
    const point = document.createElement('div');
    point.className = "point";
    point.style.top = posPointY + "px";
    point.style.left = posPointX + "px";
    document.querySelector(".containerView").appendChild(point);

}

createPoint();

let Up = document.querySelector(".Up");
let Down = document.querySelector(".Down");
let Left = document.querySelector(".Left");
let Right = document.querySelector(".Right");

Up.addEventListener("click", () =>{
    if(flagKeyW == true){
        flagKeyW = true;
        flagKeyA = true;
        flagKeyD = true;
        flagKeyS = false;
    
        flagW = true;
        flagA = false;
        flagS = false;
        flagD = false;
    }
});


Down.addEventListener("click", () => {

    if(flagKeyS == true){
        flagKeyW = false;
        flagKeyA = true;
        flagKeyD = true;
        flagKeyS = true;

        flagW = false;
        flagA = false;
        flagS = true;
        flagD = false;
    }

});


Left.addEventListener("click", () => {

    if(flagKeyA == true){
        flagKeyW = true;
        flagKeyA = true;
        flagKeyD = false;
        flagKeyS = true;

        flagW = false;
        flagA = true;
        flagS = false;
        flagD = false;
    }

});

Right.addEventListener("click", () => {

    if(flagKeyD == true){
        flagKeyW = true;
        flagKeyA = false;
        flagKeyD = true;
        flagKeyS = true;

        flagW = false;
        flagA = false;
        flagS = false;
        flagD = true;
    }

});

function move(event) {
    if ((event.key === "w" || event.key === "W") && flagKeyW == true) {
        flagKeyW = true;
        flagKeyA = true;
        flagKeyD = true;
        flagKeyS = false;

        flagW = true;
        flagA = false;
        flagS = false;
        flagD = false;      
    } else if ((event.key === "a" || event.key === "A") && flagKeyA == true) {
        flagKeyW = true;
        flagKeyA = true;
        flagKeyD = false;
        flagKeyS = true;

        flagW = false;
        flagA = true;
        flagS = false;
        flagD = false;
        
    } else if ((event.key === "d" || event.key === "D") && flagKeyD == true) {
        flagKeyW = true;
        flagKeyA = false;
        flagKeyD = true;
        flagKeyS = true;

        flagW = false;
        flagA = false;
        flagS = false;
        flagD = true;
        
    } else if ((event.key === "s" || event.key === "S") && flagKeyS == true) {
        flagKeyW = false;
        flagKeyA = true;
        flagKeyD = true;
        flagKeyS = true;

        flagW = false;
        flagA = false;
        flagS = true;
        flagD = false;
    }
}

document.addEventListener("keydown", (event) => {
    move(event);
});


const divElement = element;
let contSeconds = 0;//Contas los segundos
let prevPosition = { x: divElement.item(0).offsetLeft, y: divElement.item(0).offsetTop };

function updateSnakePosition() {
    const currentPosition = { x: divElement.item(0).offsetLeft, y: divElement.item(0).offsetTop };
    getPoint(currentPosition.x, currentPosition.y);

    let heightContent = parseFloat(content.offsetHeight);

    for(let i = 0; i < element.length; i++){
        let posElementsY;
        let posElementsX;

        if(i != 0){
            posElementsY = element.item(i).offsetTop;
            posElementsX = element.item(i).offsetLeft;
        }

        let snakeY = currentPosition.y;
        let snakeX = currentPosition.x

        if(Math.abs(posElementsY - snakeY) <= 0 && Math.abs(posElementsX - snakeX) <= 0){
            gameOver();
        }

    }

    if(element.item(0).offsetTop >= heightContent - 20.5){
        gameOver();
        console.log("Perdiste");
    }

    let widthContent = parseFloat(content.offsetWidth);

    if(element.item(0).offsetLeft >= widthContent - 20.5 ){
        gameOver();
    }

    if(element.item(0).offsetTop <= 0.5){
        gameOver();
    }

    if(element.item(0).offsetLeft <= 0.5 ){
        gameOver();
    }

    for (let i = element.length - 1; i > 0; i--) {
        const prevSegment = element.item(i - 1);
        element.item(i).style.top = prevSegment.offsetTop + "px";
        element.item(i).style.left = prevSegment.offsetLeft + "px";
    }

    if (flagW) {
        element.item(0).style.top = (element.item(0).offsetTop - speed) + "px";
        element.item(0).style.borderRadius = "none";
        element.item(0).style.borderRadius = "5px";
        element.item(1).style.borderRadius = "5px";
        element.item(element.length - 1).style.borderRadius = "5px";
        element.item(element.length - 2).style.borderRadius = "5px";
    } else if (flagA) {
        element.item(0).style.left = (element.item(0).offsetLeft - speed) + "px";
        element.item(0).style.borderRadius = "none";
        element.item(0).style.borderRadius = "5px";
        element.item(1).style.borderRadius = "5px";
        element.item(element.length - 1).style.borderRadius = "5px";
        element.item(element.length - 2).style.borderRadius = "5px";
    } else if (flagS) {
        element.item(0).style.top = (element.item(0).offsetTop + speed) + "px";
        element.item(0).style.borderRadius = "none";
        element.item(0).style.borderRadius = "5px";
        element.item(1).style.borderRadius = "5px";
        element.item(element.length - 1).style.borderRadius = "5px";
        element.item(element.length - 2).style.borderRadius = "5px";
    } else if (flagD) {
        element.item(0).style.left = (element.item(0).offsetLeft + speed) + "px";
        element.item(0).style.borderRadius = "none";
        element.item(0).style.borderRadius = "5px";
        element.item(1).style.borderRadius = "5px";
        element.item(element.length - 1).style.borderRadius = "5px";
        element.item(element.length - 2).style.borderRadius = "5px";
    }

    prevPosition = currentPosition;
}

checkMovement = setInterval(updateSnakePosition, 15);
