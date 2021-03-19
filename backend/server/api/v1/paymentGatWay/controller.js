const stripe = require('stripe')(process.env.STRIPE_SECRET);


exports.createCustomer = async (req, res) => {
    console.log(req.body);
    try {
        const { source, email } = req.body

        const customer = await stripe.customers.create({
            source,
            email,
        });

        if (!customer) throw new Error('Customer unsuccessful');

        console.log("Customer", customer);
        res.status(200).json({
            message: 'Customer Created successfully successfully',
            customer
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};


exports.postCharge = async (req, res) => {
    console.log(req.body);
    try {
        const { amount, customer } = req.body

        const charge = await stripe.charges.create({
            amount,
            currency: 'pkr',
            customer,
        })

        if (!charge) throw new Error('charge unsuccessful')

        res.status(200).json({
            message: 'charge posted successfully',
            charge
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};



