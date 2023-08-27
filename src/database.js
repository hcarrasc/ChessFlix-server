import { connect } from 'mongoose';
import 'dotenv/config'

console.log(process.env.DB_URI);

connect(process.env.DB_URI).
    then(() => {
    console.log('CFX DB Up and Running 💪')
    })
    .catch(err => {
    console.error('CFX DB connection error 💩')
});