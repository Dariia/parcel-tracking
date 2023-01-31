import React, { useEffect, useState } from 'react';
import './app.scss';
import OrderForm from "../OrderForm";
import { Container } from "react-bootstrap";
import Header from "../Header";
import { OrderDataContext, OrderDataContextType } from "../../contexts/OrderDataContext";
import OrderCards from "../OrderCards";

function App() {
  const [ orderData, setOrderData ] = useState<OrderDataContextType>(null);
  const [ isOrderData, setIsOrderData ] = useState<boolean>(Boolean(orderData));

  useEffect(() => {
    setIsOrderData(Boolean( orderData));
  }, [ orderData ])

  return (
    <OrderDataContext.Provider value={{ orderData, setOrderData }}>
      <Container>
        { isOrderData && <Header/> }
        <main>
          { isOrderData
            ? <OrderCards/>
            : <OrderForm/>
          }
        </main>
      </Container>
    </OrderDataContext.Provider>
  );
}

export default App;
