import {TalkToMySQL} from "../index";
import {Drinks} from "../../servertypes";

// All functions that interact with SQL DB go here:

const get_all = () => TalkToMySQL<Drinks[]>("SELECT * FROM Drinks");

const get_one_by_id = (id:number) => TalkToMySQL<Drinks[]>("SELECT * FROM Drinks WHERE id=?",[id]);

const create = (new_drink: Drinks) => TalkToMySQL('INSERT INTO Drinks SET ?', [new_drink]);

const update = (drink: Drinks, id: Drinks['id']) => TalkToMySQL("UPDATE Drinks SET ? WHERE id=?", [drink, id]);

const destroy = (id: Drinks['id']) => TalkToMySQL("DELETE FROM Drinks WHERE id=?", [id]);


// All 5 CRUD routes done, needs to check alignment with requests under express routes using async

export default {
    get_all,
    get_one_by_id,
    create,
    update, 
    destroy

};