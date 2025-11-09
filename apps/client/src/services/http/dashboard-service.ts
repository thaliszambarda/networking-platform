import { fetchWrapper } from '../fetch-wrapper';

interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
  cache?: 'no-cache' | 'force-cache';
}

interface GetAllParams {
  options?: FetchOptions;
}

interface IGetAllPerformanceMetricsResponse {
  totalMembers: number;
  totalReferrals: number;
  totalThanks: number;
}

export const DashboardService = {
  async getAllPerformanceMetrics({
    options = { revalidate: 60 },
  }: GetAllParams = {}): Promise<IGetAllPerformanceMetricsResponse> {
    return await fetchWrapper('dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_SECRET ?? '',
      },
      next: options,
    });
  },
};
