import pizzaz from '../db/queries/pizza' //importing SQL query
import * as express from 'express';
import { Pizzas } from '../servertypes';

const router = express.Router();


router.get('/', async (req,res) => {

    try {
        const all_pizzas = await pizzaz.get_all();
        //res.status(200).json({message: `get all items lol`});
        res.status(200).json(all_pizzas);
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//get one

router.get('/:id', async (req,res) => {
    const id = req.params.id;

    try {
        const [one_pizza] = await pizzaz.get_one_by_id(Number(id));
        
        //error handling
        if(!one_pizza){
            res.status(404).json({message:"Pizza not found!"})

        } else{
            res.status(200).json(one_pizza);
        }


    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//create post-- need name and price

router.post('/', async (req,res) => {
    const {name, price}: Pizzas =req.body;

    if(!name || isNaN(price)){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const pizzaResultz = await pizzaz.create({ name, price });
        res.status(201).json({message: "Created Pizza lol", id: pizzaResultz.insertId}); /// ??? I don't fully understand this (id: resultz.insertId)
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//PUT

router.put('/:id', async (req,res) => {
    const id = Number(req.params.id);
    const {name, price}:Pizzas =req.body;  //object = types of Pizzas

    if(!name || isNaN(price)){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const resultz = await pizzaz.update({ name, price }, id);
        res.status(201).json({message: "Updated Pizza!"});
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }
} );

//DELETE

router.delete('/:id', async(req,res) =>{
    const id = Number(req.params.id);
    try {
        await pizzaz.destroy(id)
        res.status(204).json({message: "Deleted Pizza!"});
        
    } catch (error) {
        res.status(500).json({message: "A server error occurred", error: error.sqlMessage});
    }
})


export default router;