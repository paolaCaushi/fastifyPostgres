class VatCalculator {
    calculateVat(net_amount) {
      return Math.round(net_amount * 0.2 * 1e2) / 1e2;
    }
    calculateGrossAmount(net_amount) {
      return Math.round(net_amount * 1.2 * 1e2) / 1e2;
    }
    calculateNetAmount(gross_amount) {
      return Math.round((gross_amount / 1.2) * 1e2) / 1e2;
    }
  }
  
  const vatcalculator = new VatCalculator();
  
  module.exports = {
    vatcalculator,
  };