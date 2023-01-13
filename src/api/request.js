import axios from "axios";
export const BASEURL = `${import.meta.env.VITE_BASE_API}`;
import { globalStore } from "@/stores/global";
// const xsrfHeaderName = "Authorization";
// for directus封裝

// 取pinia的全域

export const get = async ({
  type = "items",
  collection = "",
  params = { fields: "*,files.*" },
}) => {
  const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_ID}`);
  console.log("get token", token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  try {
    const { data, status } = await axios.get(
      `${BASEURL}/${type}/${collection}`,
      {
        params,
      }
    );
    onSuccess(data, status);
    return data.data;
  } catch (error) {
    onError(error);
    handleErrorMsg(error.response.status);
    return false;
  }
};

export const post = async ({
  data: inpudata = null,
  type = "items",
  collection = "",
}) => {
  const token = localStorage.getItem(`${import.meta.env.VITE_TOKEN_ID}`);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  console.log("fuck", token);
  try {
    const { data, status } = await axios.post(
      `${BASEURL}/${type}/${collection}`,
      inpudata
    );
    onSuccess(data, status);
    return data.data;
  } catch (error) {
    onError(error);
    handleErrorMsg(error.response.status);
    return false;
  }
};

// for directus 會回傳一個圖片asset用的url
export const assetURL = (
  assetID,
  params = { quality: null, width: null, transforms: null }
) => {
  // quality=${params.quality}&width=${params.width}
  const quality = params.quality ? `quality=${params.quality}` : "";
  const width = params.width ? `&width=${params.width}` : "";
  const transforms = params.transforms
    ? `&transforms=${params.transforms}`
    : [];
  return `${BASEURL}/assets/${assetID}?${quality}${width}${transforms}`;
};
function onSuccess(data, status) {
  console.log(
    `%cGET ${status}`,
    "font-weight:bold;border:1px solid white;padding:0.3rem 1rem;background-color:green;border-radius:1rem"
  );
  console.log(data);
}

function onError(error) {
  console.log(
    `%cGET ${error.response.status}`,
    "font-weight:bold;border:1px solid white;padding:0.3rem 1rem;background-color:red;border-radius:1rem"
  );
  console.log(error.response.data.errors[0].message);
}

function handleErrorMsg(status) {
  const global = globalStore();
  const map = {
    401: "登入資料錯誤",
  };
  global.text = map[status];
  global.show = true;
  return map[status] ? map[status] : "系統錯誤";
}
