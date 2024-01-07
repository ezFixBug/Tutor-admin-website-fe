<template>
  <LayoutAuthenticated>
    <spinner :is_loading="is_loading" />
    <section class="breadcrumb-area pt-50px pb-50px bg-white pattern-bg">
      <div class="container">
        <div class="col-lg-8 mr-auto">
          <div class="breadcrumb-content">
            <ul
              class="generic-list-item generic-list-item-arrow d-flex flex-wrap align-items-center"
            >
              <!-- <li><router-link :to="{ name: 'home' }">Trang chủ</router-link></li> -->
              <li>
                <router-link :to="{ name: 'courses' }">Khoá Học</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'detail-course', params: { course_id: 1 } }"
                  >Chi tiết khóa học</router-link
                >
              </li>
            </ul>
            <div class="section-heading">
              <h2 class="section__title">
                {{ course.title }}
              </h2>
              <p class="section__desc pt-2 lh-30"></p>
            </div>
            <div class="d-flex flex-wrap align-items-center pt-3">
              <div class="rating-wrap d-flex flex-wrap align-items-center">
                <div class="review-stars">
                  <span class="rating-number">0 </span>
                  <span><i class="fa-regular fa-star"></i></span>
                  <span><i class="fa-regular fa-star"></i></span>
                  <span><i class="fa-regular fa-star"></i></span>
                  <span><i class="fa-regular fa-star"></i></span>
                  <span><i class="fa-regular fa-star"></i></span>
                </div>
                <span class="rating-total pl-3">{{ count_comment }} đánh giá</span>
                <span class="rating-total pl-3"> {{ course.likes_count }} lượt thích</span>
                <span class="rating-total pl-3"> {{ count_student }} học viên</span>
              </div>
            </div>
            <p>
              Thuộc danh mục:
              <span
                class="text-color-5 hover-underline fs-14 mr-2"
                v-for="item in course.subjects"
                :key="item.id"
              >
                {{ item.name }}</span
              >
            </p>
            <p>
              Tạo bởi
              <!-- <router-link
              :to="{ name: 'detail-tutor', params: { tutor_id: course.user_id } }"
            >
              {{ user.full_name }}</router-link
            > -->
            </p>
            <div class="d-flex flex-wrap align-items-center">
              <p class="pr-3 d-flex align-items-center">
                <svg class="svg-icon-color-gray mr-1" viewBox="0 0 24 24" width="16px">
                  <path
                    d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"
                  ></path>
                </svg>
                Ngày tạo {{ formatDate(course.created_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="course-details-area pb-20px">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 pb-5">
            <div class="course-details-content-wrap pt-90px">
              <div class="course-overview-card">
                <h3 class="fs-24 font-weight-semi-bold pb-3">Tổng quan khóa học</h3>
                {{ course.title }}
                <ul class="generic-list-item generic-list-item-bullet fs-15">
                  <li>Vào lúc: {{ course.time_start }}</li>
                </ul>
                <br />
                <div class="collapse" id="collapseMore">
                  <h4 class="fs-20 font-weight-semi-bold py-2">Mô tả khóa học</h4>
                  <p class="fs-15 pb-2"></p>
                  <p class="card-text pt-1 fs-14 lh-22">
                    {{ course.description }}
                  </p>
                </div>
                <a
                  class="collapse-btn collapse--btn fs-15"
                  data-toggle="collapse"
                  href="#collapseMore"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseMore"
                >
                  <span class="collapse-btn-hide"
                    >Xem thêm <i class="fa-solid fa-angle-down"></i
                  ></span>
                  <span class="collapse-btn-show">Ẩn bớt <i class="fa-solid fa-angle-up"></i></span
                ></a>
              </div>
              <div class="course-overview-card">
                <div class="d-flex justify-content-between">
                  <h3 class="fs-24 font-weight-semi-bold pb-3">Nội dung khóa học</h3>
                </div>
                <div v-html="course.content"></div>
              </div>
              <div class="course-overview-card pt-4">
                <h3 class="fs-24 font-weight-semi-bold pb-4">Người hướng dẫn</h3>
                <div class="instructor-wrap">
                  <div class="media media-card">
                    <div class="instructor-img mr-5">
                      <!-- <router-link
                      :to="{
                        name: 'detail-tutor',
                        params: { tutor_id: course.user_id },
                      }"
                      class="media-img d-block"
                    >
                      <img :src="user.avatar" alt="Cart image" />
                    </router-link> -->
                      <ul class="generic-list-item pt-3">
                        <li>
                          <i class="fa-regular fa-user text-color-3 mr-2"></i>
                          {{ user.count_student }} học viên
                        </li>
                        <li>
                          <i class="fa-regular fa-comment text-color-3 mr-2"></i
                          >{{ user.count_comment }} đánh giá
                        </li>
                        <li>
                          <i class="fa-solid fa-book text-color-3 mr-2"></i>
                          {{ user.count_course }} khóa học
                        </li>
                        <li>
                          <router-link :to="{ name: 'courses' }">Xem tất cả khóa học</router-link>
                        </li>
                      </ul>
                    </div>
                    <div class="media-body">
                      <h5>
                        <!-- <router-link
                        :to="{
                          name: 'detail-tutor',
                          params: { tutor_id: user.id },
                        }"
                      >
                        {{ user.full_name }}</router-link
                      > -->
                      </h5>
                      <span class="d-block lh-18 pt-2 pb-3">
                        Ngày tham gia: {{ formatDate(user.created_at) }}
                      </span>
                      <p class="lh-18 pb-3">
                        {{ user.title }}
                      </p>
                      <p class="lh-18 pb-3">
                        {{ user.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="course-overview-card pt-4">
                <h3 class="fs-24 font-weight-semi-bold pb-40px">Phản hồi của học viên</h3>
                <div class="feedback-wrap">
                  <div class="media media-card align-items-center">
                    <div class="review-rating-summary">
                      <span class="stats-average__count">0</span>
                      <div class="rating-wrap pt-1">
                        <div class="review-stars">
                          <span class="la la-star-o"></span>
                          <span class="la la-star-o"></span>
                          <span class="la la-star-o"></span>
                          <span class="la la-star-o"></span>
                          <span class="la la-star-o"></span>
                        </div>
                        <span class="rating-total d-block">(0)</span>
                        <span>Đánh giá khóa học</span>
                      </div>
                      <!-- end rating-wrap -->
                    </div>
                    <!-- end review-rating-summary -->
                    <div class="media-body">
                      <div class="review-bars d-flex align-items-center mb-2">
                        <div class="review-bars__text">5 sao</div>
                        <div class="review-bars__fill">
                          <div class="skillbar-box">
                            <div class="skillbar" data-percent="0%">
                              <div class="skillbar-bar bg-3" style="width: 0%"></div>
                            </div>
                            <!-- End Skill Bar -->
                          </div>
                        </div>
                        <!-- end review-bars__fill -->
                        <div class="review-bars__percent">0%</div>
                      </div>
                      <!-- end review-bars -->
                      <div class="review-bars d-flex align-items-center mb-2">
                        <div class="review-bars__text">4 sao</div>
                        <div class="review-bars__fill">
                          <div class="skillbar-box">
                            <div class="skillbar" data-percent="0%">
                              <div class="skillbar-bar bg-3" style="width: 0%"></div>
                            </div>
                            <!-- End Skill Bar -->
                          </div>
                        </div>
                        <!-- end review-bars__fill -->
                        <div class="review-bars__percent">0%</div>
                      </div>
                      <!-- end review-bars -->
                      <div class="review-bars d-flex align-items-center mb-2">
                        <div class="review-bars__text">3 sao</div>
                        <div class="review-bars__fill">
                          <div class="skillbar-box">
                            <div class="skillbar" data-percent="0%">
                              <div class="skillbar-bar bg-3" style="width: 0%"></div>
                            </div>
                            <!-- End Skill Bar -->
                          </div>
                        </div>
                        <!-- end review-bars__fill -->
                        <div class="review-bars__percent">0%</div>
                      </div>
                      <!-- end review-bars -->
                      <div class="review-bars d-flex align-items-center mb-2">
                        <div class="review-bars__text">2 sao</div>
                        <div class="review-bars__fill">
                          <div class="skillbar-box">
                            <div class="skillbar" data-percent="0%">
                              <div class="skillbar-bar bg-3" style="width: 0%"></div>
                            </div>
                            <!-- End Skill Bar -->
                          </div>
                        </div>
                        <!-- end review-bars__fill -->
                        <div class="review-bars__percent">0%</div>
                      </div>
                      <!-- end review-bars -->
                      <div class="review-bars d-flex align-items-center mb-2">
                        <div class="review-bars__text">1 sao</div>
                        <div class="review-bars__fill">
                          <div class="skillbar-box">
                            <div class="skillbar" data-percent="0%">
                              <div class="skillbar-bar bg-3" style="width: 0%"></div>
                            </div>
                            <!-- End Skill Bar -->
                          </div>
                        </div>
                        <!-- end review-bars__fill -->
                        <div class="review-bars__percent">0%</div>
                      </div>
                      <!-- end review-bars -->
                    </div>
                    <!-- end media-body -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="sidebar sidebar-negative">
              <div class="card card-item">
                <div class="card-body">
                  <div class="preview-course-video">
                    <img
                      :src="course.image"
                      alt="Course image"
                      class="w-100 rounded lazy"
                      style="width: 239px; height: 160px"
                    />
                  </div>
                  <div class="preview-course-feature-content pt-40px">
                    <p class="d-flex align-items-center pb-2">
                      <span class="fs-30 font-weight-semi-bold text-black">
                        {{ course.price }}
                      </span>
                    </p>
                    <div class="buy-course-btn-box">
                      <button
                        class="btn theme-btn mt-3 w-100 btn-register-course"
                        @click="handleApprove"
                        v-if="course.status_cd == 1"
                      >
                        Duyệt khóa học
                      </button>
                      <button
                        v-else-if="course.status_cd == 2"
                        class="btn theme-btn mt-3 w-100 btn-register-course"
                        @click="updateStatus"
                      >
                        Đã duyệt
                      </button>
                      <button
                        v-else-if="course.status_cd == 3"
                        class="btn theme-btn mt-3 w-100 btn-register-course"
                        @click="updateStatus"
                      >
                        Mở khoá
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card card-item">
                <div class="card-body">
                  <h3 class="card-title fs-18 pb-2">Khóa học bao gồm</h3>
                  <div class="divider">
                    <span></span>
                  </div>
                  <ul class="generic-list-item generic-list-item-flash">
                    <li class="d-flex align-items-center justify-content-between">
                      <span>
                        <i class="fa-regular fa-bookmark mr-2 text-color"></i>
                        Lượt thích
                      </span>
                      {{ course.likes_count }}
                    </li>
                    <li class="d-flex align-items-center justify-content-between">
                      <span> <i class="fa-regular fa-eye mr-2 text-color"></i> Lượt xem</span>
                      {{ course.view }}
                    </li>
                    <li class="d-flex align-items-center justify-content-between">
                      <span>
                        <i class="fa-solid fa-language mr-2 text-color"></i>
                        Ngôn ngữ
                      </span>
                      Tiếng Việt
                    </li>
                    <li class="d-flex align-items-center justify-content-between">
                      <span>
                        <i class="fa-regular fa-lightbulb mr-2 text-color"></i>
                        Cấp độ:
                        <span class="ml-2">
                          <span v-for="item in course.classes" :key="item.id" class="ml-2">{{
                            item.name
                          }}</span>
                        </span>
                      </span>
                    </li>
                    <li class="d-flex align-items-center justify-content-between">
                      <span>
                        <i class="fa-regular fa-user mr-2 text-color"></i>
                        Học viên
                      </span>
                      {{ count_student }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card card-item">
                <div class="card-body">
                  <h3 class="card-title fs-18 pb-2">Danh mục</h3>
                  <div class="divider">
                    <span></span>
                  </div>
                  <ul class="generic-list-item generic-list-item-boxed d-flex flex-wrap fs-15"></ul>
                </div>
              </div>

              <div class="card card-item">
                <div class="card-body">
                  <h3 class="card-title fs-18 pb-2">Thẻ khóa học</h3>
                  <div class="divider"><span></span></div>
                  <ul class="generic-list-item generic-list-item-boxed d-flex flex-wrap fs-15">
                    <li v-for="tag in list_tags" :key="tag" class="mr-2">
                      <a href="#" onclick="return false;">{{ tag.label }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </LayoutAuthenticated>
</template>
<script>
import $http from '@/services/httpService'
import $auth from '@/services/authService'
import get from 'lodash/get'
import CONSTS from '@/Constants.js'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import {
  database,
  ref,
  push,
  onValue,
  child,
  get as firebaseGet,
  set
} from '@/services/firebaseService'
import { createToast } from 'mosha-vue-toastify'
export default {
  components: {
    LayoutAuthenticated
  },

  data() {
    return {
      course: {
        classes: [],
        subjects: []
      },
      user: {},
      list_tags: [],
      count_comment: 10,
      count_student: 50,
      is_loading: false
    }
  },

  computed: {
    hasLogin() {
      return $auth.getUser
    },
    isLike() {
      return this.course.is_like
    }
  },
  created() {
    this.getDetailCourse()
  },

  methods: {
    async getDetailCourse() {
      this.is_loading = true
      const course_id = this.$route.params.course_id
      const res = await $http.get('/course/' + course_id)
      if (get(res, 'data.result', false)) {
        this.course = res.data.course
        this.user = get(this.course, 'user', {})
        this.list_tags = CONSTS.CD_TAGS.filter((tag) => this.course.tags.includes(tag.id))
      }
      this.is_loading = false
    },

    async handleApprove() {
      this.is_loading = true
      const course_id = this.$route.params.course_id
      const res = await $http.post('/admin/approve/course/' + course_id)
      if (get(res, 'data.result', false)) {
        createToast('Đã duyệt khóa học thành công!', {
          type: 'success',
          timeout: 6000
        })

        push(ref(database, 'notifications'), {
          user_id: this.course.user_id,
          object_id: course_id,
          created_at: this.getDateTimeNow(),
          type_cd: 1,
          content: 'Admin đã duyệt khóa học của bạn!',
          url: { name: 'courses' },
          is_read: false
        })

        this.$router.push({ name: 'courses' })
      }
      this.is_loading = false
    },

    formatDate(inputDate) {
      const date = new Date(inputDate)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
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
    },
    async updateStatus() {
      const res = await $http.post(`/admin/courses/${this.course.id}/block`, {
        status_cd: this.course.status_cd === 2 ? 3 : 2
      })
      if (get(res, 'data.result', false)) {
        this.getDetailCourse()
        createToast(
          `Đã ${this.course.status_cd === 2 ? 'khoá' : 'mở'} thành công tài khoản người dùng`,
          {
            type: this.course.status_cd === 2 ? 'warning' : 'success',
            timeout: 3000
          }
        )
      }
    }
  }
}
</script>
<style>
@import './_style.scss';

.course-overview-card {
  margin-bottom: 30px;
}

.review-rating-summary {
  width: 180px;
  text-align: center;
  border-right: 1px solid rgba(128, 137, 150, 0.1);
  padding-right: 30px;
  margin-right: 40px;
}
.stats-average__count {
  color: #f68a03;
  font-size: 65px;
  font-weight: 700;
}
</style>
