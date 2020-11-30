export interface IRequester {
  getData(
    endpoint: string,
    queries?: Record<string, string>,
    headers?: Record<string, unknown>
  ): Promise<Record<string, unknown>>;

  post(
    endpoint: string,
    queries?: Record<string, string>,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<Record<string, unknown>>;

  put(
    endpoint: string,
    queries?: Record<string, string>,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<Record<string, unknown>>;

  delete(
    endpoint: string,
    queries?: Record<string, string>,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>
  ): Promise<Record<string, unknown>>;
}
