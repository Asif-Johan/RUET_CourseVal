import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection : connectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Database Already connected ase");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "" , {});

        connection.isConnected = db.connections[0].readyState;
        console.log("Database Connected hoise: ", db);
        
    } catch (error) {
        console.log("databse connection fail korse");
        console.log(error);
        process.exit(1);
    }


}

export default dbConnect;