import { Document } from 'mongoose';

interface GetMessageStorage {
  GetMessageByRoom(id: string) : Promise<Document>
}

class GetMessageRepo {
  public store: GetMessageStorage

  constructor(store: GetMessageStorage) {
    this.store = store
  }

  async GetMessageByRoom(id: string) : Promise<Document> {
    const data = await this.store.GetMessageByRoom(id)
    return data
  }
}

export default GetMessageRepo