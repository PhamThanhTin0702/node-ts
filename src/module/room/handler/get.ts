import express from 'express';
import Context from '../../../common/context';
import RoomStorage from '../storage/room';
import GetRoomRepo from '../repository/get';

export default async function GetRoomHandler(req: express.Request, res: express.Response, next: express.NextFunction, context: Context) {
  try {
    const db = await context.getService("MongoDB")
    const store = new RoomStorage(db)
    const repo = new GetRoomRepo(store)
    const {userone, usertwo} = req.params
    const data = await repo.GetRoomExist(userone, usertwo)
    if (data) {
      res.status(200).json({status_code: 200, data: data})
    } else  {
      res.status(400).json({status_code: 400})
    }
  }catch (err) {
    console.error(err);
    res.status(400).json({status_code: 400})
  }
}