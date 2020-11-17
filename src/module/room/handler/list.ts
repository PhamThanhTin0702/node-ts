import express from 'express';
import Context from '../../../common/context';
import RoomStorage from '../storage/room';
import ListRoomRepo from '../repository/list';

export default async function ListRoomHandler(req: express.Request, res: express.Response, next: express.NextFunction, context: Context) {
  const db = await context.getService("MongoDB")
  const store = new RoomStorage(db)
  const repo = new ListRoomRepo(store)
  const {id} = req.params;
  if (!id) {
    res.status(400).json({status_code: 400, message: "Paramis is invalid"})
  }
  const data = await repo.List(id)
  if (data.length > 0) {
    res.status(200).json({status_code: 200, data: data})
  } else  {
    res.status(400).json({status_code: 400})
  }
}