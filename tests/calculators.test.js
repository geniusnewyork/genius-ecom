import assert from 'node:assert/strict';

console.log('--- Testing Calculator Formulas ---');

// 1. Profit Calculator
function calculateProfit({ productCost, packagingCost, shippingCost, marketplaceFeePct, gstPct, advertisingCost, otherCost, sellingPrice, returnCost, discountPct }) {
  const discountAmount = (sellingPrice * discountPct) / 100;
  const finalSellingPrice = sellingPrice - discountAmount;
  const marketplaceFeeAmount = (finalSellingPrice * marketplaceFeePct) / 100;
  const baseAmount = finalSellingPrice / (1 + gstPct / 100);
  const gstAmount = finalSellingPrice - baseAmount;
  const totalCost = productCost + packagingCost + shippingCost + marketplaceFeeAmount + gstAmount + advertisingCost + otherCost + returnCost;
  const netProfit = finalSellingPrice - totalCost;
  const profitMargin = finalSellingPrice > 0 ? (netProfit / finalSellingPrice) * 100 : 0;
  
  const fixedCosts = productCost + packagingCost + shippingCost + advertisingCost + otherCost + returnCost;
  const effectiveFeeRate = (marketplaceFeePct / 100) + (1 - (1 / (1 + gstPct / 100)));
  const breakEvenSellingPrice = fixedCosts / (1 - effectiveFeeRate);

  return { finalSellingPrice, totalCost, netProfit, profitMargin, breakEvenSellingPrice };
}

// Case 1: Simple cost 100, packaging 10, shipping 50, SP 499, 10% fee, 18% GST, ads 20, other 5
const p1 = calculateProfit({
  productCost: 100,
  packagingCost: 10,
  shippingCost: 50,
  marketplaceFeePct: 10,
  gstPct: 18,
  advertisingCost: 20,
  otherCost: 5,
  sellingPrice: 499,
  returnCost: 0,
  discountPct: 0
});
assert.ok(p1.netProfit > 0, 'Net profit should be positive');
assert.ok(p1.profitMargin > 0, 'Profit margin should be positive');
assert.ok(p1.breakEvenSellingPrice < 499, 'Break-even price should be lower than selling price');
console.log('✓ Profit Calculator: Standard profitable order passed');

// Case 2: Zero margin break-even test
const p2 = calculateProfit({
  productCost: 100,
  packagingCost: 0,
  shippingCost: 0,
  marketplaceFeePct: 0,
  gstPct: 0,
  advertisingCost: 0,
  otherCost: 0,
  sellingPrice: 100,
  returnCost: 0,
  discountPct: 0
});
assert.equal(p2.netProfit, 0, 'Net profit at cost selling price must be zero');
assert.equal(p2.profitMargin, 0, 'Margin at cost selling price must be zero');
console.log('✓ Profit Calculator: Zero profit break-even passed');

// 2. GST Calculator
function calculateGST(amount, rate, mode) {
  if (mode === 'inclusive') {
    const base = amount / (1 + rate / 100);
    const gst = amount - base;
    return { base, gst, total: amount };
  } else {
    const gst = amount * (rate / 100);
    return { base: amount, gst, total: amount + gst };
  }
}

// Inclusive 118 @ 18% -> Base 100, GST 18
const gstInc = calculateGST(118, 18, 'inclusive');
assert.equal(Math.round(gstInc.base), 100);
assert.equal(Math.round(gstInc.gst), 18);
console.log('✓ GST Calculator: 18% Inclusive extraction passed');

// Exclusive 1000 @ 18% -> Base 1000, GST 180, Total 1180
const gstExc18 = calculateGST(1000, 18, 'exclusive');
assert.equal(gstExc18.gst, 180);
assert.equal(gstExc18.total, 1180);
console.log('✓ GST Calculator: 18% Exclusive passed');

// Slabs 5%, 12%, 28%
const gst5 = calculateGST(1000, 5, 'exclusive');
assert.equal(gst5.gst, 50);
const gst12 = calculateGST(1000, 12, 'exclusive');
assert.equal(gst12.gst, 120);
const gst28 = calculateGST(1000, 28, 'exclusive');
assert.equal(gst28.gst, 280);
console.log('✓ GST Calculator: Slabs 5%, 12%, 28% passed');

// 3. Margin & Markup Calculator
function calculateMargin(cost, sellingPrice) {
  const profit = sellingPrice - cost;
  const margin = (profit / sellingPrice) * 100;
  const markup = (profit / cost) * 100;
  return { profit, margin, markup };
}
const m = calculateMargin(60, 100);
assert.equal(m.margin, 40);
assert.ok(Math.abs(m.markup - 66.666) < 0.01);
console.log('✓ Margin Calculator: 40% margin with 66.67% markup passed');

// 4. RTO Calculator
function calculateRTO(totalOrders, deliveredOrders, rtoOrders, forwardShipping, returnShipping, packagingCost) {
  const actualDelivered = deliveredOrders || (totalOrders - rtoOrders);
  const actualRTO = rtoOrders || (totalOrders - deliveredOrders);
  const rtoRate = (actualRTO / totalOrders) * 100;
  const deliveredRate = (actualDelivered / totalOrders) * 100;
  const lossPerRto = forwardShipping + returnShipping + packagingCost;
  const totalRtoLoss = lossPerRto * actualRTO;
  return { rtoRate, deliveredRate, lossPerRto, totalRtoLoss };
}
const rto = calculateRTO(1000, 800, 200, 50, 50, 10);
assert.equal(rto.rtoRate, 20);
assert.equal(rto.deliveredRate, 80);
assert.equal(rto.lossPerRto, 110);
assert.equal(rto.totalRtoLoss, 22000);
console.log('✓ RTO Calculator: Return-to-origin loss passed');

// 5. Discount Calculator
function calculateDiscount(originalPrice, discountPct) {
  const saved = (originalPrice * discountPct) / 100;
  const finalPrice = originalPrice - saved;
  return { saved, finalPrice };
}
const disc = calculateDiscount(1000, 25);
assert.equal(disc.saved, 250);
assert.equal(disc.finalPrice, 750);
console.log('✓ Discount Calculator: 25% discount passed');

console.log('ALL CALCULATOR TESTS PASSED SUCCESSFULLY! 🎉\n');
