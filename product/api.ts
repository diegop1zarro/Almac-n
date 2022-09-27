import axios from "axios";
import { Product } from "./types";
import papa from "papaparse"
   export default { list : async(): Promise<Product[]>=>{
        return axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRuQSrmtLdCsPnuGSZhx3dsJqFDkhCMA3s6NG4IYD-CYEm4RHcRCtm2Ymcc5kBJ7Q/pub?output=csv',{
            responseType: "blob"
        })
        .then((response)=>{
            return new Promise <Product[]>((resolve,reject)=>{
             papa.parse(response.data,{
                header: true, //indicar a papa  parse que el primer elemento de nuestro array es solo header de nuestra tabla
                complete: result =>{
                    let products = result.data as Product[];
                    return resolve(products.map(product=>({...product,price:Number(product.price)})))
                },
                error: (error) => reject(error.message)
             })
            }) 
        }) 
    }
   }



