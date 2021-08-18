const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    // if (interval) {
    //     clearInterval(interval);
    // }
    // interval = setInterval(() => getApiAndEmit(socket), 1000);
    // socket.on("disconnect", () => {
    //     console.log("Client disconnected");
    //     clearInterval(interval);
    // });
    const http2 = require('http2');
const http2PostRequest = (url, path, data) => new Promise((resolve, reject) => {
    console.log('url => ', url);
    console.log('data => ', data);

    const client = http2.connect(url);
    console.log(' http2.constants.HTTP2_METHOD_POST => ', http2.constants.HTTP2_METHOD_POST)
    console.log(' http2.constants.HTTP2_PATH => ', `${path}`);

    const req = client.request({
        [http2.constants.HTTP2_HEADER_SCHEME]: "https",
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        ":method": "POST",
        ":path": path
    });
    req.setEncoding('utf8');
    req.on('response', (headers, flags) => {
        console.log('headers => ', headers);
        console.log('flags => ', flags);

        req.on('data', d => {
            //console.log('data => ', JSON.parse(d));
            socket.emit("FromAPI", d);
        })

       

        req.on('close', () => {
            try {
                resolve(data);
            } catch (e) {
                resolve(e);
            }
        })
        req.on('error', error => {
            reject(error);
        })
    });
    req.write(data);
    req.end();
});

const data = {
    "sql": "SELECT * FROM ST EMIT CHANGES;",
    "properties": {"ksql.streams.auto.offset.reset": "earliest"}
};
http2PostRequest(
    "http://localhost:8088",
    "/query-stream",
    JSON.stringify(data)
).then((res) => {
    console.log('res => ', res);
})
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));