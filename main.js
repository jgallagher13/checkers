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
    
           if (possibleNEcell.firstChild !== null  && possibleNEcell.firstChild.classList.contains('empire')) {
           let NEJumpCol = NEOffsetCol + 1
           let NEJumpRow = NEOffsetRow + 1
            let NEJumpPosition = `c${NEJumpCol}r${NEJumpRow}`
            let possibleNEJumpCell = document.getElementById(NEJumpPosition)
            possibleNEJumpCell.style.backgroundColor = 'gold'
            possibilityArr.push(possibleNEJumpCell)
    
           } if (possibleNWcell.firstChild !== null && possibleNWcell.firstChild.classList.contains('empire')){
           let NWJumpCol = NWOffsetCol - 1
           let NWJumpRow = NWOffsetRow + 1
           let NWJumpPosition = `c${NWJumpCol}r${NWJumpRow}`
           let possibleNWJumpCell = document.getElementById(NWJumpPosition)
           possibleNWJumpCell.style.backgroundColor = 'gold'
           possibilityArr.push(possibleNWJumpCell)
           }

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

        if (possibleNEcell.firstChild !== null  && possibleNEcell.firstChild.classList.contains('rebels')) {
           let NEJumpCol = NEOffsetCol - 1
           let NEJumpRow = NEOffsetRow - 1
            let NEJumpPosition = `c${NEJumpCol}r${NEJumpRow}`
            let possibleNEJumpCell = document.getElementById(NEJumpPosition)
            possibleNEJumpCell.style.backgroundColor = 'gold'
            possibilityArr.push(possibleNEJumpCell)
    
           } if (possibleNWcell.firstChild !== null && possibleNWcell.firstChild.classList.contains('rebels')){
           let NWJumpCol = NWOffsetCol + 1
           let NWJumpRow = NWOffsetRow - 1
           let NWJumpPosition = `c${NWJumpCol}r${NWJumpRow}`
           let possibleNWJumpCell = document.getElementById(NWJumpPosition)
           possibleNWJumpCell.style.backgroundColor = 'gold'
           possibilityArr.push(possibleNWJumpCell)
          } 

       return possibilityArr
    }
   
}
const changeToBlack = () => {
    const blackDivs = document.querySelectorAll('.black')
    blackDivs.forEach((div) => {
        div.style.backgroundColor = 'black'
    })

    
}

