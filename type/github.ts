type id = {
  id: string;
};

type issueInputArg = {
  title: string;
  body: string;
  state: issueState;
};

enum issueState {
  "CLOSED",
  "OPEN",
}

export type issueInput = id & Partial<issueInputArg>;

export type commentInput = {
  id: string;
  body: string;
};
