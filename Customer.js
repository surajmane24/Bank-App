import { Account } from "./Account.js";
import { Bank } from "./Bank.js";
import { UnAuthorized } from "./UnAuthorized.js";
import { NotFound } from "./NotFound.js";
import { Validation } from "./Validation.js";

class Customer{
    static allCustomers = []
    static allBanks = []
    static id = 1
    constructor(name, isAdmin, gender){
        this.id = Customer.id++
        this.name = name
        this.isAdmin = isAdmin
        this.gender = gender
        this.accounts = []
    }
    newCustomer(name, gender){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("Unauthorized Access")
            }
            if(typeof name != 'string'){
                throw new Validation("Invalid Name Input")
            }
            if(gender != "M" && gender != "F"){
                throw new Validation("Invalid Gender, it must be M or F")
            }    
            let customer = new Customer(name,false, gender)
            Customer.allCustomers.push(customer)
            return customer
        } catch (error) {
            return error.specification
        }
    }
    static newAdmin(name, gender){
        try {
            if(typeof name != 'string'){
                throw new Validation("Invalid Name")
            }
            if(gender != "M" && gender != "F"){
                throw new Validation("Invalid Gender, it must be M or F")
            }
            return new Customer(name, true, gender)
        } catch (error) {
            return error.specification
        }
    }
    getAllCustomers(){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("Unauthorized Access")
            }
            return Customer.allCustomers
        } catch (error) {
            return error.specification
        }
    }
    static findCustomerID(customerID){
        try {
            for (let index = 0; index < Customer.allCustomers.length; index++) {
                console.log(Customer.allCustomers[index].id);
                
                
                if(customerID == Customer.allCustomers[index].id){     //====================================
                    console.log(index);
                    return index    
                }  
            }
            throw new NotFound("Customer ID Not Found")
        } catch (error) {
            throw error.specification
        }
    }
    updateCustomer(customerID, parameter, value){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("Unauthorized Access")
            }
            if(typeof customerID != 'number'){
                throw new Validation("Invalid Customer ID") 
            }
            if(typeof parameter != 'string'){
                throw new Validation("Invalid Parameter") 
            }
            if(typeof value != 'string'){
                throw new Validation("Invalid Value") 
            }
            
            let indexOfCustomer  = Customer.findCustomerID(customerID)
            switch(parameter){
                case "name":
                    return Customer.allCustomers[indexOfCustomer].name = value
                case "gender":
                    if(value != "M" && value != "F"){
                        throw new Validation("Invalid Gender, it be a M or F")    
                    }
                    return Customer.allCustomers[indexOfCustomer].gender = value
                default :
                    throw new Validation("Invalid Parameter")
            }
        }   
         catch (error) {
            return error
        }
    }
    deleteCustomer(customerID){
        try {
            if(typeof customerID != 'number'){
                throw new Validation("Invalid Customer ID") 
            }
            if(!this.isAdmin){
                throw new UnAuthorized("Unauthorized Access")
            }
            let indexOfCustomer = Customer.findCustomerID(customerID)
            Customer.allCustomers.splice(indexOfCustomer, 1)
            return "Customer Delete Success"
        } catch (error) {
            return error.specification
        }
    }
// CRUD on Bank by admin====================================================================
    createBank(name){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("Unauthorized Access")
            }
            if(typeof name != 'string'){
                throw new Validation("Invalid bank name") 
            }
     
            let bank = new Bank(name)
            Bank.allBanks.push(bank)
            return bank
        } catch (error) {
            return error.specification
        }
    }
    getAllBanks(){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("Unauthorized Access")
            }
            return Bank.allBanks
        } catch (error) {
            return error.specification
        }
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
    updateBank(bankID, name){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("Unauthorized Access")
            }
            if(typeof bankID != 'number'){
                throw new Validation("Invalid Bank ID") 
            }
            if(typeof name != 'string'){
                throw new Validation("Invalid Value") 
            } 
            let indexOfCustomer  = Customer.findBankID(bankID)
            return Bank.allBanks[indexOfCustomer].setBankName(name)
        }   
        catch (error) {
            return error.specification
        }
    }
    deleteBank(bankID){
        try {
            if(typeof bankID != 'number'){
                throw new Validation("Invalid Customer ID") 
            }
            if(!this.isAdmin){
                throw new UnAuthorized("Unauthorized Access")
            }
            let indexOfCustomer = Customer.findBankID(bankID)
            Bank.allBanks.splice(indexOfCustomer, 1)
            return Bank.allBanks
        } catch (error) {
            return error.specification
        }
    }

