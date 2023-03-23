export type comment = {
  id: string;
  body: string;
  author: {
    login: string;
  };
};
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

export type issue = {
  id: string;
  title: string;
  number: string;
  body: string;
  author: {
    login: string;
  };
  comments: {
    nodes: comment[];
  };
};
