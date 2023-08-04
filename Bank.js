import { Transaction } from "./Transaction.js";
export class Bank{
    static id = 1
    constructor(name){
        this.id = Bank.id++
        this.name = name
        this.accounts = []
        
    }
    static addAccount(){
        Bank.allBanks[index].accounts.push(account)
    }
    getBankID(){
        return this.id
    }
    getBankName(){
        return this.name
    }
    setBankName(name){
        this.name = name
    }
    addAccount(account){
        this.accounts.push(account)
    }
    getAllAccounts(){
        return this.accounts
    }
}