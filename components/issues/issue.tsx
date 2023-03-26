import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { fetchSet } from "lib/fetch";
import { useState } from "react";
import { removeUrlParameter } from "lib/function";

type issue = {
  id: string;
  title: string;
  number: string;
};

export default function Issue({ issue }: { issue: issue }) {
  const router = useRouter();
  const [display, setDisplay] = useState("block");

  function edit() {
    router.push(`${removeUrlParameter(router.asPath)}/${issue.number}`);
  }
  async function close() {
    let body = {
      type: "issue",
      data: {
        id: issue.id,
        state: "CLOSED",
      },
    };
    const set = fetchSet({ body });
    const res = await fetch(window.location.origin + "/api/github", set);
    window.location.reload();
  }

  return (
    <div className="flex  justify-between rounded-md border-b-2 border-slate-100 py-2 text-lg text-slate-600 hover:bg-base-300">
      <div className="flex flex-col px-5">
        <div className={`py-2 text-xl`}>
          {issue.title} {" #" + issue.number}
        </div>
      </div>
      <div className="dropdown-left dropdown">
        <label tabIndex={0} className="m-1 cursor-pointer p-3 py-1">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </label>
        <ul tabIndex={0} className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
          <li>
            <a onClick={edit}>編輯</a>
          </li>
          <li>
            <a onClick={close}>關閉</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
