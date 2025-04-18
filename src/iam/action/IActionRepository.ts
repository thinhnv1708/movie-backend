export interface IActionRepository {
  getAllFeautures(): Promise<
    { id: string; parentId: string; name: string; description: string }[]
  >;

  getAllActions(): Promise<
    {
      id: string;
      featureId: string;
      name: string;
      description: string;
      method: string;
      path: string;
    }[]
  >;
}
