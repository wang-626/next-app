import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "lib/context/auth";
import Repositories from "components/repositories/repositories";
import { fetchUserGithubOauth } from "lib/User";
import { githubFetch } from "lib/githubApi";
import { verifyJtwCookie } from "lib/jwt";
import { verifyLoginToken } from "lib/User";
import Link from "next/link";
import Pagination from "components/pagination";
import queryString from "node:querystring";

function Home({ repositories, repositoriesCount }: { repositories: any; repositoriesCount: any }) {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  return (
    <div className="pb-10">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href="/">首頁</Link>
          </li>
          <li>儲存庫列表</li>
        </ul>
      </div>
      <div className="py-4">
        <h1 className="text-2xl text-primary">儲存庫列表</h1>
      </div>
      <Repositories repositories={repositories} />
      <Pagination count={repositoriesCount} router={router} />
    </div>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  function convertUrlParameter(url: string) {
    if (url.includes("?")) {
      return {
        url: url.slice(0, url.indexOf("?")),
        params: queryString.parse(url.slice(url.indexOf("?") + 1, url.length)),
      };
    }
    return {
      url: url,
      params: null,
    };
  }
  const { token } = verifyJtwCookie(req.cookies.loginToken);
  const user = await verifyLoginToken(token);
  const oauth = await fetchUserGithubOauth(user.id);
  const githubApi = new githubFetch(oauth);

  const { params } = convertUrlParameter(req.url!);
  let cursor = null;

  if (params && params.page) {
    cursor = await githubApi.getRepositoriesPageCursor({
      page: Number(params.page),
      count: 10,
    });
    const repositories = await githubApi.getRepositories({ after: cursor, count: 10 });
    const repositoriesCount = await githubApi.getRepositoriesCount();
    return {
      props: { repositories: repositories, repositoriesCount: repositoriesCount },
    };
  } else {
    const repositories = await githubApi.getRepositories({ count: 10 });
    const repositoriesCount = await githubApi.getRepositoriesCount();
    return {
      props: { repositories: repositories, repositoriesCount: repositoriesCount },
    };
  }
}

export default Home;
