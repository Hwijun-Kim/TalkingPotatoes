import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios from 'axios';


export const useAccountListStore = defineStore('userAccount', () => {
    const state = reactive({
        lists: []
    });

    const fetchLists = async () => {
        try {
            const response = await axios.get('api/user');
            console.log('API Response:', response.data);  // Log the response for debugging
            state.lists = response.data;  // Update the reactive state
            console.log('Lists Value:', state.lists);  // Log the updated lists value
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const addItem = async (item) => {
        try {
            // Calculate new ID
            const newId = state.lists.length > 0 ? state.lists[state.lists.length - 1].id + 1 : 1;
            const newItem = { ...item, id: newId };

            const response = await axios.post('api/user', newItem);
            state.lists.push(response.data);  // Add the new item to the local state
            console.log('Item Added:', response.data);  // Log the added item for debugging
        } catch (error) {
            console.error('Failed to add item:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`api/user/${id}`);
            state.lists = state.lists.filter(item => item.id !== id);
        } catch (error) {
            console.error('Fail delete', error);
        }
    }
    const updateItem = async (item) => {
        try {
            const response = await axios.put(`api/user/${item.id}`, item);
            const index = state.lists.findIndex(i => i.id === item.id);
            if (index !== -1) {
                state.lists[index] = response.data;
            }
        } catch (error) {
            console.error('Fail update item', error.response ? error.response.data : error);
        }
    }

    return {
        state,
        fetchLists,
        addItem,
        deleteItem,
        updateItem,
    };
});