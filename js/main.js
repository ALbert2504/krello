"use strict";

let $columns = document.querySelectorAll('.column');
const $columnHeadings = document.querySelectorAll('.column__heading');
// const $addCardBtns = document.querySelectorAll('.column__addCard'); 
const $addColumnBtn = document.querySelector('[data-action-addColumn]');
const $Columns = document.querySelector('.columns')
let $subColumns = document.querySelector('.subcolumns');

let columnsCount = 4;
let cardCount = 1;



document.querySelectorAll('.card').forEach(cardPorcess);

function cardPorcess(cardElem) {
    /***** drag and drop events of cards *****/
    cardElem.addEventListener('dragstart', dragstart_Card);
    cardElem.addEventListener('dragend', dragend_Card);
    cardElem.addEventListener('dragenter', dragenter_Card);
    cardElem.addEventListener('dragover', dragover_Card);
    cardElem.addEventListener('dragleave', dragleave_Card);
    cardElem.addEventListener('drop', drop_Card);

    cardElem.querySelector('.card__changeBtn').addEventListener('click', e => {
        alert('In process :D');
    });
}




/******* cards drag and drop functions *******/
let draggedCard = null;

function dragstart_Card(e) {
    draggedCard = this;
    this.classList.add('dragging');
}
function dragend_Card(e) {
    draggedCard = null;
    this.classList.remove('dragging');

    document.querySelectorAll('.card').forEach(c => c.classList.remove('under'));
}
function dragenter_Card(e) {
    if(this === draggedCard) {
        return;
    }
    this.classList.add('under');
}
function dragover_Card(e) {
    e.preventDefault();
    if(this === draggedCard) {
        return;
    }
}
function dragleave_Card(e) {
    if(this === draggedCard) {
        return;
    }
    this.classList.remove('under');
}
function drop_Card(e) {
    e.stopPropagation();
    if(this === draggedCard) {
        return;
    }

    if(this.parentElement === draggedCard.parentElement) {
        const card = Array.from(this.parentElement.querySelectorAll('.card'));
        let indexA = card.indexOf(this);
        let indexB = card.indexOf(draggedCard);
        if(indexA < indexB) {
            this.parentElement.insertBefore(draggedCard, this);
        } else {
            this.parentElement.insertBefore(draggedCard, this.nextElementSibling);
        }   
    } else {
        this.parentElement.insertBefore(draggedCard, this);
    }
}
/*************************************/




