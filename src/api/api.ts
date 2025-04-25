export interface RequestConfig {
  data?: object | FormData;
  params?: Record<string, string | number | boolean | undefined>;
  accessToken?: string;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const request = async (
  method: HttpMethod,
  url: string,
  config?: RequestConfig,
) => {
  try {
    const fullUrl = buildUrl(url, config);
    const fetchConfig = adjustConfig(config, method);
    const response = await fetch(fullUrl, fetchConfig);
    return handleResponse(response);
  } catch (e) {
    console.error(`Error during ${method} request to ${url}:`, e);
    throw e;
  }
};

export const get = (url: string, config?: RequestConfig) =>
  request("GET", url, config);

export const post = (url: string, config?: RequestConfig) =>
  request("POST", url, config);

export const put = (url: string, config?: RequestConfig) =>
  request("PUT", url, config);

export const del = (url: string, config?: RequestConfig) =>
  request("DELETE", url, config);

export const patch = (url: string, config?: RequestConfig) =>
  request("PATCH", url, config);

function buildUrl(url: string, config?: RequestConfig): string {
  const fullUrl = new URL(url, apiBaseUrl());
  const params = { ...config?.params };

  if (config?.params) {
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== undefined) {
        fullUrl.searchParams.append(key, String(value));
      }
    });
  }

  return fullUrl.toString();
}

function adjustConfig(
  config: RequestConfig = {},
  method: HttpMethod = "GET",
): RequestInit {
  const headers = new Headers(config.headers);
  let body: BodyInit | undefined;

  const canHaveBody = method !== "GET" && method !== "HEAD";

  if (canHaveBody && config.data) {
    if (config.data instanceof FormData) {
      body = config.data;
    } else {
      body = JSON.stringify(config.data);
      headers.set("Content-Type", "application/json");
    }
  }

  return {
    method,
    headers,
    body,
    credentials: config.credentials ?? "include",
  } as RequestInit;
}

async function handleResponse(response: Response): Promise<any> {
  const isJson = response.headers
    .get("Content-Type")
    ?.includes("application/json");

  const parsed = isJson
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    return Promise.reject({
      status: response.status,
      statusText: response.statusText,
      body: parsed,
    });
  }

  return parsed;
}

export const apiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};
