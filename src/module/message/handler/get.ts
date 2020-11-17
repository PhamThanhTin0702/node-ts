import express from 'express';
import Context from '../../../common/context';
import MessageStorage from '../storage/storage';
import GetMessageRepo from '../repository/list';
import Error from "../../../common/error"

export default async function GetMessageHandler(req: express.Request, res: express.Response, next: express.NextFunction, context: Context) {
  try {
    const db = await context.getService("MongoDB");
    const store = new MessageStorage(db);
    const repo = new GetMessageRepo(store);
    const {id} = req.params;
    if (id) {
      const data = await repo.GetMessageByRoom(id);
      if (data) {
        res.status(200).json({status_code: 200, data: data});
      } else  {
        res.status(400).json({status_code: 400, error: Error.CannotGet});
      }
    }
  } catch (err) {
    res.status(400).json({status_code: 400, error: Error.ParamIsInvalid});
  }

}