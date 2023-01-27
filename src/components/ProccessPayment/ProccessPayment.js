import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51LecPPBh3P6pxtij3Ow2h6IIm82T1tdeBYJ54aipvONaWRVBBcqXdAhdfYBcTTTtqCw9Zul0GT1lggVog2Wj0coP00ME8LpjJm');

const ProccessPayment = () => {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentElement />
            <button>Submit</button>
        </Elements>
    );
};

export default ProccessPayment