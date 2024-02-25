import { IProduct } from "../models/IProduct";

export const getUniqueProducts = (products: IProduct[]) => {

    return products.filter((product, ind, self) => 
            ind === self.findIndex(fi => (
                fi.id === product.id )));
};