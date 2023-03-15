type id = {
  id: string;
};

type issueInputArg = {
  title: string;
  body: string;
  state: issueStates;
};

export enum issueStates {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
}

export type issueInput = id & Partial<issueInputArg>;

export type commentInput = {
  id: string;
  body: string;
};
