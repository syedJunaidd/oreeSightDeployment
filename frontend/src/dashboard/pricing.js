import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import "./style.scss";

const PricingPlan = () => {
    const [allPlan, setAllPlan] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/v1/stripe/planList`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setAllPlan(res.data.data);
        })();
    }, []);

    const handleClick = async (id) => {
        let user = JSON.parse(localStorage.getItem('user'));
        const customerId = user.customer.id;
        if (!user.paymentMethods || (user.paymentMethods && !user.paymentMethods.length)) {
            alert("You can't subscribe to any package because you have not setup any payment method");
            return false;
        }
        const paymentId = user.paymentMethods[0].id
        const PlanSelected = {
            customer_id: customerId, plan_id: id, default_payment_method: paymentId
        }
        try {
            const res = await axios.post(`${process.env["REACT_APP_API_URL"]}api/v1/stripe/createSubscription`, PlanSelected)
            console.log(res);
            if (res.status == 200) {
                alert("You have successfully subscribed.")
            }

        } catch (error) {
            console.log('response', error)
            alert("An error occured, try on some later time");
        }
    }
    return (
        <>
            <section class="content-header mt-3 mb-3">
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="ml-2 text-dark">Plans</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item "><Link to={`/dashboard`}>Dashboard</Link></li>
                                <li class="breadcrumb-item active">Plans</li>

                            </ol>
                        </div>
                    </div>

                </div>
            </section>
            <div className="container-fluid">
                <div className="row justify-content-center ">
                    {
                        allPlan.map((item, index) => (

                                <div className="col-3   text-center planrecommended mr-1" key={index}>
                                    <div className="row mb-3">
                                    </div>
                                    <h1 className="text-white">{item.product.name}</h1>
                                    <h3 className="text-white">{item.amount} /month </h3>
                                    <ul class="features">
                                        {(item.product.metadata.features.split(',')).map((feature) => <li
                                            data-v-446d255c="" class="feature">{feature}</li>)}
                                    </ul>
                                    <button className="recbtn" onClick={() => handleClick(item.id)}>Subscribe to {item.product.name}
                                    </button>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default PricingPlan;