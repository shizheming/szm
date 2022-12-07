export type PropsInterface = Partial<{
  isDetail: Boolean;
  inner: () => void;
  watch: any[];
  outer: () => void;
}>;
