import MovementsProxy from '../../proxys/movements-proxy.js';

export const homeInit = () => {
    sessionStorage.clear();
    const balance = document.getElementById('balance');
    const previousMonthButton = document.getElementById('previous-month');
    const nextMonthButton = document.getElementById('next-month');
    const selectedDate = document.getElementById('selected-date');

    let currentDate = new Date();
    let movements = [];
    changeCurrentDate(currentDate);

    async function changeCurrentDate(date) {
        movements = await getAllMovementsInMonth(date);
        setSelectedDate(date);
        setCurrentBalance(movements);
        setMovementsList(movements);
    }

    async function getAllMovementsInMonth(date) {
        const movements = await MovementsProxy.getAllMovementsInMonth(date);
        return movements.sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            if (dateA > dateB) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    function setSelectedDate(date) {
        const dateText = date.toLocaleString('es', {
            month: 'long',
            year: 'numeric'
        });
        let searchDeResults = /(.*)de (.*)/.exec(dateText);
        selectedDate.innerHTML = searchDeResults[1] + searchDeResults[2];
    }

    function setCurrentBalance(movementsList) {
        const currentBalance = computeCurrentBalance(movementsList);
        const balanceFormat = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            signDisplay: 'always'
        });
        balance.innerHTML = balanceFormat.format(currentBalance);

        if (currentBalance >= 0) {
            balance.classList.add('has-text-success');
            balance.classList.remove('has-text-danger');
        } else {
            balance.classList.remove('has-text-success');
            balance.classList.add('has-text-danger');
        }
    }

    function computeCurrentBalance(movementsList) {
        let total = 0;
        movementsList.forEach(element => {
            total = element.type === "expense" ? (total -= element.amount) : (total += element.amount);
        });
        return total;
    }

    function setMovementsList(movements) {
        const movementsList = document.getElementById("movements-list");
        movementsList.innerHTML = "";
        movements.forEach(movement => movementsList.append(createMovementListElement(movement)));
    }

    function createMovementListElement(movement) {
        let amount = (movement.type === 'entry') ? movement.amount : -movement.amount;
        amount = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            signDisplay: 'always'
        }).format(amount);
        const tr = document.createElement('tr');
        tr.id = movement._id;
        tr.className = 'movement';
        tr.innerHTML = `
        <td class="movement-type">${movement.recurrent === true ? 'Recurrent' : dateOf(movement)}</td>
        <td class="movement-tag">${movement.tag}</td>
        <td class="has-text-right movement-amount">
        <span class="movement-amount-text"> ${amount} </span>
        <span class="icon movement-button"><i class="fa fa-edit fa-2x edit-button"></i></span>
        ${movement.recurrent === true ?
                '' :
                `<span class="icon movement-button"><i class="fa fa-trash-o fa-2x delete-button delete-button"></i></span>`}
        
        </td>`;
        tr.style.background = (movement.type === 'expense') ? '#F6DEDE' : 'rgba(0, 255, 209, 0.22)';
        tr.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-button')) {
                sessionStorage.setItem('movement', JSON.stringify(movement));
                location.replace('http://localhost:5500/#action');
            } else if (event.target.classList.contains('delete-button')) {
                movements = movements.filter(element => element._id != tr.id);
                setMovementsList(movements);
                MovementsProxy.deleteMovement(tr.id);
            }
        });
        return tr;
    }

    function dateOf(movement) {
        let date = new Date(movement.startDate);
        const dateText = date.toLocaleString('es', {
            day: 'numeric',
            month: 'long'
        });
        return dateText;
    }

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        changeCurrentDate(currentDate);
    });

    previousMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        changeCurrentDate(currentDate);
    });

};