import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useMonsterStore = defineStore('monster', () => {

    // 캐릭터 넣을 공간
    const monsters = ref([])

    // 보상 캐릭터의 정보 넣을 공간
    const selectedMon = ref({})

    // 유저 아이디 저장
    const userId = ref('')

    const now = ref('')

    return {
        monsters, selectedMon, userId, now
    }

})