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
    let parsedColIdx = parseInt(colIdx, 10) 
    let parsedRowIdx = parseInt(rowIdx, 10)
    
    if(PLAYER_LOOKUP[turn] === 'rebels'){
        let NEOffsetCol = parsedColIdx + 1
        let NEOffsetRow = parsedRowIdx + 1
        
    
        let NWOffsetCol = parsedColIdx - 1
        let NWOffsetRow = parsedRowIdx + 1
    
        let NEOffsetId = `c${NEOffsetCol}r${NEOffsetRow}`
        let NWOffsetId = `c${NWOffsetCol}r${NWOffsetRow}`
        let possibleNEcell = document.getElementById(NEOffsetId)
        let possibleNWcell = document.getElementById(NWOffsetId)
        possibleNEcell.style.backgroundColor = 'gold'
        possibleNWcell.style.backgroundColor = 'gold'
        let possibilityArr = [possibleNEcell, possibleNWcell]
       return possibilityArr
    } else if (PLAYER_LOOKUP[turn] === 'empire') {
        let NEOffsetCol = parsedColIdx - 1
        let NEOffsetRow = parsedRowIdx - 1
        
    
        let NWOffsetCol = parsedColIdx + 1
        let NWOffsetRow = parsedRowIdx - 1
    
        let NEOffsetId = `c${NEOffsetCol}r${NEOffsetRow}`
        let NWOffsetId = `c${NWOffsetCol}r${NWOffsetRow}`
        let possibleNEcell = document.getElementById(NEOffsetId)
        let possibleNWcell = document.getElementById(NWOffsetId)
        possibleNEcell.style.backgroundColor = 'gold'
        possibleNWcell.style.backgroundColor = 'gold'
        let possibilityArr = [possibleNEcell, possibleNWcell]
       return possibilityArr
    }
   
}
   //if value is opposite of current player we can jump
   

let targetOld = null
const handleMove = (event) => {
    let targetNew = null
    if(targetOld !== null) {
        if(!event.target.classList.contains('empire') || !event.target.classList.contains('rebels')) {
            if(event.target.classList.contains('black') && event.target.firstChild === null){
                let possArr = checkMove(targetOld)
                if (possArr.includes(event.target)) {
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
// if class of checekr = playerturn and targetNew parent row = 7, 
// change design on checker
// make new checkMove where can go up and down
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

