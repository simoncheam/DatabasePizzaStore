import {TalkToMySQL} from "../index";
import {Pizzas} from "../../servertypes";

const get_all = () => TalkToMySQL<Pizzas[]>("SELECT * FROM Pizzas");
const get_one_by_id = (id:number) => TalkToMySQL<Pizzas[]>("SELECT * FROM Pizzas WHERE id=?",[id]);
const create = (new_pizza: Pizzas) => TalkToMySQL('INSERT INTO Pizzas SET ?', [new_pizza]);

const update = (pizza: Pizzas, id: Pizzas['id']) => TalkToMySQL("UPDATE Pizzas SET ? WHERE id=?", [pizza, id]);

const destroy = (id: Pizzas['id']) => TalkToMySQL("DELETE FROM Pizzas WHERE id=?", [id]);

export default {
    get_all,
    get_one_by_id,
    create,
    update,
    destroy
};