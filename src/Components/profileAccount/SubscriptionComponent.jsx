import React, { useEffect, useState } from 'react';
import '../../css/profileAccount/SubscriptionComponentCss.css';
import { createOrder, getSubscriptionAmount } from '../../Services/userAccountApiService'; // Update the path as necessary
import { RAZORPAY_KEY_ID } from '../../Services/razorpayUtil';
import auth from '../../auth';

const SubscriptionComponent = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [amount, setAmount] = useState(null);
    const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSelectPlan = async (plan) => {
        setSelectedPlan(plan);
        console.log("Selected plan:", plan); // Should print "monthly"
        try {
            const subscriptionPlan = { subscriptionPlan: plan }; // Pass the selected plan directly
            const response = await getSubscriptionAmount(subscriptionPlan); // Await the response
            console.log("API Response:", response); // Log the full response to inspect its structure
            if (response && response.subAmount) {
                setAmount(response.subAmount); // Set the amount in state
                console.log("Subscription Amount:", response.subAmount);
            } else {
                console.error("subAmount is undefined or missing in the response");
            }
        } catch (error) {
            console.log("Cannot get subscription amount at handleSelectPlan method", error);
        }
    };

    const paymentStart = async () => {
        const token = auth.getToken();
        console.log("Payment started");
        console.log(amount);
    
        if (amount == null || amount === "") {
            alert("Error fetching subscription amount from the servers. Please try later.");
            return;
        }
    
        try {
            const subscriptionOrder = { subscriptionPlan: selectedPlan };
            const response = await createOrder(subscriptionOrder, token);
            console.log("Order creation response:", response); // Log the entire response
    
            // Check the structure of response.data
            if ( response) {
                const { status, amount, id } = response.data;
                console.log("Response data:", response.data); // Log the data to check its structure
    
                if (status === "created") {
                    let options = {
                        key: RAZORPAY_KEY_ID,
                        amount: amount, // Ensure the amount is in paise
                        currency: 'INR',
                        name: 'GuidebookX',
                        description: 'Activating subscription plan',
                        image: `${BASE_URL}logoblack.jpg`,
                        order_id: id, // Use the order ID from the response
                        handler: function (response) {
                            console.log(response.razorpay_payment_id);
                            console.log(response.razorpay_order_id);
                            console.log(response.razorpay_signature);
                            console.log('Payment successful');
    
                            // Update payment status on server, etc.
                        },
                        prefill: {
                            name: "",
                            email: "",
                            contact: ""
                        },
                        notes: {
                            address: "GuidebookX"
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };
    
                    var rzp = new window.Razorpay(options);
                    rzp.on('payment.failed', function (response) {
                        console.log(response.error.code);
                        console.log(response.error.description);
                        console.log(response.error.source);
                        console.log(response.error.step);
                        console.log(response.error.reason);
                        console.log(response.error.metadata.order_id);
                        console.log(response.error.metadata.payment_id);
                        alert("Oops, payment failed.");
                    });
                    rzp.open();
                } else {
                    console.error("Order creation failed or status is not 'created'");
                }
            } else {
                console.error("Response or response.data is undefined");
            }
        } catch (error) {
            console.error('Error creating order', error);
        }
    };
    

    return (
        <div className="subscription-container">
            <h2>Subscription Plan</h2>
            <div className="subscription-cards">
                <div 
                    className={`subscription-card ${selectedPlan === 'monthly' ? 'selected' : ''}`} 
                    onClick={() => handleSelectPlan('monthly')}
                >
                    <h3>Monthly Subscription</h3>
                    <p>₹20/month</p>
                    <p className="availability">Available</p>
                </div>
                <div 
                    className={`subscription-card unavailable ${selectedPlan === 'yearly' ? 'selected' : ''}`} 
                    onClick={() => handleSelectPlan('yearly')}
                >
                    <h3>Yearly Subscription</h3>
                    <p>Not Available</p>
                </div>
            </div>
            <button 
                id="rzp-button1" 
                className={`checkout-button ${selectedPlan ? 'active' : ''}`} 
                onClick={paymentStart} 
                disabled={!selectedPlan}
            >
                Pay with Razorpay
            </button>
        </div>
    );
};

export default SubscriptionComponent;





