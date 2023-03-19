const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');
var topic = "test123lut";

function init() {
  client.on('connect', () => {
    console.log('MQTT client connected');
    client.subscribe(topic);
  });

  client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
  });
}

function publish(data) {
  const message = JSON.stringify(data);
  client.publish('mytopic', message);
}

module.exports = { setup, publish };

