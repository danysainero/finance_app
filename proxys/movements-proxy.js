 const APIurl = 'http://localhost:8081/api/';

const MovementsProxy = {

    getAllMovements:  () => {
      return axios.get(APIurl + 'movements')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

export default MovementsProxy;