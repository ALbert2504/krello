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

    //card editting porcess
    let clickedPencil = null;
    const $cardEditBtn = cardElem.querySelector('.card__changeBtn');
    $cardEditBtn.addEventListener('click', function() {
        clickedPencil = this;

        const cardPos = $cardEditBtn.parentElement.getBoundingClientRect();

        let cardLeft = cardPos.left;
        let cardTop = cardPos.top;
        let cardWidth = cardPos.width;
        let cardHeight = cardPos.height;

        const $cardNameChangeTxtArea = document.createElement('textarea');
        $cardNameChangeTxtArea.setAttribute('class', 'card__nameChange_txtArea');
        $cardNameChangeTxtArea.style = `
            top: ${cardTop}px;
            left: ${cardLeft}px;
            width: ${cardWidth}px;
            height: ${cardHeight + 45}px
        `;

        this.remove();


        let cardPrevValue = cardElem.querySelector('.card__content').textContent;


        const $bodyHalfOpacityBlackBg = document.createElement('div');
        $bodyHalfOpacityBlackBg.setAttribute('class', 'body__halfOpacity_blackBg');

        document.body.insertAdjacentElement('afterbegin', $bodyHalfOpacityBlackBg);
        document.body.insertAdjacentElement('afterbegin', $cardNameChangeTxtArea);
        $cardNameChangeTxtArea.value = cardPrevValue;
        $cardNameChangeTxtArea.focus();
        $cardNameChangeTxtArea.select();

        $cardNameChangeTxtArea.addEventListener('blur', () => {
            if (!$cardNameChangeTxtArea.value) {
                cardElem.querySelector('.card__content')
                    .innerText = cardPrevValue;
                $cardNameChangeTxtArea.remove();
                $bodyHalfOpacityBlackBg.remove();
                cardElem.insertAdjacentElement('afterbegin', this); //this === pencil
                clickedPencil = null;
            } else {
                cardElem.querySelector('.card__content')
                    .innerText = $cardNameChangeTxtArea.value;
                $cardNameChangeTxtArea.remove();
                $bodyHalfOpacityBlackBg.remove();
                cardElem.insertAdjacentElement('afterbegin', this); //this === pencil
                clickedPencil = null;
            }
        });
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
    if (this === draggedCard) {
        return;
    }

    if (draggedCard) {
        this.classList.add('under');
        if (e.target.tagName === 'P') {
            this.classList.add('under');
        }
    }
}

function dragover_Card(e) {
    e.preventDefault();
    if (this === draggedCard) {
        return;
    }
    if (draggedCard) {
        if (e.target.tagName === 'P') {
            this.classList.add('under');
        }
    }

    // console.log(e.target.tagName);
}

function dragleave_Card(e) {
    if (this === draggedCard) {
        return;
    }
    this.classList.remove('under');
    if (draggedCard) {
        if (e.target.tagName === 'P') {
            this.classList.add('under');
        }
    }

}

function drop_Card(e) {
    if (draggedCard) {
        e.stopPropagation();
    }
    if (this === draggedCard) {
        return;
    }

    if (!draggedCard) {
        this.classList.remove('under');
        return;
    }

    if (this.parentElement === draggedCard.parentElement) {
        const card = Array.from(this.parentElement.querySelectorAll('.card'));
        let indexA = card.indexOf(this);
        let indexB = card.indexOf(draggedCard);
        if (indexA < indexB) {
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

    //header changing
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
            if (!colHeadingChange.value) {
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


    //adding notes
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
            if (!cardName.value) {
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
    });
    columnElem.addEventListener('dragend', function(e) {
        draggedColumn = null;
    });
    columnElem.addEventListener('dragenter', function(e) {
        if (this === draggedColumn) {
            return;
        }
    });
    columnElem.addEventListener('dragover', function(e) {
        e.preventDefault();
        if (this === draggedColumn) {
            return;
        }
    });
    columnElem.addEventListener('dragleave', function(e) {
        if (this === draggedColumn) {
            return;
        }
    });
    columnElem.addEventListener('drop', function(e) {
        e.stopPropagation();
        if (draggedCard) {
            columnElem.querySelector('[data-cards]').appendChild(draggedCard);
        } else if (draggedColumn) {
            const column = Array.from(this.parentElement.querySelectorAll('.column'));
            let indexA = column.indexOf(this);
            let indexB = column.indexOf(draggedColumn);
            if (indexA < indexB) {
                this.parentElement.insertBefore(draggedColumn, this);
            } else {
                this.parentElement.insertBefore(draggedColumn, this.nextElementSibling);
            }
        }
    });


    // column configs window filling and styling
    const columnConfigs = document.createElement('div');
    columnConfigs.setAttribute('class', 'column__configs');
    columnConfigs.innerHTML = `
        <h5 class="configs__heading light">Actions with the list</h5>
        <span class="configs__closeBtn awesomesolid">window-close</span>
        <div class="configs__separator"></div>
        <span class="configs__action light">Add card...</span>
        <span class="configs__action light">Copy list...</span>
        <span class="configs__action light">Move list...</span>
        <span class="configs__action light">Subscribe</span>
        <div class="configs__separator"></div>
        <span class="configs__action light">Sort by...</span>
        <div class="configs__separator"></div>
        <span class="configs__action light">Move all the cards...</span>
        <span class="configs__action light">Archive all the cards...</span>
        <span class="configs__action light">Archive the list...</span>
    `;


    const columnConfigBtn = columnElem.querySelector('.column__menu');
    columnConfigBtn.addEventListener('click', function() {

        const ConfigBtnPos = this.getBoundingClientRect();
        let configBtnLeft = ConfigBtnPos.left;
        let configBtnTop = ConfigBtnPos.top;

        let currentColumn = this.parentElement.parentElement;

        document.body.insertAdjacentElement('afterbegin', columnConfigs);
        const columnConfigsWidth = columnConfigs.getBoundingClientRect();
        const ColumnConfigCloseBtn = columnConfigs.querySelector('.configs__closeBtn');
        ColumnConfigCloseBtn.addEventListener('click', function() {
            this.parentElement.remove();
        });


        columnConfigs.style = `
            left: ${configBtnLeft}px;
            top: ${configBtnTop + 23}px;
        `;

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
        if (!inp.value) {
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

            columnProcces(column);

        }
    });
});