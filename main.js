/*----- constants -----*/
const PLAYER_LOOKUP = {
    '0': null,
    '1': 'rebels',
    '-1': 'empire',
}

/*----- state variables -----*/
let board
let turn
let winner

/*----- cached elements  -----*/
const messageEl = document.querySelector('h3')
const playBtn = document.getElementById('playBtn')
const forfeitBtn = document.getElementById('forfeitBtn')
//const spaces = document.getElementById('board')
const spaces = document.querySelector('#board')
const spacesArr = [...document.querySelectorAll('#board > div')]





/*----- functions -----*/
const renderBoard = () => {
}

const renderMessage = () => {
    if (winner) {
        messageEl.innerText = `The ${PLAYER_LOOKUP[winner]} Win!`
    } else {
        messageEl.innerText = `The ${PLAYER_LOOKUP[turn]}'s Turn`
    }
}

const renderControls = () => {
    playBtn.style.visibility = winner ? 'visible' : 'hidden'
}


const checkMove = (targetOld) => {
    let parentId = targetOld.parentElement.id
    let positionArr = parentId.split('')
    positionArr.shift()
    positionArr.splice(1, 1)
    let colIdx = positionArr[0]
    let rowIdx = positionArr[1]
    console.log(rowIdx)
    console.log(typeof rowIdx)
    parseInt(rowIdx, 10)
    console.log(typeof rowIdx)

    let NEOffsetCol = colIdx + 1
    let NEOffsetRow = rowIdx + 1
    console.log(NEOffsetRow)

    let NWOffsetCol = colIdx += 1
    let NWOffsetRow = rowIdx -= 1

    let NEOffsetId = `c${NEOffsetCol}r${NEOffsetRow}`
    let NWOffsetId = `c${NWOffsetCol}r${NWOffsetRow}`
    let possibleNEcell = document.getElementById(NEOffsetId)
    let possibleNWcell = document.getElementById(NWOffsetId)
    console.log(possibleNEcell)
    possibleNEcell.style.backgroundColor = 'gold'
    possibleNWcell.style.backgroundColor = 'gold'
    let possibilityArr = [possibleNEcell, possibleNWcell]
   return possibilityArr
}
   //check to see what is in diagnol squares, if it is blank or if there is piece we can jump over, if value === 0 can move checekr, if value is opposite of current player we can jump
   

let targetOld = null
//let currentChecker = null
const handleMove = (event) => {
    let targetNew = null
    if(targetOld !== null) {
        if(!event.target.classList.contains('empire') || !event.target.classList.contains('rebels')) {
            if(event.target.classList.contains('black') && event.target.firstChild === null){
                checkMove(targetOld)
                if (possibilityArr.includes(event.target)) {
                    targetNew = event.target
                    targetNew.appendChild(targetOld).style.borderColor = 'white'
                    targetOld = null
                    turn *= -1
                }
               
            }
        }
    }
    if((event.target.classList.contains('empire') && PLAYER_LOOKUP[turn]==='empire') || (event.target.classList.contains('rebels') && PLAYER_LOOKUP[turn]==='rebels')){
        targetOld = event.target
        targetOld.style.borderColor = 'gold'
        
    } else {
        return
    }
    winner = getWinner()
    render()
}


//jumping- 
// if square diagnal from targetOld has a child with class that is turn*-1 and there is an empty space on the other side of it you can move to that above space (highlight it and put it in array of options)
// then if you click that space - targetNew, take off class of targetOld and add class to targetNew, and take off class of space you jumped

const getWinner = () => {
// loop through array of arrays to see how many -1s and 1s there are, if count is 0 for whoevers turn it was then winner= turn *-1
}

const checkKing = () => {

}

const forfeit = () => {

}

const render = () => {
    renderBoard()
    renderMessage()
    renderControls()
}

const init = () => {
    board = [
        [-1, 0 , -1, 0, -1, 0, -1, 0],
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
    ]
    turn = 1
    winner = null
    render ()
}

init()


/*----- event listeners -----*/
spaces.addEventListener('click', handleMove)

