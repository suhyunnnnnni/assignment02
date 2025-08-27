<template>
    <div id="background">
        <div class="d-flex flex-column  align-items-center mt-20 pt-20 w-100 h-100">
            <!-- title -->
            <div>
                <p class="title fs-6x fw-bold text-white mt-10">SleepMon</p>
            </div>

            <!-- id&password -->
            <div id="container"
                class="d-flex flex-column justify-content-center align-items-center gap-3 w-75 h-30 p-5">

                <div class="d-flex justify-content-center align-items-center w-100 h-25">

                    <i class="ki-duotone ki-security-user fs-3x me-2 text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                    </i>
                    <input type="text" placeholder="아이디"
                        class="form-control bg-transparent border border-transparent text-white fs-2" v-model="idInput">

                </div>

                <div class="separator my-2 w-100"></div>

                <div class="d-flex justify-content-center align-items-center w-100 h-25">

                    <i class="ki-duotone ki-lock fs-3x me-2 text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                    </i>
                    <input type="password" placeholder="비밀번호"
                        class="form-control bg-transparent border border-transparent text-white fs-2" v-model="pwInput">

                </div>

                <div class="d-flex justify-content-center w-100 h-25">
                    <button class="btn btn-primary d-flex flex-fill justify-content-center align-items-center mx-2"
                        @click="goToSleep()">로그인</button>
                </div>

            </div>

            <!-- 회원 가입 -->
            <div class="d-flex justify-content-center align-items-start mt-10 w-100 h-25">
                <button class="btn fs-2 fw-bold text-white " @click="goToSignIn()">회원 가입</button>
            </div>

            <!--begin::Alert-->
            <div class="alert alert-dismissible bg-light-danger border border-danger d-flex flex-column flex-sm-row p-5 mb-10"
                v-if="showAlert">

                <i class="ki-duotone ki-notification fs-2hx text-danger me-4 mb-5 mb-sm-0">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                </i>

                <!--begin::Wrapper-->
                <div class="d-flex flex-column pe-0 pe-sm-10">

                    <h5 class="mb-1">{{ status }}</h5>
                    <span class="contents">{{ contents }}</span>

                </div>
                <!--end::Wrapper-->

                <!--begin::Close-->
                <button type="button"
                    class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
                    data-bs-dismiss="alert">
                    <i class="ki-duotone ki-cross fs-1 text-danger"><span class="path1"></span><span
                            class="path2"></span></i>
                </button>
                <!--end::Close-->
            </div>
            <!--end::Alert-->

            <!-- modal -->
            <div class="modal fade" tabindex="-1" id="kt_modal_1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">성공!</h3>

                            <!--begin::Close-->
                            <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span
                                        class="path2"></span></i>
                            </div>
                            <!--end::Close-->
                        </div>

                        <div class="modal-body">
                            <p>성공적으로 회원가입이 이루어졌습니다.</p>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="goToLogin()">로그인하러 가기</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

import { ref, onMounted } from 'vue'
const idInput = ref('')
const pwInput = ref('')

// alert
const status = ref('')
const contents = ref('')
const showAlert = ref(false);

// modal
let modalInstance = null

const output = ref('')

function goToSleep() {

    if (idInput.value && pwInput.value) {

        const username = idInput.value
        const password = pwInput.value

        const user = {

            username: username,
            password: password,

        }

        requestCheck(user)
        if (output.value == '200') {
            modalInstance.show()
        } else {
            status.value = '알림'
            contents.value = '아이디와 비밀번호가 일치하지 않습니다. '
            showAlert.value = true;
        }




    } else {

        status.value = '경고'
        contents.value = '아이디와 비밀번호 모두 입력하세요'
        showAlert.value = true;
    }
    // router.push('/sleep')
}

// id,pw 일치 확인
async function requestCheck(user) {

    try {
        const response = await axios({
            method: 'post',
            baseURL: "http://localhost:8001/",
            url: '/user/v1/add',
            data: user,
            timeout: 5000,
            responseType: 'json'
        })

        console.log(`응답 -> ${JSON.stringify(response.data)}`)

        output.value = response.data.code

    } catch (err) {
        console.error(`에러 -> ${err}`)
    }
}


function goToSignIn() {
    router.push('/sign')
}
</script>

<style scoped>
#background {
    height: 832px;
    width: 468px;
    background-image: url(/public/images/login-bg.png);
    margin-top: 10px;
    border-radius: 30px;


}

.title {
    text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.5);
}

#container {
    border-radius: 30px;
    background-color: rgb(60, 82, 155, 0.8)
}

.btn.btn-primary {
    background: linear-gradient(360deg, #5d93fe, #6578f7)
}

.h-30 {
    height: 30% !important;
}

</style>
