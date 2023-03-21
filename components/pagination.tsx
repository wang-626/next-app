import { replaceUrlParam } from "lib/function";
import type { NextRouter } from "next/dist/client/router";

export default function Pagination({ count, router }: { count: number; router: NextRouter }) {
  if (count <= 10) {
    return null;
  }

  let allPage: number = Math.ceil(count / 10);
  let currPage: number;

  if (router.query.page) {
    currPage = Number(router.query.page);
  } else {
    currPage = 1;
  }

  function change(pageNumber: number) {
    router.push(replaceUrlParam({ url: router.asPath, paramName: "page", paramValue: String(pageNumber) }));
  }

  function previousColor(pageNumber: number) {
    if (pageNumber === 1) {
      return "btn-disabled";
    }
    return "text-primary";
  }

  function nextColor(pageNumber: number) {
    if (pageNumber === allPage) {
      return "btn-disabled";
    }
    return "text-primary";
  }

  let previousArr = [];
  let nextArr = [];

  if (allPage <= 7) {
    for (let page = 1; page < currPage; page++) {
      previousArr.push(
        <button
          key={page}
          onClick={() => change(page)}
          className="btn rounded-sm border-base-200 bg-base-200 text-primary"
        >
          {page}
        </button>
      );
    }

    for (let page = currPage + 1; page <= allPage; page++) {
      nextArr.push(
        <button
          key={page}
          onClick={() => change(page)}
          className="btn rounded-sm border-base-200 bg-base-200 text-primary"
        >
          {page}
        </button>
      );
    }

    return (
      <div className="mt-10 flex justify-center">
        <div className="btn-group">
          <button
            onClick={() => change(currPage + 1)}
            className={`btn rounded-sm border-base-200 bg-base-200 ${previousColor(currPage)}`}
          >
            «
          </button>
          {previousArr}
          <button className="btn btn-active rounded-sm">{currPage}</button>
          {nextArr}
          <button
            onClick={() => change(currPage + 1)}
            className={`btn rounded-sm border-base-200 bg-base-200 ${nextColor(currPage)}`}
          >
            »
          </button>
        </div>
      </div>
    );
  } else {
    if (currPage <= 3) {
      for (let page = 1; page < currPage; page++) {
        previousArr.push(
          <button
            key={page}
            onClick={() => change(page)}
            className="btn rounded-sm border-base-200 bg-base-200 text-primary"
          >
            {page}
          </button>
        );
      }
      for (let page = currPage + 1; page <= 5; page++) {
        nextArr.push(
          <button
            key={page}
            onClick={() => change(page)}
            className="btn rounded-sm border-base-200 bg-base-200 text-primary"
          >
            {page}
          </button>
        );
      }
      return (
        <div className="mt-10 flex justify-center">
          <div className="btn-group">
            <button
              onClick={() => change(currPage - 1)}
              className={`btn rounded-sm border-base-200 bg-base-200 ${previousColor(currPage)}`}
            >
              «
            </button>
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
      for (let page = currPage - 3; page < currPage; page++) {
        previousArr.push(
          <button
            key={page}
            onClick={() => change(page)}
            className="btn rounded-sm border-base-200 bg-base-200 text-primary"
          >
            {page}
          </button>
        );
      }
      for (let page = currPage + 1; page <= allPage; page++) {
        nextArr.push(
          <button
            key={page}
            onClick={() => change(page)}
            className="btn rounded-sm border-base-200 bg-base-200 text-primary"
          >
            {page}
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
      for (let page = currPage - 2; page < currPage; page++) {
        previousArr.push(
          <button
            key={page}
            onClick={() => change(page)}
            className="btn rounded-sm border-base-200 bg-base-200 text-primary"
          >
            {page}
          </button>
        );
      }
      for (let page = currPage + 1; page < currPage + 3; page++) {
        nextArr.push(
          <button
            key={page}
            onClick={() => change(page)}
            className="btn rounded-sm border-base-200 bg-base-200 text-primary"
          >
            {page}
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
