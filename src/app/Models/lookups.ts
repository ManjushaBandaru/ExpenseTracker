export interface LookUpDetails {
    Id: number;
    Name: string;
    Description: string;
    IsAcitve: boolean;
    CreatedBy: string;
    UpdatedBy: string;
    CreatedAt: string;
    UpdatedAt: string;
  }
  
  export interface lookups {
    Id: number;
    Name: string;
    IsActive: boolean;
    CreatedBy: string;
    UpdatedBy: string;
    CreatedAt: string;
    UpdatedAt: string;
    LookUpDetails: LookUpDetails[];
  }
  