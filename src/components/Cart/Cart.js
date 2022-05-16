import { ListGroup, Button } from "react-bootstrap";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Cart = ({ cart, setShowModal, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);

  //Confirmación de la compra
  const handleClick = () => {
    Swal.fire({
      title: "¿Are you sure to continue with the purchase?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a5dc86",
      confirmButtonText: "Yes, sure",
      cancelButtonText: "Review order"
    }).then(async (result) => {
      if(result.isConfirmed){
        Swal.fire(
          "Order Placed",
          "Your order is being prepared. Pay at the cashier :)",
          "success"
        )
        setCart([]);
        setShowModal(false)
      }
    })
  }

  useEffect(() => {
    //Calculo total + taxes
    const total = cart.map(item => item.price*item.quantity);
    const totalTax = cart.map(item => item.price*item.quantity*item.taxRate);
    setTotalPrice(total.reduce((a, b) => a + b, 0))
    setTotalTaxes(totalTax.reduce((a, b) => a + b, 0))
  }, [cart])

  return (
    <div className="cart-style">
      {/* Botón para cerrar el modal en dispositivos chicos */}
      <div onClick={() => setShowModal(false)} className="back-btn"><FontAwesomeIcon icon={faAngleLeft} className="fa-2x pt-2 ps-3" /></div> 
      <ListGroup className="list-style border border-danger">
        <ListGroup.Item className="text-center">Shopping Cart ({cart.length}) <FontAwesomeIcon icon={faCartShopping} className="text-danger" /></ListGroup.Item>
        {
          cart?.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between">
              <div>{item.product} {item.quantity}u.</div>
              <div className="fw-bold">${item.quantity * item.price}</div>
            </ListGroup.Item>
          ))
        }
        {
          cart.length !== 0 ? (
            <>
              <ListGroup.Item>
                <div className="fw-bold">Total without taxes: ${totalPrice}</div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="fw-bold">Taxes: ${totalTaxes}</div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="fw-bold text-center text-decoration-underline">TOTAL: ${totalTaxes+totalPrice}</div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="outline-success w-100" onClick={handleClick}>PAYMENT</Button>
              </ListGroup.Item>
            </>
          ) : null
        }
      </ListGroup>
    </div>
  );
};

export default Cart;
