import { useState } from "react";

import Products from "./productlists";

export default function ProductItem() {

        const [products] = useState([

            {
                id: 1,
                name: "Sản phẩm 1",
                image: "https://via.placeholder.com/100",
                quantity: 10,
                price: 100000,
              },
              {
                id: 2,
                name: "Sản phẩm 2",
                image: "https://via.placeholder.com/100",
                quantity: 0,
                price: 200000,
              },
              {
                id: 3,
                name: "Sản phẩm 3",
                image: "https://via.placeholder.com/100",
                quantity: 5,
                price: 300000,
              },

        ]);

    return(

        <div>
            <h2>List Of Products</h2>
            <Products products={products} />
        </div>
    );

};
