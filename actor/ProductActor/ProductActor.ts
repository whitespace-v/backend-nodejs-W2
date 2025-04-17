import { Request, Response } from "express";
import { Responder } from "../middleware/Responder";
import { PrismaClient } from "@prisma/client";
import { Pool } from "../middleware/Pool";

export class ProductActor {
    static async createProduct(req: Request, res: Response) {
        try {
            const {title, description, price} = req.body
            const product = await Pool.conn.product.create({
                data: {title, description, price}
            })
            res.json(Responder.ok({product}))
        } catch (e) {
            console.log(e)
            res.json(Responder.internal())
        }
    }
    static async getProducts(req: Request, res: Response) {
        try {
            const {asc, filter, checked} = req.query
            console.log(req.query);
            
            console.log(asc, filter, checked);
            const bool_asc = "true" === asc?.toString() // "false" -> false
            const arr_checked = checked?.toString().split(',') //"1,2,3" => ["1","2","3"]
            const products = await Pool.conn.product.findMany({
                orderBy: [
                    filter === "price" ?
                     {price: bool_asc ? "asc" : "desc"} : 
                     {id: bool_asc ? "asc" : "desc"}
                ]
            })
            res.json(Responder.ok({products}))
        } catch (error) {
            console.log(error)
            res.json(Responder.internal())
        }
    }
}