import mongoose from 'mongoose';
import 'dotenv/config'

mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

export default mongoose;