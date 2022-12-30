const mqtt = require('mqtt');

// Connection variables
let broker_host = 'localhost';
let broker_port = 1883;

let client_id_a21= 'a21';
let client_id_a22= 'a22';


function connection_options(client_id) {
    return {
        port: broker_port,
        host: broker_host,
        clientId: client_id,
        reconnectPeriod: 5000 // Try reconnecting in 5 seconds if connection is lost
    }
};
var client_a21 = mqtt.connect(connection_options(client_id_a21));
var client_a22 = mqtt.connect(connection_options(client_id_a22));

// Publish topic
let pub_topic_a21 = 'a21_pub';
let pub_topic_a22 = 'a22_pub';


// Publish variables
function publish_variables(client_id) {
    let message = 'Greetings from ' + client_id.toString();
    let pub_options = {qos: 1, retain: true};
}

// Publish message to MQTT with each others topic
publish_variables(client_id_a21)

client.on("connect", () => {
    // setInterval(()=> {
    var random = Math.random() * 50;
    console.log(random);
    client.publish('demomqttThienNH', 'Ket qua publish: ' + random.toString());
    // }), 3000;
});