// CRUD on Account by Customer==============================================================
    createAccount(bankID, balance){
        try {
            if(this.isAdmin){
                throw new UnAuthorized("Admin not have access")
            }
            if(typeof bankID != 'number'){
                throw new Validation("Invalid Bank ID") 
            }
            if(typeof balance != 'number'){
                throw new Validation("Invalid Balance") 
            }
            let account = new Account(balance)
            Bank.addAccount(bankID, account)
            this.accounts.push(account)
            return this.accounts
        } catch (error) {
            return error.specification
        }
    } 
    getAllAccount(){
        try {
            if(this.isAdmin){
                throw new UnAuthorized("Admin not have access")
            }
            return this.accounts
        } catch (error) {
            return error.specification
        }
    }   
    findAccountID(accountID){
        try {
            for (let i = 0; i < this.accounts.length; i++) {
                if(accountID == this.accounts[i].getAccountID()){
                    return i
                } 
            }
            throw new NotFound("Account ID not found")
        } catch (error) {
            throw error
        }
    }
    updateAccount(accountID, newBalance){
        try {
            if(this.isAdmin){
                throw new UnAuthorized("Admin not have access")
            }
            if(typeof newBalance != 'number'){
                throw new Validation("Invalid Amount") 
            }
            console.log("shbjshbn");
            let accountIndex = this.findAccountID(accountID)
            this.accounts[accountIndex].setAccountBalance(newBalance)
            return this.accounts[accountIndex]
        } catch (error) {
            return error.specification
        }
    }
    deleteAccount(accountID){
        try {
            if(typeof accountID != 'number'){
                throw new Validation("Invalid Account ID") 
            }
            if(this.isAdmin){
                throw new UnAuthorized("Unauthorized Access")
            }
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
            let indexOfAccount = this.findAccountID(accountID)
            this.accounts.splice(indexOfAccount,1)
            Bank.deleteAccountFromBank(accountID)
            return this.accounts
        } catch (error) {
            return error.specification
        }
    }
    deposit(amount, accountID){
        try {
            if(this.isAdmin){
                throw new UnAuthorized("Admin do not have Access")
            }
            if(typeof amount != 'number'){
                throw new Validation("Invalid Amount")
            }
            if(amount<0){
                throw new Validation("Invalid Amount")
            }
            if(typeof accountID != 'number'){
                throw new Validation("invalid Account ID")
            }
            let indexOfAccount = this.findAccountID(accountID)
            this.accounts[indexOfAccount].deposit(amount)
            return this.accounts[indexOfAccount]
        } catch (error) {
            return error.specification
        }
    }
    withdraw(amount, accountID){
        try {
            if(this.isAdmin){
                throw new UnAuthorized("Admin do not have Access")
            }
            if(typeof amount != 'number'){
                throw new Validation("Invalid Amount")
            }
            if(typeof accountID != 'number'){
                throw new Validation("invalid Account ID")
            }
            let indexOfAccount = this.findAccountID(accountID)
            this.accounts[indexOfAccount].withdraw(amount)
            return this.accounts[indexOfAccount]
        } catch (error) {
            return error.specification
        }
    }
    transferMoney(amount, fromAccoutId, receiverCustomerId, receiverAccountId){
        try {
            if(this.isAdmin){
                throw new UnAuthorized("Admin do not have Access")
            }
            if(typeof amount != 'number' || amount < 0){
                throw new Validation("Invalid Amount")
            }
            if(typeof fromAccoutId != 'number'){
                throw new Validation("Invalid Account ID ")
            }
            if(typeof receiverCustomerId != 'number'){
                throw new Validation("Invalid Receiver Customer ID ")
            }
            if(typeof receiverAccountId != 'number'){
                throw new Validation("Invalid Receiver Account ID")
            }
            let indexOfReceiverCustomer = Customer.findCustomerID(receiverCustomerId)
            console.log("Inside total Net worth");
            console.log(indexOfReceiverCustomer);
            this.withdraw(amount, fromAccoutId)
            Customer.allCustomers[indexOfReceiverCustomer].deposit(amount, receiverAccountId)
        } catch (error) {
            return error.specification
        }
    }
    getPassbook(accountID){
        try {
            if(this.isAdmin){
                throw new UnAuthorized("Admin do not have Access")
            }
            if(typeof accountID != 'number'){
                throw new Validation("Invalid Account ID")
            }
            let indexOfAccount = this.findAccountID(accountID)
            return this.accounts[indexOfAccount].getPassbook()
        } catch (error) {
            return error.specification
        }
    }
