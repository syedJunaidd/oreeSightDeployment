import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import axios from 'axios';

import CardSection from './CardSection';
 
class CheckoutForm extends React.Component {









  handleSubmit = (ev) => { 
    alert("button clicked")
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

 
    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    // because only one is allowed.
    // See our getElement documentation for more:
    // https://stripe.com/docs/stripe-js/reference#elements-get-element
    const cardElement = this.props.elements.getElement('card');
    
    // From here we can call createPaymentMethod to create a PaymentMethod
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    this.props.stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {name: 'Jenny Rosen'},
      })
      .then( async (paymentMethod) => {
        console.log('Received Stripe PaymentMethod:',paymentMethod.paymentMethod.id)
        const paymentId = paymentMethod.paymentMethod.id;
    let user = JSON.parse(localStorage.getItem('user'))
    const customerId = user.customer.id ;

    const customerPayment = {customer_id: customerId, payment_method_id: paymentId}
  

         let res = await axios.post(`${process.env["REACT_APP_API_URL"]}api/v1/stripe/attachPaymentMethodToCustomer`,customerPayment)
   
         console.log('Received Stripe PaymentMethod:',res);
      })
       .catch((ex) => {
       console.log("error");
         console.log(ex);
       });
     console.log("card element");
     console.log(cardElement);
 
    // You can also use confirmCardPayment with the PaymentIntents API automatic confirmation flow.
    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    // this.props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
    //   payment_method: {
    //     card: cardElement,
    //   },
    // });
 
    // You can also use confirmCardSetup with the SetupIntents API.
    // See our confirmCardSetup documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-setup
    // this.props.stripe.confirmCardSetup('{PAYMENT_INTENT_CLIENT_SECRET}', {
    //   payment_method: {
    //     card: cardElement,
    //   },
    // });
 
    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    // With createToken, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});
 
    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    // With createSource, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    // this.props.stripe.createSource({
    //   type: 'card',
    //   owner: {
    //     name: 'Jenny Rosen',
    //   },
    // });
  };
 
  render() {




    return (
      <form onSubmit={this.handleSubmit}>
   
        <CardSection />
        <button className="btn btn-success">Add Card</button>
      </form>
    );
  }
}
 
export default injectStripe(CheckoutForm);