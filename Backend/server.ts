const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

//remove cross origin errors
app.use(cors());

const transactionData = require('./transactions.json');

app.get('/', (req: any, res: any) => {
  console.log(req.body);
  console.log('status success');
  res.send('OK');
});

app.get('/api/transactions', (req: any, res: any) => {
  res.send(transactionData);
});


// get transactions by date 
app.get('/api/transactions/:id', (req: any, res: any) => {
  const filteredTransactions = transactionData.days.filter((dayTransaction: any) => dayTransaction.id === req.params.id);
  const result = filteredTransactions[0].transactions;
  res.send(result);
});

//todo: get transactions by date-range

app.listen(8080, () => {
  console.log('Express app listening on port 8080!');
});
