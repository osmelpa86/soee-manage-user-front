const apiServerIp = '127.0.0.1';
const apiServerPort = '8085';

const apiServerUrl = `http://${apiServerIp}:${apiServerPort}/soee/v1/`;

export const config = {
  url: {
    auth: `${apiServerUrl}authentication`,
    users: `${apiServerUrl}users`,
    enrroll: `${apiServerUrl}enroll`,
  },
  searchRequestTime: 500,
};
