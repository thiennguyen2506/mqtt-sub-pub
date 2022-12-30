const mqtt = require('mqtt');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    else console.log("DB connected!");
})

const messageSchema = new mongoose.Schema({
    message: String
}, {
    timestamps: true
});

const messageDetail = mongoose.model("message", messageSchema )

var client = mqtt.connect('mqtt://localhost:1883');

// Sublisher topic
let pub_topic_a21 = 'a21_pub';
let pub_topic_a22 = 'a22_pub';

client.on('connect', () => {
    client.subscribe(pub_topic_a21);
    console.log("Client has subscribed succesfully");
});
client.on('message', (topic, message) => {
    message = message.toString();
    Mongo_insert(message);
})

//insert data in mongodb
function Mongo_insert(message) {
    let newmess = new messageDetail({ message: message});
    newmess.save();
}