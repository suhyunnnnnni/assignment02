<template>

    <div id="background">
        <div class="d-flex flex-column align-items-center mt-5 w-100 h-100">

            <div class="d-flex flex-column align-items-center w-100 mb-5 ">
                <p class="fs-3x fw-bold">도감</p>
                <p class="fs-1">내 도감 진행도 : {{ progress }}/10</p>
            </div>

            <!-- 도감 카드 -->
            <div class="d-flex flex-column gap-2 w-100 h-75">
                <div v-for="(row, rowIndex) in monsterRows" :key="rowIndex"
                    class="d-flex justify-content-around w-100 h-30">
                    <div class="card w-40 h-100" v-for="mon in row" :key="mon.id">
                        <div class="card-body d-flex justify-content-center h-75">
                            <img :src="mon.img_path" />
                        </div>
                        <div class="card-footer d-flex justify-content-center align-items-center fs-2 fw-bold h-25">
                            {{ mon.name }}
                        </div>
                    </div>
                </div>

                <div>
                    <Pagination :requestFunc="requestMonsterListWrapper" :pagination="pagination1" />
                </div>
            </div>


            <div class="d-flex justify-content-center w-75 ">
                <button
                    class="btn btn-primary d-flex flex-fill justify-content-center align-items-center mx-2 fs-2x fw-bold"
                    @click="goToLogin()">로그아웃</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

import { onMounted, ref } from 'vue';

// pinia
import { storeToRefs } from 'pinia';

// monster pinia 불러오기
import { useMonsterStore } from '@/stores/monster'
const monsterStore = useMonsterStore()
const { monsters, userId } = storeToRefs(monsterStore)


const monsterRows = ref([])

// pagination 
import Pagination from '@/components/Pagination.vue'
import { usePagination } from '@/util/pagination'
const { makePagination } = usePagination()
const pagination1 = ref({})

// 도감 진행도
const progress = ref()



function requestMonsterListWrapper(page, perPage) {
    return requestMonsterList(userId.value, page, perPage)
}

onMounted(() => {
    requestMonsterList(userId.value, 1, 6)
})

async function requestMonsterList(userId, page, perPage) {
    try {
        const response = await axios({
            method: 'post',
            baseURL: "http://localhost:8001",
            url: '/monster/v1/list',
            data: {
                user_id: userId,
                page: page,
                perPage: perPage
            },
            timeout: 5000,
            responseType: 'json'
        })

        console.log(`응답 -> ${JSON.stringify(response.data)}`)

        monsters.value = response.data.data.data

        progress.value = response.data.data.header.total

        console.log(progress.value)

        // 2차원 배열로 변환
        monsterRows.value = []
        for (let i = 0; i < monsters.value.length; i += 2) {
            monsterRows.value.push(monsters.value.slice(i, i + 2));
        }

        pagination1.value = makePagination(response.data.data.header)

    } catch (err) {
        console.error(`에러 -> ${err}`)
    }
}

function goToLogin() {
    router.push('/')
}
</script>

<style scoped>
#background {
    height: 832px;
    width: 468px;
    background-color: rgb(182, 207, 234);
    margin-top: 10px;
    border-radius: 30px;
}

img {
    height: 100%;
}

.w-40 {
    width: 40%;
}

.h-30 {
    height: 30%;
}



.btn.btn-primary {
    background: linear-gradient(360deg, #5d93fe, #6578f7);
    border-radius: 20px;
}
</style>
