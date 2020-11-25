import axios from "axios";
import dayjs from "dayjs";
import { AccessToken } from "../domain/token";
import { IVerifier } from "../usecase/verifier";

const refreshTokenURL = "https://accounts.spotify.com/api/token";

export class Verifier implements IVerifier {
  constructor(refreshToken: string, clientID: string) {
    this.refreshToken = refreshToken;
    this.clientID = clientID;
  }
  
  refreshToken: string;

  clientID: string;

  async getAccessToken(): Promise<AccessToken> {
    const createdTime = dayjs();
    const response = await axios.post(
      refreshTokenURL, {
        grant_type: "refresh_token",
        refresh_token: this.refreshToken,
        client_id: this.clientID,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    if (response.status != 200) {
      throw "Error occurred in get token with status code " + response.status;
    }

    const accessToken = response.data["access_token"];

    return {
      token: accessToken,
      issuanceTime: createdTime,
    };
  }
}
