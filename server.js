const express = require("express");
const app = express();

const { proxy, scriptUrl } = require("rtsp-relay")(app);

const handler = proxy({
  url: `rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
  transport: "tcp",
});
const PORT = process.env.PORT || 2000;
// the endpoint our RTSP uses
app.ws("/api/stream", handler);

// this is an example html page to view the stream
app.get("/", (req, res) =>
  res.send(`
  <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}
>
  <canvas id='canvas'></canvas>
</div>
  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: "ws://rtsp.vercel.app:${PORT}/api/stream",
      canvas: document.getElementById('canvas')
    });
  </script>
`)
);

app.listen(PORT);
