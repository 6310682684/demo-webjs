const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const hostaddr = '54.252.142.175';
const hostname = '0.0.0.0';
// const hostname = 'localhost';
const port = 3300;
const app = express();

//connecting to database
const pool = new Pool({
  user: 'postgres',
  // host: '10.0.0.91',
  // host: 'localhost',
  host: '172.31.44.28',
  //host: '172.31.44.28'(private ip of aws) ifconfig -> etho0,
  // database: 'dvdbackup',
  database: 'dvdrental', 
  password: 'pass1234', 
  port: 5432, 
})

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname ,'views', 'static')));
app.use(bodyParser.urlencoded({ extended: false }));

// Define default route to render index EJS file
app.get('/', (req, res) => {
  res.render('index');
});

// Define a route to render index EJS file
app.get('/index', (req, res) => {
  res.render('index');
});

// Define a route to render index EJS file
app.get('/about', (req, res) => {
  res.render('about');
});

// Define a route to render category EJS file
app.get('/category', (req, res) => {
  
  pool.connect((err, client, done) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    
    client.query('SELECT * FROM category ORDER BY category_id ASC', (err, result) => {
      done(); 
      if (err) {
        return console.error('Error executing query', err.stack);
        
      }

      res.render('category', { categories: result.rows });
    });
  });
});

// Define a route to render insert_data EJS file
app.get('/insert_data', (req, res) => {
  res.render('insert_data');

});

// Handle POST request to insert new data
app.post('/insert_data', (req, res) => {
  const { category_id, name } = req.body;

  pool.query('INSERT INTO category (category_id, name, last_update) VALUES ($1, $2, CURRENT_TIMESTAMP)', [category_id, name], (err, result) => {
      if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error inserting data');
          return;
      }

      res.redirect('/category');
  });
});

// Handle POST request to update data
app.get('/update', (req, res) => {
  const { category_id } = req.query;
  res.render('update', { category_id });

});

app.post('/update_data', (req,res) => {
  const { category_id,name } = req.body;

  pool.query('UPDATE category SET name = $1, last_update = CURRENT_TIMESTAMP WHERE category_id = $2', [name, category_id], (err, result) => {
    if (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error updating data');
        return;
    }

    res.redirect('/category');
  });
});

// Handle POST request to delete data
app.post('/delete', (req, res) => {
  const { category_id } = req.body;

  pool.query('DELETE FROM category WHERE category_id = $1', [category_id], (err, result) => {
      if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Error deleting data');
          return;
      }
       
      res.redirect('/category');
  });
});


// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostaddr}:${port}/index`);
});

