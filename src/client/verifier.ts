import axios from "axios";
import dayjs from "dayjs";
import {AccessToken} from "../domain/token";
import {IVerifier} from "../usecase/verifier";

export class Verifier implements IVerifier {
  async getAccessToken(): Promise<AccessToken> {
    const createdTime = dayjs();
    const response = await axios.get("http://localhost:8000/token");
    if (response.status != 200) {
      throw "Error occurred in get token with status code " + response.status;
    }

    const accessToken = response.data;

    return {
      token: accessToken,
      issuanceTime: createdTime,
    };
  }
}
