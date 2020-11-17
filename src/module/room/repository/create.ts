import {Document} from 'mongoose';

interface CreateRoomStorage {
  Create(data: Document) : Promise<boolean>
}

class CreateRoomRepo {
  public store : CreateRoomStorage

  constructor(store: CreateRoomStorage) {
    this.store = store
  }

  async Create(data: Document): Promise<boolean> {
    const doc = await this.store.Create(data)
    return doc
  }
}

export default CreateRoomRepo