import express from "express";
import CreateUserStorage from "../storage/storage";
import CreateUserRepo from "../repository/create";
import UserModel from "../model/user"
import Context from "../../../common/context"


async function CreateHandler(req: express.Request, res :express.Response, next: express.NextFunction, context: Context) {
    const db = await context.getService("MongoDB")
    const store = new CreateUserStorage(db)
    const repo = new CreateUserRepo(store)
    const user = new UserModel(req.body).doc
    const result = await repo.create(user)
    if (result) {
        res.status(200).json({success: true, message: "Oke"})
    } else {
        res.status(400).json({success: false, message: "Bad Request"})
    }
}

export default CreateHandler