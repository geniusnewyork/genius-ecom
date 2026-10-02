// MONTY GENIUS ECOM TOOLS — Pure Calculator Engine

export function calculateProfit(inputs) {
  const discount = inputs.discountPercent || 0;
  const effectivePrice = inputs.sellingPrice * (1 - discount / 100);
  const grossRevenue = effectivePrice;

  const marketplaceFee = effectivePrice * (inputs.marketplaceFeePercent / 100);

  // Inclusive GST extraction from effective selling price
  const gstBase = effectivePrice / (1 + inputs.gstPercent / 100);
  const gstAmount = effectivePrice - gstBase;

  const totalCost =
    inputs.productCost +
    inputs.packagingCost +
    inputs.shippingCost +
    marketplaceFee +
    gstAmount +
    inputs.advertisingCost +
    inputs.otherCost +
    inputs.returnCost;

  const netProfit = effectivePrice - totalCost;
  const profitMarginPercent = effectivePrice > 0 ? (netProfit / effectivePrice) * 100 : 0;
  const directCost = totalCost - marketplaceFee - gstAmount;
  const profitPercentageOnCost = directCost > 0 ? (netProfit / directCost) * 100 : 0;

  const variableRate = inputs.marketplaceFeePercent / 100 + (1 - 1 / (1 + inputs.gstPercent / 100));
  const fixedPerUnit =
    inputs.productCost +
    inputs.packagingCost +
    inputs.shippingCost +
    inputs.advertisingCost +
    inputs.otherCost +
    inputs.returnCost;

  const breakEvenPrice = variableRate < 1 ? fixedPerUnit / (1 - variableRate) : fixedPerUnit * 1.5;

  return {
    grossRevenue: Number(grossRevenue.toFixed(2)),
    effectivePrice: Number(effectivePrice.toFixed(2)),
    marketplaceFee: Number(marketplaceFee.toFixed(2)),
    gstBase: Number(gstBase.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    totalCost: Number(totalCost.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    profitMarginPercent: Number(profitMarginPercent.toFixed(2)),
    profitPercentageOnCost: Number(profitPercentageOnCost.toFixed(2)),
    breakEvenPrice: Number(breakEvenPrice.toFixed(2)),
    isProfitable: netProfit >= 0,
    lossAmount: netProfit < 0 ? Number(Math.abs(netProfit).toFixed(2)) : 0,
  };
}

export function calculateProductPricing(inputs) {
  const directCosts = inputs.productCost + inputs.packagingCost + inputs.shippingCost + inputs.advertisingCost + inputs.fixedFee;
  const returnBuffer = directCosts * (inputs.returnLossPercent / 100);
  const totalBaseCost = directCosts + returnBuffer;

  const commissionRate = inputs.marketplaceCommissionPercent / 100;
  const targetProfitRate = inputs.expectedProfitPercent / 100;
  const gstRate = 1 - 1 / (1 + inputs.gstPercent / 100);

  const totalDeductionRate = commissionRate + gstRate;
  const divisor = 1 - totalDeductionRate - targetProfitRate;

  const recommendedSellingPrice = divisor > 0.05 ? totalBaseCost / divisor : totalBaseCost * 2;
  const minDivisor = 1 - totalDeductionRate;
  const minimumSellingPrice = minDivisor > 0.05 ? totalBaseCost / minDivisor : totalBaseCost * 1.3;
  const expectedProfitAmount = recommendedSellingPrice * targetProfitRate;

  return {
    recommendedSellingPrice: Number(recommendedSellingPrice.toFixed(2)),
    minimumSellingPrice: Number(minimumSellingPrice.toFixed(2)),
    expectedProfitAmount: Number(expectedProfitAmount.toFixed(2)),
    breakEvenPrice: Number(minimumSellingPrice.toFixed(2)),
  };
}

export function calculateGst(inputs) {
  let baseAmount;
  let gstAmount;
  let finalAmount;

  if (inputs.isInclusive) {
    baseAmount = inputs.amount / (1 + inputs.gstRate / 100);
    gstAmount = inputs.amount - baseAmount;
    finalAmount = inputs.amount;
  } else {
    baseAmount = inputs.amount;
    gstAmount = inputs.amount * (inputs.gstRate / 100);
    finalAmount = inputs.amount + gstAmount;
  }

  const halfGst = gstAmount / 2;

  return {
    baseAmount: Number(baseAmount.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    cgst: Number(halfGst.toFixed(2)),
    sgst: Number(halfGst.toFixed(2)),
    finalAmount: Number(finalAmount.toFixed(2)),
  };
}

export function calculateMargin(costPrice, sellingPrice) {
  const grossProfit = sellingPrice - costPrice;
  const marginPercent = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
  const markupPercent = costPrice > 0 ? (grossProfit / costPrice) * 100 : 0;

  return {
    grossProfit: Number(grossProfit.toFixed(2)),
    marginPercent: Number(marginPercent.toFixed(2)),
    markupPercent: Number(markupPercent.toFixed(2)),
  };
}

export function calculateBreakEven(fixedCosts, unitPrice, unitVariableCost) {
  const contributionMargin = unitPrice - unitVariableCost;
  const contributionMarginRatio = unitPrice > 0 ? (contributionMargin / unitPrice) * 100 : 0;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * unitPrice;

  return {
    contributionMargin: Number(contributionMargin.toFixed(2)),
    contributionMarginRatio: Number(contributionMarginRatio.toFixed(2)),
    breakEvenUnits,
    breakEvenRevenue: Number(breakEvenRevenue.toFixed(2)),
  };
}

export function calculateDiscount(originalPrice, discountPercent) {
  const discountAmount = originalPrice * (discountPercent / 100);
  const finalPrice = originalPrice - discountAmount;

  return {
    discountAmount: Number(discountAmount.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2)),
  };
}

export function calculateRto(inputs) {
  const rtoRate = inputs.totalOrders > 0 ? (inputs.rtoOrders / inputs.totalOrders) * 100 : 0;
  const deliveredRate = inputs.totalOrders > 0 ? (inputs.deliveredOrders / inputs.totalOrders) * 100 : 0;
  const lossPerRto = inputs.forwardShipping + inputs.returnShipping + inputs.packagingCost;
  const totalRtoLoss = inputs.rtoOrders * lossPerRto;

  const grossProfitPerDelivery = inputs.sellingPrice - inputs.productCost - inputs.packagingCost - inputs.forwardShipping;
  const totalGrossProfit = inputs.deliveredOrders * grossProfitPerDelivery;
  const totalNetAdjusted = totalGrossProfit - totalRtoLoss;
  const adjustedProfitPerDelivered = inputs.deliveredOrders > 0 ? totalNetAdjusted / inputs.deliveredOrders : 0;

  return {
    rtoRate: Number(rtoRate.toFixed(2)),
    deliveredRate: Number(deliveredRate.toFixed(2)),
    lossPerRto: Number(lossPerRto.toFixed(2)),
    totalRtoLoss: Number(totalRtoLoss.toFixed(2)),
    adjustedProfitPerDelivered: Number(adjustedProfitPerDelivered.toFixed(2)),
  };
}
