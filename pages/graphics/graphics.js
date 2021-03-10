import MovementsProxy from '../../proxys/movements-proxy.js';


export const graphicsInit = async () => {

    let type = 'entry';
    let year = new Date().toLocaleString('es', {
        year: 'numeric'
    })
    const buttons = document.querySelectorAll('button');
    const arrows = document.querySelectorAll('.arrow');
    const selectedDate = document.getElementById('selected-date');

    setSelectedDate(new Date());
    setChart(type, year);

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            setChart(button.id, year)
        });
    })

    arrows.forEach(arrow => {
        arrow.addEventListener('click', function () {
            year = arrow.id === 'prev' ? ((year * 1) - 1) : ((year * 1) + 1);
            selectedDate.innerHTML = year;
            setChart(type, year)
        });
    })

    async function setChart(type, year) {
        const percentageWrapper = document.querySelector('.percentageWrapper');
        let monthsAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let monthsName = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
        let allMovements = await MovementsProxy.getAllMovements(year);

        const movements = allMovements.filter(movement => movement.type === type);

        movements.forEach(movement => {
            monthsAmount[(movement.startDate.slice(6, 7) - 1)] += movement.amount;
        });

        const maxAmountInYear = Math.max.apply(null, monthsAmount);

        percentageWrapper.innerHTML = '';
        for (let i = 0; i < monthsName.length; i++) {
            const percentage = calculatePercentage(monthsAmount[i], maxAmountInYear);
            let classPercentage = percentage > 0 ? percentage : 0;
            const ddElement = `<dd class="percentage percentage-${classPercentage} ${type}"><span class="month">${monthsName[i]}</span><span class="amount">${monthsAmount[i]} €</span></dd>`

            percentageWrapper.insertAdjacentHTML('beforeend', ddElement);
        }
    }

    function calculatePercentage(amount, max) {
        return Math.trunc((amount / max) * 100)
    }

    function setSelectedDate(date) {
        selectedDate.innerHTML = date.toLocaleString('es', {
            year: 'numeric'
        })
        year = date.toLocaleString('es', {
            year: 'numeric'
        })
    }

}