
export class validator {

    isNumber(valor) {
        return typeof valor === 'number' && !isNaN(valor);
    }

}