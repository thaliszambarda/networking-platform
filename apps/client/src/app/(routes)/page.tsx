import { MemberApplicationCard } from '@/components/members/member-card';
import MembersForm from '@/components/members/member-form';

export default function Home() {
  return (
    <>
      <MemberApplicationCard>
        <MembersForm />
      </MemberApplicationCard>
    </>
  );
}
