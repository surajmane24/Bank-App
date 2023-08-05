import { BaseError } from "./BaseError.js";

export class NotFound extends BaseError{
    constructor(specification){
        super("NotFound!!!", "Not Found", 404, specification)
    }
}
