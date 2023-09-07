const PLAYER_LOOKUP = {
    '0': '',
    '1': 'rebels',
    '-1': 'empire',
}

let turn
let winner

const messageEl = document.querySelector('h2')
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

const getCellId = (targetOld) => {
    let parentId = targetOld.parentElement.id
    console.log(parentId)
    let positionArr = parentId.split('')
    positionArr.shift()
    positionArr.splice(1, 1)
    let unparsedColIdx = positionArr[0]
    console.log(unparsedColIdx)
    let unparsedRowIdx = positionArr[1]
    let colIdx = parseInt(unparsedColIdx, 10) 
    let rowIdx = parseInt(unparsedRowIdx, 10)
    return [colIdx, rowIdx]  
} 

const getOffsetId = (colOffset, rowOffset) => {
    return `c${colOffset}r${rowOffset}`;
};

const getOffsetCell = (colOffset, rowOffset) => {
    const offsetId = getOffsetId(colOffset, rowOffset);
    return document.getElementById(offsetId);
};

const highlightCell = (cell) => {
    if (cell !== null  && cell.firstChild === null) {
        cell.style.backgroundColor = 'gold';
    }
};

const checkMovePossibilityRebels = (targetOld, colIdx, rowIdx) => {
    let possibilityArr = [];
    let offsetCellNE = getOffsetCell(colIdx + 1, rowIdx + 1);
    let offsetCellNW = getOffsetCell(colIdx - 1, rowIdx + 1);
    let offsetCellSE = getOffsetCell(colIdx + 1, rowIdx - 1);
    let offsetCellSW = getOffsetCell(colIdx - 1, rowIdx - 1);
    if (offsetCellNE !== null) {
        highlightCell(offsetCellNE);
        possibilityArr.push(offsetCellNE);
        if (offsetCellNE.firstChild !== null && offsetCellNE.firstChild.classList.contains('empire')) {
            const jumpCellNE = getOffsetCell(colIdx + 2, rowIdx + 2);
            if (jumpCellNE !== null) {
                highlightCell(jumpCellNE);
                possibilityArr.push(jumpCellNE);
            }
        }
    }
    if (offsetCellNW !== null) {
        highlightCell(offsetCellNW);
        possibilityArr.push(offsetCellNW);
        if (offsetCellNW.firstChild !== null && offsetCellNW.firstChild.classList.contains('empire')) {
            const jumpCellNW = getOffsetCell(colIdx - 2, rowIdx + 2)
            if (jumpCellNW !== null) {
                highlightCell(jumpCellNW);
                possibilityArr.push(jumpCellNW)
            }
        }
    }
    if (targetOld !== null && targetOld.classList.contains('yoda')) {
        if (offsetCellSE != null) {
            highlightCell(offsetCellSE)
            possibilityArr.push(offsetCellSE)
        }
        if (offsetCellSE.firstChild !== null && offsetCellSE.firstChild.classList.contains('empire')) {
            const jumpCellSE = getOffsetCell(colIdx + 2, rowIdx - 2);
            if (jumpCellSE !== null) {
                highlightCell(jumpCellSE);
               possibilityArr.push(jumpCellSE)
           }
        }
        if (offsetCellSW !== null) {
            highlightCell(offsetCellSW)
            possibilityArr.push(offsetCellSW)
        }
        if (offsetCellSW.firstChild !== null && offsetCellSW.firstChild.classList.contains('empire')) {
            const jumpCellSW = getOffsetCell(colIdx - 2, rowIdx - 2);
            if (jumpCellSW !== null) {
                highlightCell(jumpCellSW);
                possibilityArr.push(jumpCellSW)
            }
        }
            }
    return possibilityArr
};

