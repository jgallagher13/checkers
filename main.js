const PLAYER_LOOKUP = {
    '0': '',
    '1': 'rebels',
    '-1': 'empire',
}

let board
let turn
let winner

const messageEl = document.querySelector('h2')
const playBtn = document.getElementById('playBtn')
const forfeitBtn = document.getElementById('forfeitBtn')
const spaces = document.querySelector('#board')
let spacesArr = [...document.querySelectorAll('#board > div')]

const renderMessage = () => {
    if (winner === 'rebels') {
        messageEl.innerText = "Winner: The Rebels!"
    } else if (winner === 'empire') {
        messageEl.innerText = "Winner: The Empire!"
    } 
    else {
        messageEl.innerText = `Move: The ${PLAYER_LOOKUP[turn]}`
    }
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

        let SEOffsetCol = parsedColIdx + 1
        let SEOffsetRow = parsedRowIdx - 1
        
        let NWOffsetCol = parsedColIdx - 1
        let NWOffsetRow = parsedRowIdx + 1

        let SWOffsetCol = parsedColIdx - 1
        let SWOffsetRow = parsedRowIdx - 1 
    
        let NEOffsetId = `c${NEOffsetCol}r${NEOffsetRow}`
        let NWOffsetId = `c${NWOffsetCol}r${NWOffsetRow}`
        let SEOffsetId = `c${SEOffsetCol}r${SEOffsetRow}`
        let SWOffsetId = `c${SWOffsetCol}r${SWOffsetRow}`
        let possibleNEcell = document.getElementById(NEOffsetId)
        let possibleNWcell = document.getElementById(NWOffsetId)
        let possibleSEcell = document.getElementById(SEOffsetId)
        let possibleSWcell = document.getElementById(SWOffsetId)

       let possibilityArr = []

       if (targetOld !== null && targetOld.classList.contains('yoda')) {
        if(possibleSEcell !== null) {
            possibleSEcell.style.backgroundColor = 'gold'
            possibilityArr.push(possibleSEcell)
              if(possibleSEcell.firstChild !== null && possibleSEcell.firstChild.classList.contains('empire')) {
                let SEJumpCol = SEOffsetCol + 1 
                let SEJumpRow = SEOffsetRow - 1
                let SEJumpPosition = `c${SEJumpCol}r${SEJumpRow}`
                let possibleSEJumpCell = document.getElementById(SEJumpPosition)
                if (possibleSEJumpCell !== null) {
                    possibleSEJumpCell.style.backgroundColor = 'gold'
                    possibilityArr.push(possibleSEJumpCell)
                }
              }
        }
        if(possibleSWcell !== null) {
            possibleSWcell.style.backgroundColor = 'gold'
            possibilityArr.push(possibleSWcell)
              if(possibleSWcell.firstChild !== null && possibleSWcell.firstChild.classList.contains('empire')) {
                let SWJumpCol = SWOffsetCol - 1 
                let SWJumpRow = SWOffsetRow - 1
                let SWJumpPosition = `c${SWJumpCol}r${SWJumpRow}`
                let possibleSWJumpCell = document.getElementById(SWJumpPosition)
                if (possibleSWJumpCell !== null) {
                    possibleSWJumpCell.style.backgroundColor = 'gold'
                    possibilityArr.push(possibleSWJumpCell)
                }
              }
        }
       }

         if(possibleNEcell !== null) {
           possibleNEcell.style.backgroundColor = 'gold'
           possibilityArr.push(possibleNEcell)
             if (possibleNEcell.firstChild !== null  && possibleNEcell.firstChild.classList.contains('empire')) {
             let NEJumpCol = NEOffsetCol + 1
             let NEJumpRow = NEOffsetRow + 1
             let NEJumpPosition = `c${NEJumpCol}r${NEJumpRow}`
             let possibleNEJumpCell = document.getElementById(NEJumpPosition)
             if (possibleNEJumpCell !== null) {
                possibleNEJumpCell.style.backgroundColor = 'gold'
             possibilityArr.push(possibleNEJumpCell)
             }
            }
     } 
     
         if(possibleNWcell !== null) {
            possibleNWcell.style.backgroundColor = 'gold'
            possibilityArr.push(possibleNWcell) 
             if (possibleNWcell.firstChild !== null && possibleNWcell.firstChild.classList.contains('empire')){
             let NWJumpCol = NWOffsetCol - 1
             let NWJumpRow = NWOffsetRow + 1
             let NWJumpPosition = `c${NWJumpCol}r${NWJumpRow}`
             let possibleNWJumpCell = document.getElementById(NWJumpPosition)
             if (possibleNWJumpCell !== null) {
                possibleNWJumpCell.style.backgroundColor = 'gold'
             possibilityArr.push(possibleNWJumpCell)
             }
             
            }
     }
           
    return possibilityArr
        
}  if (PLAYER_LOOKUP[turn] === 'empire') {
        let NEOffsetCol = parsedColIdx - 1
        let NEOffsetRow = parsedRowIdx - 1
        
        let SEOffsetCol = parsedColIdx - 1
        let SEOffsetRow = parsedRowIdx + 1
    
        let NWOffsetCol = parsedColIdx + 1
        let NWOffsetRow = parsedRowIdx - 1

        let SWOffsetCol = parsedColIdx + 1
        let SWOffsetRow = parsedRowIdx + 1
    
        let NEOffsetId = `c${NEOffsetCol}r${NEOffsetRow}`
        let NWOffsetId = `c${NWOffsetCol}r${NWOffsetRow}`
        let SEOffsetId = `c${SEOffsetCol}r${SEOffsetRow}`
        let SWOffsetId = `c${SWOffsetCol}r${SWOffsetRow}`
        let possibleNEcell = document.getElementById(NEOffsetId)
        let possibleNWcell = document.getElementById(NWOffsetId)
        let possibleSEcell = document.getElementById(SEOffsetId)
        let possibleSWcell = document.getElementById(SWOffsetId)

        let possibilityArr = []

        if (targetOld !== null && targetOld.classList.contains('vader')) {
            if(possibleSEcell !== null) {
                possibleSEcell.style.backgroundColor = 'gold'
                possibilityArr.push(possibleSEcell)
                  if(possibleSEcell.firstChild !== null && possibleSEcell.firstChild.classList.contains('rebels')) {
                    let SEJumpCol = SEOffsetCol - 1
                    let SEJumpRow = SEOffsetRow + 1
                    let SEJumpPosition = `c${SEJumpCol}r${SEJumpRow}`
                    let possibleSEJumpCell = document.getElementById(SEJumpPosition)
                    if (possibleSEJumpCell !== null) {
                        possibleSEJumpCell.style.backgroundColor = 'gold'
                        possibilityArr.push(possibleSEJumpCell)
                    }
                  }
            }
            if(possibleSWcell !== null) {
                possibleSWcell.style.backgroundColor = 'gold'
                possibilityArr.push(possibleSWcell)
                  if(possibleSWcell.firstChild !== null && possibleSWcell.firstChild.classList.contains('rebels')) {
                    let SWJumpCol = SWOffsetCol + 1 
                    let SWJumpRow = SWOffsetRow + 1
                    let SWJumpPosition = `c${SWJumpCol}r${SWJumpRow}`
                    let possibleSWJumpCell = document.getElementById(SWJumpPosition)
                    if (possibleSWJumpCell !== null) {
                        possibleSWJumpCell.style.backgroundColor = 'gold'
                        possibilityArr.push(possibleSWJumpCell)
                    }
                  }
            }
           }

        if(possibleNEcell !== null) {
         possibleNEcell.style.backgroundColor = 'gold'
         possibilityArr.push(possibleNEcell)
             if (possibleNEcell.firstChild !== null  && possibleNEcell.firstChild.classList.contains('rebels')) {
             let NEJumpCol = NEOffsetCol - 1
             let NEJumpRow = NEOffsetRow - 1
             let NEJumpPosition = `c${NEJumpCol}r${NEJumpRow}`
             let possibleNEJumpCell = document.getElementById(NEJumpPosition)
             if (possibleNEJumpCell !== null) {
                possibleNEJumpCell.style.backgroundColor = 'gold'
             possibilityArr.push(possibleNEJumpCell)
             }
            } 
        }

        if(possibleNWcell !== null) {
        possibleNWcell.style.backgroundColor = 'gold'
        possibilityArr.push(possibleNWcell)
        if (possibleNWcell.firstChild !== null && possibleNWcell.firstChild.classList.contains('rebels')){
            let NWJumpCol = NWOffsetCol + 1
            let NWJumpRow = NWOffsetRow - 1
            let NWJumpPosition = `c${NWJumpCol}r${NWJumpRow}`
            let possibleNWJumpCell = document.getElementById(NWJumpPosition)
            if (possibleNWJumpCell !== null) {
                possibleNWJumpCell.style.backgroundColor = 'gold'
            possibilityArr.push(possibleNWJumpCell)
            }
           } 
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

  let rebelsTurnSEJumpedCellCol = parsedColIdxOld + 1
  let rebelsTurnSEJumpedCellRow = parsedRowIdxOld - 1
  let rebelsTurnSEJumpedCellIdx = `c${rebelsTurnSEJumpedCellCol}r${rebelsTurnSEJumpedCellRow}`
  let rebelsTurnSEJumpedCellPosition = document.getElementById(rebelsTurnSEJumpedCellIdx)

  let rebelsTurnNWJumpedCellCol = parsedColIdxOld - 1
  let rebelsTurnNWJumpedCellRow = parsedRowIdxOld + 1
  let rebelsTurnNWJumpedCellIdx = `c${rebelsTurnNWJumpedCellCol}r${rebelsTurnNWJumpedCellRow}`
  let rebelsTurnNWJumpedCellPosition = document.getElementById(rebelsTurnNWJumpedCellIdx)

  let rebelsTurnSWJumpedCellCol = parsedColIdxOld - 1
  let rebelsTurnSWJumpedCellRow = parsedRowIdxOld - 1
  let rebelsTurnSWJumpedCellIdx = `c${rebelsTurnSWJumpedCellCol}r${rebelsTurnSWJumpedCellRow}`
  let rebelsTurnSWJumpedCellPosition = document.getElementById(rebelsTurnSWJumpedCellIdx)

  let empireTurnNEJumpedCellCol = parsedColIdxOld - 1
  let empireTurnNEJumpedCellRow = parsedRowIdxOld - 1
  let empireTurnNEJumpedCellIdx = `c${empireTurnNEJumpedCellCol}r${empireTurnNEJumpedCellRow}`
  let empireTurnNEJumpedCellPosition = document.getElementById(empireTurnNEJumpedCellIdx)

  let empireTurnSEJumpedCellCol = parsedColIdxOld - 1
  let empireTurnSEJumpedCellRow = parsedRowIdxOld + 1
  let empireTurnSEJumpedCellIdx = `c${empireTurnSEJumpedCellCol}r${empireTurnSEJumpedCellRow}`
  let empireTurnSEJumpedCellPosition = document.getElementById(empireTurnSEJumpedCellIdx)

  let empireTurnNWJumpedCellCol = parsedColIdxOld + 1
  let empireTurnNWJumpedCellRow = parsedRowIdxOld - 1
  let empireTurnNWJumpedCellIdx = `c${empireTurnNWJumpedCellCol}r${empireTurnNWJumpedCellRow}`
  let empireTurnNWJumpedCellPosition = document.getElementById(empireTurnNWJumpedCellIdx)

  let empireTurnSWJumpedCellCol = parsedColIdxOld + 1
  let empireTurnSWJumpedCellRow = parsedRowIdxOld + 1
  let empireTurnSWJumpedCellIdx = `c${empireTurnSWJumpedCellCol}r${empireTurnSWJumpedCellRow}`
  let empireTurnSWJumpedCellPosition = document.getElementById(empireTurnSWJumpedCellIdx)
  
  if (PLAYER_LOOKUP[turn]==='rebels') {
    if (parsedColIdxNew === parsedColIdxOld + 2 && parsedRowIdxNew === parsedRowIdxOld + 2) {
        rebelsTurnNEJumpedCellPosition.removeChild(rebelsTurnNEJumpedCellPosition.firstChild)
        return rebelsTurnNEJumpedCellPosition
    } else if (parsedColIdxNew === parsedColIdxOld -2 && parsedRowIdxNew === parsedRowIdxOld + 2) {
        rebelsTurnNWJumpedCellPosition.removeChild(rebelsTurnNWJumpedCellPosition.firstChild)
        return rebelsTurnNWJumpedCellPosition
    } else if (parsedColIdxNew === parsedColIdxOld + 2 && parsedRowIdxNew === parsedRowIdxOld - 2) {
        rebelsTurnSEJumpedCellPosition.removeChild(rebelsTurnSEJumpedCellPosition.firstChild)
        return rebelsTurnSEJumpedCellPosition
    } else if (parsedColIdxNew === parsedColIdxOld - 2 && parsedRowIdxNew === parsedRowIdxOld - 2) {
        rebelsTurnSWJumpedCellPosition.removeChild(rebelsTurnSWJumpedCellPosition.firstChild)
        return rebelsTurnSWJumpedCellPosition
    }
  } else if (PLAYER_LOOKUP[turn]==='empire') {
    if (parsedColIdxNew === parsedColIdxOld - 2 && parsedRowIdxNew === parsedRowIdxOld - 2) {
        empireTurnNEJumpedCellPosition.removeChild(empireTurnNEJumpedCellPosition.firstChild)
        return empireTurnNEJumpedCellPosition
    } else if (parsedColIdxNew === parsedColIdxOld + 2 && parsedRowIdxNew === parsedRowIdxOld - 2) {
        empireTurnNWJumpedCellPosition.removeChild(empireTurnNWJumpedCellPosition.firstChild)
        return empireTurnNWJumpedCellPosition
    } else if (parsedColIdxNew === parsedColIdxOld - 2 && parsedRowIdxNew === parsedRowIdxOld + 2) {
        empireTurnSEJumpedCellPosition.removeChild(empireTurnSEJumpedCellPosition.firstChild)
        return empireTurnSEJumpedCellPosition
    } else if (parsedColIdxNew === parsedColIdxOld + 2 && parsedRowIdxNew === parsedRowIdxOld + 2) {
        empireTurnSWJumpedCellPosition.removeChild(empireTurnSWJumpedCellPosition.firstChild)
        return empireTurnSWJumpedCellPosition
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
                    getWinner()
                    turn *= -1
                    changeToBlack()
                }
            }
        }
    }
    if((event.target.classList.contains('empire') && PLAYER_LOOKUP[turn]==='empire') || (event.target.classList.contains('rebels') && PLAYER_LOOKUP[turn]==='rebels')){
        targetOld = event.target
        checkKing(targetOld)
        checkMove(targetOld)
        targetOld.style.borderColor = 'gold'
        
    } 
    render()
}

