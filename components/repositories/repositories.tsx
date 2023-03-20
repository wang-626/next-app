import Repository from "components/repositories/repository";
export default function Repositories({ repositories }: { repositories: any }) {
  if (repositories) {
    return (
      <div className="repository border-Stone-100 rounded-md border-2 bg-white p-5">
        {repositories.map((obj: any, i: any) => {
          return <Repository key={i} repository={obj.name} />;
        })}
      </div>
    );
  } else {
    return <div className="container mx-auto px-4">test{repositories}---</div>;
  }
}
