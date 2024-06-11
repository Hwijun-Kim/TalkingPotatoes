<template>
    <div>
        <button class="btn btn-primary mb-3" @click="loadList">Load Data</button>
        <div v-if="list.length">
            <div v-for="item in list" :key="item.id">
                {{ item.id }} - {{ item.money }} - Category : {{ item.category }}
            </div>
            <p>Total Money: {{ totalMoney }}</p>
      <button @click="filterByCategory(1)">Filter by Category 1</button>
      <div v-if="filteredItems.length">
        <div v-for="item in filteredItems" :key="item.id">
          {{ item.id }} - {{ item.money }} - Category: {{ item.category }}
        </div>
      </div>
    </div>
    <div>
      <input v-model="newId" placeholder="ID" type="number" />
      <input v-model="newDate" placeholder="Date" type="date" />
      <input v-model="newMoney" placeholder="Money" type="number" />
      <select v-model="newInout">
        <option :value="true">In</option>
        <option :value="false">Out</option>
      </select>
      <input v-model="newCategory" placeholder="Category" type="number" />
      <button @click="addItem">Add Item</button>
    </div>
    <div v-if="isEditing">
      <h3>Edit Item</h3>
      <input v-model="editId" placeholder="ID" type="number" disabled />
      <input v-model="editDate" placeholder="Date" type="date" />
      <input v-model="editMoney" placeholder="Money" type="number" />
      <select v-model="editInout">
        <option :value="true">In</option>
        <option :value="false">Out</option>
      </select>
      <input v-model="editCategory" placeholder="Category" type="number" />
      <input v-model="editMemo" placeholder="Memo" type="text" />
      <button @click="updateItem">Update Item</button>
    </div>
    <div>
      <h3>Search by Date Range</h3>
      <input v-model="startDate" placeholder="Start Date" type="date" />
      <input v-model="endDate" placeholder="End Date" type="date" />
      <button @click="searchByDateRange">Search</button>
      <div v-if="dateFilteredItems.length">
        <div v-for="item in dateFilteredItems" :key="item.id">
          {{ item.id }} - {{ item.money }} - Date: {{ item.date }}
        </div>
      </div>
    </div>
    <div>
      <h3>Filter by Month</h3>
      <button v-for="month in months" :key="month.value" @click="filterByMonth(month.value)">
        {{ month.name }}
      </button>
      <div v-if="monthFilteredItems.length">
        <div v-for="item in monthFilteredItems" :key="item.id">
          {{ item.id }} - {{ item.money }} - Date: {{ item.date }}
        </div>
      </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAccountListStore } from "@/stores/store";

export default {
    setup() {
        const store = useAccountListStore();
            
        const filteredItems = ref([]);
        const newId = ref("");
        const newDate = ref("");
        const newMoney = ref("");
        const newInout = ref(true);
        const newCategory = ref("");

        const editId = ref("");
        const editDate = ref("");
        const editMoney = ref("");
        const editInout = ref(true);
        const editCategory = ref("");
        const editMemo = ref("");
        const isEditing = ref(false);

        const startDate = ref("");
        const endDate = ref("");
        const dateFilteredItems = ref([]);
        const monthFilteredItems = ref([]);

        const months = [
        { name: "January", value: 0 },
        { name: "February", value: 1 },
        { name: "March", value: 2 },
        { name: "April", value: 3 },
        { name: "May", value: 4 },
        { name: "June", value: 5 },
        { name: "July", value: 6 },
        { name: "August", value: 7 },
        { name: "September", value: 8 },
        { name: "October", value: 9 },
        { name: "November", value: 10 },
        { name: "December", value: 11 }
        ];
        const loadList = async () => {
            await store.fetchLists();
        };

        const filterByCategory = (category) => {
        filteredItems.value = store.getListByCategory(category);
        };

        const addItem = () => {
        store.addItem(newId.value, newDate.value, newMoney.value, newInout.value, newCategory.value);
        newId.value = "";
        newDate.value = "";
        newMoney.value = "";
        newInout.value = true;
        newCategory.value = "";
        };

        const removeItem = (id) => {
        store.deleteItem(id);
        };

        const editItem = (item) => {
        editId.value = item.id;
        editDate.value = item.date;
        editMoney.value = item.money;
        editInout.value = item.inout;
        editCategory.value = item.category;
        editMemo.value = item.memo;
        isEditing.value = true;
        };

        const updateItem = () => {
        store.updateItem(editId.value, editDate.value, editMoney.value, editInout.value, editCategory.value, editMemo.value);
        isEditing.value = false;
        editId.value = "";
        editDate.value = "";
        editMoney.value = "";
        editInout.value = true;
        editCategory.value = "";
        editMemo.value = "";
        };

        const searchByDateRange = () => {
        dateFilteredItems.value = store.getListByDateRange(startDate.value, endDate.value);
        };

        const filterByMonth = (month) => {
        monthFilteredItems.value = store.getListByMonth(month);
        };

        const sortHighAmount = () => {
        store.sortListByHighAmount();
        };

        const sortLowAmount = () => {
        store.sortListByLowAmount();
        };

        return {
            lists: store.state.lists,
            totalMoney: store.totalMoney,
            loadList,
            filterByCategory,
            filteredItems,
            newId,
            newDate,
            newMoney,
            newInout,
            newCategory,
            addItem,
            removeItem,
            editId,
            editDate,
            editMoney,
            editInout,
            editCategory,
            editMemo,
            isEditing,
            editItem,
            updateItem,
            startDate,
            endDate,
            dateFilteredItems,
            searchByDateRange,
            months,
            filterByMonth,
            monthFilteredItems,
            sortHighAmount,
            sortLowAmount 
        };
    }
};
</script>

<style scoped>

</style>