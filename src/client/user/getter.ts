import axios from "axios";
import {Requester} from "../requester";
import {Verifier} from "../verifier";

const endPoint = "/me";

export class UserInfoGetter {
  verifier = new Verifier();

  requester = new Requester();

  async getUserID(): Promise<string> {
    const accessToken = await this.verifier.getAccessToken();
    const response = await this.requester.getData(
      endPoint,
      {},
      { Authorization: accessToken.token },
    );

    return (response.data as Record<string, unknown>)["id"] as string;
  }
}
