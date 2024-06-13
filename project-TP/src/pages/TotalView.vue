<template>
  <div class="containerhome">
    <br /><br />
    <h3>수입 / 지출 전체 조회</h3>
    <div class="basic-group-1">
      <div class="card-item basic">
        <div>
          <div class="flex-table">
            <div class="left-section">
              <div class="flex-cell">
                <div class="flex-table-item">
                  <div class="item-text">
                    <label for="date">시작 날짜</label>
                  </div>
                  <div class="item-input">
                    <input
                      type="date"
                      class="form-control"
                      id="date"
                      name="date"
                      style="text-align: center"
                      v-model="formData.startDate"
                    />
                  </div>
                </div>
              </div>
              <div class="flex-cell">
                <div class="flex-table-item">
                  <div class="item-text">
                    <label for="type">수입/지출</label>
                  </div>
                  <div class="item-input">
                    <select
                      id="type"
                      class="form-select"
                      v-model="formData.inout"
                      @change="updateCategories"
                    >
                      <option value="spend">지출</option>
                      <option value="income">수입</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="right-section">
              <div class="flex-cell">
                <div class="flex-table-item">
                  <div class="item-text">
                    <label for="date">종료 날짜</label>
                  </div>
                  <div class="item-input">
                    <input
                      v-model="formData.endDate"
                      type="date"
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
                    <label for="category">카테고리</label>
                  </div>
                  <div class="item-input">
                    <select
                      class="form-select"
                      id="category"
                      v-model="formData.category"
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
            <div class="center-section">
              <button type="button" class="search_btn" @click="fliterHandler">
                조회
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
    <div class="row tab">
      <ul class="list-group">
        <li class="list-group-item list_size">
          <table>
            <thead>
              <tr>
                <th class="th_width">날짜</th>
                <th class="th_width">분류</th>
                <th class="th_const">금액</th>
                <th class="th_width"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction.id">
                <td>{{ transaction.date }}</td>
                <td>{{ transaction.inout ? "수입" : "지출" }}</td>
                <td>{{ transaction.money }}원</td>
                <td>
                  <button
                    @click="viewDetails(transaction.id)"
                    type="button"
                    class="btn btn-outline"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useAccountListStore } from "@/stores/store";
import { reactive, onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useAccountListStore();
    const router = useRouter();
    const { state, fetchLists, filterLists } = store;

    const formData = reactive({
      startDate: "",
      endDate: "",
      inout: "spend",
      category: "",
    });

    const fliterHandler = () => {
      filterLists(formData);
       //console.log(state.lists);
    };

    const transactions = computed(() => state.lists);

    const updateCategories = () => {
      if (formData.inout === "income") {
        store.state.categoryOptions = store.state.incomeCategories;
      } else {
        store.state.categoryOptions = store.state.spendCategories;
      }
    };

    const fetchTransactions = () => {
      fetchLists();
    };

    const viewDetails = (id) => {
      router.push({ name: "UpdateItem", params: { id } });
    };

    onMounted(() => {
      fetchTransactions();
      updateCategories();
    });

    return {
      formData,
      categoryOptions: computed(() =>
        formData.inout === "income"
          ? store.state.incomeCategories
          : store.state.spendCategories
      ),
      transactions,
      updateCategories,
      fetchTransactions,
      viewDetails,
      fliterHandler,
    };
  },
};
</script>
<style scoped>

.content-wrap {
    flex: 1;
    width: 100vw;
    box-sizing: border-box;
    overflow: hidden; 
  }

  .containerhome {
      width: 100vw;
      max-width: 100vw; /* 최대 너비를 100%로 설정 */
      margin: 0 auto; /* 가운데 정렬 */
      padding: 0 260px; /* 좌우 패딩 */
  }
  .list_size {
      width: 99%;
      height: 40px;
      margin : 0px;
      background-color: #F0ECCA;
      padding: 0px;
      margin-left: 13px;
  }
  select, input {     
      width: 184px;
  }
  li {
      margin-left: 10%;
      margin-right: 10%;
      list-style-type: none;
  }
  th {
      width: 500px;
      height: 40px;
      text-align: center; 
      padding: 0px;
  }
  .search_div {
      padding-top: 20px;
      text-align : center;
      background-color: #F0ECCA;
      width: auto;
      height: 250px;
  }
  .th_width {
      width: 300px;
      height: 40px;
      padding: 0px;
  }
  .th_const {
      width: 500px;
      height: 40px;
      padding: 0px;
  }
  td {
      border: 1px solid #dddddd;
      border-left: none;
      border-right: none;
      text-align: center;
      padding: 0px;
      height: 40px;
  }
  .tab {
  height: 200px;
  }
  .search_btn {
      width: 200px;
      padding: 0.5rem 1rem;
      background-color: white;
      color: black;
      border-radius: 0.25rem;
      cursor: pointer;
      text-align: center;
      margin-top: 1rem;
      background-color: #fafaf5;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      border-color: rgba(255, 255, 255, 0);
  }
  .item-text {
      display: flex;
      padding: 10px 39px;
      font-size: 20px;
      line-height: 20px;
      color: #333;
      box-sizing: border-box;
      word-break: keep-all;
      width: 200px;
  }
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
  .flex-table {
      position: relative;
      display: flex;
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
  .center-section {
      width: 100%;
      margin-right: 80px;
  }
  .flex-cell {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-left : 80px
  }
  .flex-table-item {
      display: flex;
      min-height: 100%;
  }
  .item-input {
      width: 60%;
  }
  .btn {
    padding: 1px;
    color: black;
    border-radius: 30px;
    cursor: pointer;
    text-align: center;
    width: 80px;
    background-color: #fafaf5;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
</style>
