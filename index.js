const express = require('express')
const axios = require('axios')
var cors = require("cors");
const { Watchlist, Wallet } = require('./db/mongodb');
const app = express()
app.use(express.json());
app.use(cors());
API_KEY = 'cn0o5h1r01quegsk0bp0cn0o5h1r01quegsk0bpg'

const { Transactions } = require('./db/mongodb')

//Home route
app.get('/', (req, res) => {
    res.redirect('/search/home');
})

//Search Route
app.get('/', (req, res) => {
    console.log(__dirname);
    const filePath = "C:/Web Tech/Assignment-3/stock_summary_advanced/frontend/index.html";
    res.sendFile(filePath);
});

app.get('/search/:ticker', async (req, res) => {
    const ticker = req.params.ticker

    try {
        const response = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`)
        const { data } = response
        console.log({ data })
        res.json(data)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})

app.get('/summary/:ticker', async (req, res) => {
    const ticker = req.params.ticker

    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`)
        const { data } = response
        console.log({ data })
        res.json(data)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})

app.get('/searchAuto/:autoc', async (req, res) => {
    const autoc = req.params.autoc

    try {
        const response = await axios.get(`https://finnhub.io/api/v1/search?q=${autoc}&token=${API_KEY}`)
        const { data } = response
        console.log({ data })
        res.json(data)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})

https://finnhub.io/api/v1/stock/peers?symbol=<TICKER>&token=<API_KEY>

//company peers
app.get('/companyPeers/:ticker', async (req, res) => {
    const ticker = req.params.ticker

    try {
        const response = await axios.get(`https://finnhub.io/api/v1/stock/peers?symbol=${ticker}&token=${API_KEY}`)
        const { data } = response
        console.log({ data })
        res.json(data)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})


function getDate() {
    // Get today's date
    let today = new Date();

    // Get the date 5 days ago
    let fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    // Format dates as "yyyy-mm-dd"
    let formattedToday = formatDate(today);
    let formattedFiveDaysAgo = formatDate(fiveDaysAgo);

    return {
        today: formattedToday,
        fiveDaysAgo: formattedFiveDaysAgo
    };
}
let dates = getDate()

function formatDate(date) {
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}
app.get('/topNews/:ticker', async (req, res) => {
    const ticker = req.params.ticker

    try {
        const response = await axios.get(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${dates.fiveDaysAgo}&to=${dates.today}&token=${API_KEY}`)
        const { data } = response
        console.log({ data })
        res.json(data)


    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})

app.get('/charts/:ticker', async (req, res) => {
    const ticker = req.params.ticker

    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`)
        const { data } = response
        console.log({ data })
        res.json(data)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})




let today = new Date();
let yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)

let twoYearsAgo = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
todayDate = formatDate(today)
twoYearsAgoDate = formatDate(twoYearsAgo)


app.get('/polygonCharts/:ticker', async (req, res) => {
    const ticker = req.params.ticker
    try {

        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${twoYearsAgoDate}/${todayDate}?adjusted=true&sort=asc&apikey=eDn0I5k29M2V9mW6f_AWFl1_XYKNgob7`)
        const polyChart = response.data
        console.log(polyChart.results)
        res.json(polyChart.results)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})

app.get('/polygonChartsSummaryTab/:ticker', async (req, res) => {
    const ticker = req.params.ticker
    try {

        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/hour/${yesterday}/${todayDate}?adjusted=true&sort=asc&apikey=eDn0I5k29M2V9mW6f_AWFl1_XYKNgob7`)
        const { data: { results } } = response
        console.log({ data: { results } })
        res.json(results.results)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})

//Insights route
app.get('/insights/:ticker', async (req, res) => {
    const ticker = req.params.ticker
    try {

        const response = await axios.get(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${ticker}&token=${API_KEY}`)
        const { data } = response
        res.json(data)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }

})

app.get('/reccommendationTrends/:ticker', async (req, res) => {
    const ticker = req.params.ticker
    try {

        const response = await axios.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${ticker}&token=${API_KEY}`)
        const { data } = response
        res.json(data)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})
app.get('/companyEarnings/:ticker', async (req, res) => {
    const ticker = req.params.ticker
    try {

        const response = await axios.get(`https://finnhub.io/api/v1/stock/earnings?symbol=${ticker}&token=${API_KEY}`)
        const { data } = response
        res.json(data)

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})

//Watchlist route
app.get('/watchlist', async (req, res) => {
    try {
        console.log("Watchlist")
        let response = []
        response = await Watchlist.find({})

        res.json({
            response
        })
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }


})

app.get('/watchlist/:ticker', async (req, res) => {
    const ticker = req.params.ticker

    try {
        console.log("Watchlist")
        const response = await Watchlist.findOne({
            ticker
        })

        res.json({
            response
        })
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }




})

app.post('/watchlist', async (req, res) => {
    const ticker = req.body.ticker
    const companyName = req.body.companyName

    try {
        const response = await Watchlist.create({
            ticker,
            companyName

        })
        res.json({
            msg: "Success"
        })

    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }


})

app.delete('/watchlist/:ticker', async (req, res) => {
    const ticker = req.params.ticker
    try {


        const response = await Watchlist.deleteOne({
            ticker
        })
        res.json({
            msg: "Deleted sucessfully"
        })
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }


})
//Portfolio Route




app.get('/transactions', async (req, res) => {
    let response = []
    try {
        response = await Transactions.find({})
        res.json({
            response
        })
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }

})

app.get('/transactions/:ticker', async (req, res) => {

    const ticker = req.params.ticker
    try {
        const response = await Transactions.findOne({
            ticker
        })

        res.json({
            response
        })
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }

})

app.delete('/transactions', async (req, res) => {
    const ticker = req.body.ticker
    try {
        const response = await Transactions.deleteOne({ ticker })
        console.log(response)
        res.json({ "MSG": "DELETED sUCCESSFULLY" })
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }

})



app.put('/transactions', async (req, res) => {
    const { ticker, quantity, currentPrice } = req.body;
    try {
        const response = await Transactions.updateOne(
            { ticker },
            {
                quantity,
                currentPrice

            }
        )
        res.json({
            msg: "Success"
        })
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})

app.post('/transactions', async (req, res) => {
    const { ticker, companyName, quantity, currentPrice } = req.body;
    try {

        const response = await Transactions.create({
            ticker,
            companyName,
            quantity,
            currentPrice,
        })
        res.json({
            msg: "Success"
        })
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})



app.get('/wallet', async (req, res) => {
    try {
        const response = await Wallet.findOne({})
        res.json(response.balance)
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})

app.put('/wallet', async (req, res) => {
    const bal = req.body.balance
    try {
        const response = await Wallet.updateOne({
            balance: bal
        })
        res.json(response)
    } catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})
app.get('/portfolio', async (req, res) => {
    try {
        const response = await Transactions.find({})
        res.json(response)
    }
    catch (error) {
        console.error("Error fetching data from the API", error);
        res.status(500).json({ error: "An unexpected error occured while fetching data" })
    }
})
app.listen(3000, () => {
    console.log(`Server is listening at https://localhost:3000`)
})


// https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_API_KEY}'