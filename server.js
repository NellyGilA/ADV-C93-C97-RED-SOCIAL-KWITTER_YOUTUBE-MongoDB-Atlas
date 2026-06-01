const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const uri =
"mongodb+srv://admin:1AbDMZSnJsGpoqjv@cluster0.kn45jip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

let db;

async function connectDB() {
    await client.connect();
    db = client.db("kwitter");
    console.log("MongoDB conectado");
}

connectDB();


// =========================
// CREAR SALA
// =========================

app.post("/rooms", async (req, res) => {

    const room = {
        room_name: req.body.room_name
    };

    await db.collection("rooms").insertOne(room);

    res.json({ success: true });
});


// =========================
// OBTENER SALAS
// =========================

app.get("/rooms", async (req, res) => {

    const rooms = await db
        .collection("rooms")
        .find({})
        .toArray();

    res.json(rooms);
});


// =========================
// CREAR MENSAJE
// =========================

app.post("/messages", async (req, res) => {

    const message = {
        room: req.body.room,
        name: req.body.name,
        message: req.body.message,
        like: 0
    };

    await db.collection("messages")
        .insertOne(message);

    res.json({ success: true });
});


// =========================
// OBTENER MENSAJES
// =========================

app.get("/messages/:room", async (req, res) => {

    const room = req.params.room;

    const messages = await db
        .collection("messages")
        .find({ room: room })
        .toArray();

    res.json(messages);
});


// =========================
// LIKE
// =========================

app.put("/messages/:id/like", async (req, res) => {

    const id = req.params.id;

    const message = await db
        .collection("messages")
        .findOne({
            _id: new ObjectId(id)
        });

    const likes = message.like + 1;

    await db.collection("messages")
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: { like: likes } }
        );

    res.json({ success: true });
});

app.post("/favorites", async(req,res)=>{

    await db.collection("favorites")
    .insertOne(req.body);

    res.json({
        success:true
    });

});

app.get(
"/favorites/:user",

async(req,res)=>{

    const user =
    req.params.user;

    const favoritos =
    await db.collection(
    "favorites"
    )
    .find({
        user:user
    })
    .toArray();

    res.json(
        favoritos
    );

});
app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});
