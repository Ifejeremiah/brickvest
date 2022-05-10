const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);


module.exports = function flw_verify(transactionId, expectedAmount, expectedCurrency, successCallback, errorCallback) {
  flw.Transaction.verify({ id: transactionId })
    .then((response) => {
      if (
        response.data.status === "successful"
        && response.data.amount >= expectedAmount
        && response.data.currency === expectedCurrency) {
        // Success! Confirm the customer's payment
        successCallback()
      } else {
        // Inform the customer their payment was unsuccessful
        errorCallback()
      }
    })
    .catch(console.log);
}