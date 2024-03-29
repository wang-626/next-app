import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { fetchSet } from "lib/fetch";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function New() {
  const router = useRouter();
  const [titleValue, setTitleValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const urlArr = router.asPath.split("/");
  let repository = urlArr[urlArr.length - 2];

  async function update(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let body = {
      type: "issueNew",
      data: {
        repository: repository,
        title: titleValue,
        body: bodyValue,
      },
    };
    const set = fetchSet({ body });
    const res = await fetch(window.location.origin + "/api/github", set);
    router.push(`/github/repository/${repository}`);
  }

  function titleChange(event: React.ChangeEvent) {
    const target = event.target as HTMLInputElement;
    setTitleValue(target.value);
  }

  return (
    <div className="pt-5">
      <h1 className="my-auto py-4 text-2xl text-primary">{repository}</h1>
      <div className="border-Stone-100 rounded-md border-2 bg-white p-5 ">
        <form onSubmit={update}>
          <input
            type="text"
            onChange={titleChange}
            pattern="[A-Za-z0-9]{1,20}"
            required={true}
            placeholder="標題"
            className="input-bordered input my-5 w-full"
          />
          <MDEditor
            value={bodyValue}
            onChange={(string) => setBodyValue(string!)}
            textareaProps={{ placeholder: "請寫下問題的描述..." }}
          />
          <div className="flex justify-end py-2">
            <button type="submit" className="btn-success btn rounded-md">
              送出
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
