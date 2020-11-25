import { AccessToken } from "../domain/token";

export interface Verifier {
  getAccessToken(): AccessToken;
}
