import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { replaceUrlParam } from "lib/function";

export default function Nav() {
  const router = useRouter();
  const [checked, setChecked] = useState("OPEN");

  useEffect(() => {
    if (router.query.state && router.query.state === "CLOSED") {
      setChecked("CLOSED");
    }
  }, []);

  function open() {
    if (router.query.state === undefined) return;
    setChecked("OPEN");
    router.push(replaceUrlParam({ url: router.asPath, paramName: "state", paramValue: "OPEN" }));
  }
  function close() {
    if (router.query.state === "CLOSED") return;
    setChecked("CLOSED");
    router.push(replaceUrlParam({ url: router.asPath, paramName: "state", paramValue: "CLOSED" }));
  }
  return (
    <div className="flex px-5">
      <div className="form-control">
        <label className="label cursor-pointer pr-2">
          <span className="label-text pr-2">OPEN</span>
          <input
            onChange={open}
            type="radio"
            value={checked}
            name="radio-1"
            checked={checked == "OPEN"}
            className="radio"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer pr-2">
          <span className="label-text pr-2">CLOSE</span>
          <input
            onChange={close}
            type="radio"
            value={checked}
            name="radio-1"
            checked={checked == "CLOSED"}
            className="radio"
          />
        </label>
      </div>
    </div>
  );
}
