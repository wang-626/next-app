import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function Issue({ issue }: { issue: object }) {
  const router = useRouter();

  function edit() {
    router.push(`${router.asPath}/${issue.number}`);
  }

  return (
    <div className="flex  justify-between  border-b-2 border-slate-100 py-2 text-lg text-slate-600">
      <div className="flex flex-col px-5">
        <div className={`py-2 text-xl`}>
          {issue.title} {" #" + issue.number}
        </div>
        <div className={`py-2 text-sm`}>{issue.body}</div>
      </div>
      <div className="dropdown dropdown-left">
        <label tabIndex={0} className="m-1 cursor-pointer p-3 py-1">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </label>
        <ul tabIndex={0} className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
          <li>
            <a onClick={edit}>編輯</a>
          </li>
          <li>
            <a>關閉</a>
          </li>
          <li>
            <a>刪除</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
