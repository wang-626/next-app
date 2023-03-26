import { useRouter } from "next/router";
import { fetchUserGithubOauth } from "lib/User";
import { githubFetch } from "lib/githubApi";
import { verifyJtwCookie } from "lib/jwt";
import { verifyLoginToken } from "lib/User";
import Issues from "components/issues/issues";
import Comments from "components/issue/comments";
import IssueBody from "components/issue/issueBody";
import IssueTitle from "components/issue/issueTitle";
import New from "components/issues/new";
import Pagination from "components/pagination";
import { isNumeric, removeUrlParameter } from "lib/function";
import Link from "next/link";
import queryString from "node:querystring";
import type { issue } from "types/github";
import { issueStates } from "types/github";

type data = {
  issue: issue;
  issues?: issue[];
  issueCount?: number;
};

export default function Repository({ data }: { data: data }) {
  const router = useRouter();
  const { repository } = router.query;
  function newIssue() {
    router.push(`${removeUrlParameter(router.asPath)}/new`);
  }

  if (isNumeric(removeUrlParameter(router.asPath).slice(-1))) {
    const { issue } = data;
    return (
      <div className="mb-4">
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
  } else if (removeUrlParameter(router.asPath).slice(-3) === "new") {
    return (
      <div className="pb-10">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/"> 首頁</Link>
            </li>
            <li>
              <Link href="/github">儲存庫列表</Link>
            </li>
            <li>
              <p>{repository![0]}&nbsp;&nbsp;new</p>
            </li>
          </ul>
        </div>
        <New />
      </div>
    );
  } else {
    return (
      <div className="pb-10">
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
          <button onClick={newIssue} className="btn-success btn rounded-md">
            New issue
          </button>
        </div>
        <Issues issues={data.issues!} />
        <Pagination count={data.issueCount!} router={router} />
      </div>
    );
  }
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

  const { token } = verifyJtwCookie(req.cookies.loginToken!);
  const user = await verifyLoginToken(token);
  const oauth = await fetchUserGithubOauth(user.id);
  const githubApi = new githubFetch(oauth);
  let repository: string = "";
  let { url, params } = convertUrlParameter(req.url!);
  let urlArr = removeUrlParameter(url).split("/");

  if (urlArr[1] === "_next") {
    // Array.isArray 從new redirect回來會有 params.repository
    if (params && params.repository && Array.isArray(params.repository)) {
      // params.repository[1]是數字 則查詢issue 不是數字代表是new 新issue
      if (isNumeric(params.repository[1])) {
        repository = params.repository[0];
        const issueNumber = params.repository[1];
        const issue = await githubApi.getIssue({ repository: repository, number: issueNumber });

        if (issue === null) {
          return {
            notFound: true,
          };
        }

        return {
          props: { data: { issue: issue } },
        };
      } else {
        return {
          props: { data: { issue: null } },
        };
      }
    } else {
      repository = params!.repository! as string;
      let state: issueStates = issueStates.OPEN;
      if (params!.state) {
        state = issueStates[params!.state as keyof typeof issueStates];
      }
      let cursor = null;
      if (params && params.page) {
        cursor = await githubApi.getIssuePageCursor({
          repository: repository,
          state: state,
          page: Number(params.page),
          count: 10,
        });
      }

      const issues = await githubApi.getIssues({ repository: repository, state: state, after: cursor });
      const issueCount = await githubApi.getIssueCount({ repository: repository, state: state });

      if (issues === null) {
        return {
          notFound: true,
        };
      }

      return {
        props: { data: { issues: issues, issueCount: issueCount } },
      };
    }
  } else {
    if (isNumeric(urlArr[urlArr.length - 1])) {
      repository = urlArr[urlArr.length - 2];
      const issueNumber = urlArr[urlArr.length - 1];
      const issue = await githubApi.getIssue({ repository: repository, number: issueNumber });

      if (issue === null) {
        return {
          notFound: true,
        };
      }

      return {
        props: { data: { issue: issue } },
      };
    } else if (urlArr[urlArr.length - 1] === "new") {
      return {
        props: { data: null },
      };
    } else {
      repository = urlArr[urlArr.length - 1];
      let state: issueStates = issueStates.OPEN;
      if (params && params.state) {
        state = issueStates[params!.state as keyof typeof issueStates];
      }
      let cursor = null;
      if (params && params.page) {
        cursor = await githubApi.getIssuePageCursor({
          repository: repository,
          state: state,
          page: Number(params.page),
          count: 10,
        });
      }

      const issues = await githubApi.getIssues({ repository: repository, state: state, after: cursor });
      const issueCount = await githubApi.getIssueCount({ repository: repository, state: state });

      if (issues === null) {
        return {
          notFound: true,
        };
      }

      return {
        props: { data: { issues: issues, issueCount: issueCount } },
      };
    }
  }
}
