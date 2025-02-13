import { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

import { useFavorites } from '@/lib/state';
import { cn } from '@/lib/utils';

function Result({
  canFavorite,
  imagePriority,
  className,
  name,
  breed,
  age,
  zip_code,
  city,
  state,
  img,
  id,
}: {
  city?: string;
  state?: string;
  canFavorite?: boolean;
  imagePriority: boolean;
  className?: string;
} & API.Dog) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const onClickFavorite = () => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const isFavorite = favorites.includes(id);

  return (
    <li
      tabIndex={0}
      className={cn(
        className,
        'flex gap-5 border-2 border-muted rounded-md p-4'
      )}
      aria-labelledby={`${id}-name ${id}-breed ${id}-age ${id}-location`}
    >
      <div className="relative aspect-square size-[150px]">
        <Image
          src={img}
          width={150}
          height={150}
          alt={`Photo of ${name}`}
          placeholder="empty"
          priority={imagePriority}
          className="rounded object-cover aspect-square"
        />
      </div>
      <div className="grow">
        <div className="flex justify-between mb-5">
          <p id={`${id}-name`} className="text-xl leading-7 ml-3 mb-0">
            {name}
          </p>
          {canFavorite && (
            <button
              className="cursor-pointer"
              onClick={onClickFavorite}
              aria-label={
                isFavorite
                  ? `Remove ${name} from favorites`
                  : `Add ${name} to favorites`
              }
            >
              <Star
                className={cn(
                  isFavorite
                    ? 'stroke-yellow-500 fill-yellow-500 hover:fill-yellow-600 hover:stroke-yellow-600'
                    : 'stroke-muted-foreground hover:stroke-foreground'
                )}
              />
            </button>
          )}
        </div>
        <p id={`${id}-breed`} className="py-1 px-3 rounded-sm bg-muted/60">
          {breed}
        </p>
        <p id={`${id}-age`} className="py-1 px-3">
          {age} years old
        </p>
        <p id={`${id}-location`} className="py-1 px-3 rounded-sm bg-muted/60">
          {city && state ? `${city}, ${state}` : `Zip code ${zip_code}`}
        </p>
      </div>
    </li>
  );
}

export default Result;
