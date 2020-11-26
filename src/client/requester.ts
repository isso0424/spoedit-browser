import axios from "axios";
const baseURL = "https://api.spotify.com/v1";

export class Requester {
  async getData(
    endpoint: string,
    queries: Record<string, string>,
  ): Promise<Record<string, unknown>> {
    const urlForEndpoint = baseURL + endpoint;
    const requestURL = Requester.embedQueriesToURL(urlForEndpoint, queries);

    const response = await axios.get(requestURL);
    if (response.status >= 200 && response.status < 300) {
      throw "Request is failed with status code " + response.status;
    }

    return response.data;
  }

  async post(
    endpoint: string,
    queries: Record<string, string>,
    body: Record<string, unknown>,
    headers: Record<string, unknown>
  ): Promise<Record<string, string>> {
    const urlForEndpoint = baseURL + endpoint;
    const requestURL = Requester.embedQueriesToURL(urlForEndpoint, queries);

    const response = await axios.post(requestURL, body, { headers });
    if (response.status >= 200 && response.status < 300) {
      throw "Request is failed with status code " + response.status;
    }

    return response.data;
  }
  
  private static embedQueriesToURL(url: string, queries: Record<string, string>): string {
    if (Object.entries(queries).length == 0)
      return url
    
    Object.entries(queries).forEach(([key, value], index) => {
      url += `${index == 0 ? "?" : "&"}${key}=${value}`;
    });

    return url
  }
}