const checkMovePossibilityEmpire = (targetOld, colIdx, rowIdx) => {
    let possibilityArr = [];
    let offsetCellNE = getOffsetCell(colIdx - 1, rowIdx - 1);
    let offsetCellNW = getOffsetCell(colIdx + 1, rowIdx - 1);
    let offsetCellSE = getOffsetCell(colIdx - 1, rowIdx + 1);
    let offsetCellSW = getOffsetCell(colIdx + 1, rowIdx + 1);
    if (offsetCellNE !== null) {
        highlightCell(offsetCellNE);
        possibilityArr.push(offsetCellNE);
        if (offsetCellNE.firstChild !== null && offsetCellNE.firstChild.classList.contains('rebels')) {
                const jumpCellNE = getOffsetCell(colIdx - 2, rowIdx - 2);
                if (jumpCellNE !== null) {
                    highlightCell(jumpCellNE);
                    possibilityArr.push(jumpCellNE);
                }
            }
        }
        if (offsetCellNW !== null) {
            highlightCell(offsetCellNW);
            possibilityArr.push(offsetCellNW);
            if (offsetCellNW.firstChild !== null && offsetCellNW.firstChild.classList.contains('rebels')) {
                const jumpCellNW = getOffsetCell(colIdx + 2, rowIdx - 2)
                if (jumpCellNW !== null) {
                    highlightCell(jumpCellNW);
                    possibilityArr.push(jumpCellNW)
                }
            }
        }
        if (targetOld !== null && targetOld.classList.contains('vader')) {
            if (offsetCellSE != null) {
                highlightCell(offsetCellSE)
                possibilityArr.push(offsetCellSE)
            }
            if (offsetCellSE.firstChild !== null && offsetCellSE.firstChild.classList.contains('rebels')) {
                const jumpCellSE = getOffsetCell(colIdx - 2, rowIdx + 2);
                if (jumpCellSE !== null) {
                    highlightCell(jumpCellSE);
                   possibilityArr.push(jumpCellSE)
               }
            }
            if (offsetCellSW !== null) {
                highlightCell(offsetCellSW)
                possibilityArr.push(offsetCellSW)
            }
            if (offsetCellSW.firstChild !== null && offsetCellSW.firstChild.classList.contains('empire')) {
                const jumpCellSW = getOffsetCell(colIdx + 2, rowIdx + 2);
                if (jumpCellSW !== null) {
                    highlightCell(jumpCellSW);
                    possibilityArr.push(jumpCellSW)
                }
            }
                }
    return possibilityArr
}

