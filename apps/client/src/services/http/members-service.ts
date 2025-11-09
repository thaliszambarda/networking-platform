import type {
  IApplicationResponse,
  ICompleteRegistrationResponse,
  ICreateMemberApplicationResponse,
} from '@/types';
import { fetchWrapper } from '../fetch-wrapper';

interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
  cache?: 'no-cache' | 'force-cache';
}

interface GetAllParams {
  options?: FetchOptions;
}

export const MembersService = {
  async createMemberApplication(
    data: ICreateMemberApplicationResponse,
    {
      options = { revalidate: 0, tags: ['members-application'] },
    }: GetAllParams = {}
  ): Promise<void> {
    return await fetchWrapper('members/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      next: options,
    });
  },

  async getAllApplications({
    options = { revalidate: 60 },
  }: GetAllParams = {}): Promise<IApplicationResponse[]> {
    return await fetchWrapper('members/admin/applications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET ?? '',
      },
      next: options,
    });
  },

  async updateApplicationStatus(
    applicationId: string,
    status: 'APPROVED' | 'REJECTED',
    { options = { revalidate: 0 } }: GetAllParams = {}
  ): Promise<{ token?: string }> {
    return await fetchWrapper(
      `members/admin/applications/${applicationId}/${status}`,
      {
        method: 'PATCH',
        headers: {
          'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET ?? '',
        },
        next: options,
      }
    );
  },

  async completeRegistration(
    data: ICompleteRegistrationResponse,
    { options = { revalidate: 0 } }: GetAllParams = {}
  ): Promise<void> {
    return await fetchWrapper(`members/register/${data.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: data.phone,
        company: data.company,
        role: data.role,
        address: data.address,
        city: data.city,
        country: data.country,
      }),
      next: options,
    });
  },
};
