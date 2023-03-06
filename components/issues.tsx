import Issue from "components/issue";
export default function Issues({ issues }: { issues: string[] }) {
  if (issues) {
    return (
      <div className="repository border-Stone-100 border-2 bg-white p-5">
        {issues.map((obj, i) => {
          return <Issue key={i} issue={obj} />;
        })}
      </div>
    );
  } else {
    return <div className="container mx-auto px-4">test</div>;
  }
}
