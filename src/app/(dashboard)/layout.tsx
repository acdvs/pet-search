import Link from 'next/link';

import LogoutButton from '@/components/LogoutButton';
import { Button } from '@/components/ui/button';
import User from '@/components/User';

function Dashboard({ children }: { children?: React.ReactNode }) {
  return (
    <div className="max-w-[900px] mx-auto px-5">
      <div className="flex justify-between items-center py-3 mb-5 border-b-2 border-foreground-muted">
        <div className="flex flex-wrap gap-x-8 gap-y-2 pr-3">
          <h1 className="mb-0 text-2xl md:text-3xl">Adopt A Dog</h1>
          <nav>
            <Button variant="ghost" asChild>
              <Link href="/search">Search</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/favorites">Favorites</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/match">My match</Link>
            </Button>
          </nav>
        </div>
        <div className="flex gap-2 items-center">
          <User />
          <LogoutButton />
        </div>
      </div>
      {children}
    </div>
  );
}

export default Dashboard;
