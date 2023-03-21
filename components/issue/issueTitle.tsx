import { fetchSet } from "lib/fetch";
import { useState } from "react";

type issue = {
  id: string;
  title: string;
  number: string;
};

export default function IssueTitle({ issue }: { issue: issue }) {
  const [value, setValue] = useState(issue.title);
  const [textDisplay, setTextDisplay] = useState("block");
  const [editDisplay, setEditDisplay] = useState("hidden");

  async function save() {
    let body = {
      type: "issue",
      data: {
        id: issue.id,
        title: value,
      },
    };
    const set = fetchSet({ body });

    const res = await fetch((process.env.SERVER_URL || "http://127.0.0.1:3000") + "/api/github", set);
    const data = await res.json();

    setTextDisplay("block");
    setEditDisplay("hidden");
  }

  function edit() {
    setTextDisplay("hidden");
    setEditDisplay("block");
  }
  function cancel() {
    setTextDisplay("block");
    setEditDisplay("hidden");
  }

  function change(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  }

  return (
    <div className="flex justify-between py-4">
      <h1 className={`my-auto text-2xl text-primary ${textDisplay}`}>
        {value} {" #" + issue.number}
      </h1>
      <input
        type="text"
        value={value}
        onChange={change}
        className={`my-auto rounded-md px-2 text-2xl text-primary ${editDisplay}`}
      />
      <button onClick={edit} className={`btn btn-success rounded-md ${textDisplay}`}>
        edit
      </button>
      <div className={`${editDisplay}`}>
        <button onClick={save} className="btn btn-success rounded-md">
          save
        </button>
        <button onClick={cancel} className="btn btn-error rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
