import amqp from "amqplib"

class Pubsub {

  async init() {
    const q = "joco"

    const open = amqp.connect("amqp://user:bitnami@localhost:5672")
    open.then(conn => {
      return conn.createChannel()
    }).then(ch => {
      return ch.assertQueue(q).then(ok => {
        return ch.sendToQueue(q,Buffer.from('welllllll'))
      })
    })

    open.then(function(conn) {
      return conn.createChannel();
    }).then(function(ch) {
      return ch.assertQueue(q).then(function(ok) {
        return ch.consume(q, function(msg) {
          if (msg !== null) {
            console.log("aaaaaa",msg.content.toString());
            ch.ack(msg);
          }
        });
      });
    })
  }
}