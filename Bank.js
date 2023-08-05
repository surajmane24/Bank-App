import { NotFound } from "./NotFound.js";
import { Validation } from "./Validation.js";
export class Bank{
    static id = 1
    static allBanks =[]
    constructor(name){
        this.id = Bank.id++
        this.name = name
        this.accounts = []
        
    }
    static addAccount(bankID, account){
        let index = Bank.findBankID(bankID)
        Bank.allBanks[index].accounts.push(account)
    }
    static findBankID(bankID){
        try {
            for (let index = 0; index < Bank.allBanks.length; index++) {
                if(bankID == Bank.allBanks[index].getBankID()){     //====================================
                    return index    
                }  
            }
            throw new NotFound("Bank ID Not Found")
        } catch (error) {
            throw error.specification
        }
    }
    static getAccountByBankID(bankID){
        try {
            if(typeof bankID != 'number'){
                throw new Validation("Invalid Bank ID")
            }
            let index = Bank.findBankID(bankID)
            return Bank.allBanks[index].accounts
        } catch (error) {
            return error.specification
        }
    }  

    static findAccountIDinBank(accountID){
        try {
            for (let index = 0; index < Bank.allBanks.length; index++) {
                for (let i = 0; i < Bank.allBanks[index].accounts.length; i++) {
                    if(accountID == Bank.allBanks[index].accounts[i].getAccountID()){
                        return [index, i]
                    } 
                }      
            }        
            throw new NotFound("Account ID not found")
        }catch (error) {
            throw error
        }
    }
    static deleteAccountFromBank(accountID){
        try {
            if(typeof accountID != 'number'){
                throw new Validation("Invalid Account ID")
            }
            // let index = Bank.findBankID(bankID)
            let [bankIndex, accountIndex] = Bank.findAccountIDinBank(accountID)
            return Bank.allBanks[bankIndex].accounts.splice(accountIndex,1)
        } catch (error) {
            return error.specification
        }
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
    getAllAccounts(){
        return this.accounts
    }
}
