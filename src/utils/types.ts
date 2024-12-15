export interface CounterInterface {
  active_users: number;
  all_user: number;
  inactive_users: number;
  pending_approval: number;
}

export interface UserPackageInterface {
  id: number;
  level: string;
  payment_slip: string;
  payment_status: string;
  price: number;
  status: string;
}
export interface UserInvestmentInterface {
  id: number;
  duration: string;
  payment_slip: string;
  payment_status: string;
  price: number;
  status: string;
  wallet_id: string;
  wallet_email: string;
}

export interface UserInterface {
  id: number;
  active_package: UserPackageInterface;
  email: string;
  username: string;
  investment: UserInvestmentInterface;
}

export interface ApiResponseInterface {
  next: string | null;
  previous: string | null;
  count: number;
}
export interface ApiResponseUserInterface extends ApiResponseInterface {
  results: UserInterface[];
}
export interface ApiResponseWithdrawalInterface extends ApiResponseInterface {
  results: WithdrawalInterface[];
}


export interface WithdrawalInterface{
  wallet_address: string,
  username: string
  email: string,
  payment_status: string,
  amount: number,
  id:number,
}

export interface VideosAPIResponse extends ApiResponseInterface {
  results: Video[];
}

export interface InvestmentUser {
  level: number;
  planLevel: number;
  payment_status: string | null;
}

export interface PackageCardProps {
  star: string;
  level: string;
  price: number;
  earnings: string;
  viewingIncome: string;
  dailyIncome: string;
  payment_status: string;
  days: number;
  status: string;
  index: number;
  userLevel: string | null;
  openModal: (pkg: any) => void;
  selectedPackage?: any;
}

export type InvestmentCardProps = {
  plan: string;
  dailyProfit: string;
  level: number;
  minInvestment: string;
  periodicInterest: string;
  availableTo?: string;
  openModal: (investment: any) => void;
};

export interface InvestmentPlanInterface {
  plan: string;
  dailyProfit: string;
  minInvestment: string;
  periodicInterest: string;
  availableTo?: string;
  duration: string;
  level: number;
}

export interface InvestmentPlanInterface {
  plan: string;
  dailyProfit: string;
  minInvestment: string;
  periodicInterest: string;
  availableTo?: string;
}

export interface Video {
  id: number;
  category: string;
  file: string;
}

export interface UserNotificationInterface {
  id: string;
  title: string;
  message: string;
  type: "Success" | "Warning" | "Error" | "Info";
  read: boolean;
}


interface ActivePackage {
  level: string;
  payment_status: string;
}

interface Referral {
  username: string;
  active: boolean;
  active_package: ActivePackage | null;
}

export interface UserDetails {
  active: boolean;
  active_package: {
    id: number;
    level: string;
    price: number;
    payment_slip: string;
    payment_status: string;
  };
  active_ref: number;
  balance: string;
  email: string;
  investment_accumulation: string;
  is_superuser: boolean;
  level: number;
  notification: UserNotificationInterface[];
  partnership_level: number;
  pending_ref: number;
  ref_bonus: string;
  ref_by: string | null;
  ref_code: string;
  referred: Referral[];
  username: string;
  weekly_salary: number;
  investment: {
    days_remaining: number;
    duration: string;
    id: number;
    level: number;
    payment_status: string;
    price: number;
  },
  withdrawals:WithdrawalInterface[],
  security_phase : string
}

export interface TokenObjectInterface {
  active: boolean;
  email: string;
  exp: number;
  iat: number;
  is_superuser: boolean;
  jti: string;
  name: string;
  token_type: string;
  user_id: number;
}
