<template>

    <div id="background">
        <div class="d-flex flex-column align-items-center mt-20 w-100 h-100">

            <!-- title -->
            <div>
                <p class="fs-5x fw-bold text-white mt-10">수면 입력</p>
            </div>

            <!-- 수면 입력 창 -->
            <div id="container" class="d-flex flex-column justify-content-center align-items-center w-75 h-25 p-3">

                <div class="d-flex justify-content-start w-100 h-25">
                    <i class="ki-duotone ki-calendar fs-3x text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                    </i>
                    <span class="fs-1 fw-bold ms-3 text-white">오늘</span>
                </div>

                <!--  취침 시간 입력 -->
                <div class="d-flex justify-content-center align-items-center gap-2 mb-2 w-100 h-25">
                    <i class="ki-duotone ki-moon text-white fs-3x">
                        <span class="path1"></span>
                        <span class="path2"></span>
                    </i>
                    <input type="text" class="form-control form-control-solid text-white" placeholder="취침 시간"
                        id="kt_timepicker" />
                </div>

                <!-- 기상 시간 입력 -->
                <div class="d-flex justify-content-center align-items-center gap-2 w-100 h-25">
                    <i class="ki-duotone ki-sun text-warning fs-3x">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                        <span class="path5"></span>
                        <span class="path6"></span>
                        <span class="path7"></span>
                        <span class="path8"></span>
                        <span class="path9"></span>
                    </i>
                    <input type="text" class="form-control form-control-solid text-white" placeholder="기상 시간"
                        id="kt_timepicker" />
                </div>

            </div>

            <div class="d-flex justify-content-center w-50 mt-20  ">
                <button class="btn btn-primary d-flex flex-fill justify-content-center align-items-center mx-2"
                        @click="goToNext()">지정
                    하기</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()

function goToNext() {
    router.push('/reward')
}

onMounted(() => {
    flatpickr("#kt_timepicker", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    });
});
</script>

<style scoped>
#background {
    height: 832px;
    width: 468px;
    background-image: url('/images/sleep-bg.png');
    border-radius: 30px;
}

#container {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 30px;
}

#kt_timepicker {
    background-color: rgba(255, 255, 255, 0.2);
    border: transparent;
}

#kt_timepicker::placeholder {
    color: white;
}

.btn.btn-primary {
    background: linear-gradient(360deg, #5d93fe, #6578f7)
}
</style>
