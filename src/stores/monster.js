import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useMonsterStore = defineStore('monster', () => {

    // 캐릭터 넣을 공간
    const monsters = ref([])

    // 보상 캐릭터의 정보 넣을 공간
    const selectedMon = ref({})

    return {
        monsters, selectedMon
    }

})