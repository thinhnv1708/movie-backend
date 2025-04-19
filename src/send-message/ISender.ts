export interface ISender<T> {
  sendMessage(data: T): Promise<{ message: string }>;
}
