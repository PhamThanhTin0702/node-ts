import io from 'socket.io';
import http from "http"
import Context from '../../common/context';
import UserStorage from '../../module/user/storage/storage';
import MessageStorage from '../../module/message/storage/storage';
import RoomStorage from '../../module/room/storage/room';
import User from '../../module/user/model/user';
import RoomModel from '../../module/room/model/room';
import Message from '../../module/message/model/message';
import {Types} from "mongoose"

class SocketIO {
  public server : http.Server
  public path : string
  public context : Context
  private userStorage : UserStorage | any
  private messageStorage : MessageStorage | any
  private roomStorage : RoomStorage | any

  constructor(server: http.Server, context : Context, path: string) {
    this.server = server;
    this.path = path;
    this.context = context;
    this.install();
  }

  private async install() : Promise<void>{
    const db = await this.context.getService("MongoDB");
    this.userStorage = new UserStorage(db)
    this.messageStorage = new MessageStorage(db)
    this.roomStorage = new RoomStorage(db)
  }

  init() : http.Server {
    const sck = io(this.server, {path: this.path})

    sck.on("connection", ( async socket => {
      const {userId} = socket.handshake.query

      this.onConnect(userId);

      await this.checkUser(userId)
      socket.join(userId);
      socket.on("send-message-on-room", async (message : any) => {
        const result = await this.createMessage(message)
        if (result) {
          socket.to(message.userTo).emit("new-message", message);
          socket.to(message.message.createdBy).emit("mine-message", message);
        }
      })

      socket.on("join-room",  async (users : any) => {
        console.log(users)
        if (users) {
          const room = await this.roomStorage.Get(users[0],users[1])
          if (room) {
            const messages = await this.messageStorage.GetMessageByRoom(room._id)
            room.messages = messages;
            console.log(room)
            socket.emit("room-of-user", room);
          } else {
            socket.emit("room-of-user", { messages: [] });
          }
        }
      });

      socket.on("get-message-of-room", (roomId : string) => {
        this.messageStorage.GetMessageByRoom(roomId).then((data : any) => {
          socket.emit("list-message", data);
        });
      });

      socket.on("create-room",  async (data : any) => {
        const room = new RoomModel(data.room).doc
        console.log(room)
        const roomCre = await this.roomStorage.Create(room)
        if (roomCre) {
          data.message.roomId = roomCre._id;
          const messCre = await this.createMessage(data.message)
          if (messCre) {
            data.messages = [data.message]
            socket.to(data.room.users[1].id).emit("have-new-room", data);
            socket.emit("success-create-room", {
              _id: roomCre._id,
              userTo: data.room.users[1],
            });
          }
        }
      });
    }))
    return this.server
  }

  onConnect(sckId: string): void {
    console.log("Have connection",sckId)
  }

  async checkUser (userId : string) : Promise<any> {
    const userExist = await this.userStorage.get(userId);
    if (userExist) {
      return userExist;
    } else {
      const user = new User({userCode: userId}).doc;
      const result = await this.userStorage.create(user);
      return result;
    }
    return null;
  }

  async createMessage (message : any) : Promise<boolean> {
    const messageDoc = new Message(message).doc;
    const result = await this.messageStorage.create(messageDoc);
    const update = await this.roomStorage.Update({_id: Types.ObjectId(messageDoc.roomId)}, {"lastedMessage": Types.ObjectId(messageDoc._id)})
    return result;
  }

}

export default SocketIO