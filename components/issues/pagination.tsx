import { replaceUrlParam } from "lib/function";

export default function Pagination({ issueCount, router }: { issueCount: number; router: any }) {
  if (issueCount <= 10) {
    return null;
  }
  const urlArr = router.asPath.split("/");
  let repository = urlArr[urlArr.length - 2];
  let allPage = Math.ceil(issueCount / 10);
  function change(i) {
    router.push(replaceUrlParam({ url: router.asPath, paramName: "page", paramValue: String(i) }));
  }

  function previousColor(page) {
    if (page === 1) {
      return "btn-disabled";
    }
    return "text-primary";
  }

  function nextColor(page) {
    if (page === allPage) {
      return "btn-disabled";
    }
    return "text-primary";
  }

  let currPage;

  if (router.query.page) {
    currPage = Number(router.query.page);
  } else {
    currPage = 1;
  }
  let previousArr = [];
  let nextArr = [];

  if (allPage <= 7) {
    for (let i = 1; i < currPage; i++) {
      previousArr.push(
        <button key={i} onClick={() => change(i)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
          {i}
        </button>
      );
    }

    for (let i = currPage + 1; i <= allPage; i++) {
      nextArr.push(
        <button key={i} onClick={() => change(i)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
          {i}
        </button>
      );
    }

    return (
      <div className="mt-10 flex justify-center">
        <div className="btn-group">
          <button onClick={() => change(currPage + 1)} className={`btn rounded-sm border-base-200 bg-base-200 ${previousColor(currPage)}`}>«</button>
          {previousArr}
          <button className="btn btn-active rounded-sm">{currPage}</button>
          {nextArr}
          <button onClick={() => change(currPage + 1)} className={`btn rounded-sm border-base-200 bg-base-200 ${nextColor(currPage)}`}>»</button>
        </div>
      </div>
    );
  } else {
    if (currPage <= 3) {
      for (let i = 1; i < currPage; i++) {
        previousArr.push(
          <button key={i} onClick={() => change(i)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
            {i}
          </button>
        );
      }
      for (let i = currPage + 1; i <= 5; i++) {
        nextArr.push(
          <button key={i} onClick={() => change(i)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
            {i}
          </button>
        );
      }
      return (
        <div className="mt-10 flex justify-center">
          <div className="btn-group">
            <button onClick={() => change(currPage - 1)} className={`btn rounded-sm border-base-200 bg-base-200 ${previousColor(currPage)}`}>«</button>
            {previousArr}
            <button className="btn btn-active rounded-sm">{currPage}</button>
            {nextArr}
            <button className="btn-disabled btn rounded-sm border-base-200 bg-base-200 text-primary">...</button>
            <button onClick={() => change(allPage)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
              {allPage}
            </button>
            <button
              onClick={() => change(currPage + 1)}
              className={`btn rounded-sm border-base-200 bg-base-200 ${nextColor(currPage)}`}
            >
              »
            </button>
          </div>
        </div>
      );
    } else if (currPage > allPage - 3) {
      for (let i = currPage - 3; i < currPage; i++) {
        previousArr.push(
          <button key={i} onClick={() => change(i)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
            {i}
          </button>
        );
      }
      for (let i = currPage + 1; i <= allPage; i++) {
        nextArr.push(
          <button key={i} onClick={() => change(i)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
            {i}
          </button>
        );
      }
      return (
        <div className="mt-10 flex justify-center">
          <div className="btn-group">
            <button className="btn rounded-sm border-base-200 bg-base-200 text-primary">«</button>
            <button onClick={() => change(1)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
              1
            </button>
            <button className="btn-disabled btn rounded-sm border-base-200 bg-base-200 text-primary">...</button>
            {previousArr}
            <button className="btn btn-active rounded-sm">{currPage}</button>
            {nextArr}
            <button className={`btn rounded-sm border-base-200 bg-base-200 ${nextColor(currPage)}`}>»</button>
          </div>
        </div>
      );
    } else {
      for (let i = currPage - 2; i < currPage; i++) {
        previousArr.push(
          <button key={i} onClick={() => change(i)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
            {i}
          </button>
        );
      }
      for (let i = currPage + 1; i < currPage + 3; i++) {
        nextArr.push(
          <button key={i} onClick={() => change(i)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
            {i}
          </button>
        );
      }
      return (
        <div className="mt-10 flex justify-center">
          <div className="btn-group">
            <button className="btn rounded-sm border-base-200 bg-base-200 text-primary">«</button>
            <button onClick={() => change(1)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
              1
            </button>
            <button className="btn-disabled btn rounded-sm border-base-200 bg-base-200 text-primary">...</button>
            {previousArr}
            <button className="btn btn-active rounded-sm">{currPage}</button>
            {nextArr}
            <button className="btn-disabled btn rounded-sm border-base-200 bg-base-200 text-primary">...</button>
            <button onClick={() => change(allPage)} className="btn rounded-sm border-base-200 bg-base-200 text-primary">
              {allPage}
            </button>
            <button className="btn rounded-sm border-base-200 bg-base-200 text-primary">»</button>
          </div>
        </div>
      );
    }
  }
}
