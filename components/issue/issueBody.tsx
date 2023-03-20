import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { fetchSet } from "lib/fetch";
import Markdown from "markdown-to-jsx";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function IssueBody({ id, body, author }: { id: string; body: string; author: string }) {
  const [value, setValue] = useState(body);
  const [textDisplay, setTextDisplay] = useState("block");
  const [editDisplay, setEditDisplay] = useState("hidden");

  async function update() {
    let body = {
      type: "issue",
      data: {
        id: id,
        body: value,
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

  return (
    <div className="flex justify-between border-b-2 border-slate-100 py-2 text-lg text-slate-600">
      <div className="flex w-full flex-col rounded-md  px-5 hover:bg-base-300">
        <div className="flex justify-between">
          <div className={`py-2 text-xl`}>{author}</div>
          <div className={`dropdown-left dropdown ${textDisplay}`}>
            <label tabIndex={0} className="m-1 cursor-pointer p-3 py-1">
              <FontAwesomeIcon icon={faEllipsis} />
            </label>
            <ul tabIndex={0} className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
              <li>
                <a onClick={edit}>編輯</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={`prose py-2 text-sm ${textDisplay}`}>
          <Markdown>{value}</Markdown>
        </div>
        <div className={`${editDisplay}`}>
          <MDEditor value={value} onChange={(string) => setValue(string!)} />
          <div className="flex justify-end py-2">
            <button onClick={cancel} className="btn-error btn mr-2 rounded-md">
              取消
            </button>
            <button onClick={update} className="btn-success btn rounded-md">
              更新
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
