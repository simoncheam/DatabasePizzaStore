export interface MySQL_Default_Response_Lol {
    insertId:number;  //what is the rationale to use this?
    affectedRows: number;
}

export interface Pizzas {
    id?: number;
    name: string;
    price: number; 
}

export interface Drinks {
    id?: number;
    name: string;
    price: number; 
}

export interface PizzaOrders {
    id?: number;
    customer_name: string;
    drink_id: Drinks["id"];
    pizza_id: Pizzas["id"];
}

//Update index.ts Server_types to reflect data returned, then import into /queries/pizza_orders.ts

export interface OrderOverview{
    id: number;
    customer_name: string;
    pizza_name: string;
    drink_name_lmao: string;
    price: number

}