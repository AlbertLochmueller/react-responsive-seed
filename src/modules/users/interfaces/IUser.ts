export interface IUser {

  readonly id: number;
  readonly email?: string;
  readonly code?: string;
  readonly isAutoGenerated: boolean;
  readonly registrationDate: string;
  readonly registrationCode: string;
  readonly registrationCodeExpiresAt: string;
  readonly languageCode: string;
  scopes: string[];
}