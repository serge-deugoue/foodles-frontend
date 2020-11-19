export interface IOrder{
    id?: number;
    customer: number;
    date?: string;
    total?: number;
    orderItems: IOrderItem[]
}

interface IOrderItem{
    id?:number;
    quantity:number;
    food:number
}