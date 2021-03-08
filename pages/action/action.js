import MovementsProxy from '../../proxys/movements-proxy.js';


export const actionInit = () => {

    const storagedMovement = JSON.parse(sessionStorage.getItem('movement'));
    const periodicity = document.querySelectorAll('input[name="periodicity"]');

    const endDateContainer = document.querySelector('[name="endDateContainer"]');
    const deleteButton = document.querySelector('#delete');
    const cancelButton = document.querySelector('#cancelButton');
    const submitButton = document.querySelector('#submitButton');
    const form = document.querySelector('#actionForm');


    if (storagedMovement) {
        showDeleteButton(periodicity[1].id);

        let tag = document.getElementById('name')
        let amount = document.getElementById('price')
        let startDate = document.getElementById('startDate')
        let endDate = document.getElementById('endDate')

        tag.value = storagedMovement.tag;
        amount.value = storagedMovement.amount;

        if (storagedMovement.type === 'expense') {
            document.querySelector('input[value="expense"]').checked = true;
            document.querySelector('input[value="entry"]').checked = false;
        } else {
            document.querySelector('input[value="expense"]').checked = false;
            document.querySelector('input[value="entry"]').checked = true;
        }
        if (storagedMovement.recurrent) {
            document.querySelector('input[name="periodicity"][value="false"]').checked = false;
            document.querySelector('input[name="periodicity"][value="true"]').checked = true;
            endDateContainer.classList.toggle('hidden')
        }

        startDate.value = new Date(storagedMovement.startDate).toISOString().slice(0, 10);
        endDate.value = new Date(storagedMovement.endDate).toISOString().slice(0, 10);
    }

    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        
        
        if (form.checkValidity() == true) {

            let movementObj = {
                type: document.querySelector('input[name="movementType"]:checked').value,
                amount: document.getElementById('price').value,
                tag: document.getElementById('name').value,
                recurrent: document.querySelector('input[name="periodicity"]:checked').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value
            }

            if (!storagedMovement) {
                movementObj.startDate = new Date(movementObj.startDate);
                movementObj.endDate = movementObj.endDate ? new Date(movementObj.endDate) : null

                if (movementObj.type === 'recurrent') {
                    movementObj.startDate.setDate(startDate.getDate() - 1);
                    movementObj.endDate.setDate(endDate.getDate() + 1);
                }
                await MovementsProxy.createMovement(movementObj);
            } else {
                await MovementsProxy.updateMovement(storagedMovement._id, movementObj);
                sessionStorage.clear();
            }
           
            location.replace("http://localhost:5500/#home");
        }
    });

    periodicity.forEach(el => {
        el.addEventListener('click', (el) => {
            endDateContainer.classList.toggle('hidden');
        })
    });


    cancelButton.addEventListener('click', async (event) => {
        event.preventDefault();
        sessionStorage.clear();
        location.replace("http://localhost:5500/#home");
    });

    deleteButton.addEventListener('click', async (event) => {
        if (storagedMovement) {
            event.preventDefault();
            await MovementsProxy.deleteMovement(storagedMovement._id);
            sessionStorage.clear();
            location.replace("http://localhost:5500/#home");
        }
    });





    function showDeleteButton(periodicityId) {
        if (periodicityId === 'recurrent') {
            deleteButton.classList.remove('hidden');
        } else {
            deleteButton.classList.add('hidden');
        }
    }


}