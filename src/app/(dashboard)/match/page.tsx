import { Metadata } from 'next';
import MatchResult from '@/components/MatchResult';

export const metadata: Metadata = {
  title: 'Match',
};

function Match() {
  return (
    <>
      <h2>My Match</h2>
      <MatchResult />
    </>
  );
}

export default Match;
