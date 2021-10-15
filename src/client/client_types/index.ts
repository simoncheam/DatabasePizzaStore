

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
    pizza_id?: number;
    pizza_name: string;
    drink_id?: number;
    drink_name_lmao: string;
    price: number

}