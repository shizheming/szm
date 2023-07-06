export type PropsInterface = Partial<{
  inner: () => void;
  watch: any[];
  outer: () => void;
}>;
