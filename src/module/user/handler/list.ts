import express from "express";
import ListUserStorage from "../storage/storage";
import ListUserRepo from "../repository/list";
import Context from "../../../common/context"

async function CreateHandler(req: express.Request, res :express.Response, next: express.NextFunction, context: Context) {
    const db = await context.getService("MongoDB")
    const store = new ListUserStorage(db)
    const repo = new ListUserRepo(store)
    const {err, data} = await repo.list()
    if (err) {
        res.status(400).json({success: false, message: "Bad Request"})
    } else {
        res.status(200).json({success: true, message: "Oke", data: data})
        
    }
    
}

export default CreateHandler