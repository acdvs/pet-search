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
- Data fetching optimization

## Things I (mostly) didn't focus on

- Responsive design
- Accessibility

## Other notes

- Built and tested with a viewport ~850px wide.
- During development I noticed some special instances of `GET /dogs/search` returning unexpected results. Requesting `/dogs/search?zipCodes=20212` returns two IDs and a `next` value, though the default page size is 25, so there shouldn't be a next page. Requesting it (`/dogs/search?zipCodes=20212&size=25&from=25`) returns zero IDs.
