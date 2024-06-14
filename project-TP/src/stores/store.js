import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';

// 'userAccount'의 Pinia 스토어 정의
export const useAccountListStore = defineStore('userAccount', () => {
    //반응형 상태 변수 지정
    const state = reactive({
        lists: [], // 모든 거래 내역을 저장하는 배열
        filteredLists: [], // 필터링된 거래 내역을 저장하는 배열
        currentItem: { // 현재 선택된 아이템의 상세 정보 저장
            id: null,
            date: '',
            money: '',
            inout: true,
            category: '',
            memo: ''
        },
        formData: { // 필터 조회 데이터의 초기값 설정
            startDate: '',
            endDate: '',
            inout: 'spend',
            category: '',
            memo: ''
        },
        incomeCategories: ['급여', '용돈', '기타'], // 수입 카테고리 리스트
        spendCategories: ['쇼핑', '식비', '교통비', '생활비', '문화생활', '기타'], // 지출 카테고리 리스트
        categoryOptions: [], // 현재 선택된 카테고리 옵션을 저장하는 배열
        loading: false // 데이터 로딩 상태를 나타냅니다.
    });

    //json-server로부터 데이터 fetch
    const fetchLists = async () => {
        try {
            const response = await axios.get('/api/user'); //json-server에서 데이터 가져오기
            state.lists = response.data;
            state.lists.sort((a,b) => new Date(b.date) - new Date(a.date)); // 날짜순으로 정렬
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    // 특정 아이디의 아이템을 서버로부터 fetch
    const fetchItemById = async (id) => {
        try {
            state.loading = true;
            const response = await axios.get(`/api/user/${id}`); //json-server에서 데이터 가져오기
            state.currentItem = response.data; //fetch된 데이터의 상세정보를 currentItem에 저장
            state.loading = false;
        } catch (error) {
            console.error('Failed to fetch item:', error);
            state.loading = false;
        }
    };

    // 데이터 추가 메소드
    const addItem = async (item) => {
        try {
            console.log('Adding item:', item);
    
            const { startDate, endDate, ...itemToSave } = item; // startDate와 endDate를 제외한 itemToSave 객체를 생성
    
            const response = await axios.post('/api/user', itemToSave); // json-server에 데이터 보내기(추가)
            state.lists.push(response.data); //모든 거래내역에 데이터 추가
            console.log('Item added successfully:', response.data);
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    // 데이터 삭제 메소드
    const deleteItem = async (id) => {
        try {
            await axios.delete(`/api/user/${id}`); // 특정 아이디의 데이터 삭제
            state.lists = state.lists.filter(item => item.id !== id); // 삭제된 아이템을 리스트에서 제거
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    // 데이터 수정 메소드
    const updateItem = async (item) => {
        try {
            const response = await axios.put(`/api/user/${item.id}`, item); // 수정한 아이템의 정보를 해당 id에 저장  
            const index = state.lists.findIndex(i => i.id === item.id); //모든 거래내역 배열에서 수정된 아이템의 id 저장
            
            //만약 수정된 아이템이 배열에 존재하면, 해당 아이템을 서버로부터 받은 데이터로 업데이트
            if (index !== -1) {
                state.lists[index] = response.data;
            }
        } catch (error) {
            console.error('Failed to update item', error.response ? error.response.data : error);
        }
    };

    // 카테고리 옵션 업데이트
    const updateCategories = () => {
        // 선택된 수입/지출에 따라 카테고리 옵션 설정
        if (state.formData.inout === 'income') {
            state.categoryOptions = state.incomeCategories;
        } else {
            state.categoryOptions = state.spendCategories;
        }
    };

    // 시작날짜, 종료날짜, 수입/지출, 카테고리에 따라 필터링
    const filterLists = (formData) => {
        const { startDate, endDate, inout, category } = formData;
        // 날짜 형식이 유효한지 확인
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        //inout 형식 변환
        const inoutChange = inout === 'income' ? true : false;
        if ((startDate && isNaN(start)) || (endDate && isNaN(end))) {
            console.error("formData에 유효하지 않은 날짜 형식이 포함");
            return;
        }
        // 종료일을 하루의 끝까지 포함하도록 설정
        if (end) end.setHours(23, 59, 59, 999);
        state.lists = state.lists.filter(item => {
            const itemDate = new Date(item.date);

            // 날짜 범위에 따라 아이템을 필터링
            const dateInRange = (!start || itemDate >= start) && (!end || itemDate <= end);

            // inout에 따라 아이템을 필터링
            const typeMatches = item.inout === inoutChange ? true : false;
            // inout(수입/지출에서 선택한 값) : spend, income 
            // item.inout : false, true
            //console.log(`inoutChange : ${inoutChange}`);
            //console.log(`item.inout : ${item.inout}` );

            // 카테고리에 따라 아이템을 필터링
            let categoryMatches;

            // inout이 income 일 때
            if (inoutChange) {
                categoryMatches = state.incomeCategories ? state.incomeCategories.includes(item.category) : true;
                //console.log("income category");
            }
            // inout이 spend 일 때 
            else {
                categoryMatches = state.spendCategories ? state.spendCategories.includes(item.category) : true;
                //console.log(`${item.category}`);
            }
            // 모든 조건을 만족하는 경우에만 필터링
            return dateInRange && typeMatches && categoryMatches;
        });
    };

    // 상태와 메소드 반환
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
