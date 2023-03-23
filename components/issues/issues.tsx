import Issue from "components/issues/issue";
import Nav from "components/issues/nav";
import Image from "next/image";
import img from "public/confusion.png";
import type { issue } from "types/github";

export default function Issues({ issues }: { issues: issue[] }) {
  if (issues.length > 0) {
    return (
      <div className="repository border-Stone-100 rounded-md border-2 bg-white p-5">
        <Nav />
        {issues.map((issue, i) => {
          return <Issue key={i} issue={issue} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="repository border-Stone-100 flex justify-center rounded-md border-2 bg-white p-5">
        <Nav />
        <p className="my-auto text-center">此專案還沒有issue喔&nbsp;&nbsp;</p>
        <Image src={img} alt="Picture of the author" width={30} height={30} />
      </div>
    );
  }
}
