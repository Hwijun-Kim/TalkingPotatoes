<template>
  <section class="contents-wrap">
    <div class="con_title-group">
      <div class="con-title"><h3>새 아이템 추가</h3></div>
    </div>
    <form @submit.prevent="saveItem">
      <div class="basic-group">
        <div class="btn-group">
          <div
            class="btn-right-group"
            style="flex-wrap: wrap; justify-content: flex-end; gap: 3px"
          >
            <button type="button" @click="cancelEdit" class="btn btn-outline">
              취소
            </button>
            <button type="submit" class="btn btn-outline">추가</button>
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
                      <label for="edit-date">날짜</label>
                    </div>
                    <div class="item-input">
                      <input
                        type="date"
                        v-model="newItem.date"
                        class="form-control"
                        id="edit-date"
                        name="date"
                        style="text-align: center"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="flex-cell">
                  <div class="flex-table-item">
                    <div class="item-text">
                      <label for="edit-money">금액</label>
                    </div>
                    <div class="item-input">
                      <input
                        type="text"
                        v-model="newItem.money"
                        class="form-control"
                        id="edit-money"
                        name="amount"
                        maxlength="20"
                        size="15"
                        style="text-align: center"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="flex-cell">
                  <div class="flex-table-item">
                    <div class="item-text">
                      <label for="edit-inout">수입/지출</label>
                    </div>
                    <div class="type">
                      <select
                        v-model="newItem.inout"
                        id="type"
                        class="form-select"
                        required
                      >
                        <option :value="true">지출</option>
                        <option :value="false">수입</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="flex-cell">
                  <div class="flex-table-item">
                    <div class="item-text">
                      <label for="edit-category">카테고리</label>
                    </div>
                    <div class="item-input">
                      <select
                        class="form-select"
                        id="edit-category"
                        v-model="newItem.category"
                      >
                        <option :value="1">1</option>
                        <option :value="2">2</option>
                        <option :value="3">3</option>
                        <option :value="4">4</option>
                        <option :value="5">5</option>
                        <option :value="6">6</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right-section">
                <div class="flex-table-item">
                  <div class="item-text">
                    <label for="edit-memo">메모</label>
                  </div>
                  <div class="item-input">
                    <textarea
                      v-model="newItem.memo"
                      class="form-control"
                      name="memo"
                      id="edit-memo"
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
import { useAccountListStore } from "@/stores/store";
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useAccountListStore();
    const router = useRouter();
    const { addItem } = store;
    const newItem = reactive({
      date: "",
      money: "",
      inout: true,
      category: "",
      memo: "",
    });
    const saveItem = async () => {
      await addItem(newItem);
      router.push({ name: "Home" });
    };
    const cancelEdit = () => {
      router.push({ name: "Home" });
    };
    return { newItem, saveItem, cancelEdit };
  },
};
</script>
<style scoped>
/* Your existing styles */
</style>
