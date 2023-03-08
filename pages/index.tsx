import { useContext } from "react";
import { AuthContext } from "lib/context/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import img from "public/github.svg";

function Home() {
  const router = useRouter();
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  function redirectGithub() {
    router.push("/github");
  }

  if (authenticated) {
    return (
      <div className="py-4">
        <div className="card w-96 bg-base-200 py-3 shadow-xl">
          <figure>
            <Image src={img} alt="Picture of the author" width={100} height={100} className="mx-auto" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Github API</h2>
            <p>操控你的儲存庫issue，透過github graphql 實現</p>
            <div className="card-actions justify-end">
              <button onClick={redirectGithub} className="btn-primary btn">
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <p>首頁</p>
      <p>請先登入</p>
    </>
  );
}

export default Home;
