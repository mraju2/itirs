export interface JobPost {
    id?: number; // Optional for create
    title: string;
    location: string;
    description: string;
    salaryFrom: number;
    salaryTo: number;
    isUrgent: boolean;
    applicationDeadline: string; // ISO format (e.g., "2025-04-01T00:00:00Z")
    visibility: "public" | "unlisted";
    recruiterId: string; // UUID
    companyId: number;
  }
  