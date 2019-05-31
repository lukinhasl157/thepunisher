let mongo = () => {
    const mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/Cluster0", { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Erro ao conectar a database!"));
    db.once("open", () => console.log("Sucesso ao conectar a mongoDB"));
}
module.exports = mongo;