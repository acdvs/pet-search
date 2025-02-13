'use client';

import { useUser } from '@/lib/state';

function User() {
  const { name } = useUser();

  return <p className="text-muted-foreground">Hello, {name}!</p>;
}

export default User;