const jumpPlayer = (targetOld, targetNew) => {
    let parentIdOld = targetOld.parentElement.id
    let positionArrOld = parentIdOld.split('')
    positionArrOld.shift()
    positionArrOld.splice(1, 1)
    let colIdxOld = positionArrOld[0]
    let rowIdxOld = positionArrOld[1]
    let parsedColIdxOld = parseInt(colIdxOld, 10) 
    let parsedRowIdxOld = parseInt(rowIdxOld, 10)
    
    let parentIdNew = targetNew.id
    let positionArrNew = parentIdNew.split('')
    positionArrNew.shift()
    positionArrNew.splice(1, 1)
    let colIdxNew = positionArrNew[0]
    let rowIdxNew = positionArrNew[1]
    let parsedColIdxNew = parseInt(colIdxNew, 10) 
    let parsedRowIdxNew = parseInt(rowIdxNew, 10)

  let rebelsTurnNEJumpedCellCol = parsedColIdxOld + 1
  let rebelsTurnNEJumpedCellRow = parsedRowIdxOld + 1
  let rebelsTurnNEJumpedCellIdx = `c${rebelsTurnNEJumpedCellCol}r${rebelsTurnNEJumpedCellRow}`
  let rebelsTurnNEJumpedCellPosition = document.getElementById(rebelsTurnNEJumpedCellIdx)

  let rebelsTurnNWJumpedCellCol = parsedColIdxOld - 1
  let rebelsTurnNWJumpedCellRow = parsedRowIdxOld + 1
  let rebelsTurnNWJumpedCellIdx = `c${rebelsTurnNWJumpedCellCol}r${rebelsTurnNWJumpedCellRow}`
  let rebelsTurnNWJumpedCellPosition = document.getElementById(rebelsTurnNWJumpedCellIdx)

  let empireTurnNEJumpedCellCol = parsedColIdxOld - 1
  let empireTurnNEJumpedCellRow = parsedRowIdxOld - 1
  let empireTurnNEJumpedCellIdx = `c${empireTurnNEJumpedCellCol}r${empireTurnNEJumpedCellRow}`
  let empireTurnNEJumpedCellPosition = document.getElementById(empireTurnNEJumpedCellIdx)

  let empireTurnNWJumpedCellCol = parsedColIdxOld + 1
  let empireTurnNWJumpedCellRow = parsedRowIdxOld - 1
  let empireTurnNWJumpedCellIdx = `c${empireTurnNWJumpedCellCol}r${empireTurnNWJumpedCellRow}`
  let empireTurnNWJumpedCellPosition = document.getElementById(empireTurnNWJumpedCellIdx)
  console.log(empireTurnNWJumpedCellPosition)

  if (PLAYER_LOOKUP[turn]==='rebels') {
    if (parsedColIdxNew === parsedColIdxOld + 2 && parsedRowIdxNew === parsedRowIdxOld + 2) {
        rebelsTurnNEJumpedCellPosition.removeChild(rebelsTurnNEJumpedCellPosition.firstChild)
        return rebelsTurnNEJumpedCellPosition
    } else if (parsedColIdxNew === parsedColIdxOld -2 && parsedRowIdxNew === parsedRowIdxOld + 2) {
        rebelsTurnNWJumpedCellPosition.removeChild(rebelsTurnNWJumpedCellPosition.firstChild)
        return rebelsTurnNWJumpedCellPosition
    }
  } else if (PLAYER_LOOKUP[turn]==='empire') {
    if (parsedColIdxNew === parsedColIdxOld - 2 && parsedRowIdxNew === parsedRowIdxOld - 2) {
        empireTurnNEJumpedCellPosition.removeChild(empireTurnNEJumpedCellPosition.firstChild)
        return empireTurnNEJumpedCellPosition
    } else if (parsedColIdxNew === parsedColIdxOld + 2 && parsedRowIdxNew === parsedRowIdxOld - 2) {
        empireTurnNWJumpedCellPosition.removeChild(empireTurnNWJumpedCellPosition.firstChild)
        return empireTurnNWJumpedCellPosition
    }
  }
}

let targetOld = null
const handleMove = (event) => {
    let targetNew = null
    if(targetOld !== null) {
        if(!event.target.classList.contains('empire') || !event.target.classList.contains('rebels')) {
            if(event.target.classList.contains('black') && event.target.firstChild === null){
                let possArr = checkMove(targetOld)
                if (possArr.includes(event.target)) {
                    targetNew = event.target
                    jumpPlayer(targetOld, targetNew)
                    targetNew.appendChild(targetOld).style.borderColor = 'white'
                    targetOld = null
                    turn *= -1
                    changeToBlack()
                }
               
            }
        }
    }
    if((event.target.classList.contains('empire') && PLAYER_LOOKUP[turn]==='empire') || (event.target.classList.contains('rebels') && PLAYER_LOOKUP[turn]==='rebels')){
        targetOld = event.target
        checkMove(targetOld)
        targetOld.style.borderColor = 'gold'
        
    } else {
        return
    }
    
    winner = getWinner()
    render()
}


const getWinner = () => {
// loop through array of arrays to see how many -1s and 1s there are, if count is 0 for whoevers turn it was then winner= turn *-1
}

const checkKing = () => {
// if class of checekr = playerturn and targetNew parent row = 7, 
// change design on checker
// make new checkMove where can go up and down
}

const forfeit = () => {
    if (PLAYER_LOOKUP[turn]==='empire') {
        winner = 1
    } else if (PLAYER_LOOKUP[turn]==='rebels') {
        winner = -1
    }

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

