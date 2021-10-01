import axios from "axios";
import { toast } from "react-toastify";

export const displayError = (err) => {
  let e = err.message.split(":");
  e = e.length === 1 ? e[0] : e[1];
  toast.error(e.trim().replace(".", ""));
};

export const sortFn = (a, b) => {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA < dateB ? 1 : -1;
};

export const setDate = (date) => {
  date = new Date(date/1000);
  const newDate = new Date(0);
  newDate.setUTCSeconds(date);
  return newDate;
};

export const uploadImage = async (file, signedUrl) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("name", file.name);

  let toastId = null;
  const data = await axios.request({
    method: "PUT",
    url: signedUrl,
    data: formData,
    headers: {
      "Content-Type": file.type,
      "x-amz-acl": "public-read",
      "Content-Disposition": "inline",
    },
    onUploadProgress: (p) => {
      const progress = p.loaded / p.total;

      if (toastId === null) {
        toastId = toast("Upload in progress", {
          progress,
          bodyClassName: "upload-progress-bar",
        });
      } else {
        toast.update(toastId, {
          progress,
        });
      }
    },
  });

  toast.dismiss(toastId);

  return data;
};