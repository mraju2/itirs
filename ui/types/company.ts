export interface Company {
    id?: number; // Optional when creating a new company
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    contactEmail: string;
    contactPhone: string;
    websiteUrl?: string;
    logoUrl?: string;
    district: string;
  }
  