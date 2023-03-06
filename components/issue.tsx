import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function Issue({ issue }: { issue: object }) {
  function redirect() {}
  return (
    <div className="flex justify-between  border-b-2 border-slate-100 py-2 text-lg text-slate-600">
      <div className="">{issue.title}</div>
      <button onClick={redirect}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  );
}
