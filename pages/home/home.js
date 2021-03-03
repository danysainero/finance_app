import MovementsProxy from '../../proxys/movements-proxy.js';

export const homeInit = () => {
    const balance = document.getElementById('balance');
    const previousMonthButton = document.getElementById('previous-month');
    const nextMonthButton = document.getElementById('next-month');
    const selectedDate = document.getElementById('selected-date');

    let currentDate = new Date();

    setCurrentBalance(currentDate);
    updateCurrentDate(currentDate);

    nextMonthButton.addEventListener('click', () => {
        selectNextMonth();
    });

    function selectNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCurrentDate(currentDate);
    }

    previousMonthButton.addEventListener('click', () => {
        selectPreviousMonth();
    });

    function selectPreviousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCurrentDate(currentDate);
    }

    function updateCurrentDate(date) {
        setSelectedDate(date);
        setCurrentBalance(date);
        updateMovementsList(date);
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
        const movements = await getAllMovementsInMonth(date);
        movements.forEach(movement => movementsList.append(createMovementListElement(movement)));
    }

    function createMovementListElement(movement) {
        let amount = (movement.type === 'entry') ? movement.amount : -movement.amount;
        amount = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', signDisplay: 'always' }).format(amount);
        const tr = document.createElement('tr');
        tr.id = movement._id;
        tr.className = 'movement';
        tr.innerHTML = `<td>${dateOf(movement)}</td><td class="has-text-right movement-amount">${amount}<span class="icon edit-movement-button"><i class="fa fa-edit"></i></span></td>`;
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

    async function setCurrentBalance(date) {
        let currentBalance = await getCurrentBalance(date);
        const balanceFormat = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', signDisplay: 'always' });
        balance.innerHTML = balanceFormat.format(currentBalance);

        if (currentBalance >= 0) {
            balance.classList.add('has-text-success');
            balance.classList.remove('has-text-danger');
        } else {
            balance.classList.remove('has-text-success');
            balance.classList.add('has-text-danger');
        }
    }

    async function getCurrentBalance(date) {
        const movementsJSON = await MovementsProxy.getAllMovementsInMonth(date);
        const movements = Object.values(movementsJSON);
        let total = 0;
        movements.forEach(element => {
            total = element.type === "expense" ? (total -= element.amount) : (total += element.amount);
        });
        return total;
    }

    async function getAllMovementsInMonth(date) {
        const movements = await MovementsProxy.getAllMovementsInMonth(date);
        return movements.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            if (dateA > dateB) {
                return 1;
            }
            else {
                return -1;
            }
        });
    }
};