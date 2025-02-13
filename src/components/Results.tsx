'use client';

import {
  InfiniteData,
  UseInfiniteQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

import { useFetch } from '@/lib/fetch';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import Result from './Result';
import PlaceholderContainer from './PlaceholderContainer';
import { Button } from './ui/button';
import { useSearchFilters } from '@/lib/state';

function Results<T>({
  query,
  data,
}: {
  query?: UseInfiniteQueryResult<InfiniteData<void | T, unknown>, Error>;
  data?: API.Dogs.Results | void;
}) {
  const _fetch = useFetch();
  const { pageSize } = useSearchFilters();

  const zipCodes = data?.map((x) => x.zip_code) || [];

  const { data: locData } = useQuery({
    queryKey: ['locations', zipCodes],
    queryFn: () =>
      _fetch<API.Location[]>('/locations', {
        method: 'POST',
        body: zipCodes,
      }),
  });

  if (query?.isLoading) {
    return (
      <PlaceholderContainer>
        <LoaderCircle className="animate-spin" />
      </PlaceholderContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <PlaceholderContainer>
        <p className="text-muted-foreground">No results</p>
      </PlaceholderContainer>
    );
  }

  const shouldShowPagination =
    !query || query.hasNextPage || query.hasPreviousPage;

  return (
    <div className="mb-10">
      {query && shouldShowPagination && <QueryPagination query={query} />}
      <ul className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 my-5">
        {data.map((x, i) => (
          <Result
            key={x.id + new Date().getTime()}
            city={locData?.[i]?.city}
            state={locData?.[i]?.state}
            canFavorite
            imagePriority={i < 6}
            {...x}
          />
        ))}
      </ul>
      {query && shouldShowPagination && (
        <QueryPagination query={query} className="mb-5" />
      )}
      {data.length > 6 && (
        <Button
          variant="link"
          size="sm"
          className="flex mx-auto"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          Back to top
        </Button>
      )}
    </div>
  );
}

function QueryPagination<T>({
  query,
  className,
}: {
  query: UseInfiniteQueryResult<InfiniteData<void | T, unknown>, Error>;
  className?: string;
}) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              query.fetchPreviousPage();
              window.scrollTo({ top: 0 });
            }}
            disabled={!query.hasPreviousPage || query.isFetching}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              query.fetchNextPage();
              window.scrollTo({ top: 0 });
            }}
            disabled={!query.hasNextPage || query.isFetching}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Results;
