import * as React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import { Drinks, Pizzas, OrderOverview } from '../client_types';
import {useHistory} from 'react-router';



const Edit = ()=> {

    const {order_id} = useParams<{order_id: string}>();
    const hist = useHistory();
    const {goBack} = useHistory();

    const [order, setOrder] = useState<OrderOverview>(null)

    //active with fetch request
    const [pizzas, setPizzas] = useState<Pizzas[]>([]);
    const [drinks, setDrinks] = useState<Drinks[]>([]);

     //form input
    const [customer, setCustomer] = useState("");

    //activated with selecting
    const [selectedPizzaId, setSelectedPizzaId]= useState(0);
    const [selectedDrinkId, setSelectedDrinkId]= useState(0);



    // handleNameUpdate - 
    //activated with click to save update btn clicked

    const handleUpdate =(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        if(!customer || !selectedPizzaId || ! selectedDrinkId){
            alert('no food for you!');
            return;
        }


        // update put request
        fetch(`/api/pizza_orders/${order_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({customer_name: customer, drink_id: selectedDrinkId, pizza_id: selectedPizzaId})
        })
        .then(z=>z.json())
        .then(server_results=>{
            hist.push(`/overview/${order_id}`)  //goes back to the main overview page after update
            console.log(server_results);
        })
        .catch(these_hands => console.log(these_hands))

    }


    
    // const handleDelete
    const handleDelete = (eDel: React.MouseEvent<HTMLButtonElement>)=> {
        eDel.preventDefault();
        
        //confirmation message
        if(confirm('Are you sure you want to delete?')){
            alert('you clicked delete!')
        }

        //add prompt to accept ok
        const user_input = prompt("Type 'OK' if you want to delete this order")
        if(user_input.toLocaleLowerCase()==='ok'){

            //fetch request here:
            fetch(`/api/pizza_orders/${order_id}`, {
                method: "DELETE",
            })
            .then(res => res.json())
            .then(() => hist.push(`/overview`))   //Why do we now use res instead of ()
            .catch(e=>console.log(e))

        }
    }

        //contains multiple fetch requests
         useEffect(()=>{
    
             //Fetch #1: pizza_orders set selected pizza/drink, set customer
            fetch(`/api/pizza_orders/${order_id}`)
            .then(res=>res.json())
            .then((res: OrderOverview)=>{     //wow this is awesome....ask Andrew for process elaboration

                
                setCustomer(res.customer_name);
                
                setOrder(res);
                setSelectedDrinkId(res.drink_id);
                setSelectedPizzaId(res.pizza_id);
            });

            //fetch #2: set pizzas
            fetch(`/api/pizzas`)
            .then(res=>res.json())
            .then(res=>setPizzas(res))


            //fetch #3: set drinks
            fetch("/api/drinks")
            .then(z=>z.json())
            .then(y=>setDrinks(y));

    
         },[])   

         if(!order){
             
             return <h1>LOADING...Please Wait</h1>;
         };


         const handlePizzaSelectUpdate = (e:React.ChangeEvent<HTMLSelectElement>) =>{
            e.preventDefault();
            console.log(e.target);
            setSelectedPizzaId(Number(e.target.value))
        };
    
        const handleDrinkSelectUpdate = (e:React.ChangeEvent<HTMLSelectElement>) =>{
            e.preventDefault();
            console.log(e.target);
            setSelectedDrinkId(Number(e.target.value))
        }

    return(

        <div>


       
        {/* New section */}

        <main className="container my-5">
            <section className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header">Editing Order #: {order?.id} </div>
                    </div>
                    {/* End Header */}
                    <div className="card-body">
                        <h1>Customer: {order.customer_name}</h1>
                        <form className="form-group my-2">
                            <label >Current Drink: </label>
                            <input value={order.drink_name_lmao} className="form-control"/>
                            <label >Current Pizza: </label>
                            <input value={order.pizza_name} className="form-control"/>
                        </form>
                    </div>
                </div>
            </section>
        {/* Add change order section */}

        <section className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header">Select changes below to update your order:  </div>
                    </div>
                    {/* End Header */}
                    <div className="card-body">
                        
                        <form className="form-group my-2">
                            <label >Update Name: </label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="your name"
                                value={customer}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setCustomer(e.target.value)}
                            />
                            <div className="m-2">
                                <label className="mx-2" >Update Drink: </label>
                                {/* <input value={order.drink_name_lmao} className="form-control"/> */}

                                    {/* select - Drink */}
                                    <select value={selectedDrinkId} onChange={handleDrinkSelectUpdate} 
                                    defaultValue ={selectedDrinkId}>
                                        
                                        <option value={0}>Please Select A Drink</option>
                                            {drinks.map(d=> (
                                                <option value={d.id} key={`drink-option-${d.id}`}>
                                                    {d.name}
                                                </option>
                                            ))}    
                                            
                                    </select>
                            </div>    
                            <div className="m-2">

                                <label className="mx-2" >Update Pizza: </label>
                                {/* <input value={order.pizza_name} className="form-control"/> */}

                                    {/* select - Pizza */}
                                    <select value={selectedPizzaId} onChange={handlePizzaSelectUpdate} 
                                        defaultValue ={selectedPizzaId}>
                                        
                                            <option value={0}>Please Select A Pizza</option>
                                                {pizzas.map(p=> (
                                                    <option value={p.id} key={`pizza-option-${p.id}`}>
                                                        {p.name}
                                                    </option>
                                                ))}    
                                        
                                        </select>
                            </div>

                        </form>


                    </div>
                    {/* End of Card body */}

                    <div onClick={goBack} className="btn mx-2 btn-primary">
                            Go Back?
                    </div>
                    <button onClick={handleDelete} className="btn mx-2 btn-danger">Delete!
                    </button>
                    <button onClick ={handleUpdate} className="btn btn-Success">Save Updates!</button>



                </div>


            </section>
            {/* insert footer */}
                <div className="justify-content-center">


                </div>


        </main>
        {/* END - New section */}

        
                    

    </div>
       

    );




    



    
};

export default Edit;