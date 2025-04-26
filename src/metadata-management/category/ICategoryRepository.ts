export interface ICategoryRepository {
  getCategory(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }>;

  createCategory(data: {
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }): Promise<void>;

  updateCategory(data: {
    id: string;
    name?: string;
    slug?: string;
    updatedAt: number;
  }): Promise<void>;

  deleteCategory(id: string): Promise<void>;

  listCategories(query: {
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

  getDetailCategory(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }>;

  getCategoryBySlug(slug: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }>;
}