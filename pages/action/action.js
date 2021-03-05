import MovementsProxy from '../../proxys/movements-proxy.js';


export const actionInit = () => {

    const periodicity = document.querySelectorAll('input[name="periodicity"]');
    const endDate = document.querySelector('[name="endDateContainer"]');

    periodicity.forEach(el => {
        el.addEventListener('click', () => {
            endDate.classList.toggle('hidden')
        })
    })

    formSubmit.addEventListener('click', async () => {
        console.log('submit');
        let tag = document.getElementById('name').value
        let amount = document.getElementById('price').value
        let type = document.querySelector('input[name="movementType"]:checked').value
        let recurrent = document.querySelector('input[name="periodicity"]:checked').value
        let startDate = document.getElementById('startDate').value
        let endDate = document.getElementById('endDate').value


        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate() - 1);
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate() + 1);

        await MovementsProxy.createMovement({
            tag,
            amount,
            type,
            recurrent,
            startDate,
            endDate
        });

        location.replace("http://localhost:5500/#home");
    });

    cancel.addEventListener('click', async () => {
        location.replace("http://localhost:5500/#home");
    });


}