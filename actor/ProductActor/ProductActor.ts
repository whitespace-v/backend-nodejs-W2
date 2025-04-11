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
}