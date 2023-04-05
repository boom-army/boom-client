import axios from "axios";
import { transform, camelCase, isArray, isObject, omit } from "lodash";

export const displayError = (err: any, enqueueSnackbar: any) => {
  let e = err.message ? err.message.split(":") : [err];
  e = e.length === 1 ? e[0] : e[1];
  enqueueSnackbar(e.trim().replace(".", ""), { variant: "error" });
};

export const sortFn = (a: any, b: any) => {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA < dateB ? 1 : -1;
};

export const setDate = (date: any) => {
  date = new Date(date / 1000);
  const newDate = new Date(0);
  newDate.setUTCSeconds(date);
  return newDate;
};

export const uploadFile = async (
  file: any,
  signedUrl: any,
  enqueueSnackbar: any
) => {
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
  enqueueSnackbar(`Upload in progress`, { variant: "info" });
  return data;
};

export const camelizeKeys = (obj: any) =>
  transform(
    obj,
    (
      acc: any,
      value: any,
      key: string,
      target: Record<string | number | symbol, any>
    ) => {
      const camelKey = isArray(target) ? key : camelCase(key);

      acc[camelKey] = isObject(value) ? camelizeKeys(value) : value;
    }
  );

export const cleanTypeName = (obj: any) => {
  return omit(obj, "__typename");
};

export const awardColorSelect = (index: number) => {
  switch (index) {
    case 0:
      return "#c3a400";
    case 1:
      return "#B4B4B4";
    case 2:
      return "#af956d";
    default:
      return "inherit";
  }
};
