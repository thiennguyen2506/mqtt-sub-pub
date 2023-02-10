const express = require('express');
const mqtt = require('mqtt');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3336;
const db = process.env.DB || "79sanxuat";

app.get("/", (req, res) => {
    setInterval(function () {
        res.send('Mqtt Service khởi động thành công');
    }, 1000)
})
app.listen(port, () => {
    console.log(`app listening at: ${port}`);
})

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://localhost:27017/${db}`, (err, db) => {
    if (err) throw err;
    else console.log("DB connected!");
})

const messageSchema = new mongoose.Schema({
    message: String
}, {
    timestamps: true
});


//insert data into mongodb
function Mongo_insert(message, machine) {
    const messageDetail = mongoose.model(machine, messageSchema)
    let newmess = new messageDetail({ message: message });
    newmess.save();
}

///////
function connection_options(_id) {
    return {
        port: 18833,
        host: '10.10.10.10',
        clientId: _id,
        username: '',
        password: '',
        reconnectPeriod: 5000 // Try reconnecting in 5 seconds if connection is lost
    }
};
let sub_options = { qos: 0 };

function sub_client_connect_mqtt_broker(client_id, sub_topic, machine_collect) {
    let client_connect = mqtt.connect(connection_options(client_id));
    client_connect.on('connect', () => {
        client_connect.subscribe(sub_topic, sub_options, (err) => {
            if (err) {
                console.log("An error occurred while subscribing")
            } else {
                console.log(client_id + " subscribe successfully to " + sub_topic.toString())
            }
        })
    });
    client_connect.on('message', (topic, message) => {
        message = message.toString();
        console.log(topic + ": " + message);
        Mongo_insert(message, machine_collect);
    })
}
// Collection each machine
let a21_collect = 'a21_collect';
let a22_collect = 'a22_collect';
let a23_collect = 'a23_collect';

// Client IDs
let client_id_a21 = 'sa21';
let client_id_a22 = 'sa22';
// let client_id_a23 = 'sa23';


// Sublisher topic
let pub_topic_a21 = 'a21_pub';
let pub_topic_a22 = 'a22_pub';
// let pub_topic_a23 = 'a23_pub';

//Identify new connect from device to MQTT Broker
sub_client_connect_mqtt_broker(client_id_a21, pub_topic_a21, a21_collect);
sub_client_connect_mqtt_broker(client_id_a22, pub_topic_a22, a22_collect);
// sub_client_connect_mqtt_broker(client_id_a23, pub_topic_a23, a23_collect);
