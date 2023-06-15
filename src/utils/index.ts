import axios from "axios";
import dayjs from "dayjs";
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
  const seconds = date / 1000;
  const fractionalPart = seconds % 1;
  const precision = fractionalPart.toString().split(".")[1]?.length || 0;

  const newDate = new Date(0);
  newDate.setUTCSeconds(seconds);

  return precision <= 3 ? newDate : newDate.getTime();
};

export const uploadFile = async (
  file: any,
  signedUrl: any,
  enqueueSnackbar: any,
  setUploadState?: any
) => {
  return axios
    .put(signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (p) => {
        const progress = Math.round((p.loaded / p.total) * 100); // Calculate progress percentage
        setUploadState && setUploadState(progress);
      },
    })
    .then((data) => {
      enqueueSnackbar("Upload completed", { variant: "success" });
      return data;
    })
    .catch((error) => {
      enqueueSnackbar("Upload failed", { variant: "error" });
      console.error("Upload error:", error);
    });
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

export const getUniqueFileName = (file: File, prefix?: string) => {
  const timestamp = dayjs().format("YYYY-MM-DD_HH-mm-ss");
  const id = prefix || "user";
  const uniqueFilename = `${id}_${timestamp}_${file.name}`;
  return new File([file], uniqueFilename, { type: file.type });
};

export const localStorageLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("sidebarState");
};

export const getRandomFromArr = (arr: Array<any>) =>
  arr[Math.floor(Math.random() * arr.length)];
