import { Metadata } from 'next';
import FavoriteResults from '@/components/FavoriteResults';

export const metadata: Metadata = {
  title: 'Favorites',
};

function Favorites() {
  return (
    <>
      <h2>Favorites</h2>
      <FavoriteResults />
    </>
  );
}

export default Favorites;
