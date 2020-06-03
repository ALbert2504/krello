"use strict";

let $columns = document.querySelectorAll('.column');
const $columnHeadings = document.querySelectorAll('.column__heading');
// const $addCardBtns = document.querySelectorAll('.column__addCard'); 
const $addColumnBtn = document.querySelector('.columns__addColumn');
const $Columns = document.querySelector('.columns')
let $subColumns = document.querySelector('.subcolumns');

let columnsCount = $columns.length;
let cardCount = 1;


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

            columnsCount++;
            $columns[$columns.length - 1].setAttribute('id', `col${columnsCount}`);
            
        }
    });
});


$columns.forEach(columnElem => {
    const addNote = columnElem.querySelector('[data-action-addNote]');
    
    addNote.addEventListener('click', e => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-card-id', cardCount);
        cardCount++;
        
        const cardName = document.createElement('textarea');
        cardName.setAttribute('class', 'card__name');

        const cardBox = columnElem.querySelector('.column__cards');
        cardBox.appendChild(cardName);

        const cardAccept = document.createElement('button');
        cardAccept.setAttribute('class', 'cardAccept__btn');
        cardAccept.innerHTML = 'Accept';
        cardBox.appendChild(cardAccept);

        const cardCancel = document.createElement('button');
        cardCancel.setAttribute('class', 'cardCancel__btn');
        cardCancel.innerHTML = 'Cancel';
        cardBox.appendChild(cardCancel);

        cardCancel.addEventListener('click', () => {
            cardBox.removeChild(cardAccept);
            cardBox.removeChild(cardCancel);
            cardBox.removeChild(cardName);
        });

        cardAccept.addEventListener('click', () => {
            if(!cardName.value) {
                cardBox.removeChild(cardAccept);
                cardBox.removeChild(cardCancel);
                cardBox.removeChild(cardName);
            } else {
                const cardContent = document.createElement('p');
                cardContent.innerHTML = cardName.value;
                cardContent.setAttribute('class', 'card__content');
                card.appendChild(cardContent);
                cardBox.appendChild(card);
                cardBox.removeChild(cardAccept);
                cardBox.removeChild(cardCancel);
                cardBox.removeChild(cardName);
            }

        });  
    });
});