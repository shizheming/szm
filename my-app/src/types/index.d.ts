import { HeadersDefaults, AxiosStatic } from 'axios';

declare module 'nprogress';
declare module 'axios' {
  interface HeadersDefaults {
    Token: string;
    Authorization: string;
    branchname: string;
    'Content-Type': string;
    'X-ACCOUNT-TYPE': string;
  }
  interface AxiosStatic {
    env: string;
  }
}
