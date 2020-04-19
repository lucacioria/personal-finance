// just for reference
export interface Investment {
  investmentId: string;
  investorId: string;
  investmentAccountId: string;
  interestRate: number;
  interestRateDiscount: number;
  investmentPrincipalRefund: number;
  investmentInterests: number;
  portfolioAmount: number;
  totalInvestAmount: number;
  fund: boolean;
  term: string;
  rating: number;
  segment: string;
  matches: Match[];
  closedAt: Date;
  createdAt: Date;
  completedAt: Date;
  reinvestment: boolean;
  partialDisbursed: number;
  userId: string;
  matchingPercentage: number;
  isRefunded: boolean;
  isMatched: boolean;
  isPending: boolean;
  isActive: boolean;
  isClosed: boolean;
}

export interface Match {
  loanId: string;
  investmentId: string;
  firstname: string;
  lastname: string;
  reason: null;
  finality: string;
  rating: number;
  interestRate: number;
  segment: string;
  term: string;
  remainingInvest: number;
  hasFund: boolean;
  isOverdue: boolean;
  paidRegularly: boolean;
  maxInvest: number;
  price: number;
  matchedAt: Date;
  expiredAt: Date;
  saleStatus: SaleStatus | null;
  onSaleAt: Date | null;
  soldAt: Date | null;
  closedAt: Date | null;
  loanMatchingPercentage: number;
  instalmentsNumber: string;
  refundAt: Date | null;
  isSold: boolean;
  isOnSale: boolean;
  isActive: boolean;
  isPending: boolean;
  isSalable: boolean;
  isWithArrears: boolean;
  unsolvedAmount: number;
  interestRateDiscount: number;
  interestFundFee: any[];
  interestFundFeeByFund: any[];
  interestRefund: number[];
  interestRefundByFund: number[];
  interestOverdueRefund: number[];
  interestOverdueRefundByFund: any[];
  principalRefundByFund: number[];
  fundFee: number;
  instalmentsOverdue: number;
  discountPercentage: number | null;
  sellingPrice: number;
}

export enum SaleStatus {
  OnSale = "on sale",
  Sold = "sold",
}
