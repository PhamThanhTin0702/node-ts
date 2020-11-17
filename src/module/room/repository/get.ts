import { Document } from 'mongoose';

interface GetRoomStorage {
  Get(userone : string, usertwo: string) : Promise<any>
}

class GetRoomRepo {
  public store: GetRoomStorage

  constructor(store: GetRoomStorage) {
    this.store = store
  }

  async GetRoomExist(userone : string, usertwo: string) : Promise<any> {
    const data = await this.store.Get(userone, usertwo)
    return data
  }
}

export default GetRoomRepo