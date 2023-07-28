    // Name: Kripal Hiteshbhai Pandya
    // Project: InClass-4
    // Student Number: 8846574
    // Date: July 21, 2023
    // Email: Kpandya6574@conestogac.on.ca 

    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    
    app.use(express.static('public'));
    
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.listen(8080, () => {
      console.log('Server listening on local host 8080');
    });
    
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
    
    app.post('/checkout', (req, res) => {
      const { name, address, city, province, phone, email, product, quantity } = req.body;
    
      const product1Price = 5;
      const product2Price = 4;
      
      const product1Quantity = parseInt(req.body.product1);
      const product2Quantity = parseInt(req.body.product2);
      
      const total = product1Price * product1Quantity + product2Price * product2Quantity;
      
      if (total < 10) {
        res.send('Minimum purchase amount is $10');
        return;
      }
    
      // Calculation of tax
      const taxRates = {
        'AB': 0.05,
        'BC': 0.12,
        'MB': 0.13,
        'NB': 0.15,
        'NL': 0.15,
        'NT': 0.05,
        'NS': 0.15,
        'NU': 0.05,
        'ON': 0.13,
        'PE': 0.15,
        'QC': 0.14975,
        'SK': 0.11,
        'YT': 0.05
      };
      
      const taxRate = taxRates[province] || 0;

      const taxAmount = total * taxRate;
      
      const receipt = `
      <h1> Kripal's Store </h1>

      <p>Name: ${name}</p>

      <p>Address: ${address}</p>

      <p>City: ${city}</p>

      <p>Province: ${province}</p>
      
      <p>Phone: ${phone}</p>

      <p>Email: ${email}</p>

      <p>Oreo shake x ${product1Quantity.toFixed(2)} = ${product1Price.toFixed(2) * product1Quantity.toFixed(2)}</p>

      <p>Banana shake x ${product2Quantity.toFixed(2)} = ${product2Price.toFixed(2) * product2Quantity.toFixed(2)}</p>

      <p>Total: ${total.toFixed(2)}</p>

      <p>Tax (${(taxRate * 100).toFixed(2)}%): ${taxAmount.toFixed(2)}</p>

      <p>Grand Total: ${(total + taxAmount).toFixed(2)}</p>
      
      <h2>Thank you for shopping</h2>

      `;
      
      res.send(receipt);
      
    });
    