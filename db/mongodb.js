const mongoose= require('mongoose')

//connect to mongodb
mongoose.connect('mongodb+srv://akshayamohan2401:7oOkmi5FGBiouOpX@web-tech.7ozxi9l.mongodb.net/web-stock-summary')

//Define the schemas
const TransactionsSchema=new mongoose.Schema({
    ticker: String,
    companyName: String,
    quantity: Number,
    currentPrice: Number,

})

const WatchlistSchema=new mongoose.Schema({
    ticker: String,
    companyName: String

})

const WalletSchema=new mongoose.Schema({
   balance: Number

})
const Transactions=mongoose.model('Transactions', TransactionsSchema)
const Watchlist=mongoose.model('Watchlist', WatchlistSchema)
const Wallet=mongoose.model('Wallet', WalletSchema)



module.exports={
    Transactions,
    Watchlist,
    Wallet
}