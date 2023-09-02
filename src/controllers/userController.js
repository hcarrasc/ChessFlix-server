import userModel from '../schemas/userDTO.js';
import 'dotenv/config'
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const RESP_OK              = parseInt(process.env.RESP_OK, 10);
const RESP_INTERNAL_ERROR  = parseInt(process.env.RESP_INTERNAL_ERROR, 10);
const RESP_NO_CONTENT      = parseInt(process.env.RESP_NO_CONTENT, 10);

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(RESP_INTERNAL_ERROR).json({ errors: errors.array() });
        }
        
        const { email, password, name } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const state  = process.env.INIT_USER_STATE;
        const device = process.env.LAST_DEVICE;
        const lastLogin = new Date().getTime();;

        const user = new userModel ({
            email: email,
            password: hashedPassword,
            lastLogin: lastLogin,
            device: device,
            name: name,
            state: state
        });

        user.save();
        console.log(` user registered ${email} from ${device}`);
        res.status(RESP_OK).json(`user: ${req.body.email} OK`);
        
    } catch (error) {
        res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    try {
        console.log(` getting ${req.body.email} and ${req.body.password}`);
        res.status(RESP_OK).json("local aim");

        
    } catch (error) {
        res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error' });
    }
}

