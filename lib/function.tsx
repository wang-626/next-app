/**  Check string can be converted into numbers
 @param str
*/

export const isNumeric = (str: unknown) =>
  (typeof str === "number" || (typeof str === "string" && str.trim() !== "")) && !isNaN(str as number);

/**  Remove url queryString
 @param url 
*/

export const removeUrlParameter = (url: string) => {
  if (url.includes("?")) {
    return url.slice(0, url.indexOf("?"));
  }
  return url;
};

/**  Replace url queryString 
 *   If no replace object Add param to queryString
 @param url 
 @param paramName  queryString param
 @param paramValue param value
*/

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

/** isBrowser Check work on the Browser or Sever*/

export const isBrowser = typeof window !== "undefined";
