const mqtt = require('mqtt');

function connection_options(client_id) {
    return {
        port: 18833,
        host: '10.10.10.10',
        clientId: client_id,
        username: '',
        password: '',
        reconnectPeriod: 5000  // Try reconnecting in 5 seconds if connection is lost
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
                JSON.stringify(i),
                pub_options,
                (err) => {
                    if (err) {
                        console.log("An error occurred during publish")
                    } else {
                        console.log("Published successfully to " + topic.toString() + " with " + JSON.stringify(i));
                        // i++;
                        slv++;
                    }
                });
        }, 1000);
    });
}
// client.options.clientId + ' publish: ' +
// Client IDs
let client_id_a21 = 'a21';
let client_id_a22 = 'a22';
let client_id_a23 = 'a233';


// Publish topic
let pub_topic_a21 = 'a21_pub';
let pub_topic_a22 = 'a22_pub';
let pub_topic_a23 = 'a233_pub';


let slv = 1;
let mess_a23 = {
    data: {
      xuatbaocao: 0,
      stt_buongsay: 1,
      stt_rotary: 1,
      stt_mamxoay: 1,
      stt_machine: 1,
      tansothuc_buongsay: Math.floor(Math.random() * (20 - 10) ) + 10,
      tocdo_mamxoay: Math.floor(Math.random() * (30 - 10) ) + 10,
      sanluongvao: slv,
      tansothuc_rotary: Math.floor(Math.random() * (40 - 20) ) + 20,
      dattanso_buongsay: Math.floor(Math.random() * (15 - 10) ) + 10,
      dienap_mamxoay: 0,
      dienap_rotary: 0,
      tansothuc_mamxoay: 0,
      dongdien_rotary: 0,
      sanluongra: 17059,
      dattanso_rotary: 1680,
      nhietdo_thucte: 0,
      tocdo_buongsay: 0,
      tocdo_rotary: 0,
      dattanso_mamxoay: 4500,
      nhietdo_caidat: 352,
      dongdien_mamxoay: 0,
      dienap_buongsay: 0,
      dongdien_buongsay: 0
    },
    event: 'a23_pub'
  }

  // Publish mess
// pub_mess(pub_client_connect_mqtt_broker(client_id_a21), pub_topic_a21, mess_a21);
// pub_mess(pub_client_connect_mqtt_broker(client_id_a22), pub_topic_a22, mess_a22);
pub_mess(pub_client_connect_mqtt_broker(client_id_a23), pub_topic_a23, mess_a23);
