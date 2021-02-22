import MovementsProxy from '../proxys/movements-proxy.js'

export const homeInit = () => {
    const balance = document.getElementById('balance');
    const previousMonthButton = document.getElementById('previous-month');
    const nextMonthButton = document.getElementById('next-month');
    const selectedDate = document.getElementById('selected-date');

    let currentDate = new Date();

    setCurrentBalance();
    updateSelectedDate(currentDate);

    nextMonthButton.addEventListener('click', () => {
        selectNextMonth();
    });

    function selectNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateSelectedDate(currentDate);
    }

    previousMonthButton.addEventListener('click', () => {
        selectPreviousMonth();
    });

    function selectPreviousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateSelectedDate(currentDate);
    }

    function updateSelectedDate(date) {
        selectedDate.innerHTML = date.toLocaleString('es', {
            month: 'long',
            year: 'numeric'
        });
    }

    async function setCurrentBalance() {
        let currentBalance = await getCurrentBalance();
        balance.innerHTML = currentBalance.toFixed(2);
        
        if (currentBalance >= 0) {
            balance.classList.add('has-text-success');
            balance.classList.remove('has-text-danger');
        } else {
            balance.classList.remove('has-text-success');
            balance.classList.add('has-text-danger');
        }
    }

    async function getCurrentBalance() {
        const movements = await MovementsProxy.getAllMovements();
        let total = 0;
        movements.forEach(element => {
            total = element.type === "expense"? (total -= element.amount) : (total += element.amount)
        });
        return total;
    }

};