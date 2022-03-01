import axios from "axios";
import { transform, camelCase, isArray, isObject } from "lodash";

export const displayError = (err, enqueueSnackbar) => {
  let e = err.message.split(":");
  e = e.length === 1 ? e[0] : e[1];
  enqueueSnackbar(e.trim().replace(".", ""), { variant: "error" });
};

export const sortFn = (a, b) => {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA < dateB ? 1 : -1;
};

export const setDate = (date) => {
  date = new Date(date / 1000);
  const newDate = new Date(0);
  newDate.setUTCSeconds(date);
  return newDate;
};

export const uploadFile = async (file, signedUrl, enqueueSnackbar) => {
  const data = await axios.put(signedUrl, file, {
    headers: {
      "Content-Type": file.type,
      "x-amz-acl": "public-read",
      // "Content-Disposition": "inline",
    },
    onUploadProgress: (p) => {
      // progress = p.loaded / p.total;
    },
  });
  // TODO: probably should replace notistack with https://github.com/fkhadra/react-toastify
  enqueueSnackbar(`Upload in progress`, { variant: "info" });
  return data;
};

export const camelizeKeys = (obj) =>
  transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);

    acc[camelKey] = isObject(value) ? camelizeKeys(value) : value;
  });
