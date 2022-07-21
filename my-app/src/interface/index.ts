export interface PageInterface {
  page: number;
  page_size: number;
}

export interface listInterface extends PageInterface {
  [key: string]: any;
}
