import mongoose from "mongoose";
let isConnected;

const connectToDatabase = async () => {
    if (isConnected) return;

    try {
        const mongodbUri = process.env.MONGODB_URI;
        if (!mongodbUri) {
            console.log('MongoDB URI not found in .env file');
            process.exit(1);
        }

        const db = await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
        throw err;
    }
};



export default connectToDatabase;
