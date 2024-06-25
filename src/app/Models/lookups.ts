export interface LookUpDetails {
  lookupDetailId: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface lookups {
  Id: number;
  Name: string;
  IsActive: boolean;
  LookUpDetails: LookUpDetails[];
}
