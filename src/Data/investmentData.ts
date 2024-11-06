import { InvestmentPlanInterface } from "@/utils/types";


export const investmentPlans: InvestmentPlanInterface[] = [
  {
    plan: "7-days investment plan",
    dailyProfit: "1%",
    minInvestment: "100 USDT",
    periodicInterest: "107%",
    duration: "7 Days",
    level: 1,
  },
  {
    plan: "30-days investment plan",
    dailyProfit: "1.3%",
    minInvestment: "100 USDT",
    periodicInterest: "139%",
    duration: "30 Days",
    level: 2,
  },
  {
    plan: "60-days investment plan",
    dailyProfit: "2%",
    minInvestment: "100 USDT",
    periodicInterest: "220%",
    duration: "60 Days",
    level: 3,
  },
  {
    plan: "90-days investment plan",
    dailyProfit: "4%",
    minInvestment: "100 USDT",
    periodicInterest: "460%",
    duration: "90 Days",
    level: 4,
  },
  {
    plan: "120-days investment plan",
    dailyProfit: "5%",
    minInvestment: "100 USDT",
    periodicInterest: "700%",
    duration: "120 Days",
    level: 5,
  },
  {
    plan: "360-days investment plan",
    dailyProfit: "8%",
    availableTo: "2-star partners and above",
    minInvestment: "500 USDT",
    periodicInterest: "2980%",
    duration: "360 Days",
    level: 6,
  },
  {
    plan: "1080-days investment plan",
    dailyProfit: "12%",
    availableTo: "3-star partners and above",
    minInvestment: "1000 USDT",
    periodicInterest: "13060%",
    duration: "1080 Days",
    level: 7,
  },
];
