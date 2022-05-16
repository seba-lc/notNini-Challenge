import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import './Landing.css'

const CartButton = ({ addProduct, deleteProduct, item, cart }) => {
  const [quantity, setQuantity] = useState(0)

  const quantityFunction = () => {
    const product = cart.find(prod => prod._id === item._id )
    if(product !== undefined){
      setQuantity(product.quantity)
    }else{
      setQuantity(0)
    }
  }

  useEffect(() => {
    quantityFunction();
  }, [cart])

  return (
    <div className="d-flex button-style rounded-pill">
      <FontAwesomeIcon icon={faMinus} className="px-4 iconStyle" onClick={() => deleteProduct(item)} />
      <div>Cantidad: {quantity}</div>
      <FontAwesomeIcon icon={faPlus} className="px-4 iconStyle" onClick={() => addProduct(item)} />
    </div>
  );
};

export default CartButton;