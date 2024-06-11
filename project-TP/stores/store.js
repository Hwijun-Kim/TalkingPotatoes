import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { axios } from "axios";

export const accountListStore = defineStore("userAccount", () => {
    const state = reactive({
        lists: []
    });

    const fetchLists = async () => {
        try {
            const response = await axios.get("/db-server/MOCK_DATA.json");
            state.lists = response.data.user;
        } catch (error) {
            console.error("Failed Fectch", error);
        }
    };


    const totalMoney = computed(() => {
        return state.lists.reduce((total, item) => total + item.money, 0);
    })

    const getItemById = (id) => {
        return state.lists.find(item => item.id === id);
    };

    const getListByCategory = (category) => {
        return state.lists.filter(item => item.category === category);
    }

    const addItem = (id, date, money, inout, category) => {
        const newItem = { id, date, money, inout, category, memo: ""};
        state.lists.push(newItem);
    }

    const deleteItem = (id) => {
        state.lists = state.lists.filter(item => item.id !== id);
    }
    return {
        state, fetchLists, totalMoney, getItemById, getListByCategory, addItem,
        deleteItem
    };
});