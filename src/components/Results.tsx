'use client';

import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

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

function Results<T>({
  query,
  data,
}: {
  query: UseInfiniteQueryResult<InfiniteData<void | T, unknown>, Error>;
  data?: API.Dogs.Results | void;
}) {
  if (query.isLoading) {
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

  return (
    <div className="mb-10">
      <QueryPagination query={query} />
      <ul className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 my-5">
        {data.map((x, i) => (
          <Result
            key={x.id + new Date().getTime()}
            canFavorite
            imagePriority={i < 6}
            {...x}
          />
        ))}
      </ul>
      <QueryPagination query={query} className="mb-5" />
      <Button
        variant="link"
        size="sm"
        className="flex mx-auto"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        Back to top
      </Button>
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
            onClick={() => query.fetchPreviousPage()}
            disabled={!query.hasPreviousPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => query.fetchNextPage()}
            disabled={!query.hasNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Results;
