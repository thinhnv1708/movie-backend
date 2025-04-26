export interface ICountryRepository {
  getCountry(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }>;

  createCountry(data: {
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }): Promise<void>;

  updateCountry(data: {
    id: string;
    name?: string;
    slug?: string;
    updatedAt: number;
  }): Promise<void>;

  deleteCountry(id: string): Promise<void>;

  listCountries(query: {
    page: number;
    limit: number;
    name?: string;
  }): Promise<{
    total: number;
    items: {
      id: string;
      name: string;
      slug: string;
      createdAt: number;
      updatedAt: number;
    }[];
  }>;

  getDetailCountry(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }>;

  getCountryBySlug(slug: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }>;
}