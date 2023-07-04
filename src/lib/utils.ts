import * as R from 'ramda';
import { classToPlain, plainToClass } from 'class-transformer';

const obj_to_dto = (
    dto, 
    obj: object, 
    fn: Function = null
) => {
    if(R.type(fn) === 'Function'){
        obj = fn(obj);
    }
    return plainToClass(dto, obj);
}

const array_to_dto = function (
    dto,
    arr: Array<object>,
    fn: Function = null
) {
    return R.map((val) => {
        if(R.type(fn) === 'Function'){
            val = fn(val);
        }
        return this.obj_to_dto(dto, val);
    })(arr);
}

export const utils = {
    obj_to_dto,
    array_to_dto
}