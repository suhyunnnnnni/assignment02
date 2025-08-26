<template>
    <div id="background">
        <div class="d-flex flex-column  align-items-center mt-20 pt-20 w-100 h-100">
            <!-- title -->
            <div>
                <p class="fs-6x fw-bold text-white mt-10">SleepMon</p>
            </div>

            <!-- id&password -->
            <div id="container" class="d-flex flex-column justify-content-center align-items-center gap-3 w-75 h-30 p-5">

                <div class="d-flex justify-content-center align-items-center w-100 h-25">

                    <i class="ki-duotone ki-security-user fs-3x me-2 text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                    </i>
                    <input type="text" placeholder="아이디" class="form-control bg-transparent border border-transparent text-white">

                </div>

                <div class="separator my-2 w-100"></div>

                <div class="d-flex justify-content-center align-items-center w-100 h-25">

                    <i class="ki-duotone ki-lock fs-3x me-2 text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                    </i>
                    <input type="password" placeholder="비밀번호"
                        class="form-control bg-transparent border border-transparent text-white">

                </div>

                <div class="d-flex justify-content-center w-100 h-25">
                    <button class="btn btn-primary d-flex flex-fill justify-content-center align-items-center mx-2" @click="goToSleep()">로그인</button>
                </div>

            </div>

            <!-- 회원 가입 -->
            <div class="d-flex justify-content-center w-100 h-25">
                <a href class="no-hover fs-2 fw-bold text-white mt-10">회원 가입</a>
            </div>

        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function goToSleep() {
    router.push('/sleep')
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

#container {
    border-radius: 30px;
    background-color: rgb(60, 82, 155, 0.8)
}

.btn.btn-primary {
    background: linear-gradient(450deg, #5d93fe, #6578f7)
}

.h-30{
    height: 30% !important;
}

.no-hover {
    background-color: transparent;
}
</style>
