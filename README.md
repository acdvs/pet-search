# Fetch Assessment

## Getting started

1. Install dependencies.
   ```sh
   yarn install
   ```
2. Run the dev environment.
   ```sh
   yarn dev
   ```

## Focuses

- Overall UI/UX design
- Usability
- Readability
- Basic accessibility
- Query optimization

## Things I (mostly) didn't focus on

- Responsive design. Built and tested with a viewport ~850px wide. Some elements like the header will look bad on a small screen.

## Issues

- The documentation for `GET /dogs/search` says `breeds` is an array of strings, but supplying multiple breeds (e.g., `breeds=Basset,Pug`) returns no results. Supplying one breed (e.g., `breeds=Basset`) works as intended.
- I noticed some special instances of `GET /dogs/search` returning unexpected pagination values. Requesting `/dogs/search?zipCodes=20212` returns two IDs and a `next` value, though the default page size is 25, so there shouldn't be a next page. Requesting the next page (`/dogs/search?zipCodes=20212&size=25&from=25`) returns zero IDs.
