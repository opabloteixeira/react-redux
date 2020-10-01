import { createStore } from 'redux';

const store = createStore(() => {
   return {
      id: 1,
      name: 'pablito',
      email: 'pablopst@gmail.com'
   }
});



export default store;