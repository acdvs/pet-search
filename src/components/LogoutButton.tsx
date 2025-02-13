'use client';

import { useRouter } from 'next/navigation';

import { cfetch } from '@/lib/fetch';
import { Button } from '@/components/ui/button';

function LogoutButton() {
  const router = useRouter();

  const onClick = async () => {
    try {
      await cfetch('/auth/logout', {
        method: 'POST',
      });

      router.push('/');
    } catch {}
  };

  return (
    <Button variant="ghost" onClick={onClick}>
      Logout
    </Button>
  );
}

export default LogoutButton;
