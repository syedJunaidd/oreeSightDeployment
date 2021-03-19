import React from 'react'
import {StripeProvider} from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';
import "./style.scss";
import PricingPlan from './pricing';
import DashboardLayout from '../shared/layout/DashaboardLayout';

function Billing() {
    return (
        <DashboardLayout activeKey={4}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <PricingPlan/>
                    </div>
                </div>
                <div className="row justify-content-center mt-5 ">
                    <div className="col-5">
                        <div className="row">

                            <div className="col-12 text-center ">
                                <div className=" ">
                                    <h3>Payments</h3>


                                </div>

                            </div>


                        </div>

                    </div>
                </div>
                <div className="row  w-100 justify-content-center mt-2  ">
                    <div className=" col-md-5 card shadow ">

                        <div className="row">
                            <div className="col-12 text-center mt-2 mb-5">

                                <span className="log">Payment Method</span>
                                <small id="emailHelp" class="form-text text-muted">We accept MasterCard, PayPal, Visa,
                                    American Express, Discover
                                </small>
                            </div>
                        </div>


                        <div className="row mb-5 mt-5 ">

                            <div className="col-12">
                                <div className="text-center">
                                    <div>
                                        <StripeProvider
                                            apiKey={process.env["REACT_APP_STRIPE_KEY"]}>
                                            <MyStoreCheckout/>
                                        </StripeProvider>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* <PaymemntRequestForm/> */}
                    </div>


                </div>


            </div>

        </DashboardLayout>

    )
}

export default Billing;
