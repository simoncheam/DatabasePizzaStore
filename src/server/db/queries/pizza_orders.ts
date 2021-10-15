import {TalkToMySQL} from "../index";
import {PizzaOrders, OrderOverview} from "../../servertypes";

// old const get_all = () => TalkToMySQL<PizzaOrders[]>("SELECT * FROM PizzaOrders");

const get_all = () => 
    TalkToMySQL<OrderOverview[]>(`
        SELECT po.id, po.customer_name, p.name as pizza_name, d.name as drink_name_lmao, (p.price + d.price) as price                                                                                                                                                                                                                                                                                                                                  
            FROM PizzaOrders po
            JOIN Pizzas p ON p.id = po.pizza_id
            JOIN Drinks d ON po.drink_id = d.id
    `);




const get_one_by_id = (id:number) => 
TalkToMySQL<OrderOverview[]>(`
        SELECT po.id, po.customer_name, po.pizza_id, po.drink_id, p.name as pizza_name, d.name as drink_name_lmao, (p.price + d.price) as price                                                                                                                                                                                                                                                                                                                                  
            FROM PizzaOrders po
            JOIN Pizzas p ON p.id = po.pizza_id
            JOIN Drinks d ON po.drink_id = d.id
            WHERE po.id=?
    `,[id]);

//TalkToMySQL<PizzaOrders[]>("SELECT * FROM PizzaOrders WHERE id=?",[id]);




const create = (new_order: PizzaOrders) => TalkToMySQL('INSERT INTO PizzaOrders SET ?', [new_order]);

const update = (pizza_order: PizzaOrders, id: PizzaOrders['id']) => TalkToMySQL("UPDATE PizzaOrders SET ? WHERE id=?", [pizza_order, id]);

const destroy = (id: PizzaOrders['id']) => TalkToMySQL("DELETE FROM PizzaOrders WHERE id=?", [id]);


export default {
    get_all,
    get_one_by_id,
    create,
    update,
    destroy
};