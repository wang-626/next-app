import { useRouter } from "next/router";

export default function Repository({ repository }: { repository: string[] }) {
  const router = useRouter();
  function redirect() {
    router.push(`github/repository/${repository}`);
  }
  return (
    <div className="flex justify-between rounded-md px-4 border-b-2 border-slate-100 py-2 text-lg text-slate-600 hover:bg-base-300">
      <div className="">{repository}</div>
      <button onClick={redirect}>查看</button>
    </div>
  );
}
