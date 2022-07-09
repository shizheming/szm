import { HeadersDefaults, AxiosStatic } from "axios";

declare module "nprogress";
declare module "axios" {
  interface HeadersDefaults {
    token: string;
    authorization: string;
    "Content-Type": string;
  }
  interface AxiosStatic {
    env: string;
  }
}