export interface Company {
  id?: string;

  name: string;
  address: string;
  stateId: number;
  stateName?: string;
  stateNameTelugu?: string;

  districtId: number;
  districtName?: string;
  districtNameTelugu?: string;

  pincode: string;

  contactEmail: string;
  primaryContactPhone: string;
  secondaryContactPhone?: string;

  websiteUrl: string;
  locationDetails?: string;

  createdAtUnix?: number;
  updatedAtUnix?: number;
}

export type CompanyCreate = Omit<
  Company,
  "id" | "stateName" | "districtName" | "stateNameTelugu" | "districtNameTelugu" | "createdAtUnix" | "updatedAtUnix"
>;

export type CompanyUpdate = Partial<Company>;

export type CompanyView = Company;
