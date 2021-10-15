import pizza_orderz from '../db/queries/pizza_orders' //importing SQL query
import * as express from 'express';
import { PizzaOrders } from '../servertypes';

const router = express.Router();

// X

router.get('/', async (req,res) => {

    try {
        const all_orders = await pizza_orderz.get_all(); /// Q: what do we call "pizza_orders" ?
        res.status(200).json(all_orders);
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//get one by ID

router.get('/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const [one_pizza_order] = await pizza_orderz.get_one_by_id(Number(id))  //Calls query function that selects drink by id from databased
       

        if(!one_pizza_order){
            res.status(404).json({message:"Order not found!"})
        }else{
            res.status(200).json(one_pizza_order);
        }
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//create post-- need name and price

router.post('/', async (req,res) => {
    //const new_item =req.body;

    const { customer_name,drink_id, pizza_id }:PizzaOrders =req.body;  // This is from server types

    if(!customer_name || !drink_id || !pizza_id){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const resultz = await pizza_orderz.create({ customer_name, drink_id, pizza_id });
        res.status(201).json({message: "Create Item lol", id: resultz.insertId});
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//PUT

router.put('/:id', async (req,res) => {
    const id = Number(req.params.id);
    const {customer_name, drink_id, pizza_id}:PizzaOrders =req.body;  //object = types of Drinks

    if(!customer_name || !drink_id || !pizza_id){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const resultz = await pizza_orderz.update({ customer_name, drink_id, pizza_id }, id);
        res.status(201).json({message: "Updated Order!"});
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }
} );

//DELETE

router.delete('/:id', async(req,res) =>{
    const id = Number(req.params.id);
    try {
        await pizza_orderz.destroy(id)
        res.status(200).json({message: "Deleted Drink!"});
        
    } catch (error) {
        res.status(500).json({message: "A server error occurred", error: error.sqlMessage});
    }
})

export default router;