const checkMove = (targetOld) => {
    const cellId = getCellId(targetOld)
    const colIdx = cellId[0]
    const rowIdx = cellId[1]
    if (PLAYER_LOOKUP[turn] === 'rebels') {
       let possibilityArr = checkMovePossibilityRebels(targetOld, colIdx, rowIdx)
       return possibilityArr
       }
       
    else if (PLAYER_LOOKUP[turn] === 'empire') {
       let possibilityArr = checkMovePossibilityEmpire(targetOld, colIdx, rowIdx)
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
    console.log(targetNew)
   const oldIdxArr = getCellId(targetOld)
   const colIdxOld = oldIdxArr[0]
   const rowIdxOld = oldIdxArr[1]
   
   const parentIdNew = targetNew.id
   const positionArrNew = parentIdNew.split('')
   positionArrNew.shift()
   positionArrNew.splice(1, 1)
   const unparsedColIdxNew = positionArrNew[0]
   const unparsedRowIdxNew = positionArrNew[1]
   const colIdxNew = parseInt(unparsedColIdxNew, 10) 
   const rowIdxNew = parseInt(unparsedRowIdxNew, 10)

   let rebelsTurnNEJumpedCellPosition = getOffsetCell(colIdxOld + 1, rowIdxOld + 1);
   let rebelsTurnNWJumpedCellPosition = getOffsetCell(colIdxOld - 1, rowIdxOld + 1);
   let rebelsTurnSEJumpedCellPosition = getOffsetCell(colIdxOld + 1, rowIdxOld - 1);
   let rebelsTurnSWJumpedCellPosition = getOffsetCell(colIdxOld - 1, rowIdxOld - 1);

  let empireTurnNEJumpedCellPosition = getOffsetCell(colIdxOld - 1, rowIdxOld - 1);
  let empireTurnNWJumpedCellPosition = getOffsetCell(colIdxOld + 1, rowIdxOld - 1);
  let empireTurnSEJumpedCellPosition = getOffsetCell(colIdxOld - 1, rowIdxOld + 1);
  let empireTurnSWJumpedCellPosition = getOffsetCell(colIdxOld + 1, rowIdxOld + 1);

  if (PLAYER_LOOKUP[turn]==='rebels') {
    if (colIdxNew === colIdxOld + 2 && rowIdxNew === rowIdxOld + 2) {
        rebelsTurnNEJumpedCellPosition.removeChild(rebelsTurnNEJumpedCellPosition.firstChild)
        return rebelsTurnNEJumpedCellPosition
    } else if (colIdxNew === colIdxOld -2 && rowIdxNew === rowIdxOld + 2) {
        rebelsTurnNWJumpedCellPosition.removeChild(rebelsTurnNWJumpedCellPosition.firstChild)
        return rebelsTurnNWJumpedCellPosition
    } else if (colIdxNew === colIdxOld + 2 && rowIdxNew === rowIdxOld - 2) {
        rebelsTurnSEJumpedCellPosition.removeChild(rebelsTurnSEJumpedCellPosition.firstChild)
        return rebelsTurnSEJumpedCellPosition
    } else if (colIdxNew === colIdxOld - 2 && rowIdxNew === rowIdxOld - 2) {
        rebelsTurnSWJumpedCellPosition.removeChild(rebelsTurnSWJumpedCellPosition.firstChild)
        return rebelsTurnSWJumpedCellPosition
    }
  } else if (PLAYER_LOOKUP[turn]==='empire') {
    if (colIdxNew === colIdxOld - 2 && rowIdxNew === rowIdxOld - 2) {
        empireTurnNEJumpedCellPosition.removeChild(empireTurnNEJumpedCellPosition.firstChild)
        return empireTurnNEJumpedCellPosition
    } else if (colIdxNew === colIdxOld + 2 && rowIdxNew === rowIdxOld - 2) {
        empireTurnNWJumpedCellPosition.removeChild(empireTurnNWJumpedCellPosition.firstChild)
        return empireTurnNWJumpedCellPosition
    } else if (colIdxNew === colIdxOld - 2 && rowIdxNew === rowIdxOld + 2) {
        empireTurnSEJumpedCellPosition.removeChild(empireTurnSEJumpedCellPosition.firstChild)
        return empireTurnSEJumpedCellPosition
    } else if (colIdxNew === colIdxOld + 2 && rowIdxNew === rowIdxOld + 2) {
        empireTurnSWJumpedCellPosition.removeChild(empireTurnSWJumpedCellPosition.firstChild)
        return empireTurnSWJumpedCellPosition
    }
  }
}

let targetOld = null;

const handleMove = (event) => {
    let targetNew = null;
    if(targetOld !== null) {
        if(!event.target.classList.contains('empire') || !event.target.classList.contains('rebels')) {
            if(event.target.classList.contains('black') && event.target.firstChild === null){
                let possibilityArr = checkMove(targetOld)
                if (possibilityArr.includes(event.target)) {
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
};

const getWinner = () => {
	spacesArr = [...document.querySelectorAll('#board > div')]
	const winnerArr = []
    
	spacesArr.forEach((space) => {
		if (space?.childNodes[0]?.classList.contains('rebels')  || space?.childNodes[0]?.classList.contains('empire')) {
			winnerArr.push(space)
		}
	})

    const rebelWin = winnerArr.every(space => space?.childNodes[0]?.classList.contains('rebels'))
    const empireWin = winnerArr.every(space => space?.childNodes[0]?.classList.contains('empire'))
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
