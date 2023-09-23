import userModel from '../schemas/userDTO.js';
import 'dotenv/config'
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const RESP_OK              = parseInt(process.env.RESP_OK, 10);
const RESP_INTERNAL_ERROR  = parseInt(process.env.RESP_INTERNAL_ERROR, 10);
const RESP_NO_CONTENT      = parseInt(process.env.RESP_NO_CONTENT, 10);
const secretKey            = process.env.HASH_KEY;

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(RESP_INTERNAL_ERROR).json({ errors: errors.array() });
        }
        const { email, password, name } = req.body;

        if (await getUserFromDB(email)){
            return res.status(RESP_INTERNAL_ERROR).json({ error: 'email invalid to register' });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const status  = process.env.INIT_USER_STATUS;
            const device = process.env.LAST_DEVICE;
            const lastLogin = new Date().getTime();

            const user = new userModel ({
                email: email,unique: true,
                password: hashedPassword,
                lastLogin: lastLogin,
                device: device,
                name: name,
                status: status
            });
            user.save();
            console.log(` user registered ${email} from ${device}`);
            return res.status(RESP_OK).json(`user: ${req.body.email} OK`);
        }
    } catch (error) {
        return res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error' });
    }
}

export const login = async (req, res) => {

    try {
        let result = await userModel.find({ email: req.body.email });
        const passwordMatch = bcrypt.compareSync(req.body.password, result[0].password);
        if (passwordMatch) {
            let token = jwt.sign({ email: req.body.email }, secretKey, { expiresIn: '30m' });
            result[0].password = token;
            return res.status(RESP_OK).json(result[0]);
        } else {
            return res.status(RESP_NO_CONTENT).json("login error... check your user and pass");
        }
    } catch (error) {
        return res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal login error' });
    }
}

async function getUserFromDB(email) {
    try {
        const result = await userModel.find({ email: email });
        if (result.length === 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return true;
    }
}