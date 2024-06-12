import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';

export const useAccountListStore = defineStore('userAccount', () => {
    const state = reactive({
        lists: [],
        filteredLists: [],
        currentItem: {
            id: null,
            date: '',
            money: '',
            inout: true,
            category: '',
            memo: ''
        },
        formData: {
            startDate: '',
            endDate: '',
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
            console.log('Adding item:', item);
            const response = await axios.post('/api/user', item);
            state.lists.push(response.data);
            console.log('Item added successfully:', response.data);
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`/api/user/${id}`);
            state.lists = state.lists.filter(item => item.id !== id);
        } catch (error) {
            console.error('Failed to delete item:', error);
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
            console.error('Failed to update item', error.response ? error.response.data : error);
        }
    };

    const updateCategories = () => {
        if (state.formData.inout === 'income') {
            state.categoryOptions = state.incomeCategories;
        } else {
            state.categoryOptions = state.spendCategories;
        }
    };

    const filterLists = (formData) => {
        const { startDate, endDate, inout, category } = formData;

        // 날짜 형식이 유효한지 확인합니다.
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        
        //inout 형식 변환
        const inoutChange = inout === 'income' ? true : false;

        if ((startDate && isNaN(start)) || (endDate && isNaN(end))) {
            console.error("formData에 유효하지 않은 날짜 형식이 포함되어 있습니다.");
            return;
        }

        // 종료일을 하루의 끝까지 포함하도록 설정합니다.
        if (end) end.setHours(23, 59, 59, 999);

        state.filteredLists = state.lists.filter(item => {
            const itemDate = new Date(item.date);

            // 날짜 범위에 따라 아이템을 필터링합니다.
            const dateInRange = (!start || itemDate >= start) && (!end || itemDate <= end);

            // 유형 및 카테고리에 따라 아이템을 필터링합니다.
            const typeMatches = item.inout === inoutChange ? true : false;

            // inout(수입/지출에서 선택한 값) : spend, income 
            // item.inout : false, true
            //console.log(`inoutChange : ${inoutChange}`);
            //console.log(`item.inout : ${item.inout}` );


            let categoryMatches; // 변수를 여기서 선언합니다.

            //income
            if (inoutChange) {
                categoryMatches = state.incomeCategories ? state.incomeCategories.includes(item.category) : true;
                console.log("income category");
            }
            //spend
            else {
                categoryMatches = state.spendCategories ? state.spendCategories.includes(item.category) : true;
                console.log("spend category");
            }

            // 모든 조건을 만족하는 경우에만 필터링합니다.
            return dateInRange 
            && typeMatches 
            && categoryMatches;
        });

        console.log(state.filteredLists);
    };

    return {
        state,
        fetchLists,
        fetchItemById,
        addItem,
        deleteItem,
        updateItem,
        updateCategories,
        filterLists
    };
});
