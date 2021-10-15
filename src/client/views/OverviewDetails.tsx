import * as React from 'react';
import {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router'; //useHistory needed for goBack btn
import { Link } from 'react-router-dom';
import { OrderOverview } from '../client_types';

const OverviewDetails = () => {

    const {order_id} = useParams<{order_id: string}>(); //destructure param, but define as string

    const [order, setOrder] = useState<OrderOverview>(null);
    const {goBack} = useHistory();

    useEffect(()=>{

        fetch(`/api/pizza_orders/${order_id}`)
        .then(single_order=>single_order.json())
        .then(single_order=>setOrder(single_order))
        .catch(e=>console.log(e))
    },[]);

    return(
        <div className="row mt-5 justify-content-center">
            <div className="col-md-8">
                <div className="card shadow-lg">
                    <div className="card-header">
                        Customer: {order?.customer_name}
                    </div>
                    <div className="card-body">
                        <p>Pizza: <em>{order?.pizza_name}</em></p>
                        <p>Drink: <em>{order?.drink_name_lmao}</em></p>
                        <hr/>
                        <h3>Total: {order?.price}</h3>
                    </div>
                    <div className="card-footer">
                        <div onClick={goBack} className="btn mx-2 btn-danger">
                            Go Back?
                        </div>
                        <Link to ={`/overview/${order_id}/edit`} className="btn mx-2 btn-warning">
                            Edit Order
                        </Link>


                    </div>

                </div>
            </div>
        </div>
    )


};

export default OverviewDetails;