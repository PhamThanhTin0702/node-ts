import UserModel from "../model/user";

interface UserStorage {
  get(id : string): Promise<any>
}

class GetRepository {

  public store: UserStorage

  constructor(store: UserStorage) {
    this.store = store;
  }
  public async get(id : string) : Promise<any> {
    const data = await this.store.get(id);
    if (data) {
      return data
    }
    return null
  }
}

export default GetRepository