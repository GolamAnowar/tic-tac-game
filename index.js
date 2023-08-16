const selsectBox = document.querySelector(".select-box"),
playerXicon = document.querySelector(".player-x"),
playerOicon = document.querySelector(".player-o"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = document.querySelector(".won-text");

for(let i = 0; i < allBox.length; i++){
    allBox[i].setAttribute("onclick", "clickedOption(this)");
}

playerXicon.onclick = () => {
    selsectBox.classList.add("hide");
    playBoard.classList.add("show");
}

playerOicon.onclick = () => {
    selsectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

let xIcon = "bx bx-x",
oIcon = "bx bx-circle",
playerSign,
singCheck = true;

function clickedOption(e){
    if(players.classList.contains("player")){
        e.innerHTML = `<i class="${oIcon}"></i>`
        players.classList.add("active");
        playerSign = "o";
        e.setAttribute("id", playerSign);
    }else{
        e.innerHTML = `<i class="${xIcon}"></i>`
        players.classList.add("active");
        playerSign = "x";
        e.setAttribute("id", playerSign);
    }
    e.style.pointerEvents = "none"
    playBoard.style.pointerEvents = "none"
    selectWinner();
    setTimeout(() => {
        bot(singCheck);
    }, 1000);
}

function bot(singCheck){
    if(singCheck){
        let arr = [];
        for(let i = 0; i < allBox.length; i++){
            if(allBox[i].childElementCount == 0){
                arr.push(i);
            }
        }
    
        let random = arr[Math.floor(Math.random() * arr.length)];
    
        if(players.classList.contains("player")){
            allBox[random].innerHTML = `<i class="${xIcon}"></i>`
            players.classList.remove("active");
            playerSign = "x";
            allBox[random].setAttribute("id", playerSign);
        }else{
            allBox[random].innerHTML = `<i class="${oIcon}"></i>`
            players.classList.remove("active");
            playerSign = "o";
            allBox[random].setAttribute("id", playerSign);
        }
        playBoard.style.pointerEvents = "auto"
        allBox[random].style.pointerEvents = "none"
        selectWinner();
    }
}

function getClass(idName){
    console.log(idName)
    return document.querySelector(".box" + idName).id;
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
    console.log(val1, val2, val3, sign)
}

function selectWinner(){
    if(checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign)){
        singCheck = false;
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
            wonText.innerHTML = `player <p>${playerSign}</p> won the game`
        }, 1000);
    }
}