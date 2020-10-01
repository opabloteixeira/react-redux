import React from 'react';
import { useSelector } from 'react-redux';


const Catalog: React.FC = () => {
   const state = useSelector( state => state);

   console.log(state)
   return (
      <div>
         <h1>Catalog</h1>
      </div>
   );
}

export default Catalog;
