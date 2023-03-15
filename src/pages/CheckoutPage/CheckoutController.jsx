import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
 
export default function Paypal() {
   return (
       <PayPalScriptProvider options={{ "client-id": "test" }}>
           <PayPalButtons style={{ layout: "horizontal" }} />
       </PayPalScriptProvider>
   );
}