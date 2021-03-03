const APIurl = 'http://localhost:8081/api/';
const APIReqConfig = {};
// const APIurl = 'https://34e1ac05-b657-4aa6-b6bf-70a37ee4495e.mock.pstmn.io/api/';
// const APIReqConfig = {
//      headers: {'x-api-key': 'PMAK-603b51466174fe0034e57bfd-43c6fa5ee5680ccf2f34c49eb1616566d4'}
//  };

const MovementsProxy = {

    getAllMovements:  () => {
<<<<<<< HEAD
      return axios.get(APIurl + 'movements?month=2&year=2021')
=======
      return axios.get(APIurl + 'movements', APIReqConfig)
>>>>>>> c19d1dc4eb43b6232669d77cc6528475e7578ab0
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    getAllMovementsInMonth: (date) => {
        return axios.get(APIurl + 'movements?month=' + (date.getMonth() + 1) + '&year=' + date.getFullYear(), APIReqConfig)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

export default MovementsProxy;