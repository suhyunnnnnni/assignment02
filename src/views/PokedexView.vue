<template>

    <div id="background">
        <div class="d-flex flex-column align-items-center mt-5 w-100 h-100">

            <div class="d-flex flex-column align-items-center w-100  mb-10">
                <p class="fs-3x fw-bold">도감</p>
                <p class="fs-1">내 도감 진행도 : {{ progress }}/10</p>
            </div>

            <!-- 도감 카드 -->
            <div class="d-flex flex-column gap-3 w-100 h-75">
                <div v-for="(row, rowIndex) in monsterRows" :key="rowIndex"
                    class="d-flex justify-content-around w-100 h-25">
                    <div class="card w-40 h-100" v-for="mon in row" :key="mon.id" :class="{ rare: mon.id === 3 }">
                        <div class="card-boody d-flex justify-content-center h-75 ">
                            <img :src="mon.img_path" />
                        </div>
                        <div class="card-footer d-flex justify-content-center align-items-center fs-3 h-25">
                            <span class="fw-bold me-2" :class="{ 'rare-font': mon.id === 3 }">{{ mon.id }}번</span>
                            <span class="fw-bold" :class="{ 'rare-font': mon.id === 3 }">{{ mon.name }}</span>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-center w-100 h-50">
                    <Pagination :requestFunc="requestMonsterListWrapper" :pagination="pagination1" />
                </div>

                <div class="d-flex justify-content-center w-100 p-10 ">
                    <button
                        class="btn btn-primary d-flex flex-fill justify-content-center align-items-center mx-2 fs-2x fw-bold"
                        @click="goToLogin()">로그아웃</button>
                </div>

            </div>


        </div>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

import { onMounted, ref, computed } from 'vue';

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

// 전체 캐릭터 수 
const TOTAL_MONSTERS = 10;

// 물음표 이미지 경로
const questionMark = '/public/images/questionmark-1.png'



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
        progress.value = response.data.total

        progress.value = response.data.data.header.total

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

.card {
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
}

.w-40 {
    width: 40%;
}



.rare {
    border: 2px solid rgba(255, 215, 0, 1);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
}

.rare-font {
    color: rgba(255, 215, 0, 1);
}

.btn.btn-primary {
    background: linear-gradient(360deg, #5d93fe, #6578f7);
    border-radius: 20px;
}
</style>