const getWinner = () => {
	spacesArr = [...document.querySelectorAll('#board > div')]
	const winnerArr = []
    
	spacesArr.forEach((space) => {
		if (
			
			space?.childNodes[0]?.className === 'rebels' ||
           
			space?.childNodes[0]?.className === 'empire'
		) {
         
			winnerArr.push(space)
		}
	})

    const rebelWin = winnerArr.every(space => space?.childNodes[0]?.className === 'rebels')
    const empireWin = winnerArr.every(space => space?.childNodes[0]?.className === 'empire')
    winner = rebelWin ? 'rebels' : empireWin ? 'empire' : null
}

const checkKing = (targetOld) => {
    let parentIdOld = targetOld.parentElement.id
    let positionArrOld = parentIdOld.split('')
    positionArrOld.shift()
    positionArrOld.splice(1, 1)
    let rowIdxOld = positionArrOld[1] 
    let parsedRowIdxOld = parseInt(rowIdxOld, 10)
    
    if (PLAYER_LOOKUP[turn] ==='empire' && parsedRowIdxOld === 0) {
        targetOld.classList.add('vader')
    }

   if (PLAYER_LOOKUP[turn] ==='rebels' && parsedRowIdxOld === 7) {
        targetOld.classList.add('yoda')
    }
}

const render = () => {
    renderMessage()
}

const forfeit = () => {
    if (PLAYER_LOOKUP[turn]==='empire') {
        winner = "rebels"
    } else if (PLAYER_LOOKUP[turn]==='rebels') {
        winner = "empire"
    }
    render()
return winner
}

const init = () => {
    turn = 1
    winner = null
    render ()
}

init()

spaces.addEventListener('click', handleMove)
forfeitBtn.addEventListener('click', forfeit)


