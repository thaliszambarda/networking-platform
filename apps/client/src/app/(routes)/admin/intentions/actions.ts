'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { MembersService } from '@/services/http/members-service';

export async function updateApplicationStatus(
  id: string,
  status: 'APPROVED' | 'REJECTED'
) {
  const { token } = await MembersService.updateApplicationStatus(id, status);
  revalidatePath('/admin/intentions');
  updateTag('members-application');
  return { token };
}
