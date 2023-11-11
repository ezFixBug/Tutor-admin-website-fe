import get from 'lodash/get'
import $auth from '@/services/authService'
import { createToast } from 'mosha-vue-toastify';

const authGuard = async (to, from, next) => {
  if (!$auth.hasValue) {
    next({ name: 'login', replace: true, params: { pathMatch: to.path } });
    return;
  }

  next();
}

const authTutorGuard = async (to, from, next) => {
  const user = $auth.getUser;
  if (!user) {
    next({ name: 'login', replace: true, params: { pathMatch: to.path } });
    return;
  }

  if (user.role_cd !== 2 && user.status_cd === 2) {
    createToast('Vui lòng đợi admin duyệt yêu cầu trở thành gia sư!', {
      type: "warning",
      timeout: 6000,
    });
    next({ path: from.path, replace: true, params: { pathMatch: to.path } });
    return;
  }

  if (user.role_cd !== 2 && user.status_cd === 1) {
    createToast('Vui lòng đăng ký trở thành gia sư!', {
      type: "warning",
      timeout: 6000,
    });
    next({ name: 'becomeTutor', replace: true, params: { pathMatch: to.path } });
    return;
  }

  next();
}

export { authGuard, authTutorGuard }
