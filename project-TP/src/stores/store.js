import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

export const useAccountListStore = defineStore('userAccount', () => {
    const state = reactive({
        lists: [],
        currentItem: {
            id: null,
            date: '',
            money: '',
            inout: true,
            category: '',
            memo: ''
        },
        formData: {
            date: '',
            money: '',
            inout: 'spend',
            category: '',
            memo: ''
        },
        incomeCategories: ['급여', '용돈', '기타'],
        spendCategories: ['쇼핑', '식비', '교통비', '생활비', '문화생활', '기타'],
        categoryOptions: [],
        loading: false
    });

    const fetchLists = async () => {
        try {
            const response = await axios.get('/api/user');
            state.lists = response.data;
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const fetchItemById = async (id) => {
        try {
            state.loading = true;
            const response = await axios.get(`/api/user/${id}`);
            state.currentItem = response.data;
            state.loading = false;
        } catch (error) {
            console.error('Failed to fetch item:', error);
            state.loading = false;
        }
    };

    const addItem = async (item) => {
        try {
            console.log('Adding item:', item); // 로그 추가
            // const newId = item
            // const newItem = { ...item, id: newId };
            const response = await axios.post('/api/user', item);
            state.lists.push(response.data);
            console.log('Item added successfully:', response.data); // 로그 추가
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`/api/user/${id}`);
            state.lists = state.lists.filter(item => item.id !== id);
        } catch (error) {
            console.error('Fail delete', error);
        }
    };

    const updateItem = async (item) => {
        try {
            const response = await axios.put(`/api/user/${item.id}`, item);
            const index = state.lists.findIndex(i => i.id === item.id);
            if (index !== -1) {
                state.lists[index] = response.data;
            }
        } catch (error) {
            console.error('Fail update item', error.response ? error.response.data : error);
        }
    };

    const updateCategories = () => {
        if (state.formData.inout === 'income') {
            state.categoryOptions = state.incomeCategories;
        } else {
            state.categoryOptions = state.spendCategories;
        }
    };

    return {
        state,
        fetchLists,
        fetchItemById,
        addItem,
        deleteItem,
        updateItem,
        updateCategories
    };
});