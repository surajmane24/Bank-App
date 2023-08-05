import { BaseError } from "./BaseError.js";

export class UnAuthorized extends BaseError{
    constructor(specification){
        super("Access Denied", "UnAuthorized Access", 401, specification)
    }
}
