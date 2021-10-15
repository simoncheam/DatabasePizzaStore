import drinkz from '../db/queries/drinks' //importing SQL query
import * as express from 'express';
import { Drinks } from '../servertypes';

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const all_drinks = await drinkz.get_all();
        res.status(200).json(all_drinks);
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }
} );


//get one by ID
router.get('/:id', async (req,res) => {
    const id = req.params.id;

    try {

       

        const [one_drink] = await drinkz.get_one_by_id(Number(id))  //Calls query function that selects drink by id from databased
        
        
        if(!one_drink){ //error handling
            res.status(404).json({message:"Drink not found!"})

        } else{
            res.status(200).json(one_drink);
        }
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//create post-- need name and price

router.post('/', async (req,res) => {
    //const new_item =req.body;
    const {name, price}:Drinks =req.body;  //object = types of Drinks

    if(!name || isNaN(price)){  // input validation - Intercept before sending to database
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const resultz = await drinkz.create({ name, price });
        res.status(201).json({message: "Create Item lol", id: resultz.insertId});  //metadata sends prop(insertId) back, gets prop from type MySQL_Response_Lol
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//PUT

router.put('/:id', async (req,res) => {
    const id = Number(req.params.id);
    const {name, price}:Drinks =req.body;  //object = types of Drinks

    if(!name || isNaN(price)){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const resultz = await drinkz.update({ name, price }, id);
        res.status(201).json({message: "Updated Item!"});
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }
} );

//DELETE

router.delete('/:id', async(req,res) =>{
    const id = Number(req.params.id);
    try {

        const metadata = await drinkz.destroy(id);

        if(metadata.affectedRows===0){
            res.status(404).json({message: "Previously Deleted or never existed!"});

        } else {
            res.status(200).json({message: "Deleted Drink Successfully!"});
        }
      
        
    } catch (error) {
        res.status(500).json({message: "A server error occurred", error: error.sqlMessage});
    }
})

export default router;