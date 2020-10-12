import { Reducer } from 'redux';
import { ICartState,  } from './types';
import produce from 'immer';

const INITIAL_STATE: ICartState = {
   items: []
}

const cart: Reducer<ICartState> = ( state = INITIAL_STATE, action) => {
   console.log(state, action)

   return produce(state, draft => {
      switch(action.type){
         case 'ADD_PRODUCT_TO_CART': {
            const { product } = action.payload;

               const productInCartIndex = draft.items.findIndex(item =>
                  item.product.id === product.id,
               )

               if (productInCartIndex >= 0){
                  draft.items[productInCartIndex].quantity++;
               }else{
                  // terceira forma com o produce na volta
                  draft.items.push({
                     product,
                     quantity: 1
                  })
               }

               break;

            // segunda forma com immer
            // return produce(state, draft => {
            //    draft.items.push({
            //       product,
            //       quantity: 1
            //    })
            // })

            //primeira forma
            // return {
            //    ...state,
            //    items: [
            //       ...state.items,
            //       {
            //          product,
            //          quantity: 1
            //       }
            //    ]
            // }
         }
         default: {
            return draft
         }
      }
   })
}


export default cart;