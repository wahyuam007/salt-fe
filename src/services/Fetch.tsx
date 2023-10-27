function getFileNameFromResponseHeaders(response: Response): string {
  const contentDisposition = response.headers.get('Content-Disposition');
  const parts = contentDisposition!.split(';');
  return parts[1].split('=')[1];
}

const Fetch = async (
  method: string,
  endpoint: string,
  options: { body?: any; credentials?: boolean; toLogin?: boolean } = {}
): Promise<any> => {
  const { body, credentials = true, toLogin = true } = options;
  const option: any = { method, headers: {} };
  if (method !== 'GET') {
    option.body = JSON.stringify(body);
    option.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  

  if (method === 'DOWNLOAD') {
    option.method = 'GET';
    option.headers = {
      'Access-Control-Expose-Headers':'Content-Disposition',
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  }

  if (credentials) {
    const token = localStorage.getItem('token');
    if (token) {
      option.headers.Authorization = token;
    } else {
      throw new Error('No authorization token found');
    }
  }

  const res = await fetch(`${import.meta.env.VITE_APP_URL}${endpoint}`, option);

  let resJson;
  try {
    if (method === 'DOWNLOAD') {
      const filename = getFileNameFromResponseHeaders(res);
      resJson = await res.blob();
      const urlA = URL.createObjectURL(resJson);
      const a = document.createElement('a');
      a.href = urlA;
      a.download = filename; // Set the desired file name
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click(); // Trigger the click event to start the download
      URL.revokeObjectURL(urlA); // Clean up the temporary URL
    } else {
      resJson = await res.json();
    }
  } catch (err) {
    console.log(err);
    throw new Error(`${res.status}, ${res.statusText}` || 'server error');
  }

  if (res.status === 401) {
    if (toLogin) {
      setTimeout(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.replace('/login');
      }, 1000);
    }
    throw new Error(resJson.message);
  }
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`${resJson.message}` || 'server error');
  }
  return resJson;
};

type ParamTypes = Record<string, any>;

// Auth
// eslint-disable-next-line import/prefer-default-export
export const postLogin = (body: ParamTypes) =>
  Fetch('POST', `/login`, {
    body,
    credentials: false,
    toLogin: false,
  });