import Repository from "components/repositories/repository";
export default function Repositories({ repositories }: { repositories: string[] }) {
  if (repositories) {
    return (
      <div className="repository bg-white border-2 border-Stone-100 p-5">
        {repositories.map((obj, i) => {
          return <Repository key={i} repository={obj.name} />;
        })}
      </div>
    );
  } else {
    return <div className="container mx-auto px-4">test{repositories}---</div>;
  }
}
