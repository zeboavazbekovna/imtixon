export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    balance?: number;
    is_premium?: boolean;
  }
  