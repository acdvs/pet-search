declare namespace API {
  export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }

  export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
  }

  declare namespace Location {
    declare namespace Search {
      export interface Input {
        city?: string;
        states?: string[];
        geoBoundingBox?: {
          top?: Coordinates;
          left?: Coordinates;
          bottom?: Coordinates;
          right?: Coordinates;
          bottom_left?: Coordinates;
          top_left?: Coordinates;
        };
        size?: number;
        from?: number;
      }

      export interface Results {
        results: Location[];
        total: number;
      }
    }
  }

  export interface Coordinates {
    lat: number;
    lon: number;
  }

  declare namespace Dogs {
    export type Input = string[];
    export type Results = Dog[];

    declare namespace Breeds {
      export type Results = string[];
    }

    declare namespace Search {
      export interface Input {
        breeds?: string;
        zipCodes?: string;
        ageMin?: number;
        ageMax?: number;
        size?: number;
        from?: number;
        sort?: string;
      }

      export interface Results {
        resultIds: string[];
        total: number;
        next: string;
        prev: string;
      }
    }

    declare namespace Match {
      export type Input = string[];

      export interface Results {
        match: string;
      }
    }
  }
}