//==============================================================================================
    totalNetWorth(customerID){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("User do not have Access")
            }
            if(typeof customerID != 'number'){
                throw new Validation("Invalid Customer ID")
            }
            let totalNetWorth = 0
            console.log("Inside total Net worth");
            let indexOfCustomer = Customer.findCustomerID(customerID)
            console.log("Inside total Net worth===");
            for (let i = 0; i < Customer.allCustomers[indexOfCustomer].accounts.length; i++) {
                totalNetWorth = totalNetWorth + Customer.allCustomers[indexOfCustomer].accounts[i].getAccountBalance()
                
            }

            return "Total Net Worth =>> "+totalNetWorth
        } catch (error) {
            return error.specification
        }
    }
    getAccountByBankID(bankID){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("Customer not have access")
            }
            if(typeof bankID != 'number'){
                throw new Validation("Invalid Bank ID")
            }
            return Bank.getAccountByBankID(bankID)
        } catch (error) {
            return error.specification
        }
    }
//==========All the requirments is done======================================================
    getLedger(fromDate, toDate){
        try {
            if(!this.isAdmin){
                throw new UnAuthorized("Customer not have access")
            }
            let date1 = new Date(fromDate)
            if(typeof fromDate != 'string' || date1.toString() == 'Invalid Date'){
                throw new UnAuthorized("Invalid From Date")
            }
            let date2 = new Date(toDate)
            if(typeof toDate != 'string' || date2.toString() == 'Invalid Date'){
                throw new UnAuthorized("Invalid To Date")
            }

        } catch (error) {
            return error.specification
        }
    }
}
//==============================================================================================
let a = Customer.newAdmin("Harry", "M")
let cust1 = a.newCustomer("Rajesh", "M")
let cust2 = a.newCustomer("Aniliya", "F")
let bank1 = a.createBank("ICICI")
let bank2 = a.createBank("IDBI")

// console.log(a.updateCustomer(3,"name", "zazaza"));
// console.log(a.deleteCustomer(3));
console.log(a.getAllCustomers());

// console.log(a.updateBank(1, "SBI"));
// console.log(a.deleteBank(2));
// console.log(a.getAllBanks());

console.log(cust1.createAccount(1,500));
console.log(cust1.createAccount(1,1000));
console.log(cust1.createAccount(2,1500));

console.log(cust2.createAccount(1,7777));
console.log(cust2.createAccount(2,88888));
console.log(cust2.createAccount(2,9999));
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
// console.log(a.getAllBanks());
// console.log(cust1.deleteAccount(2));
// console.log(cust1.updateAccount(2, 400));
// console.log(cust1.deposit(20, 1));
// console.log(cust1.deposit(40, 1));
// console.log(cust1.withdraw(200, 3));

//transferMoney(amount, fromAccoutId, receiverCustomerId, receiverAccountId)
// console.log(cust1.transferMoney(5, 1, 3, 6));
// console.log(cust1.getAllAccount());
// console.log(cust2.getAllAccount());

// console.log(cust1.getPassbook(1));
// console.log(cust2.getPassbook(6));

console.log(a.totalNetWorth(3));
console.log(a.getAccountByBankID(1));

console.log(a.getLedger());