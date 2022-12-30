const mqtt = require('mqtt');

function connection_options(client_id) {
    return {
        port: 1883,
        host: 'localhost',
        clientId: client_id,
        username: 'abcde',
        password: '12345',
        reconnectPeriod: 5000 // Try reconnecting in 5 seconds if connection is lost
    }
};

// Connect to MQTT Broker Function
function pub_client_connect_mqtt_broker(client_id) {
    return mqtt.connect(connection_options(client_id));
}

function pub_mess(client, topic, i) {
    let pub_options = { qos: 1, retain: false };
    client.on("connect", () => {
        setInterval(() => {
            client.publish(
                topic,
                client.options.clientId + ' publish: ' + i.toString(),
                pub_options,
                (err) => {
                    if (err) {
                        console.log("An error occurred during publish")
                    } else {
                        console.log("Published successfully to " + topic.toString() + " with " + i.toString());
                        i++;
                    }
                });
        }, 1000);
    });
}

// Client IDs
let client_id_a21 = 'a21';
let client_id_a22 = 'a22';

// Publish topic
let pub_topic_a21 = 'a21_pub';
let pub_topic_a22 = 'a22_pub';

// Publish mess
// pub_mess(pub_client_connect_mqtt_broker(client_id_a21), pub_topic_a21, 1);
pub_mess(pub_client_connect_mqtt_broker(client_id_a22), pub_topic_a22, 100);

