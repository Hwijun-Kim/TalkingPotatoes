<template>
  <section class="contents-wrap">
    <div class="con_title-group">
      <div class="con-title">
        <h3>상세 정보</h3>
      </div>
    </div>
    <form @submit.prevent="saveItem">
      <div class="basic-group">
        <div class="btn-group">
          <div
            class="btn-right-group"
            style="flex-wrap: wrap; justify-content: flex-end; gap: 3px"
          >
            <button type="button" @click="cancelEdit" class="btn btn-outline">취소</button>
            <button type="button" @click="deleteItem(editItemData.id)" class="btn btn-outline">삭제</button>
            <button type="submit" class="btn btn-outline">수정</button>
          </div>
        </div>
      </div>
      <div class="basic-group-1">
        <div class="card-item basic">
          <div>
            <div class="flex-table">
              <div class="left-section">
                <div class="flex-cell">
                  <div class="flex-table-item">
                    <div class="item-text">
                      <label for="date">날짜</label>
                    </div>
                    <div class="item-input">
                      <input
                        type="date"
                        v-model="editItemData.date"
                        class="form-control"
                        id="date"
                        name="date"
                        style="text-align: center"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex-cell">
                  <div class="flex-table-item">
                    <div class="item-text">
                      <label for="money">금액</label>
                    </div>
                    <div class="item-input">
                      <input
                        type="text"
                        v-model="editItemData.money"
                        class="form-control"
                        id="money"
                        name="money"
                        maxlength="20"
                        size="15"
                        style="text-align: center"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex-cell">
                  <div class="flex-table-item">
                    <div class="item-text">
                      <label for="inout">수입/지출</label>
                    </div>
                    <div class="item-input">
                      <select
                        id="inout"
                        class="form-select"
                        v-model="editItemData.inout"
                        @change="handleTypeChange"
                      >
                        <option :value="true">수입</option>
                        <option :value="false">지출</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="flex-cell">
                  <div class="flex-table-item">
                    <div class="item-text">
                      <label for="category">카테고리</label>
                    </div>
                    <div class="item-input">
                      <select
                        class="form-select"
                        id="category"
                        v-model="editItemData.category"
                      >
                        <option
                          v-for="option in categoryOptions"
                          :key="option"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right-section">
                <div class="flex-table-item">
                  <div class="item-text">
                    <label for="memo">메모</label>
                  </div>
                  <div class="item-input">
                    <textarea
                      class="form-control"
                      v-model="editItemData.memo"
                      name="memo"
                      id="memo"
                      placeholder="점심값 10,000원 지출"
                      style="width: 100%; height: 200px"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { useAccountListStore } from '@/stores/store';
import { reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const store = useAccountListStore();
    const route = useRoute();
    const router = useRouter();
    const { state, fetchItemById, deleteItem: deleteItemFromStore, updateItem: updateItemInStore } = store;

    const editItemData = reactive({
      id: null,
      date: '',
      money: '',
      inout: true,
      category: '',
      memo: ''
    });

    const categoryOptions = computed(() => {
      return editItemData.inout ? state.incomeCategories : state.spendCategories;
    });

    const loadItemData = async (id) => {
      await fetchItemById(id);
      Object.assign(editItemData, state.currentItem);
      if (!categoryOptions.value.includes(editItemData.category)) {
        editItemData.category = categoryOptions.value[0];
      }
    };

    onMounted(async () => {
      const id = route.params.id;
      await loadItemData(id);
    });

    const saveItem = async () => {
      await updateItemInStore(editItemData);
      router.push({ name: 'TotalView' });
    };

    const cancelEdit = () => {
      router.push({ name: 'TotalView' });
    };

    const deleteItem = async () => {
      await deleteItemFromStore(editItemData.id);
      router.push({ name: 'TotalView' });
    };

    const handleTypeChange = () => {
      if (!categoryOptions.value.includes(editItemData.category)) {
        editItemData.category = categoryOptions.value[0];
      }
    };

    return {
      editItemData,
      saveItem,
      cancelEdit,
      deleteItem,
      categoryOptions,
      handleTypeChange
    };
  }
};
</script>

<style scoped>
.basic-group-1 {
  background-color: #f0ecca;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100vx;
  text-align: center;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 50px;
  padding-bottom: 50px;
}
.btn-group {
  display: flex;
}

button {
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  border-radius: 0.25rem;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;
  background-color: #fafaf5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #f0f0f0;
}

.btn-group .btn-right-group {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
}
.btn-right-group {
  padding-bottom: 7px;
}

.card-item {
  position: relative;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #fff;
}

.card-item.basic {
  padding: 30px;
  background: #fff;
  border-radius: 20px;
}

.contents-wrap {
  flex: 1;
  width: 100vw;
  box-sizing: border-box;
  padding: 80px;
  overflow: hidden;
}

.contents-wrap .card-item.basic {
  margin: 0 -20px;
}

.flex-table {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.flex-table-item {
  display: flex;
  min-height: 100%;
}

.flex-table-item .item-title {
  display: flex;
  padding: 10px 20px;
  font-size: 20px;
  line-height: 20px;
  color: #333;
  background-color: #f3f4f6;
  box-sizing: border-box;
  word-break: keep-all;
}

.item-title-bold {
  display: flex;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  color: #333;
  background-color: #f3f4f6;
  box-sizing: border-box;
  word-break: keep-all;
}

.item-text {
  display: flex;
  padding: 10px 39px;
  font-size: 20px;
  line-height: 20px;
  color: #333;
  box-sizing: border-box;
  word-break: keep-all;
}

.item-text-bold {
  display: flex;
  padding: 10px 39px;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  color: #333;
  box-sizing: border-box;
  word-break: keep-all;
}

.flex-table-item .item-data {
  display: flex;
  padding: 10px 20px;
  font-size: 20px;
  line-height: 20px;
  color: #888;
  background-color: #fff;
  box-sizing: border-box;
}

.flex-table {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.left-section {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.right-section {
  width: 50%;
}

.flex-cell {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.flex-table-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.item-text {
  width: 40%;
}

.item-input {
  width: 60%;
}

textarea {
  width: 100%;
  height: 100px;
  resize: none;
}
</style>
