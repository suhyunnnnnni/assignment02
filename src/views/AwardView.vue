<template>

    <div id="background">
        <div class="d-flex flex-column align-items-center mt-20 w-100 h-100">
            <!-- title -->
            <div class="d-flex flex-column align-items-center">
                <p class="fs-3x">당신의 수면 타입은</p>
                <p class="fw-bold fs-4x">{{selectedMon.type}}!</p>
            </div>

            <!-- 캐릭터 -->
            <div class="mt-20 glow">
                <img :src=selectedMon.img_path class="animate__animated animate__pulse animate__infinite"></img>
            </div>

            <!-- 도감 보기 -->
            <div class="d-flex justify-content-center w-75 h-10 mt-20">
                <button
                    class="btn btn-primary d-flex flex-fill justify-content-center align-items-center mx-2 fs-2x fw-bold"
                    @click="goTodex()">도감 보기</button>
            </div>
        </div>
    </div>


</template>

<script setup>
// router
import { useRouter } from 'vue-router';
const router = useRouter()

import { onMounted } from 'vue';

// pinia
import { storeToRefs } from 'pinia';

// monster pinia 불러오기
import { useMonsterStore } from '@/stores/monster'
const monsterStore = useMonsterStore()
const { selectedMon, userId } = storeToRefs(monsterStore)


onMounted(() => {

    // 캐릭터 랜덤 선택 -> 보상 지급 함수 실행
    const monsterId = Math.round(Math.random()*10)
    console.log(`${monsterId}`)
    requestReward(monsterId)

    // 지급 보상 저장 함수 실행 
    requestRewardAdd(userId.value,monsterId)
})

// 랜덤으로 지정한 캐릭터 아이디로 캐릭터 정보 불러오기
async function requestReward(monsterId) {
  try {
    const response = await axios({
      method: 'post',
      baseURL: "http://localhost:8001",
      url: '/monster/v1/read',
      data: {
        id: monsterId
      },
      timeout: 5000,
      responseType: 'json'
    })

    console.log(`응답 -> ${JSON.stringify(response.data)}`)
    selectedMon.value = response.data.data.data[0]
    

  } catch (err) {
    console.error(`에러 -> ${err}`)
  }
}

// 보상 받은 캐릭터 보상테이블에 집어 넣기
async function requestRewardAdd(userId, monsterId) {
  try {

    const response = await axios({
      method: 'post',
      baseURL: "http://localhost:8001",
      url: '/monster/v1/add',
      data: {
        userId: userId,
        monsterId: monsterId
      },
      timeout: 5000,
      responseType: 'json'
    })

    console.log(`응답 -> ${JSON.stringify(response.data)}`)

  } catch (err) {
    console.error(`에러 -> ${err}`)
  }
}

function goTodex() {
    router.push('/dex')
}
</script>

<style scoped>
#background {
    height: 832px;
    width: 468px;
    background-color: #f6eaa7;
    border-radius: 30px;
}

.btn.btn-primary {
    background: linear-gradient(360deg, #5d93fe, #6578f7);
    border-radius: 20px;
}

img {
    width: 312px;
}

.h-10 {
    height: 10%;
}

.glow {
    position: relative;
    z-index: 1;
}

.glow::after {
  content: "";
  position: absolute;
  top: -30px;
  left: -30px;
  right: -30px;
  bottom: -30px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(255,200,0,0.8) 0deg 20deg,
    transparent 20deg 60deg,
    rgba(255,200,0,0.8) 60deg 80deg,
    transparent 80deg 120deg,
    rgba(255,200,0,0.8) 120deg 140deg,
    transparent 140deg 180deg,
    rgba(255,200,0,0.8) 180deg 200deg,
    transparent 200deg 240deg,
    rgba(255,200,0,0.8) 240deg 260deg,
    transparent 260deg 300deg,
    rgba(255,200,0,0.8) 300deg 320deg,
    transparent 320deg 360deg
  );
  z-index: -1;
  filter: blur(30px);
}

</style>
