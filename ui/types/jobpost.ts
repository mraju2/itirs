import { Trade } from './trade';

export enum JobPostStatus {
  Created = 1,
  Active = 2,
  Deactivated = 3,
}

export enum MinimumQualification {
  Tenth = 'Tenth',
  ITI = 'ITI',
  Diploma = 'Diploma',
  Intermediate = 'Intermediate',
}


export interface JobPost {
  id?: string;

  companyId: string;
  companyName?: string;

  stateId: number;
  stateName?: string;
  districtId: number;
  districtName?: string;

  jobTitle: string;
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

  createdAtUnix?: number;

  vacancies?: number;
  facilitiesProvided?: string;

  trades: Trade[];

  status: JobPostStatus;

  minimumQualifications: MinimumQualification[]; // 👈 new field

}

// Create DTO: used when posting a new job
export type JobPostCreate = Omit<
  JobPost,
  | 'id'
  | 'companyName'
  | 'stateName'
  | 'districtName'
  | 'createdAtUnix'
  | 'status'
  | 'trades' // 👈 remove the full object list
> & {
  tradeIds: number[]; // 👈 add only the trade ID list
  minimumQualifications: MinimumQualification[]; // 👈 new field

};


// Update DTO: used when editing a job post
export type JobPostUpdate = Omit<
  JobPost,
  | 'companyName'
  | 'stateName'
  | 'districtName'
  | 'createdAtUnix'
  | 'status'
  | 'trades' // 👈 remove the full object list
> & {
  tradeIds: number[]; // 👈 add only the trade ID list
  minimumQualifications: MinimumQualification[]; // 👈 new field

};

// View type for frontend rendering
export type JobPostView = JobPost;

