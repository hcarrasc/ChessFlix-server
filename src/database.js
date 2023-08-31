import { connect } from 'mongoose';
import 'dotenv/config'

console.log(process.env.DB_URI);

connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });