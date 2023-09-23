/**
 * @class some validations
 */

import jwt from 'jsonwebtoken';
class Validator {

    secretKey = process.env.HASH_KEY;

    isNumber(valor) {
        return typeof valor === 'number' && !isNaN(valor);
    }

    validateToken(authHeader) {

        const token = authHeader.split(' ')[1]; // Separar el token de la cabecera
        if (!token) {
          return false;
        }
        console.log(`validando token 🗿 con ${this.secretKey}`);
        try {
            const payload = jwt.verify(token, this.secretKey);
            console.log('Token válido:', payload);
            return true;
        } catch (error) {
            console.error('Error al verificar el token:', error.message);
            return false;
        }
    }

}

export default Validator;