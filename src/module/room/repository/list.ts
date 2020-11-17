import { Document } from 'mongoose';

interface ListRoomStorage {
  List(cond: any) : Promise<Document[]>
}

class ListRoomRepo {
  public store: ListRoomStorage

  constructor(store: ListRoomStorage) {
    this.store = store
  }

  async List(id : string) : Promise<Document[]> {
    const cond = {
      "users.id": { $eq: id }
    }
    const data = await this.store.List(cond)
    return data
  }
}

export default ListRoomRepo