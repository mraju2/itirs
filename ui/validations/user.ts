import { z } from 'zod';

export const userRegistrationSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  fatherName: z.string().min(1, 'Father\'s name is required'),
  dateOfBirth: z.number().int().positive('Date of birth must be a valid timestamp'),
  trade: z.string().min(1, 'Trade is required'),
  otherTrade: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  stateId: z.number().int().positive('State ID is required'),
  districtId: z.number().int().positive('District ID is required'),
  passYear: z.number().int().min(1900).max(new Date().getFullYear(), 'Invalid pass year'),
  percentage: z.number().min(0).max(100, 'Percentage must be between 0 and 100'),
  experience: z.string().min(1, 'Experience is required'),
  salaryExpectation: z.number().positive('Salary expectation must be positive'),
  workLocation: z.string().min(1, 'Work location is required'),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  email: z.string().email('Invalid email address'),
  itiName: z.string().min(1, 'ITI name is required'),
  about: z.string().min(1, 'About is required'),
  tradeId: z.number().int().positive('Trade ID is required'),
});

export const userRegistrationResponseSchema = userRegistrationSchema.extend({
  mandal: z.string(),
  district: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Array schemas for list responses
export const userRegistrationResponseArraySchema = z.array(userRegistrationResponseSchema);

export type UserRegistrationData = z.infer<typeof userRegistrationSchema>;
export type UserRegistrationResponse = z.infer<typeof userRegistrationResponseSchema>;

// Validation functions
export const validateUserRegistration = (data: unknown) => {
  return userRegistrationSchema.safeParse(data);
};

export const validateUserRegistrationResponse = (data: unknown) => {
  return userRegistrationResponseSchema.safeParse(data);
};

export const validateUserRegistrationResponseArray = (data: unknown) => {
  return userRegistrationResponseArraySchema.safeParse(data);
}; 