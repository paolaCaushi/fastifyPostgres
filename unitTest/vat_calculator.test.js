const  vatCalculator  = require('../../src/utils/vatCalculator');

describe("VAT calculator", () => {
  test("Should return vat excluded amount", () => {
    // 16.67
    const result = vatCalculator.calculateVat(16.67);
    expect(result).toBe(3.33);
  });

  test("Should return corrent gross amount of 20% vat", () => {
    // 16.67
    const result = vatCalculator.calculateGrossAmount(16.67);
    expect(result).toBe(20);
  });

  test("Should return corrent net amount for 20% vat", () => {
    // 20
    const result = vatCalculator.calculateNetAmount(20);
    expect(result).toBe(16.67);
  });
});