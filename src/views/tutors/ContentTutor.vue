<template>
  <spinner :is_loading="is_loading" />
  <section class="breadcrumb-area py-5 bg-white pattern-bg">
    <div class="container">
      <div class="breadcrumb-content">
        <div class="media media-card align-items-center pb-4">
          <div class="media-img media--img media-img-md rounded-full">
            <img
              class="rounded-full"
              :src="tutor.avatar"
              alt="Student thumbnail image"
              height="100%"
              width="100%"
            />
          </div>
          <div class="media-body">
            <h2 class="section__title fs-30">{{ tutor.full_name }}</h2>
            <div class="rating-wrap d-flex align-items-center py-2">
              <span class="d-block lh-18 pt-1 pb-2">{{ formatDate(tutor.created_at) }}</span>
            </div>
            <p class="lh-18">
              {{ tutor.title }}
            </p>
          </div>
        </div>
        <div class="nav-right-button d-flex align-items-center mt-2">
          <button class="btn btn-danger invite-teacher" type="button" @click="handleApprove" v-if="tutor.role_cd === 1">
            Duyệt<i class="la la-arrow-right icon ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
  <section class="teacher-details-area pt-50px">
    <div class="container">
      <div class="student-details-wrap pb-20px">
        <h3 class="fs-24 font-weight-semi-bold pb-2">Giới thiệu</h3>
        <p class="pb-5">{{ tutor.description }}</p>

        <div class="row">
          <div class="col-lg-6 col-md-6">
            <h3 class="fs-24 font-weight-semi-bold pb-2">Bằng cấp</h3>
            <div class="media media-card media-card-cic align-items-center">
              <div class="media-img media-img-lg mr-4 bg-gray">
                <img
                  class="mr-3 work"
                  id="outputTheBackCIC"
                  :src="tutor.certificate"
                  alt=" image"
                />
              </div>
            </div>
            <!-- end media -->
          </div>
          <div class="col-lg-3 col-md-3">
            <p class="label-text font-weight-bold text-color-3">Giới tính:</p>
            <span class="fs-15">{{ tutor.sex == 1 ? 'Nam' : 'Nữ' }}</span>

            <p class="label-text font-weight-bold text-color-3">Sinh nhật:</p>
            <span class="fs-15">{{ formatDate(tutor.birthday) }}</span>

            <p class="label-text font-weight-bold text-color-3">Học vấn:</p>
            <span class="fs-15">{{ tutor.education }}</span>
          </div>
          <!-- end input-box -->
          <div class="col-lg-3 col-md-3">
            <p class="label-text font-weight-bold text-color-3">Chi phí dạy/Giờ:</p>
            <span class="fs-15">{{ tutor.price }} vnđ</span>
            <p class="label-text font-weight-bold text-color-3">Đang là:</p>
            <span class="fs-15">{{ tutor.job ? tutor.job.name : null }}</span>

            <p class="label-text font-weight-bold text-color-3">Địa chỉ:</p>
            <span class="fs-15"
              >{{ tutor.province ? tutor.province.name : null }} -
              {{ tutor.district ? tutor.district.name : null }}</span
            >
          </div>
          <!-- end input-box -->
          <div class="col-lg-12 col-md-12">
            <span class="label-text font-weight-bold text-color-3">Môn dạy: </span>
            <ul
              class="generic-list-item generic-list-item-boxed d-flex flex-wrap fs-15"
              v-for="(item, index) in tutor.teach_subjects"
              :key="index"
            >
              <li>
                <a href="#" onclick="return false;"
                  >{{ item.subject.name }}: {{ listClasses(item) }}
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-12 col-md-12">
            <span class="label-text font-weight-bold text-color-3">Có thể dạy tại: </span>
            <ul
              class="generic-list-item generic-list-item-boxed d-flex flex-wrap fs-15"
              v-for="(item, index) in tutor.teach_places"
              :key="index"
            >
              <li>
                <a href="#" onclick="return false;"
                  >{{ item.province.name }}: {{ listDistricts(item) }}
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-12 col-md-12">
            <span class="label-text font-weight-bold text-color-3">Hình thức dạy: </span>
            <ul class="generic-list-item generic-list-item-boxed d-flex flex-wrap fs-15">
              <li class="mr-3" v-if="tutor.type_cd == 1">
                <a href="#" onclick="return false;">Học tại nhà</a>
              </li>
              <li class="mr-3" v-else>
                <a href="#" onclick="return false;"> Học online</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import $http from '@/services/httpService'
import $auth from '@/services/authService'
import get from 'lodash/get'
import { createToast } from 'mosha-vue-toastify'

import {
  database,
  ref,
  push,
  onValue,
  child,
  get as firebaseGet,
  set
} from '@/services/firebaseService'
export default {
  data() {
    return {
      is_loading: false
    }
  },
  props: {
    tutor: {
      default: {},
      type: Object
    }
  },

  methods: {
    async handleApprove() {
      this.is_loading = true;
      const tutor_id = this.$route.params.tutor_id;

      const res = await $http.post('/admin/approve/tutor/' + tutor_id)

      if (get(res, 'data.result', false)) {
        createToast('Đã duyệt yêu cầu trở thành gia sư thành công!', {
          type: 'success',
          timeout: 6000
        })
        push(ref(database, 'notifications'), {
          user_id: tutor_id,
          object_id: tutor_id,
          created_at: this.getDateTimeNow(),
          type_cd: 4,
          content: 'Admin đã duyệt yêu cầu trở thành gia sư của bạn!',
          url: { path: '/' },
          is_read: false
        });

        this.$router.push({name: 'tutors'});
      }
      this.is_loading = false;
    },

    formatDate(inputDate) {
      const date = new Date(inputDate)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    },

    listClasses(subject) {
      const listClasses = []
      subject.teach_subject_classes.forEach((item, index) => {
        if (index !== subject.teach_subject_classes.length - 1) {
          listClasses.push(item.class.name + ', ')
        } else {
          listClasses.push(item.class.name)
        }
      })
      return listClasses.join('')
    },

    listDistricts(province) {
      const listClasses = []
      province.teach_place_districts.forEach((item, index) => {
        if (index !== province.teach_place_districts.length - 1) {
          listClasses.push(item.district.name + ', ')
        } else {
          listClasses.push(item.district.name)
        }
      })
      return listClasses.join('')
    },

    getDateTimeNow() {
      const now = new Date()

      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>
<style lang="scss" scoped>
@import './_style.scss';
</style>