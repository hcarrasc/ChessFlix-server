/**
 * @class some validations
 */
export class Validator {

    isNumber(valor) {
        return typeof valor === 'number' && !isNaN(valor);
    }

}