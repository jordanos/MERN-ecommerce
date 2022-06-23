class IpnModel {
  constructor(from, amount, transactionId, status) {
    this.from = from;
    this.amount = amount;
    this.transactionId = transactionId;
    this.status = status;
  }
}

exports.factoryYenepay = (req) => {
  console.log('ipn received');
  const from = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const amount = req.body.TotalAmount;
  const transactionId = req.body.TransactionId;
  const status = req.body.Status;

  return new IpnModel(from, amount, transactionId, status);
};
