const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'prescription_db'
});

app.post('/prescription-request', (req, res) => {
  const { patientName, medicine, dosage, instructions } = req.body;

  // Insert prescription request into database
  db.query(`INSERT INTO prescription_requests (patient_name, medicine, dosage, instructions) VALUES (?, ?, ?, ?)`, [patientName, medicine, dosage, instructions], (error, results) => {
    if (error) {
      res.json({ success: false, error: 'Error submitting prescription request' });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});