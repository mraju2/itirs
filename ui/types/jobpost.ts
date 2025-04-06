export interface TradeDto {
  id: string;
  name: string;
  nameInTelugu?: string;
}

export interface JobPost {
  id: string;
  companyId: string;
  companyName: string;
  jobTitle: string;
  district: string;

  jobLocation: string;
  jobDescription: string;
  employmentType: string;
  applicationProcess: string;
  applicationDeadlineUnix: number;

  additionalBenefits?: string;
  genderRequirement: string;
  minAge: number;
  maxAge?: number;

  salaryMin: number;
  salaryMax: number;

  accommodationProvided: boolean;
  workingHoursMin: number;
  workingHoursMax: number;

  experienceMin: number;
  experienceMax?: number;

  apprenticesConsidered: boolean;
  urgent: boolean;

  createdAtUnix: number;
  vacancies?: number;

  facilitiesProvided?: string;

  trades: TradeDto[];
}
