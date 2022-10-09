import { IProduct } from './mt-Products'
export interface IOrders {
    orderId:          number;
    price:            number;
    is_filled:        string;
    user_updated:     string;
    date_created:     string;
    date_updated:     string;
    product:          IProduct;
}



