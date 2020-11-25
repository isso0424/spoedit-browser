import { AccessToken } from "../domain/token";

export interface IVerifier {
  getAccessToken(): Promise<AccessToken>;
}
