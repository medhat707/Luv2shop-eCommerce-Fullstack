import { Product } from "./product";

 
export class CartItem {
 
    public id: number;
    public name:string;
    public imageUrl: string;
    public unitPrice: number;
    public quantity: number = 1

    constructor(theProduct: Product) {
        this.id= theProduct.id!;
        this.name = theProduct.name!;
        this.imageUrl = theProduct.imageUrl!;
        this.unitPrice = theProduct.unitprice!;
        this.quantity =1;
    }
}