// import React, { useEffect, useState } from 'react';
// import '../../css/profileAccount/SubscriptionComponentCss.css';

// const SubscriptionComponent = () => {
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [amount, setAmount] = useState(null);
//     const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
    
//     const handleSelectPlan = (plan) => {
//         setSelectedPlan(plan);
//         // Send a request to backend to get the value of the selected plan
//         // And set that amount to state amount
//     };
//     const paymentStart = () => {
//         console.log("payment started")
//         console.log(amount);
//         if(amount == null || amount === ""){
//             alert("Error fetching subscription amount from the servers. Please try later")
//             return;
//         }

//         //Send a request to the server to create order
//         try {
//             const response = await createOrder(amount); //createOrder import from js file for user api service
//             //send a data object in the format {amount : amount}

//             data:JSON.stringify({amount : amount, info:'order_request'})
//             contentType: 'application/json',
//             type:'POST'
//             dataType: 'json',
            
//             if(response.status === "created"){ 
//                 //check first in the latest version, if the status is "created" only after creating an order
//                 // open payment form

//                 // Ask chatgpt how to integrate this script
//                 // <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

//                 let options={
//                     "key": "YOUR_KEY_ID", //Make a separate file for Key Id and import here and '${key_id}'
//                     "amount": response.amount,
//                     "currency":'INR',
//                     "name":'GuidebookX',
//                     "description":'Donation',
//                     "image":`${BASE_URL}logoblack.jpg`,
//                     "order_id": response.id,
//                     "handler": function (response) {
//                         console.log(response.razorpay_payment_id);
//                         console.log(response.razorpay_order_id);
//                         console.log(response.razorpay_signature);
//                         console.log('payment successfull')
                        
//                         //You can use sweet alert CDN - see the video to get the site link to copy the code

//                         // update payment on server - create a method for it
//                         // you can pass properties - response.razorpay_payment_id and response.razorpay_order_id and status "paid"
//                         // activate the monthly subscription
//                         // In this separate method create try catch and display alert("congrats !! Payment successfull !!")
//                         // or if some errors happens write "Your payment is successfull but we could not capture it on server. We will contact as ASAP and activate your subscription" 
//                     },
//                     "prefill": {
//                         "name": "",
//                         "email": "",
//                         "contact": ""
//                     },
//                     "notes": {
//                         "address": "GuidebookX"
//                     },
//                     "theme": {
//                         "color": "#3399cc"
//                     }
//                 };

//                 //Initiate payment
//                 let rzp = new Razorpay(options);
//                 rzp.on('payment.failed', function (response){
//                     console.log(response.error.code);
//                     console.log(response.error.description);
//                     console.log(response.error.source);
//                     console.log(response.error.step);
//                     console.log(response.error.reason);
//                     console.log(response.error.metadata.order_id);
//                     console.log(response.error.metadata.payment_id);
//                     alert("Oops payment failed.")
//                 });
//                 rzp.open(); //This opens the razor pay form
//             }
//           } catch (error) {
//             console.error('Error creating order');
//           }

//     };

//     const handleCheckout = () => {
//         // Logic to send request to backend for the selected plan
//         // This will be filled later
//     };

//     return (
//         <div className="subscription-container">
//             <h2>Subscription Plan</h2>
//             <div className="subscription-cards">
//                 <div 
//                     className={`subscription-card ${selectedPlan === 'monthly' ? 'selected' : ''}`} 
//                     onClick={() => handleSelectPlan('monthly')}
//                 >
//                     <h3>Monthly Subscription</h3>
//                     <p>₹20/month</p>
//                     <p className="availability">Available</p>
//                 </div>
//                 <div 
//                     className={`subscription-card unavailable ${selectedPlan === 'yearly' ? 'selected' : ''}`} 
//                     onClick={() => handleSelectPlan('yearly')}
//                 >
//                     <h3>Yearly Subscription</h3>
//                     <p>Not Available</p>
//                 </div>
//             </div>
//             <button 
//                 className={`checkout-button ${selectedPlan ? 'active' : ''}`} 
//                 // onClick={paymentStart} 
//                 disabled={!selectedPlan}
//             >
//                 Checkout
//             </button>
//         </div>
//     );
// };

// export default SubscriptionComponent;
