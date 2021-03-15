import Axios from 'axios';

Axios.defaults.withCredentials = true;
Axios.defaults.xsrfCookieName = 'csrfToken';
Axios.defaults.xsrfHeaderName = 'x-csrf-token';

export default Axios;

export async function getList(params: any) {
  const { data } = await Axios.get('/api/main/list', {
    params,
  });
  if (data?.success) {
    return data.data;
  }
}

export async function getDetail(callId: string) {
  const { data } = await Axios.get(`/api/main/detail/${callId}`);
  if (data?.success) {
    return data.data;
  }
}
