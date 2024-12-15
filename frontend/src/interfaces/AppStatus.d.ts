export interface StatusState {
  state: "loading" | "error" | "success" | null;
  text?: string;
}