let draggedColumn = null;
/************* adding cards *************/
function columnProcces(columnElem) {

    columnElem.querySelector('.column__heading').addEventListener('click', () => {
        const colHeadingChange = columnElem.querySelector('.column__heading_change');
        const colHeading = columnElem.querySelector('.column__heading');
        var colHeadingPrevValue = colHeading.innerText;
        
        colHeading.style.display = 'none';
        colHeadingChange.style.display = 'block';
        colHeadingChange.value = colHeadingPrevValue;
        colHeadingChange.focus();
        colHeadingChange.select();

        colHeadingChange.addEventListener('blur', () => {
            if(!colHeadingChange.value) {
                colHeadingChange.style.display = 'none';
                colHeading.style.display = 'block';
                colHeading.innerHTML = colHeadingPrevValue;
            } else {
                colHeadingChange.style.display = 'none';
                colHeading.style.display = 'block';
                colHeading.innerText = colHeadingChange.value;
            }
        })
    });
    
    columnElem.querySelector('[data-action-addNote]').addEventListener('click', e => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-card-id', cardCount);
        card.setAttribute('draggable', 'true');
        cardCount++;
        
        const cardName = document.createElement('textarea');
        cardName.setAttribute('class', 'card__name');

        const cardBox = columnElem.querySelector('.column__cards');
        cardBox.appendChild(cardName);
        cardName.focus();

        const cardAccept = document.createElement('button');
        cardAccept.setAttribute('class', 'cardAccept__btn');
        cardAccept.innerHTML = 'Accept';
        cardBox.appendChild(cardAccept);

        const cardCancel = document.createElement('button');
        cardCancel.setAttribute('class', 'cardCancel__btn');
        cardCancel.innerHTML = 'Cancel';
        cardBox.appendChild(cardCancel);

        columnElem.querySelector('[data-action-addnote]').style.display = 'none';


        cardCancel.addEventListener('click', () => {
            cardBox.removeChild(cardAccept);
            cardBox.removeChild(cardCancel);
            cardBox.removeChild(cardName);
            columnElem.querySelector('[data-action-addnote]').style.display = 'block';
        });


        cardAccept.addEventListener('click', () => {
            if(!cardName.value) {
                cardBox.removeChild(cardAccept);
                cardBox.removeChild(cardCancel);
                cardBox.removeChild(cardName);
                columnElem.querySelector('[data-action-addnote]').style.display = 'none';
                columnElem.querySelector('[data-action-addnote]').style.display = 'block';
            } else {
                //card appending
                const cardContent = document.createElement('p');
                cardContent.innerHTML = cardName.value;
                cardContent.setAttribute('class', 'card__content');
                const cardChangeBtn = document.createElement('span');
                cardChangeBtn.setAttribute('class', 'card__changeBtn awesomesolid');
                cardChangeBtn.innerHTML = 'pencil-alt';
                card.appendChild(cardContent);
                card.appendChild(cardChangeBtn);
                cardBox.appendChild(card);
                cardBox.removeChild(cardAccept);
                cardBox.removeChild(cardCancel);
                cardBox.removeChild(cardName);
                columnElem.querySelector('[data-action-addnote]').style.display = 'block';
                cardPorcess(card);
            }

        });  
    });


    // column drag and drop events
    columnElem.addEventListener('dragstart', function(e) {
        draggedColumn = this;
        console.log(this);
    });
    columnElem.addEventListener('dragend', function(e) {
        draggedColumn = null;
    });
    columnElem.addEventListener('dragenter', function(e) {
        if(this === draggedColumn) {
            return;
        }
        console.log(this);
    });
    columnElem.addEventListener('dragover', function (e) {
        e.preventDefault();
        if(this === draggedColumn) {
            return;
        }
    });
    columnElem.addEventListener('dragleave', function(e) {
        if(this === draggedColumn) {
            return;
        }
    });
    columnElem.addEventListener('drop', function (e) {
        e.stopPropagation();
        if(draggedCard) {
            columnElem.querySelector('[data-cards]').appendChild(draggedCard);
        } else if(draggedColumn) {
            const column = Array.from(this.parentElement.querySelectorAll('.column'));
            let indexA = column.indexOf(this);
            let indexB = column.indexOf(draggedColumn);
            if(indexA < indexB) {
                this.parentElement.insertBefore(draggedColumn, this);
            } else {
                this.parentElement.insertBefore(draggedColumn, this.nextElementSibling);
            }   
        }
    });
}





/*************** adding columns *************/
$columns.forEach(columnProcces);


$addColumnBtn.addEventListener('click', e => {
    $addColumnBtn.style.display = 'none';

    const columnOptions = document.createElement('div');
    columnOptions.setAttribute('class', 'columnOptions');
    $subColumns.insertAdjacentElement('beforeend', columnOptions);

    const inp = document.createElement('input');
    inp.setAttribute('class', 'columnName');
    columnOptions.appendChild(inp);
    inp.focus();
    

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
            alert('Please choose a name for the board.');
        } else {
            const column = document.createElement('div');
            column.setAttribute('class', 'column');
            column.setAttribute('draggable', 'true');
            column.setAttribute('data-column-id', columnsCount);
            columnsCount++;
            column.style.marginLeft = '5px';


            const colHeadingMenu = document.createElement('div');
            colHeadingMenu.setAttribute('class', 'column__headingMenu');

            const ColHeadingChange = document.createElement('input');
            ColHeadingChange.setAttribute('class', 'column__heading_change');

            const colHeading = document.createElement('h3');
            colHeading.setAttribute('class', 'column__heading');
            colHeading.innerHTML = inp.value;

            const colMenu = document.createElement('span');
            colMenu.setAttribute('class', 'column__menu awesomesolid');
            colMenu.innerHTML = 'ellipsis-h';

            const colCards = document.createElement('div');
            colCards.setAttribute('data-cards', '');
            colCards.setAttribute('class', 'column__cards');

            const addCardBtn = document.createElement('span');
            addCardBtn.setAttribute('class', 'column__addCard');
            addCardBtn.setAttribute('data-action-addNote', '');
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
            
            // $columns = document.querySelectorAll('.column');
            // console.log($columns);
            columnProcces(column);

        }
    });
});

