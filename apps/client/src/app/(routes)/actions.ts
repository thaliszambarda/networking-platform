'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { MembersService } from '@/services/http/members-service';
import type { ICreateMemberApplicationResponse } from '@/types';

export async function createMemberApplication(
  data: ICreateMemberApplicationResponse
) {
  await MembersService.createMemberApplication(data);
  updateTag('members-application');
  revalidatePath('/admin/intentions');
}
