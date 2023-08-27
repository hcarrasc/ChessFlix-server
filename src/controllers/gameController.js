import { Router } from 'express';
import { validator } from '../utils/validators.js';

const router = Router();
const validations = new validator();

router.get('/featured', (req, res) => {
   res.send(`Obteniendo juego destacado`);
});

router.get('/training', (req, res) => {
    const player = req.params.player;
    res.send(`Obteniendo random trining position`);
});

router.get('/:page', (req, res) => {
    const page = parseInt(req.params.page);
    if (validations.isNumber(page)){
        res.send(`Obteniendo full BD pagina ${page}`);
    } else {
        res.send(`invalid parameter for: ${page}`);
    } 
});

// Ruta para crear un nuevo elemento
/*router.post('/featured', (req, res) => {
   const newTodo = req.body;
   todos.push(newTodo);
   res.json(newTodo);
   console.log(res);
});*/

export default router;