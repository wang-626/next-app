import Issue from "components/issues/issue";
import Image from "next/image";
import img from "public/confusion.png";

export default function Issues({ issues }: { issues: string[] }) {
  if (issues.length > 0) {
    return (
      <div className="repository border-Stone-100 rounded-md border-2 bg-white p-5">
        {issues.map((obj, i) => {
          return <Issue key={i} issue={obj} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="repository border-Stone-100 flex justify-center rounded-md border-2 bg-white p-5">
        <p className="text-center">此專案還沒有issue喔&nbsp;&nbsp;</p>
        <Image src={img} alt="Picture of the author" width={30} height={30} />
      </div>
    );
  }
}
