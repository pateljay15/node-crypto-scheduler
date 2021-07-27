const cors = require("cors")
const bodyParser = require("body-parser")
const axios = require("axios")
const cron = require("node-cron")
const express = require("express")
const app = express()

app.use(bodyParser.json())
app.use(cors())

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // console.log("What is socket: ", socket);
  // console.log("Socket is active to be connected");


  cron.schedule("*/30 * * * * *", () => {

    const API = `https://api.nomics.com/v1/currencies/ticker?key=cbd1795669ba0116a656db6c0fcfbd1f55de6357&interval=1d,30d&convert=USD&per-page=100&page=1`
    axios.get(API)
    .then(response => {
      // console.log("RESPONSE")
      io.emit("chat", response.data);
    })
    .catch(err => {
        const payload = []
        io.emit("chat", payload);
    })
  })
  // socket.on("chat", (payload) => {
  //   console.log("What is payload", payload);
  //   io.emit("chat", payload);
  // });
});


server.listen(5000, () => {
  console.log("Server is listening at port 5000...");
});

// app.post('/fetch', (req, res) => {
//     const { currency, cryptos } = req.body
//     console.log(currency)
//     const API = `https://api.nomics.com/v1/currencies/ticker?key=cbd1795669ba0116a656db6c0fcfbd1f55de6357&interval=1d,30d&convert=${currency}&per-page=100&page=1`
//     axios.get(API)
//     .then(response => {
//         res.status(200).json(response.data)
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(200).json([])
//     })
// })

// app.post('/fetchfav', (req, res) => {
//     const {currency, fav} = req.body.info
//     const API = `https://api.nomics.com/v1/currencies/ticker?key=bd3ef17b17e9b8152a9c539636b718bceade570c&ids=${fav}&interval=1d,30d&convert=${currency}`
//     axios.get(API)
//     .then(response => {
//         res.status(200).json(response.data)
//     })
// })


// const PORT = 8000 || process.env.PORT

// app.listen(PORT, () => {
//     console.log(`listening to port ${PORT}`)
// })