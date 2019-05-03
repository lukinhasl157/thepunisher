function mongo() {
    const mongoose = require("mongose");
    mongoose.connect("mongodb://localhost/thepunisher", { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Erro ao conectar a database!"));
    db.once("open", () => console.log("Sucesso ao conectar a mongoDB"));
}
