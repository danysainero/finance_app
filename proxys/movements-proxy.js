const APIurl = 'http://localhost:8081/api/';

const MovementsProxy = {

    getAllMovements:  (year) => {
      return axios.get(APIurl + 'all-movements/' + year)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    getAllMovementsInMonth: (date) => {
        return axios.get(APIurl + 'movements?month=' + (date.getMonth() + 1) + '&year=' + date.getFullYear())
        .then(function (response) {
          
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    createMovement: (movement) => {
        return axios.post(APIurl + 'movements', movement)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    deleteMovement: (movementId) => {
        return axios.delete(APIurl + 'movements/' + movementId)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    updateMovement: (movementId, movement) => {
        return axios.patch(APIurl + 'movements/' + movementId, movement)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

export default MovementsProxy;