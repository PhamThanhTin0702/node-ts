import express from "express";
import GetUserStorage from "../storage/storage";
import GetUserRepo from "../repository/get";
import Context from "../../../common/context"

async function GetHandler(req: express.Request, res :express.Response, next: express.NextFunction, context: Context) {
  const {id} = req.params
  if (!id) {
    res.status(400).json({success: false, message: "Can not get params"})
    next()
  }

  const db = await context.getService("MongoDB")
  const store = new GetUserStorage(db)
  const repo = new GetUserRepo(store)
  const data = await repo.get(id)

  if (data) {
    res.status(200).json({success: true, message: "Oke", data: data})
  } else {
    res.status(400).json({success: false, message: "Bad Request"})
  }

}

export default GetHandler