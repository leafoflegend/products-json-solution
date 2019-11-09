const express = require('express');
const chalk = require('chalk');
const path = require('path');
const db = require('./db.js');

const ourDB = db(path.join(__dirname, './data.json'), (item) => {
  return !(item.name && item.price)
});
const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/api/products', (req, res, next) => {
  ourDB.findAll()
    .then(products => {
      res.send(products);
    })
    .catch(next)
});

app.delete('/api/products/:id', (req, res, next) => {
  const { id } = req.params;

  ourDB.destroy(id)
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

app.post('/api/products', (req, res, next) => {
  const { name, price } = req.body;

  ourDB.create({ name, price })
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

app.listen(PORT, () => {
  console.log(chalk.green(`Application started on http://localhost:${PORT}`));
});
