import axios from 'axios';
 const keyId = '16866490-95e5a3597ee6f5bb528b18ee9';
const per_page = 12;

const fetchImageWithQuery = (searchQuery, page) => {
    return axios
    .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${keyId}&image_type=photo&orientation=horizontal&per_page=${per_page}`)
  .then(response => response.data.hits) //обязательно response.data
  }
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });
;

export default {fetchImageWithQuery};