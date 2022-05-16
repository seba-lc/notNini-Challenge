import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Cart from "../components/Cart/Cart";
import Landing from "../components/Landing/Landing";
import responseTransform from "../helpers/responseTransform";
import { axiosClient } from "../settings/axiosClient";
import './Home.css'

const Home = () => {
  let cartLS = JSON.parse(localStorage.getItem('Cart'));
  if(cartLS === null){
    cartLS = []
  }
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [cart, setCart] = useState(cartLS);
  const [effect, setEffect] = useState('');

  const handleClick = () => {
    showModal ? setShowModal(false) : setShowModal(true)
  }

  const bringProducts = async () => {
    try {
      const response = await axiosClient.get(); //Es un string, lo paso a array con una función
      const correctedResponse = responseTransform(response.data);
      setProducts(correctedResponse);
    } catch (error) {
      setErrors({servidor: 'Error al cargar los productos, recargue la página'})
    }
  }

  //Boton para agregar producto en el landing
  const addProduct = (item) => {
    if(effect === ''){
      const selectedProduct = cart.find(product => product._id === item._id);
      if(selectedProduct === undefined){
        const cartProduct = {
          _id: item._id,
          product: item.name,
          price: item.price,
          taxRate: item.taxRate,
          quantity: 1
        }
        setCart(cart.concat([cartProduct]))
      }else{
        const newCart = cart.filter(product => product._id !== item._id);
        selectedProduct.quantity++;
        setCart(newCart.concat([selectedProduct]))
      }
      //Efecto al agregar y quitar productos del carrito
      const element = document.getElementById(item._id);
      element.classList.add('img-style_add');
      setEffect(item._id);
    }
  }

  //Boton para quitar producto en el landing
  const deleteProduct = (item) => {
    if(effect === ''){
      const selectedProduct = cart.find(product => product._id === item._id);
      if(selectedProduct !== undefined){
        const newCart = cart.filter(product => product._id !== item._id);
        selectedProduct.quantity--;
        if(selectedProduct.quantity <= 0){
          setCart(newCart)
        }else{
          setCart(newCart.concat([selectedProduct]))
        }
        //Efecto al agregar y quitar productos del carrito
        const element = document.getElementById(item._id);
        element.classList.add('img-style_delete');
        setEffect(item._id);
      }
    }
  }

  //Traigo los productos de la API
  useEffect(() => {
    if(products.length === 0){
      bringProducts();
    }
  }, [])

  useEffect(() => {
    if(Object.keys(errors).length !== 0){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errors.servidor,
      })
    }
  }, [errors])

  useEffect(() => {
    localStorage.setItem('Cart', JSON.stringify(cart));
  }, [cart])

  //Efecto al agregar y quitar productos del carrito
  useEffect(() => {
    if(effect !== ''){
      const element = document.getElementById(effect);
      if(element.classList.contains('img-style_add') || element.classList.contains('img-style_delete')){
        setTimeout(() => {
          element.classList.remove('img-style_add')
          element.classList.remove('img-style_delete')
          setEffect('')
        }, 200)
      }
    }
  }, [effect])

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8} className="p-0"><Landing handleClick={handleClick} products={products} addProduct={addProduct} deleteProduct={deleteProduct} cart={cart} /></Col>
        <Col xs={12} md={4} className="p-0 smallCart-style"><Cart cart={cart} setCart={setCart} setShowModal={setShowModal} /></Col>
        
        {/* Modal para dispositivos chicos */}
        <div className={`modal-style ${showModal ? 'modal-style_show' : null}`}> 
          <Cart cart={cart} setShowModal={setShowModal} setCart={setCart} />
        </div>
      </Row>
    </Container>
  );
};

export default Home;