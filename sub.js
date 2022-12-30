const mqtt = require('mqtt');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mydb', (err, db) => {
    if (err) throw err;
    else console.log("DB connected!");
})

const messageSchema = new mongoose.Schema({
    message: String
}, {
    timestamps: true
});

const messageDetail = mongoose.model("message", messageSchema)

//insert data into mongodb
function Mongo_insert(message) {
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

function sub_client_connect_mqtt_broker(client_id, sub_topic) {
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
        Mongo_insert(message);
    })
}
// Client IDs
let client_id_a21 = 'sa21';
let client_id_a22 = 'sa22';

// Sublisher topic
let pub_topic_a21 = 'a21_pub';
let pub_topic_a22 = 'a22_pub';

//Identify new connect from device to MQTT Broker
sub_client_connect_mqtt_broker(client_id_a21, pub_topic_a21);
sub_client_connect_mqtt_broker(client_id_a22, pub_topic_a22);