import { Transaction } from "./Transaction.js";

export class Passbook{
    constructor(date, remark, transactionAmount, balance){
        this.date = date
        this.remark = remark
        this.transactionAmount = transactionAmount
        this.balance = balance
    }
    static newPassbook(){
        
    }
}