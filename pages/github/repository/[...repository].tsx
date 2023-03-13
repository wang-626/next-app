import { useRouter } from "next/router";
import { fetchUserGithubOauth } from "lib/User";
import { githubFetch } from "lib/githubApi";
import { verifyJtwCookie } from "lib/jwt";
import { verifyLoginToken } from "lib/User";
import Issues from "components/issues/issues";
import Comments from "components/issue/comments";
import IssueBody from "components/issue/issueBody";
import IssueTitle from "components/issue/issueTitle";
import { isNumeric, removeUrlParameter } from "lib/function";
import Link from "next/link";
import type { NextApiRequest, NextApiResponse } from "next";
import { issueStates } from "type/github";
import queryString from "node:querystring";

type data = {
  issueNumber: string;
  issue: any;
  issues: any;
};
export default function Repository({ data }: { data: data }) {
  const router = useRouter();
  const { repository } = router.query;

  function edit() {
    alert("123");
  }

  if (data.issueNumber) {
    const { issue } = data;
    return (
      <div className="">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/"> 首頁</Link>
            </li>
            <li>
              <Link href="/github">儲存庫列表</Link>
            </li>
            <li>
              <Link href={`/github/repository/${repository![0]}`}>{repository![0]}</Link>
            </li>
            <li>
              <p>issue-{issue.number}</p>
            </li>
          </ul>
        </div>
        <IssueTitle issue={issue} />
        <div className="repository border-Stone-100 rounded-md border-2 bg-white p-5">
          <IssueBody id={issue.id} body={issue.body} author={issue.author.login} />
          <Comments comments={issue.comments.nodes} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/"> 首頁</Link>
            </li>
            <li>
              <Link href="/github">儲存庫列表</Link>
            </li>
            <li>
              <p>{repository![0]}&nbsp;&nbsp;issue列表</p>
            </li>
          </ul>
        </div>
        <div className="flex justify-between py-4 ">
          <h1 className="my-auto text-2xl text-primary">{repository![0]}&nbsp;&nbsp;issue列表</h1>
          <button className="btn-success btn rounded-md">New issue</button>
        </div>
        <Issues issues={data.issues} />
      </div>
    );
  }
}

export async function getServerSideProps({ req, _res }: { req: any; _res: NextApiResponse }) {
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

  const { token } = verifyJtwCookie(req.cookies.loginToken!);
  const user = await verifyLoginToken(token);
  const oauth = await fetchUserGithubOauth(user.id);
  const githubApi = new githubFetch(oauth);
  let repositoryName = "";
  let { url, params } = convertUrlParameter(req.url!);
  console.log(convertUrlParameter(req.url!));
  url = removeUrlParameter(url).split("/");

  if (url[1] === "_next") {
    const nextRequestMeta = req[Reflect.ownKeys(req).find((s) => String(s) === "Symbol(NextRequestMeta)")!];
    if (Array.isArray(nextRequestMeta.__NEXT_INIT_QUERY.repository)) {
      repositoryName = nextRequestMeta.__NEXT_INIT_QUERY.repository[0];
      const issueNumber = nextRequestMeta.__NEXT_INIT_QUERY.repository[1];
      const issue = await githubApi.getIssue({ repository: repositoryName, number: issueNumber });

      return {
        props: { data: { issue: issue, issueNumber: issueNumber } },
      };
    } else {
      repositoryName = nextRequestMeta.__NEXT_INIT_QUERY.repository;
      let state: issueStates = issueStates.OPEN;
      if (params.state) {
        state = params.state;
      }

      const issues = await githubApi.getIssues(repositoryName, state);
      const issueNumber = false;
      return {
        props: { data: { issues: issues, issueNumber: issueNumber } },
      };
    }
  } else {
    if (isNumeric(url[url.length - 1])) {
      repositoryName = url[url.length - 2];
      const issueNumber = url[url.length - 1];
      const issue = await githubApi.getIssue({ repository: repositoryName, number: issueNumber });

      return {
        props: { data: { issue: issue, issueNumber: issueNumber } },
      };
    } else {
      repositoryName = url[url.length - 1];
      let state: issueStates = issueStates.OPEN;
      if (params && params.state) {
        state = params.state;
      }
      const issues = await githubApi.getIssues(repositoryName, state);
      const issueNumber = false;

      return {
        props: { data: { issues: issues, issueNumber: issueNumber } },
      };
    }
  }
}
