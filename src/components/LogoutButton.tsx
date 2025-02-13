'use client';

import { useRouter } from 'next/navigation';

import { useFetch } from '@/lib/fetch';
import { Button } from '@/components/ui/button';

function LogoutButton() {
  const _fetch = useFetch();
  const router = useRouter();

  const onClick = async () => {
    try {
      await _fetch('/auth/logout', {
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
