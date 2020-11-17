import express from "express"
import Context from '../../../common/context';
import RoomModel from "../model/room"
import RoomStorage from '../storage/room';
import CreateRoomRepo from '../repository/create';

export default async function(req: express.Request, res: express.Response, next: express.NextFunction, context : Context)  {
  const room = new RoomModel(req.body).doc
  const db = await context.getService("MongoDB")
  const store = new RoomStorage(db)
  const repo = new CreateRoomRepo(store)
  const data = await repo.Create(room)
  if (data) {
    res.status(200).json({status_code: 200, data: room})
  } else {
    res.status(400).json({status_code: 400})
  }
}