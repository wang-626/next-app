import { useRouter } from "next/router";
import { fetchUserGithubOauth } from "lib/User";
import { githubFetch } from "lib/githubApi";
import { verifyJtwCookie } from "lib/jwt";
import { verifyLoginToken } from "lib/User";
import Issues from "components/issues/issues";
import Comments from "components/issue/comments";
import IssueBody from "components/issue/issueBody";
import { isNumeric } from "lib/function";

export default function Repository({ data }) {
  const router = useRouter();
  const { repository } = router.query;
  if (data.issueNumber) {
    const { issue } = data;
    return (
      <div className="">
        <div className="flex justify-between">
          <h1 className="text-2xl text-slate-800">
            {issue.title} {" #" + issue.number}
          </h1>
          <button className="btn-success btn rounded-sm">edit</button>
        </div>
        <div className="repository border-Stone-100 border-2 bg-white p-5">
          <IssueBody body={issue.body} author={issue.author.login} />
          <Comments comments={issue.comments.nodes} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="flex justify-between">
          <h1 className="text-2xl text-slate-800">issue列表</h1>
          <button className="btn-success btn rounded-sm">New issue</button>
        </div>
        <Issues issues={data.issues} />
      </div>
    );
  }
}

export async function getServerSideProps({ req, res }) {
  const { token } = verifyJtwCookie(req.cookies.loginToken);
  const user = await verifyLoginToken(token);
  const oauth = await fetchUserGithubOauth(user.id);
  const githubApi = new githubFetch(oauth);
  let url = req.url.split("/");
  let repositoryName = "";
  if (isNumeric(url[url.length - 1])) {
    repositoryName = url[url.length - 2];
    const issueNumber = url[url.length - 1];
    const issue = await githubApi.getIssue({ repository: repositoryName, number: issueNumber });
    return {
      props: { data: { issue: issue, issueNumber: issueNumber } }, // will be passed to the page component as props getIssue
    };
  } else {
    repositoryName = url[url.length - 1];
    const issues = await githubApi.getIssues(repositoryName);
    const issueNumber = false;
    return {
      props: { data: { issues: issues, issueNumber: issueNumber } }, // will be passed to the page component as props getIssue
    };
  }
}
