const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51PMyw7D2O3UR1xczXJ4zcJkCpmpXtPggMrf1mIZ6sjGb5hvjIHReNsy8Gz1qu5Kgk0EteaGlbfUUl9BlFR20CsCX00Fb42ZwDa');

const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello');
});

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        // Validate amount and currency
        if (!amount || !currency) {
            return res.status(400).json({ error: 'Amount and currency are required' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            payment_method_types: ['card'],
            amount,
            currency,
        });

        res.status(201).json(paymentIntent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API is running on port ${PORT}`));
