import MovementsProxy from '../../proxys/movements-proxy.js';

export const homeInit = () => {
    const balance = document.getElementById('balance');
    const previousMonthButton = document.getElementById('previous-month');
    const nextMonthButton = document.getElementById('next-month');
    const selectedDate = document.getElementById('selected-date');

    let currentDate = new Date();
    let movements = [];
    changeCurrentDate(currentDate);

    nextMonthButton.addEventListener('click', () => {
        selectNextMonth();
    });

    function selectNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        changeCurrentDate(currentDate);
    }

    previousMonthButton.addEventListener('click', () => {
        selectPreviousMonth();
    });

    function selectPreviousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        changeCurrentDate(currentDate);
    }

    async function changeCurrentDate(date) {
        movements = await getAllMovementsInMonth(date);
        setSelectedDate(date);
        setCurrentBalance(movements);
        updateMovementsList(movements);
    }

    function setSelectedDate(date) {
        const dateText = date.toLocaleString('es', {
            month: 'long',
            year: 'numeric'
        });
        let searchDeResults = /(.*)de (.*)/.exec(dateText);
        selectedDate.innerHTML = searchDeResults[1] + searchDeResults[2];
    }

    async function updateMovementsList(date) {
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
        <td>${movement.recurrent === true ? 'Recurrent' : dateOf(movement)}</td>
        <td>${movement.tag}</td>
        <td class="has-text-right movement-amount">
        ${amount}
        <span class="icon edit-movement-button"><i class="fa fa-edit"></i></span>
        </td>`;
        tr.style.background = (movement.type === 'expense') ? '#F6DEDE' : 'rgba(0, 255, 209, 0.22)';
        tr.addEventListener('mouseover', () => { })
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

    function setCurrentBalance(movementsList) {
        let currentBalance = computeCurrentBalance(movementsList);
        console.log(currentBalance);
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
        console.log(movementsList);
        movementsList.forEach(element => {
            console.log(`Adding ${element.amount}... ${total}`);
            total = element.type === "expense" ? (total -= element.amount) : (total += element.amount);
        });
        return total;
    }

    async function getAllMovementsInMonth(date) {
        const movements = await MovementsProxy.getAllMovementsInMonth(date);
        console.log(movements);
        return movements.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            if (dateA > dateB) {
                return 1;
            } else {
                return -1;
            }
        });
    }
};