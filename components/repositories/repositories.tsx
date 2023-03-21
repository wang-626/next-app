import Repository from "components/repositories/repository";

type repository = {
  name: string;
};

export default function Repositories({ repositories }: { repositories: repository[] }) {
  if (repositories) {
    return (
      <div className="repository border-Stone-100 rounded-md border-2 bg-white p-5">
        {repositories.map((repositoryObj: repository, i: number) => {
          return <Repository key={i} repository={repositoryObj.name} />;
        })}
      </div>
    );
  } else {
    return <div className="container mx-auto px-4">test{repositories}---</div>;
  }
}
