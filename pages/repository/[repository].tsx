import { useRouter } from "next/router";
import { fetchUserGithubOauth } from "lib/User";
import { githubFetch } from "lib/githubApi";
import { verifyJtwCookie } from "lib/jwt";
import { verifyLoginToken } from "lib/User";
import Issues from "components/issues";

export default function Repository({ issues }) {
  const router = useRouter();
  const { repository } = router.query;
  return (
    <div className="">
      <h1 className="text-2xl text-slate-800">issue列表</h1>
      <Issues issues={issues}/>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  let url = req.url.split("/");
  const repositoryName = url[url.length - 1];
  const { token } = verifyJtwCookie(req.cookies.loginToken);
  const user = await verifyLoginToken(token);
  const oauth = await fetchUserGithubOauth(user.id);
  const githubApi = new githubFetch(oauth);
  const issues = await githubApi.getIssues(repositoryName);
  return {
    props: { issues: issues }, // will be passed to the page component as props getIssue
  };
}
