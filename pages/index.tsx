import { useContext } from "react";
import { AuthContext } from "lib/context/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import img from "public/github.svg";

function Home() {
  const router = useRouter();
  const { authenticated } = useContext(AuthContext);

  function redirectGithub() {
    router.push("/github");
  }

  function redirectLogin() {
    router.push("/user/login");
  }

  if (authenticated) {
    return (
      <div className="py-4">
        <div className="card w-96 bg-base-100 py-3 shadow-xl">
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
    <div className="py-4">
      <div>
        <h1 className="py-4 text-2xl">功能實作</h1>
        <div className="card w-96 bg-base-100 py-3 shadow-xl">
          <figure>
            <Image src={img} alt="Picture of the author" width={100} height={100} className="mx-auto" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Github API</h2>
            <p>操控你的儲存庫issue，透過github graphql 實現</p>
            <div className="card-actions justify-end">
              <button onClick={redirectLogin} className="btn-primary btn">
                sing in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="py-4 text-2xl">文章</h1>
      </div>
    </div>
  );
}

export default Home;
