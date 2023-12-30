//Suits and numbers to make cards//
let suits = ["C","D","H","S"]
let numbers = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
//Arrays//
let cards = []
let hold = []
//Get elements from the DOM//
const getContainerEl = document.getElementById("container")
const cardOneEl = document.getElementById("cardOne")
const cardTwoEl = document.getElementById("cardTwo")
const cardThreeEl = document.getElementById("cardThree")
const cardFourEl = document.getElementById("cardFour")
const cardFiveEl = document.getElementById("cardFive")
const getMessageEL = document.getElementById("yourHand") 
const getInstructionsEl = document.getElementById("instructions")
const getImageOne = document.getElementById("imageOne")
const getImageTwo = document.getElementById("imageTwo")
//Produce cards//
function produceCards(){
    for (let i=0; i<suits.length; i++){    
        for (let j=0; j<numbers.length; j++) {
            cards.push(numbers[j] + suits[i])
        }
    }   
}
//Shuffle deck//
function shuffle(){
    for (let i=0; i<=51; i++){
        let randomGenerator = Math.floor(Math.random() * 51);
        let temp = cards[i]
        cards[i] = cards[randomGenerator] 
        cards[randomGenerator] = temp
    }   
}
//Display cards in the DOM//
function displayCards(){
    cardOneEl.src = cards[0] + ".png"
    cardTwoEl.src = cards[1] + ".png"
    cardThreeEl.src = cards[2] + ".png"
    cardFourEl.src = cards[3] + ".png"
    cardFiveEl.src = cards[4] + ".png"
     
    cardOneEl.addEventListener("click",(event)=>{
        if(hold.includes(event.target.attributes.src.textContent)){
            var remove = hold.indexOf(event.target.attributes.src.textContent);
            hold.splice(remove,1);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "none"
        }else{
            hold.push(event.target.attributes.src.textContent);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "white 5px solid"
        }
    });
    cardTwoEl.addEventListener("click",(event)=>{
        if(hold.includes(event.target.attributes.src.textContent)){
            var remove = hold.indexOf(event.target.attributes.src.textContent);
            hold.splice(remove,1);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "none"
        }else{
            hold.push(event.target.attributes.src.textContent);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "white 5px solid"
        }
    });
    cardThreeEl.addEventListener("click",(event)=>{
        if(hold.includes(event.target.attributes.src.textContent)){
            var remove = hold.indexOf(event.target.attributes.src.textContent);
            hold.splice(remove,1);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "none"
        }else{
            hold.push(event.target.attributes.src.textContent);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "white 5px solid"
        }
    });
    cardFourEl.addEventListener("click",(event)=>{
        if(hold.includes(event.target.attributes.src.textContent)){
            var remove = hold.indexOf(event.target.attributes.src.textContent);
            hold.splice(remove,1);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "none"
        }else{
            hold.push(event.target.attributes.src.textContent);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "white 5px solid"
        }
    });
    cardFiveEl.addEventListener("click",(event)=>{
        if(hold.includes(event.target.attributes.src.textContent)){
            var remove = hold.indexOf(event.target.attributes.src.textContent);
            hold.splice(remove,1);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "none"
        }else{
            hold.push(event.target.attributes.src.textContent);
            var parentNode = event.currentTarget.parentNode;
            parentNode.style.border = "white 5px solid"
        }
    })    
}
//Start game//
function startingHand() {
    produceCards();
    shuffle();
    displayCards();
}
//Show cards in hold array//
const getDealButtonEl = document.getElementById("dealButton") 
//Restart game//
function restartGame() {
    const restartButton = document.getElementById("restartButton")
    restartButton.style.display = "block"
    restartButton.addEventListener("click",()=>{window.location.reload()})
}
//Dsiplay next set of cards//
getDealButtonEl.addEventListener("click",(event)=>{

    let newCards = []
    const getStartEl = document.getElementById("start")
    getStartEl.innerHTML = ""

    for(let i=0; i<hold.length; i++){
        const getStartEl = document.getElementById("start")
        const createDivEl = document.createElement("Div")
        const createImgEl = document.createElement("Img");
        createImgEl.src = hold[i];
        createImgEl.classList.add("display")
        createDivEl.appendChild(createImgEl)
        getStartEl.appendChild(createDivEl)
    };

    for(let i=hold.length; i<5; i++){
        const createDivEl = document.createElement("Div")
        const createImgEl = document.createElement("Img");
        createImgEl.src = cards[5 + (i - hold.length)] + ".png";
        newCards.push(cards[5 + (i - hold.length)] + ".png")
        createImgEl.classList.add("display")
        createDivEl.appendChild(createImgEl)
        getStartEl.appendChild(createDivEl)
    }

    getDealButtonEl.style.display = "none"

    let ourHand = hold.concat(newCards)

    let handReranked = [] //Starting hand organised//

    //Function to organise cards//
    function reorder(cards){

        const handStrength = new Map ([
            ["A", 13],
            ["K", 12],
            ["Q", 11],
            ["J", 10],
            ["1",  9],
            ["9",  8],
            ["8",  7],
            ["7",  6],
            ["6",  5],
            ["5",  4],
            ["4",  3],
            ["3",  2],
            ["2",  1]
        ]);
        
        let handReorder = cards.sort((a, b) => {
            return handStrength.get(a.charAt(0)) - handStrength.get(b.charAt(0));
        });

        handReranked = handReorder
        
    }
    reorder(ourHand)

    let rankArray = []; //Array with card numbers//
    let suitArray = []; //Array with card suits//

    //Get card number and suit to push into rankArray and suitArray//
    function suitAndRank(sortedHandOne){ 
        for(let i=0; i<sortedHandOne.length; i++){
            if(sortedHandOne[i].charAt(0) == 1 && sortedHandOne[i].charAt(1) == 0){
                rankArray.push("10")
                suitArray.push(sortedHandOne[i].charAt(2))
            } else {
                let sted = sortedHandOne;
                rankArray.push(sted[i].charAt(0));
                suitArray.push(sted[i].charAt(1));
            };
        }
    }
    suitAndRank(handReranked)
    //Function showing the suit count shown as an object//
    function countSuites(suitArray){
        let suitCount = {};
        suitArray.forEach((element) => {
            suitCount[element] = (suitCount[element] || 0) + 1;
        });
        return suitCount
    }
    countSuites(suitArray)
    //Function showing the card numbers shown as an object//
    function countRanks(rankArray){
        let rankCount = {};
        rankArray.forEach((element)=>{
            rankCount[element] = (rankCount[element] ||0) + 1
        });
        return rankCount
    }
    countRanks(rankArray)
    //Function to look for flush//
    function isFlush(suitArray){
        let cS = countSuites(suitArray);

        if(Object.keys(cS).find((element) => cS[element] === 5 )) {
            return true
        } else {
            return false
        }
    }
    isFlush(suitArray)
    //Sequence of cards needed to find a straight//
    const ranks = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    //Function to check for straights//
    function isStraight(cards) {

        const checkFlush = isFlush(suitArray)
        let index = ranks.indexOf(rankArray[0]);
        let ref = ranks.slice(index, index + 5 ).join("");
        let section = rankArray.slice(0).join("");

        if(section === "10JQKA" && checkFlush){
            return "ROYAL FLUSH";
        } else if (section === "A2345" || section === ref){
            return "STRAIGHT";
        } else {
            return "FALSE";
        }
    }
    isStraight(handReranked)
    //Function to check for 4 of a kind//
    function fourOfAKind(rankArray){
        let objectCardCount = countRanks(rankArray)

        if(Object.keys(objectCardCount).find((number) => objectCardCount[number] === 4)){
            return true
        }else{
            return false
        }
    }
    fourOfAKind(rankArray)
    //Function to check for 3 of a kind//
    function threeOfAKind(rankArray){
        let objectCardCount = countRanks(rankArray)

        if(Object.keys(objectCardCount).find((number) => objectCardCount[number] === 3)){
            return true
        }else{
            return false
        }
    }
    threeOfAKind(rankArray);
    //Function to check for a pair//
    function pair(rankArray){
        let objectCardCount = countRanks(rankArray)

        if(Object.keys(objectCardCount).find((number) => objectCardCount[number] === 2)){
            return true
        }else{
            return false
        }
    }
    pair(rankArray)
    //Function to look for 2 pairs//
    function twoPair(rankArray){
        let objectCardCount = countRanks(rankArray)
        let count = 0

        for(const[key,value] of Object.entries(objectCardCount)){
            if(value === 2){
                count ++    
            }
        }
    return count
    }
    twoPair(rankArray)

    let handsForWin = 0;    
    //Function to tell us which hand we have//
    function whichHand() {
        getInstructionsEl.style.display = "none"
        getMessageEL.style.display = "block"
        let objectCardCount = countRanks(rankArray);
        
        if(isFlush(suitArray) === true && isStraight(rankArray) === "ROYAL FLUSH"){
            getMessageEL.innerText = "Congratulations, You Have A Royal Flush!";
            document.body.style.backgroundImage = `url("jackpot.jpg")`;
            getHighBtn.disabled = true
            getLowBtn.disabled = true
            setTimeout(()=>{
                window.location.reload()
            },"10000")
        }else if(isFlush(suitArray) === true && isStraight(rankArray) === "STRAIGHT"){
            getMessageEL.innerText = "Congratulations, You Have A Stright Flush!";
            handsForWin = 1;
            setTimeout(()=>{
                highLow(handsForWin);
            },"2000");
        }else if(fourOfAKind(rankArray) === true){
            getMessageEL.innerText = "Congratulations, You Have 4 Of A Kind!";
            handsForWin = 2;
            setTimeout(()=>{
                highLow(handsForWin);
            },"2000");
        }else if(threeOfAKind(rankArray) === true && pair(rankArray) === true){
            getMessageEL.innerText = "Congratulations, You Have A Full House!";
            handsForWin = 3;
            setTimeout(()=>{
                highLow(handsForWin);
            },"2000");
        }else if(isFlush(suitArray) === true){
            getMessageEL.innerText = "Congratulations, You Have A Flush!";
            handsForWin = 4;
            setTimeout(()=>{
                highLow(handsForWin);
            },"2000");
        }else if(isStraight(rankArray) === "STRAIGHT"){
            getMessageEL.innerText = "Congratulations, You Have A Straight!";
            handsForWin = 5;
            setTimeout(()=>{
                highLow(handsForWin);
            },"2000");
        }else if(threeOfAKind(rankArray) === true){
            getMessageEL.innerText = "Congratulations, You Have 3 Of A Kind!";
            handsForWin = 6;
            setTimeout(()=>{
                highLow(handsForWin);
            },"2000");
        }else if(twoPair(rankArray) === 2){
            getMessageEL.innerText = "Congratulations, You Have 2 Pairs!";
            handsForWin = 7;
            setTimeout(()=>{
                highLow(handsForWin);
            },"2000")
        }else if(pair(rankArray) === true){
            getMessageEL.innerText = "Congratulations, You Have A Pair!";
            handsForWin = 8;
            setTimeout(()=>{
                highLow(handsForWin);
            },"2000");
        }else{
            getMessageEL.innerText = "GAME OVER!";
            getMessageEL.style.color = "red";
            setTimeout(()=>{
                restartGame()
            },"2000");
        }
    };
    whichHand()
})
startingHand()
//Function for high low game//
function highLow(handsForWin){
    //Displays hidden game//
    const showHiddenGame = document.getElementById("hiddenGame");
    showHiddenGame.style.display = "block"
    //Produce cards for high low game//
    const suits = ["C","D","H","S"]
    const numbers = ["2","3","4","5","6","7","8","9","10","J","Q","K"]

    let cards = []

    function produceCards(){
        let suitsArray = [...Array(12)].map(e=>suits[Math.floor(Math.random()*4)]) //Randomly produce suits for card//  
        for(let i=0; i<numbers.length; i++){
            cards.push(numbers[i]+suitsArray[i])
        };

        shuffle()
    };
    produceCards();

    function shuffle(){
        for (let i=0; i<12; i++){
            let randomGenerator = Math.floor(Math.random() * 12);
            let temp = cards[i]
            cards[i] = cards[randomGenerator] 
            cards[randomGenerator] = temp
        }   
    };

    document.getElementById("imageOne").src = cards[0]+".png"
    document.getElementById("imageTwo").src = "JB.png"

    let count = 0
    let ourCount = 0 //Number of correct guesses needed to win//

    const getNextHandBtn = document.getElementById("next")
    const getHighBtn = document.getElementById("high")
    const getLowBtn = document.getElementById("low")
    //Disables higher button if card is a King & lower if card is a 2//
    if(getImageOne.alt[0] === "K" || cards[0][0] === "K"){
        getHighBtn.style.display = "none"
    };
    if(getImageOne.alt[0] === "2" || cards[0][0] === "2"){
        getLowBtn.style.display = "none"
    };
    //Higher button//
    getHighBtn.addEventListener("click", ()=>{ 
        let cardOne = cards[count + 1][0]
        let cardTwo = cards[count][0]  

        switch(cardOne){
            case "1": //Card 10//
                cardOne = 10;
                break;
            case "J":
                cardOne = 11;
                break;
            case "Q":
                cardOne = 12;
                break;
            case "K":
                cardOne = 13;
                break;
        };
    
        switch(cardTwo){
            case "1":
                cardTwo = 10;
                break;
            case "J":
                cardTwo = 11;
                break;
            case "Q":
                cardTwo = 12;
                break;
            case "K":
                cardTwo = 13;
                break;
        };  

        if(cardTwo < cardOne){
            document.getElementById("imageOne").src = cards[count]+".png"
            document.getElementById("imageTwo").src = cards[count+1]+".png"
            getNextHandBtn.style.display = "block"
            getHighBtn.style.display = "none"
            getLowBtn.style.display = "none"  

        }else{
            document.getElementById("imageTwo").src = "JB.png"
            getMessageEL.innerText = "GAME OVER!"
            getMessageEL.style.color = "red"
            getHighBtn.disabled = true
            getLowBtn.disabled = true
            setTimeout(()=>{
                window.location.reload()
            },"3000")
        }
        count ++;    
    });
    //Lower Button//
    getLowBtn.addEventListener("click",()=>{
        let cardOne = cards[count + 1][0]
        let cardTwo = cards[count][0]  

        switch(cardOne){
            case "1": //Card 10//
                cardOne = 10;
                break;
            case "J":
                cardOne = 11;
                break;
            case "Q":
                cardOne = 12;
                break;
            case "K":
                cardOne = 13;
                break;
        };
    
        switch(cardTwo){
            case "1":
                cardTwo = 10;
                break;
            case "J":
                cardTwo = 11;
                break;
            case "Q":
                cardTwo = 12;
                break;
            case "K":
                cardTwo = 13;
                break;
        };  

        if(cardTwo > cardOne){
            document.getElementById("imageOne").src = cards[count]+".png"
            document.getElementById("imageTwo").src = cards[count+1]+".png"
            getNextHandBtn.style.display = "block"
            getHighBtn.style.display = "none"
            getLowBtn.style.display = "none"  
        }else{
            document.getElementById("imageTwo").src = "JB.png"
            getMessageEL.innerText = "GAME OVER!"
            getMessageEL.style.color = "red"
            getHighBtn.disabled = true
            getLowBtn.disabled = true
            setTimeout(()=>{
                window.location.reload()
            },"3000")
        }
        count ++;
    });
    //Next card in high low game//
    getNextHandBtn.addEventListener("click",()=>{
        getImageOne.src = cards[count] + ".png"
        getImageOne.alt = cards[count] + ".png"
        getImageTwo.src = "JB.png"
        //Disables higher button if card is a King & lower if card is a 2//
        if(getImageOne.alt[0] === "K"){
            getNextHandBtn.style.display = "none"
            getHighBtn.style.display = "none"
            getLowBtn.style.display = "block"
        }
        else if(getImageOne.alt[0] === "2"){
            getNextHandBtn.style.display = "none"
            getLowBtn.style.display = "none"
            getHighBtn.style.display = "block"
        } else {
            getNextHandBtn.style.display = "none"
            getHighBtn.style.display = "block"
            getLowBtn.style.display = "block"
            ourCount ++;
        }
        //End game//
        if(handsForWin === ourCount){
            getMessageEL.innerText = "YOU WON!";

            const getAllImages = document.querySelectorAll("img")

            getAllImages.forEach(element => {
                element.src = "JB.png"
            });
            
            document.body.style.backgroundImage = `url("jackpot.jpg")`;
            getHighBtn.disabled = true
            getLowBtn.disabled = true

            setTimeout(()=>{
                window.location.reload()
            },"10000")
        };
    }); 
};
//Coded by Kit - finished on 26/12/2023//