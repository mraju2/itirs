export interface UserRegistrationData {
  id:string;
    firstName: string;
    lastName: string;
    fatherName: string;
    dateOfBirth: number; // ✅ Change to `number` (Unix timestamp)
    trade: string;
    otherTrade?: string;
    address: string; // ✅ Change casing to match API
    stateId: number;
    districtId: number;
    passYear: number;
    percentage: number;
    experience: string;
    salaryExpectation: number;
    workLocation: string;
    phoneNumber: string;
    email: string;
    itiName: string;
    about: string;
    tradeId: number;
  }
  