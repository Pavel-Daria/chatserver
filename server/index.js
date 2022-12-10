const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const topicRouter = require("./routes/topic");
const {initDb} = require("./db/db");
const events = require('events')
const app = express();

const  emitter = new events.EventEmitter();

// чтобы парсился POST в виде JSON
app.use(express.json());

// чтобы парсились куки
app.use(cookies());

app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: true // автоматом подставляется текущий сервер в Origin
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ok: true});
});
app.get('/get-messages', (req, res) => {
    emitter.once('newMessage',(message) => {
        res.json(message)
    })
})

app.post('/new-messages',((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200);

}))

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/topic", topicRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(async function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = process.env.PORT || 3001;
(async () => {
    await initDb();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    });
})();
