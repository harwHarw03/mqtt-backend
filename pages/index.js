let buffer = [];
let buffernow = [];

function updatePlot() {
  var cnt1 = buffer.length;
  var x = Array.from({length: buffer.length}, (v, k) => k+1);
  var y = buffer;
  var trace = {
    x: x,
    y: y,
    mode: 'lines',
    type: 'scatter'
  };
  var layout = {
    title: 'Sensor Data',
    xaxis: {title: 'Time'},
    yaxis: {title: 'Humidity'}
  };
  if (cnt1 > 15) {
    Plotly.relayout('humchart', {
      xaxis: {
        range: [cnt1-15, cnt1]
      }
    });
  }
  Plotly.newPlot('humchart', [trace], layout);
}

function mqttconnect() {
  clientID = "clientID-" + parseInt(Math.random() * 100);
  host = "broker.hivemq.com";
  port = 8000;

  client = new Paho.MQTT.Client(host, Number(port), clientID);
  //callback
  //   client.onConnectionLost = onConnectionLost;

  //connect
  setInterval(() => {
    client.connect({
      onSuccess: onConnect,
    });
  });
}

function onConnect() {
  topic = "test123l";
  client.subscribe(topic);
  client.onMessageArrived = onMessageArrived;
}

function onConnectionLost(responseObject) {
  //   console.log("onConnectionLost: connection!");
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost: " + responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  var parameters = JSON.parse(message.payloadString);
  // console.log("onMessageArrived: " + message.payloadString);
  console.log("onMessageArrived : " + parameters.hum);
//  document.getElementById("tds-value").innerHTML = parameters.tds;
  document.getElementById("humidity").innerHTML = parameters.hum;
  buffer.push(parameters.hum);
  buffernow = parameters.hum;
  if (buffer.length > 15) {
    buffer = buffer.slice(buffer.length - 15, buffer.length);
  }
  // drawPlot();
  updatePlot();
  updateScroll();
}

// app.get('/chart', (req, res) => {
//   res.render('chart', { sensorData: sensorDataBuffer });
// });