export const isNumeric = (num: unknown) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) && !isNaN(num as number);

export const removeUrlParameter = (url: string) => {
  if (url.includes("?")) {
    return url.slice(0, url.indexOf("?"));
  }
  return url;
};

export const replaceUrlParam = ({
  url,
  paramName,
  paramValue,
}: {
  url: string;
  paramName: string;
  paramValue: string;
}) => {
  if (url.includes("?")) {
    if (url.slice(url.indexOf("?"), url.length).includes(paramName)) {
      let re = new RegExp(String.raw`(?<=\&|\?)${paramName}(.*(?=\&|\?)|.*$)`);
      return url.replace(re, `${paramName}=${paramValue}`);
    }
    return url + `&${paramName}=${paramValue}`;
  } else {
    return url + `?${paramName}=${paramValue}`;
  }
};
