export const actionInit = () => {

    const periodicity = document.querySelectorAll('input[name="periodicity"]');
    const endDate = document.querySelector('[name="endDateContainer"]');
   
    periodicity.forEach(el => {
        el.addEventListener('click', () => {
            endDate.classList.toggle('hidden')
        })
    })

    formSubmit.addEventListener('click', () => {

        const name = document.getElementById('name')
        const price = document.getElementById('price')
        const startDate = document.getElementById('startDate')
        const endDate = document.getElementById('endDate')

        console.log(name.value, price.value);

    });

}