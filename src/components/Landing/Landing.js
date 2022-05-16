import Spinner from "../Spinner/Spinner";
import CartButton from "./CartButton";
import "./Landing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Landing = ({ handleClick, products, addProduct, deleteProduct, cart }) => {
  return (
    <div className="landing-style">
      <div className="welcome-style m-0 p-4 text-center">
        <h3>Welcome to Coffee Shop!</h3>
        <h4>Here is the Menu :)</h4>
      </div>
      {
        products.length === 0 ? <Spinner /> : (
          products.map((item, index) => (
          <div key={index} className="cards-style p-4">
            <div
              style={{ backgroundImage: `url(${item.imageUrl})` }}
              className="img-style"
              id={item._id}
            ></div>
            <ul>
              <li>{item.name.toUpperCase()}</li>
              <li>Price: ${item.price}</li>
              <li>Tax: {item.taxRate}</li>
            </ul>
            <CartButton addProduct={addProduct} deleteProduct={deleteProduct} item={item} cart={cart} />
          </div>
          )
      ))}
      
      {
        //Botón para ver el carrito en dispositivos chicos
        cart.length === 0 ? null : (
        <div onClick={handleClick} className="modalBtn-style text-danger rounded-pill mb-3">
          <span className="ps-3">Shopping Cart</span>
          <span className="px-2">({cart.length})</span>
          <FontAwesomeIcon icon={faCartShopping} className="iconCart-size mt-2" />
        </div>
        )
      }
    </div>
  );
};

export default Landing;
