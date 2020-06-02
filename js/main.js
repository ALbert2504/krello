"use strict";

let $columns = document.querySelectorAll('.column');
const $columnHeadings = document.querySelectorAll('.column__heading');
const $addCardBtns = document.querySelectorAll('.column__addCard'); 
const $addColumnBtn = document.querySelector('.columns__addColumn');
const $Columns = document.querySelector('.columns')
let $subColumns = document.querySelector('.subcolumns');

class Column {
    constructor() {

    }

    addColumn() {
        $addColumnBtn.style.display = 'none';

        const columnOptions = document.createElement('div');
        columnOptions.setAttribute('class', 'columnOptions');
        $subColumns.insertAdjacentElement('beforeend', columnOptions);

        const inp = document.createElement('input');
        inp.setAttribute('class', 'columnName');
        columnOptions.appendChild(inp);
        

        const btn = document.createElement('button');
        btn.setAttribute('class', 'acceptBtn')
        btn.innerHTML = 'Add list';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.setAttribute('class', 'cancelBtn');
        cancelBtn.innerHTML = 'Cancel';

        const btns = document.createElement('div');
        btns.setAttribute('class', 'acceptCancel');
        btns.appendChild(btn);
        btns.appendChild(cancelBtn);
        columnOptions.append(btns);

        cancelBtn.addEventListener('click', e => {
            $subColumns.removeChild(columnOptions);
            $addColumnBtn.style.display = 'block';
        });

        btn.addEventListener('click', e => {
            e.preventDefault();
            if(!inp.value) {
                alert('Please choose a name for the board');
            } else {
                const column = document.createElement('div');
                column.setAttribute('class', 'column');
                column.setAttribute('draggable', 'true');
                column.style.marginLeft = '5px';

                const colHeadingMenu = document.createElement('div');
                colHeadingMenu.setAttribute('class', 'column__headingMenu');

                const ColHeadingChange = document.createElement('div');
                ColHeadingChange.setAttribute('class', 'column__heading_change');

                const colHeading = document.createElement('h3');
                colHeading.setAttribute('class', 'column__heading');
                colHeading.innerHTML = inp.value;

                const colMenu = document.createElement('span');
                colMenu.setAttribute('class', 'column__menu awesomesolid');
                colMenu.innerHTML = 'ellipsis-h';

                const colCards = document.createElement('div');
                colCards.setAttribute('class', 'column__cards');

                const addCardBtn = document.createElement('span');
                addCardBtn.setAttribute('class', 'column__addCard');
                addCardBtn.innerHTML = '+ Add card';

                $subColumns.appendChild(column);
                column.appendChild(colHeadingMenu);
                
                colHeadingMenu.appendChild(ColHeadingChange);
                colHeadingMenu.appendChild(colHeading);
                colHeadingMenu.appendChild(colMenu);

                column.appendChild(colCards);
                column.appendChild(addCardBtn);

                $subColumns.removeChild(columnOptions);
                $addColumnBtn.style.display = 'block';
                
                $columns = document.querySelectorAll('.column');
                console.log($columns);
                
            }
        });
    }
}

$addColumnBtn.addEventListener('click', e => {
    let col = new Column;
    col.addColumn();
});

let selectedNode;

for(let i = 0; i < $columns.length; i++) {
    $columns[i].addEventListener('dragstart', e => {
        console.log('drag started');
        selectedNode = $columns[i];
        // setTimeout(() => {
        //     $subColumns.removeChild($columns[i]);
        // }, 0);

        
    });
}

$subColumns.addEventListener('dragover', e => {
    e.preventDefault();
    console.log('is dragging');
    elemPos(e.clientX);


});

function correctNodesPosition() {
    for(let i = 0; i < $columns.length; i++) {
        let elem = $columns[i];
        let pos = elem.getBoundingClientRect();
        let xLeft = pos.left;
        let xRight = pos.right;
        $columns[i].xPos = xLeft + ((xRight - xLeft) / 2);
        // console.log(`dzaxic ${xLeft}px`);
        // console.log(`kentrony ${xCenter}px`);
        // console.log(`ajic ${xRight}px`);
        // console.log('--------------------');
    }
}

var selectedNodePos;

function elemPos(currentXPos) {
    correctNodesPosition();

    for(let i = 0; i < $columns.length; i++) {
        if($columns[i].xPos < currentXPos) {
            var nodeRight = $columns[i];
            selectedNodePos = i + 1;
        }
    
        if(typeof nodeRight == 'undefined') {
            selectedNodePos = 0;
        }

        console.log(selectedNodePos);
    }

}

$subColumns.addEventListener('drop', e => {
    console.log('has dropped');

    $subColumns.insertBefore(selectedNode, $subColumns.children[selectedNodePos])
});