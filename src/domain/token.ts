import {Dayjs} from "dayjs";

export interface AccessToken {
  token: string;
  issuanceTime: Dayjs;
}
