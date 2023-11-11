import axios from 'axios';
import get from 'lodash/get';

class AuthService {

  constructor() {
    this.STORAGE = localStorage;
    this.STORAGE_KEY = 'token';

    this.DEFAULT_AVATAR = 'https://smart-edu.vn/img/avatar.png';
    this.$auth = axios.create();
    this.storageValue = null;
  }

  get hasValue() {
    if (this.STORAGE.getItem(this.STORAGE_KEY) === undefined)  {
      return false;
    }
    return this.STORAGE.getItem(this.STORAGE_KEY);
  }

  isAuthenticated() {
    return new Promise(async (resolve) => {
      if (this.hasValue) {
        resolve(true);
        return;
      }

      if (!this.hasValue) {
        rejectService(true);
        return;
      }
    });
  }

  login(request) {
    const interceptor = this.$auth.interceptors.response.use(
      (response) => {
        if (response.data.status === 200) {
          this.success(response.data);
        }
        return response;
      },
      (error) => {
        return error;
      }
    );

    const app_url = import.meta.env.VITE_APP_API_URL;
    const url = app_url + `/admin/login`;

    return this.$auth.post(url, request).finally(() => {
      this.$auth.interceptors.response.eject(interceptor);
    });
  }

  setToken(data) {
    const storage = JSON.parse(this.STORAGE.getItem(this.STORAGE_KEY));
    storage.token = data.token;
    storage.token_period = data.token_period;
    storage.refresh_token = data.refresh_token;
    this.success(storage);
  }

  reject() {
    rejectService();
  }

  logout() {
    this.clear();
  }

  success(authData) {
    this.storageValue = authData;
    this.STORAGE.setItem(this.STORAGE_KEY, JSON.stringify(authData.token));
  }


  clear() {
    this.storageValue = null;
    this.STORAGE.removeItem(this.STORAGE_KEY);
  }
}

export default new AuthService();
