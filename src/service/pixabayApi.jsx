import axios from 'axios';
//https://pixabay.com/api/?key=16866490-95e5a3597ee6f5bb528b18ee9&q=yellow+flowers&image_type=photo
// const keyId = '16866490-95e5a3597ee6f5bb528b18ee9';
// const q = 'cat';
// const page = 1;
// const per_page = 12;

const fetchImageWithQuery = () => {
    return axios
    .get(
        `https://pixabay.com/api/?key=16866490-95e5a3597ee6f5bb528b18ee9&q=cat&page=1&per_page=12&image_type=photo`)
  .then(response => response.hits);
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