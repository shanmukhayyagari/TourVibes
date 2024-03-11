import React from "react";
// import PaypalExpressBtn from 'react-paypal-express-checkout';

// export default class Paypal extends React.Component {
//     render() {
//         const onSuccess = (payment) => {
//             // Congratulation, it came here means everything's fine!
//             		console.log("The payment was succeeded!", payment);
//                     this.props.onSuccess(payment);
//             		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
//         }

//         const onCancel = (data) => {
//             // User pressed "cancel" or close Paypal's popup!
//             console.log('The payment was cancelled!', data);
//             // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
//         }

//         const onError = (err) => {
//             // The main Paypal's script cannot be loaded or somethings block the loading of that script!
//             console.log("Error!", err);
//             // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
//             // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
//         }

//         let env = 'sandbox'; // you can set here to 'production' for production
//         let currency = 'USD'; // or you can set this value from your props or state
//         let total = this.props.toPay; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
//         // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

//         const client = {
//             sandbox:    'AVdOao0LbXB015DR167pUO051ADAMUDCdSAtdKB4PrZxhAlkB5WHEjS1thWq2C2TbOIykAAs2x7IXPzN',
//             production: 'YOUR-PRODUCTION-APP-ID',
//         }
//         // In order to get production's app-ID, you will have to send your app to Paypal for approval first
//         // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
//         //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
//         // For production app-ID:
//         //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

//         // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
//         return (
//             <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel}
//             style={{
//                 size:'large',
//                 // color:'blue',
//                 shape: 'rect',
//                 label: 'checkout'
//             }}/>
//         );
//     }
// }

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// This value is from the props in the UI
const style = { layout: "vertical" };

export default class Paypal extends React.Component {
  render() {
    function createOrder() {
      // replace this url with your server
      return fetch(
        "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // use the "body" param to optionally pass additional order information
          // like product ids and quantities
          body: JSON.stringify({
            cart: [
              {
                sku: "1blwyeo8",
                quantity: 2,
              },
            ],
          }),
        }
      )
        .then((response) => response.json())
        .then((order) => {
          // Your code here after create the order
          return order.id;
        });
    }

    const onApprove = (data) => {
      console.log("came", data);
      this.props.onSuccess(data);
    };

    // Custom component to wrap the PayPalButtons and show loading spinner
    const ButtonWrapper = ({ showSpinner }) => {
      const [{ isPending }] = usePayPalScriptReducer();

      return (
        <>
          {showSpinner && isPending && <div className="spinner" />}
          <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[style]}
            fundingSource={undefined}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </>
      );
    };

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PayPalScriptProvider
          options={{ clientId: "test", components: "buttons", currency: "USD" }}
        >
          <ButtonWrapper showSpinner={false} />
        </PayPalScriptProvider>
      </div>
    );
  }
}
