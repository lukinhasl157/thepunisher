const mongo = () => {
    const mongoose = require("mongoose");
    const db = mongoose.connection;
    mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true });
    db.on("error", console.error.bind(console, "Ocorreu um erro ao conectar a database."));
    db.once("open", () => console.log("A conexão com a MongoDB foi realizada com sucesso!"))
}
module.exports = mongo;