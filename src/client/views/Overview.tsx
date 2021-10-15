import * as React from 'react';
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { OrderOverview} from "../client_types"

const Overview = ()=>{

    const [orders, setOrders] = useState<OrderOverview[]>([]);

    useEffect(()=>{
        fetch('/api/pizza_orders') // fetch all orders
        .then(res=>res.json())
        .then(lol=>setOrders(lol))
        .catch(e=>console.log(e))
    },[]);

   return(

       <ul className ="justify-content-center list-group">
       {orders.map(po=>(
           <Link to={`/overview/${po.id}`} className ="list-group-item" key={`pizza-order-${po.id}`}>
               {po.customer_name}, {po.pizza_name} , {po.drink_name_lmao}
           </Link>
       ))}

        </ul>
       )
   
};

export default Overview;
