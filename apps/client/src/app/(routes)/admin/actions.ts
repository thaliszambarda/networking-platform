'use server';

import { DashboardService } from '@/services/http/dashboard-service';

export async function getAllPerformanceMetrics() {
  await DashboardService.getAllPerformanceMetrics();
}
