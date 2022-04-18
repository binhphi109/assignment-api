import { isArray, union, isString } from "lodash";
import { sync } from "glob";

export const getGlobbedPaths = (
  globPatterns: string | Array<string>,
  excludes?: string
) => {
  // URL paths regex
  var urlRegex = new RegExp("^(?:[a-z]+:)?//", "i");

  // The output array
  var output: Array<string> = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (isArray(excludes)) {
            for (var i in excludes) {
              file = file.replace(excludes[i], "");
            }
          } else {
            file = file.replace(excludes, "");
          }
          return file;
        });
      }
      output = union(output, files);
    }
  }

  return output;
};
