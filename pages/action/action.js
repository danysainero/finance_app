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

        const tag = document.getElementById('name').value
        const amount = document.getElementById('price').value
        const type = document.querySelector('input[name="movementType"]:checked').value
        const recurrent = document.querySelector('input[name="periodicity"]:checked').value
        const startDate = document.getElementById('startDate').value
        const endDate = document.getElementById('endDate').value
       return await MovementsProxy.createMovement({tag, amount, type, recurrent, startDate, endDate });

    });

}