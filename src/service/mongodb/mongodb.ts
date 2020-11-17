import mongodb, {Logger} from "mongodb";

class MongoDB {
    public url: string
    public nameDatabase: string

    constructor(url: string, nameDatabase: string) {
        this.url = url
        this.nameDatabase = nameDatabase
    }

    public async connect() : Promise<mongodb.Db>{
        return new Promise((resolve, reject) => {
            mongodb.MongoClient.connect(this.url, { useUnifiedTopology: true }, (error, mongodb) => {
                if (error) {
                    console.error(error)
                    reject(error)
                } else {
                    console.log("Mongodb is established")
                    const db = mongodb.db(this.nameDatabase)
                    Logger.setLevel("debug")
                    resolve(db)
                }
            })
        })
    }
}

export default MongoDB