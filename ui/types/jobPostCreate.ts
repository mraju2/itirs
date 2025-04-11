export interface JobPostCreate {
    companyId: string;
    jobTitle: string;
    districtId: number;
    stateId: number;
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
    tradeIds: number[];
  }
  