"use strict"

const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createCustomer = async (email) => {
    try {
        const customer = await stripe.customers.create({
            email,
        });
        if (!customer) return null;
        console.log("Customer", customer);
        return customer;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

exports.customerById = async (req, res) => {
    try {
        const { id } = req.query;
        const customer = await stripe.customers.retrieve(id);
        if (!customer) throw new Error('Customer retrieval error');
        res.status(200).json({
            message: 'Customer retrieved successfully',
            data: customer
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getCustomerPaymentMethods = async (id) => {
    try {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: id,
            type: 'card',
        });
        if (!(paymentMethods && paymentMethods.data)) return [];
        return paymentMethods.data
    } catch (error) {
        return []
    }
};

exports.customerPaymentMethods = async (req, res) => {
        try {
            const { id } = req.query;
        const paymentMethods = await stripe.paymentMethods.list({
            customer: id,
            type: 'card',
        });
        if (!(paymentMethods && paymentMethods.data)) throw new Error('Payment methods retrieval error');
        res.status(200).json({
            message: 'Payment methods retrieved successfully',
            data: paymentMethods.data
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};


exports.productById = async (req, res) => {
    try {
        const { id } = req.query;
        const product = await this.getProductById(id);
        if (!product) throw new Error('Product retrieval error');
        res.status(200).json({
            message: 'Product retrieved successfully',
            data: product
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getProductById = async (id) => {
    try {
        const product = await stripe.products.retrieve(id);
        if (!product) return null;
        return product
    } catch (error) {
        return null;
    }
};

exports.getCustomerById = async (id) => {
    try {
        const customer = await stripe.customers.retrieve(id);
        if (!customer) throw new Error('Customer retrieval error');
        return customer;
    } catch (error) {
        return null;
    }
};

exports.createSubscription = async (req, res) => {
    try {
        const { customer_id, plan_id, default_payment_method } = req.body;
        let subscriptionObject = {
            customer: customer_id,
            default_payment_method: default_payment_method,
            items: [
                {
                    plan: plan_id
                }
            ]
        };
        let subscription = await stripe.subscriptions.create(subscriptionObject);
        if (!subscription) throw new Error('Subscription unsuccessful');
        res.status(200).json({
            message: 'Subscription created successfully',
            data: subscription
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

exports.createCard = async (req, res) => {
    try {
        const { customer_id, card } = req.body;
        let cardObject = await
            stripe.customers.createSource(customer_id, {
                source: card
            });
        if (!cardObject || (cardObject && !(cardObject.id))) throw new Error('Card not added');
        res.status(200).json({
            message: 'Card added successfully',
            data: cardObject
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

exports.planList = async (req, res) => {
    try {
        let query = {};
        const {limit} = req.query;
        if (limit) { query.limit = limit };
        let stripePlan = await stripe.plans.list(query);
        if (!stripePlan) throw new Error('Error in fetching plans');
        let data = stripePlan.data;
        for await (let item of data) {
            item.product = await this.getProductById(item.product);
        }
        res.status(200).json({
            message: 'Plans fetched successfully',
            data: data
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

exports.planById = async (req, res) => {
    try {
        const {id} = req.query;
        let stripePlan = await stripe.plans.retrieve(id);
        if (!stripePlan) throw new Error('Error in fetching plan');
        res.status(200).json({
            message: 'Plan fetched successfully',
            data: stripePlan
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

exports.stripeUserInvoiceList = async (req, res) => {
    try {
        const { customer } = req.query;
        let invoice = await stripe.invoices.list({
            customer: customer
        })
        if (!(invoice && invoice.data)) throw new Error('Error in fetching invoices');
        res.status(200).json({
            message: 'Invoices fetched successfully',
            data: invoice.data
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

exports.stripeCancelUserSubscription = async (req, res) => {
    try {
        const { customer } = req.body;
        let cancellationRecord = await stripe.subscriptions.update(customer, {cancel_at_period_end: true});
        if (!cancellationRecord) throw new Error('Error in cancel subscrtiption');
        res.status(200).json({
            message: 'Subscription cancelled successfully',
            data: icancellationRecord
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

const createProduct = async (name, metadata) => {
    try {
        let query = {name: name};
        if (metadata) {
            query.metadata  = metadata;
        }
        const product = await stripe.products.create(query);
        if (!product) return null;
        return product;
    } catch (error) {
        return null;
    }
};

exports.createPrice = async (req, res) => {
    try {
        let { unit_amount, currency, interval, name } = req.body;
        let product = await createProduct(name);
        if (!product) throw new Error('Error in creating product');
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: unit_amount * 100,
            currency,
            recurring: {
                interval,
            },
        });
        if (!price) throw new Error('Error in creating price');
        res.status(200).json({
            message: 'Price created successfully',
            data: price
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

    exports.createPlan = async (req, res) => {
    try {
        let { name, amount, currency, interval, metadata } = req.body;
        let product = await createProduct(name, metadata);
        if (!product) throw new Error('Error in creating product');
        const plan = await stripe.plans.create({
            amount: amount,
            currency: currency,
            interval: interval,
            product: product.id,
        });
        if (metadata) {
            plan.metadata = metadata;
        }
        if (!plan) throw new Error('Error in creating plan');
        res.status(200).json({
            message: 'Plan created successfully',
            data: plan
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

exports.deleteSubscription = async (req, res) => {
    try {
        let { subscription_id } = req.query;
        const response = await stripe.subscriptions.del(subscription_id);
        if (!response) throw new Error('Error in deleting plan');
        res.status(200).json({
            message: 'Subscription deleted successfully',
            data: response
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
};

exports.attachPaymentMethodToCustomer = async (req, res) => {
    try {
        let { customer_id, payment_method_id } = req.body;
        const paymentMethod = await stripe.paymentMethods.attach(
            payment_method_id,
            {
                customer: customer_id
            }
        );
        if (!paymentMethod) throw new Error('Error in attaching payment method');
        res.status(200).json({
            message: 'Payment method attached successfully',
            data: paymentMethod
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: error.message
        })
    }
};

exports.subscriptionsList = async (req, res) => {
  try {
    const { limit } = req.query;
    if (limit) {
      query.limit = limit;
    }
    const subscriptions = await stripe.subscriptions.list({
      limit: 3,
    });
    
    if (!subscriptions) throw new Error("Error in fetching plans");
    let data = subscriptions.data;
    let mrr = 0;
    let calculateMrr = data.forEach((element) => {
      if (element.plan.active === true) {
        mrr = mrr + element.plan.amount;
      }
    });

    res.status(200).json({
      message: "subscriptions fetched successfully",
      data: { mrrAmount: mrr },
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};



