import React from 'react';
import { useSelector } from 'react-redux';


const Catalog: React.FC = () => {
   const catalog = useSelector( state => state);

   console.log(catalog)
   return (
      <div>
         <h1>Catalog</h1>
      </div>
   );
}

export default Catalog;
