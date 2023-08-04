import { Validation } from "./Validation.js"
import { Transaction } from "./Transaction.js";
export class Account{
    static id = 1
    constructor( balance){
        this.id = Account.id++
        this.balance = balance
        this.passbook = []
    }
    getAccountBalance(){
        return this.balance
    }
    setAccountBalance(balance){
        this.balance = balance
    }
    getAccountID(){
        return this.id
    }
    deposit(amount){
        let oldBalance = this.balance
        this.balance += amount
        let newTransaction = new Transaction(new Date(), "Deposit", amount, oldBalance, this.balance)
        this.passbook.push(newTransaction)
        return "Balance = " + this.balance + ".  Deposit Success"
    }
    withdraw(amount){
        try {
            if(amount > this.balance){
                throw new Validation("Amount is less then balance")
            }
            let oldBalance = this.balance
            this.balance -= amount
            let newTransaction = new Transaction(new Date(), "Withdraw", amount, oldBalance, this.balance)
            this.passbook.push(newTransaction)
            return "Balance = " + this.balance + ".  Withdraw Success"
        } catch (error) {
            throw new Validation("Invalid Amount")
        }
    }
    getPassbook(){
        return this.passbook
    }
}