import {IRequester} from "../../../usecase/requester";
import {IVerifier} from "../../../usecase/verifier";

const endPoint = "/me";

export class UserInfoGetter {
  constructor(requester: IRequester, verifier: IVerifier) {
    this.requester = requester;
    this.verifier = verifier;
  }

  private verifier: IVerifier;

  private requester: IRequester;

  async getUserID(): Promise<string> {
    const accessToken = await this.verifier.getAccessToken();
    const response = await this.requester.getData(
      endPoint,
      {},
      {Authorization: "Bearer " + accessToken.token}
    );

    return (response as Record<string, unknown>)["id"] as string;
  }
}
