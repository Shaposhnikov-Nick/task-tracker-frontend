export interface RequestConfig {
  data?: any;
  params?: any;
  accessToken?: any;
  method?: string;
}

export const get = async (
  url: string,
  config?: RequestConfig,
): Promise<any> => {
  try {
    const response = await fetch(
      buildUrl(url, config),
      await adjustConfig(config),
    );
    return await handleResponse(response);
  } catch (e: any) {
    console.log("Error when GET api call");
  }
};

export const post = async (
  url: string,
  config?: RequestConfig,
): Promise<any> => {
  try {
    const response = await fetch(
      buildUrl(url, config),
      await adjustConfig({ ...config, method: "POST" }),
    );
    return await handleResponse(response);
  } catch (e: any) {
    console.log("Error when POST api call");
  }
};

function buildUrl(url: string, config?: RequestConfig): string {
  let fullUrl = apiBaseUrl() + url;
  if (config?.params) {
    fullUrl += fullUrl.includes("?") ? "&" : "?";
    Object.keys(config.params).forEach(
      (key) => config.params[key] === undefined && delete config.params[key],
    );
    fullUrl += new URLSearchParams(config?.params).toString();
  }
  return fullUrl;
}

async function adjustConfig(config?: RequestConfig): Promise<RequestInit> {
  let body: any;
  const headers: HeadersInit = {};

  if (config?.data instanceof FormData) {
    body = config.data;
  } else if (config?.data) {
    body = JSON.stringify(config.data);
    headers["Content-Type"] = "application/json";
  }

  if (config?.accessToken) {
    headers["Cookie"] = `jwt.access=${config.accessToken}`;
  }

  return {
    credentials: "include",
    headers,
    body,
    ...config,
  };
}

const handleJSON = async (response: Response) => {
  try {
    return await response.json();
  } catch (error) {
    console.error("Error parsing JSON response: ", error);
    return { status: response.status, message: response.statusText };
  }
};

const handleResponse = (response: Response): Promise<any> => {
  const r =
    typeof response.json === "function" &&
    response.headers.get("Content-Type") != null
      ? handleJSON(response)
      : Promise.resolve({
          status: response.status,
          message: response.statusText,
          headers: response.headers,
        });
  return r.then((r) => {
    return r.status >= 400 || r.code >= 400
      ? Promise.reject(r)
      : Promise.resolve(r);
  });
};

export const apiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};
