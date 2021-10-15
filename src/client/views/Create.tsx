import * as React from 'react';
import {useState, useEffect} from 'react';
import { Drinks, Pizzas } from '../client_types';
import {useHistory} from 'react-router';

const Create = ()=> {
    
    const hist = useHistory();

    //active with fetch request
    const [pizzas, setPizzas] = useState<Pizzas[]>([]);
    const [drinks, setDrinks] = useState<Drinks[]>([]);

    //activated with selecting
    const [selectedPizzaId, setSelectedPizzaId]= useState(0);
    const [selectedDrinkId, setSelectedDrinkId]= useState(0);

    //form input
    const [customer, setCustomer] = useState("");


    useEffect(()=>{
        fetch("/api/pizzas")
        .then(z=>z.json())
        .then(y=>setPizzas(y));

        fetch("/api/drinks")
        .then(z=>z.json())
        .then(y=>setDrinks(y));
    },[]);


    const handlePizzaSelectUpdate = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        console.log(e.target);
        setSelectedPizzaId(Number(e.target.value))
    };

    const handleDrinkSelectUpdate = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        e.preventDefault();
        console.log(e.target);
        setSelectedDrinkId(Number(e.target.value))
    }

    const handleSubmitButton = ()=>{

        //input validation
        if (!selectedDrinkId || !selectedPizzaId || !customer ){
            alert('NO FOOD FOR YOU!')
            return;
        }

        //fetch request to pizzaOrders

        fetch("/api/pizza_orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({customer_name: customer, drink_id: selectedDrinkId, pizza_id: selectedPizzaId})
        })
            .then(res=>res.json()) // returning parsed metadata
            .then(data=> {
            hist.push(`/overview/${data.id}`)
            console.log(data);
        })
        .catch(these_hands => console.log(these_hands))
    };

    return(
       

        <div className="row mt-5 justify-content-center">
            <div className="form-group col-6"> 
                <input type="text" className="form-control" placeholder = "Your name..." value={customer} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setCustomer(e.target.value)}/>

                {/* !!!! NEW STUFF Selector - drop down = all pizzas*/}
                <select onChange= {handlePizzaSelectUpdate} defaultValue={selectedPizzaId} className="form-control">
                    <option value = {0}>Please Select Your Pizza</option> 
                    {pizzas.map(p=>(
                        <option key={`pizza-option-${p.id}`} value={p.id}>{p.name}
                        </option>
                    ))}
                </select>
                <select onChange= {handleDrinkSelectUpdate} defaultValue={selectedDrinkId} className="form-control">
                <option value = {0}>Please Select Your Drink</option> 
                    {drinks.map(d=>(
                        <option key={`drink-option-${d.id}`} value={d.id}>{d.name}
                        </option>
                    ))}
                </select>
                <div onClick={handleSubmitButton} className="btn btn-danger">Submit Your Order</div>
            </div>
        </div>
    )
};

export default Create;