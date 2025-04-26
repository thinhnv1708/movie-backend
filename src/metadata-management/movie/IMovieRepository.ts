export interface IMovieRepository {
  getMovie(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    slug: string;
    originName: string;
    poster: string;
    thumbnail: string;
    trailer: string;
    source: string;
    duration: number;
    isActive: boolean;
    isSingle: boolean;
    categories: { id: string; name: string; slug: string }[];
    country: { id: string; name: string; slug: string };
    currentEpisode: number;
    totalEpisode: number;
    createdAt: number;
    updatedAt: number;
  }>;

  createMovie(data: {
    id: string;
    name: string;
    description: string;
    slug: string;
    originName: string;
    poster: string;
    thumbnail: string;
    trailer: string;
    source: string;
    duration: number;
    isActive: boolean;
    isSingle: boolean;
    categoryIds: string[];
    countryId: string;
    currentEpisode: number;
    totalEpisode: number;
    createdAt: number;
    updatedAt: number;
  }): Promise<void>;

  updateMovie(data: {
    id: string;
    name?: string;
    description?: string;
    slug?: string;
    originName?: string;
    poster?: string;
    thumbnail?: string;
    trailer?: string;
    source?: string;
    duration?: number;
    isActive?: boolean;
    isSingle?: boolean;
    categoryIds?: string[];
    countryId?: string;
    currentEpisode?: number;
    totalEpisode?: number;
    updatedAt: number;
  }): Promise<void>;

  deleteMovie(id: string): Promise<void>;

  listMovies(query: {
    page: number;
    limit: number;
    isActive?: boolean;
    isSingle?: boolean;
    categoryIds?: string[];
    countryId?: string;
  }): Promise<{
    total: number;
    items: {
      id: string;
      name: string;
      description: string;
      slug: string;
      originName: string;
      poster: string;
      thumbnail: string;
      trailer: string;
      source: string;
      duration: number;
      isActive: boolean;
      isSingle: boolean;
      categories: { id: string; name: string; slug: string }[];
      country: { id: string; name: string; slug: string };
      currentEpisode: number;
      totalEpisode: number;
      createdAt: number;
      updatedAt: number;
    }[];
  }>;

  getDetailMovie(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    slug: string;
    originName: string;
    poster: string;
    thumbnail: string;
    trailer: string;
    source: string;
    duration: number;
    isActive: boolean;
    isSingle: boolean;
    categories: { id: string; name: string }[];
    country: { id: string; name: string };
    currentEpisode: number;
    totalEpisode: number;
    createdAt: number;
    updatedAt: number;
  }>;

  getMovieBySlug(slug: string): Promise<{
    id: string;
    name: string;
    description: string;
    slug: string;
    originName: string;
    poster: string;
    thumbnail: string;
    trailer: string;
    source: string;
    duration: number;
    isActive: boolean;
    isSingle: boolean;
    categories: { id: string; name: string }[];
    country: { id: string; name: string };
    currentEpisode: number;
    totalEpisode: number;
    createdAt: number;
    updatedAt: number;
  }>;
}
