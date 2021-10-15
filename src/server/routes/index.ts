import * as express from 'express';
import drinks_router from './drinks'
import pizzas_router from './pizzas'
import pizza_orders_router from './pizza_orders'

const router = express.Router();

router.use('/drinks', drinks_router);
router.use('/pizzas', pizzas_router);
router.use('/pizza_orders', pizza_orders_router);

export default router;