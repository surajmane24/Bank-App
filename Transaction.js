export class Transaction{
    constructor(date, remark, transactionAmount, oldBalance, newBalance){
        this.date = date
        this.remark = remark
        this.transactionAmount = transactionAmount
        this.newBalance = newBalance
        this.oldBalance = oldBalance
    }
}