// require("dotenv").config({path: './env});
import dotenv from "dotenv";
import connectDB from "./db/db_connection.js";

dotenv.config({
    path: "./env"
});

connectDB();




















// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.error("Error in Express app: ", error);
//             throw error;
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//         // console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }
// })()