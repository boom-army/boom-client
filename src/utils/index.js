import axios from "axios";

export const displayError = (err, enqueueSnackbar) => {
  let e = err.message.split(":");
  e = e.length === 1 ? e[0] : e[1];
  enqueueSnackbar(e.trim().replace(".", ""),{ variant:"error" });
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

export const uploadImage = async (file, signedUrl) => {
  let toastId = null;
  const data = await axios.put(signedUrl, file, {
    headers: {
      "Content-Type": file.type,
      "x-amz-acl": "public-read",
      // "Content-Disposition": "inline",
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
