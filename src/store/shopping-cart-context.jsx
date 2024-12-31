import { createContext } from "react";
import { DUMMY_PRODUCTS } from "./../dummy-products.js";
import { useState, useReducer } from "react";

export const CartContext = createContext({
  items: [],
});

export default function CardProvider({ children }) {
  const [shoppingCartState, shoppingCardDispatch] = useReducer(
    (state, action) => {
      if(action.type=="ADD_ITEM"){
            const updatedItems = [...state.items];
            const existingCartItemIndex = updatedItems.findIndex(
              (cartItem) => cartItem.id === action.param
            );
            const existingCartItem = updatedItems[existingCartItemIndex];
      
            if (existingCartItem) {
              const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
              };
              updatedItems[existingCartItemIndex] = updatedItem;
            } else {
              const product = DUMMY_PRODUCTS.find((product) => product.id === action.param);
              updatedItems.push({
                id: action.param,
                name: product.title,
                price: product.price,
                quantity: 1,
              });
            }
      
            return {
              items: updatedItems,
            };
    
      }else if(action.type=="UPDATE"){
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === action.productId
        );
  
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };
  
        updatedItem.quantity += action.amount;
  
        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }
  
        return {
          items: updatedItems,
        };
      }
    },
    {
      items: [],
    }
  );
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
   shoppingCardDispatch({
    type:'ADD_ITEM',
    param:id
   })
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCardDispatch({
        type:UPDATE,
        amount:amount,
        productId:productId
    })
     
    
  }
  return (
    <CartContext.Provider
      value={{
        items: [...shoppingCartState.items],
        onAddItemToCart: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
