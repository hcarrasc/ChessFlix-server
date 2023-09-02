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

        if (await isRegistered(email)){
            return res.status(RESP_INTERNAL_ERROR).json({ error: 'bad news Already registered' });
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const status  = process.env.INIT_USER_STATUS;
            const device = process.env.LAST_DEVICE;
            const lastLogin = new Date().getTime();;

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
        console.log(` getting ${req.body.email} and ${req.body.password}`);
        return res.status(RESP_OK).json("local aim");

        
    } catch (error) {
        return res.status(RESP_INTERNAL_ERROR).json({ error: 'Internal server error' });
    }
}

async function isRegistered(email) {
    try {
        const result = await userModel.find({ email: email });

        if (result.length === 0) {
            console.log('user do not exist, registering...');
            return false;
        } else {
            console.log('user already exist, skipping...');
            return true;
        }
    } catch (error) {
        console.error('Error:', error);
        return true;
    }
}

async function isValidLogin(params) {

        //const passwordMatch = bcrypt.compareSync(req.body.password, user.password);

    
}

