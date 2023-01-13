import axios from "axios";
export const BASEURL = `${import.meta.env.VITE_BASE_API}`;
// const xsrfHeaderName = "Authorization";
// for directus封裝
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
    console.log(
      `%cGET ${status}`,
      "font-weight:bold;border:1px solid white;padding:0.3rem 1rem;background-color:green;border-radius:1rem"
    );
    console.log(data);

    return data.data;
  } catch (error) {
    console.log(
      `%cGET ${error.response.status}`,
      "font-weight:bold;border:1px solid white;padding:0.3rem 1rem;background-color:red;border-radius:1rem"
    );
    console.log(error.message);
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
    console.log(
      `%cGET ${status}`,
      "font-weight:bold;border:1px solid white;padding:0.3rem 1rem;background-color:green;border-radius:1rem"
    );
    console.log(data);

    return data.data;
  } catch (error) {
    console.log(
      `%cGET ${error.response.status}`,
      "font-weight:bold;border:1px solid white;padding:0.3rem 1rem;background-color:red;border-radius:1rem"
    );
    console.log(error.response.data.errors[0].message);
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
