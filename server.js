const express = require("express");
const app = express();

const { proxy, scriptUrl } = require("rtsp-relay")(app);

const handler = proxy({
  url: `rtsp://noob.cinema.cc:1414/stream1`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
  transport: "tcp",
});

// the endpoint our RTSP uses
app.ws("/api/stream", handler);

// this is an example html page to view the stream
app.get("/", (req, res) =>
  res.send(`
  <canvas id='canvas'></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://localhost:2000/api/stream',
      canvas: document.getElementById('canvas')
    });
  </script>
`)
);

app.listen(2000);
