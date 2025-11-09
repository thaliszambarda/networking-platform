export interface IErrorResponse {
  status: string;
  message: string;
}

export interface ICreateMemberApplicationResponse {
  name: string;
  email: string;
  company?: string;
  reason?: string;
}

export interface IApplicationResponse {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  reason?: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  token?: string | null;
  createdAt: string;
}

export interface ICompleteRegistrationResponse {
  token: string;
  phone?: string;
  company?: string;
  role?: string;
  address?: string;
  city?: string;
  country?: string;
}
