import { useContext } from "react";
import { AuthContext } from "lib/context/auth";
import Repositories from "components/repositories/repositories";
import { fetchUserGithubOauth } from "lib/User";
import { githubFetch } from "lib/githubApi";
import { verifyJtwCookie } from "lib/jwt";
import { verifyLoginToken } from "lib/User";

function Home({ repositories }) {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  if (authenticated) {
    return (
      <div>
        <div>
          <h1 className="text-2xl text-slate-800">儲存庫列表</h1>
        </div>
        <Repositories repositories={repositories} />
      </div>
    );
  } else {
    return <p>請先登入</p>;
  }
}

export async function getServerSideProps({ req, res }) {
  if (req.cookies.loginToken) {
    const { token } = verifyJtwCookie(req.cookies.loginToken);
    const user = await verifyLoginToken(token);
    const oauth = await fetchUserGithubOauth(user.id);
    const githubApi = new githubFetch(oauth);
    const repositories = await githubApi.getRepositories();

    return {
      props: { repositories: repositories }, // will be passed to the page component as props
    };
  } else {
    return {
      props: { repositories: null }, // will be passed to the page component as props
    };
  }
}

export default Home;
