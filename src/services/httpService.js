/**
 * httpService
 */
import axios from 'axios';
import $auth from '@/services/authService';
import get from 'lodash/get';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

class HttpService {

  constructor() {
    this.http = axios.create();
    this.app_url = import.meta.env.VITE_APP_API_URL;
    this.init();
  }

  init() {
    this.http.interceptors.request.use(
      (config) => {
        if ($auth.hasValue) {
          const token = $auth.hasValue.replace(/"/g, '');
          console.log(token);
          config.headers['Content-Type'] = "multipart/form-data";
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      }
    );

    this.http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        // if (error.response && error.response.status === 401) {
        //   this.showError('Vui lòng đăng nhập!');
        //   location.href = '/login';
        //   return;
        // }
        if (error.response && error.response.status === 422) {
          return { data: { result: false, errors: error.response.data.errors, status: 422 } };
        }
        
        if (error.code && error.code === 'ERR_NETWORK') {
          this.showError(error.message);
          return { data: { result: false, errors :error.messages, status: 500 } };
        }

        this.showError(error.response.data.message);
        return { data: { result: false, errors: error.response.data.message, status: error.response.status} };
      }
    );
  }

  showError(message) {
    createToast(message, {
      type: "danger",
      timeout: 6000,
    });
  }

  mapData(data) {
    return data.map(item => ({ label: item.name, value: item.id }));
  }

  async get(url, params = {}) {
    const path = this.app_url + url;
    return this.http.get(path, { params: params });
  }

  async post(url, params = {}) {
    const path = this.app_url + url;
    const res = await this.http.post(path, params);
    return res;

  }

  async delete(url) {
    const path = this.app_url + url;
    const res = await this.http.delete(path);
    return res;
  }

  // async delete(url) {
  //   await $auth.isAuthenticated();

  //   const path = `${store.getters['apiUrl']}${url}`;
  //   return this.http.delete(path);
  // }

  // async upload(url, params) {
  //   await $auth.isAuthenticated();

  //   const path = `${store.getters['apiUrl']}${url}`;
  //   return this.http.post(path, params, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  // }

  async uploadImageToCloud(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "website_tutor");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/" +
        process.env.VUE_APP_CLOUDINARY_NAME +
        "/image/upload",
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      this.showError(error.response.data.message)
    }
  }

  async getProvinces() {
    try {
      const response = await axios.get(this.app_url + '/provinces');
      if (response.data.provinces) {
        return this.mapData(response.data.provinces);
      };
    } catch (error) {
      this.showError(error.response.data.message)
    }
  }

  async getDistricts(province_id) {
    try {
      const response = await axios.get(this.app_url + '/districts/' + province_id);
      if (response.data.districts) {
        return this.mapData(response.data.districts);
      };
    } catch (error) {
      this.showError(error.response.data.message)
    }
  }

  async getSubjects() {
    try {
      const response = await axios.get(this.app_url + '/subjects');
      if (response.data.subjects) {
        return response.data.subjects.map(item => ({ label: item.name, value: item.id, image: item.image }));
      };
    } catch (error) {
      this.showError(error.response.data.message)
    }
  }

  async getClasses() {
    try {
      const response = await axios.get(this.app_url + '/classes');
      if (response.data.classes) {
        return this.mapData(response.data.classes);
      };
    } catch (error) {
      this.showError(error.response.data.message)
    }
  }

  async getJobs() {
    try {
      const response = await axios.get(this.app_url + '/jobs');
      if (response.data.jobs) {
        return this.mapData(response.data.jobs);
      };
    } catch (error) {
      this.showError(error.response.data.message)
    }
  }
}

export default new HttpService();
