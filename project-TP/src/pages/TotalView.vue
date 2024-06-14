<template>
  <div class="containerhome">
    <br /><br />
    <!--제목 및 새로고침 버튼 영역-->
    <h3>수입 / 지출 전체 조회 <i @click="refreshPage" class="fa-solid fa-rotate-right"></i></h3>
    <!--필터링 옵션 영역-->
    <div class="basic-group-1">
      <div class="card-item basic">
        <div>
          <div class="flex-table">
            <!-- 왼쪽 섹션 영역 -->
            <div class="left-section">
              <!-- 시작 날짜 선택 영역 -->
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
              <!-- 수입/지출 선택 영역 -->
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
            <!-- 오른쪽 섹션 영역 -->
            <div class="right-section">
              <!-- 종료 날짜 선택 영역 -->
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
              <!-- 카테고리 선택 영역 -->
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
            <!-- 가운데 섹션 영역: 필터링 버튼 -->
            <div class="center-section">
              <button type="button" class="filter_btn" @click="fliterHandler">
                조회
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
    <!-- 결과 표시 테이블 섹션 -->
    <div class="row">
      <ul class="list-group">
        <li class="list-group-item list_size">
          <table>
            <!-- 테이블 헤더 영역 -->
            <thead>
              <tr class="headt">
                <th class="th_width">날짜</th>
                <th class="th_width">분류</th>
                <th class="th_const">금액 <i v-if="isArrowVisible" @click="toggleArrow" class="fa-solid fa-caret-down"></i> <i v-else @click="toggleArrow" class="fa-solid fa-caret-up"></i></th>
                <th class="th_width"></th>
              </tr>
            </thead>
            <!-- 테이블 리스트 영역 -->
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

<!-- 스크립트 섹션 -->
<script>
import { useAccountListStore } from "@/stores/store";
import { reactive, onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useAccountListStore();
    const router = useRouter();
    const { state, fetchLists, filterLists } = store;

    const isArrowVisible = ref(true);

    const toggleArrow = () => {
      if(isArrowVisible.value) {
        state.lists.sort((a,b) => (b.money) - (a.money));
        isArrowVisible.value = !isArrowVisible.value;
      } else {
        state.lists.sort((a,b) => (a.money) - (b.money));
        isArrowVisible.value = !isArrowVisible.value;
      }
    };

    const formData = reactive({
      startDate: "",
      endDate: "",
      inout: "spend",
      category: "",
    });

    const fliterHandler = () => {
      filterLists(formData);
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
      router.push({ name: "UpdateItemTotalView", params: { id } });
    };

    const refreshPage = () => {
      window.location.reload();
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
      refreshPage,
      toggleArrow,
      isArrowVisible,
    };
  },
};
</script>
<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

  /* 전체 컨테이너 스타일 */
  .containerhome {
    width: 100vw;
    max-width: 100vw; /* 최대 너비를 100%로 설정 */
    margin: 0 auto; /* 가운데 정렬 */
    padding: 0 260px; /* 좌우 패딩 */
    font-family: 'Jua', sans-serif;
  }

  /* 필터링 옵션 외부 영역 배경 스타일 */
  .basic-group-1 {
    background-color: #f0ecca;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  /* 필터링 옵션 내부 영역 배경 스타일 */
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

  /* 필터링 옵션 왼쪽 영역 지정 */
  .left-section {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  /* 필터링 옵션 오른쪽 영역 지정 */
  .right-section {
    width: 50%;
  }

  /* 필터링 옵션 가운데 버튼 영역 지정 */
  .center-section {
    width: 100%;
  }

  /* 필터링 옵션 아이템 스타일 */
  .flex-cell {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .flex-table-item {
    width: 100%;
    display: flex;
    min-height: 100%;
    justify-content: space-between;
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

  .item-input {
    width: 60%;
  }

  /* 필터링 옵션 버튼 스타일 */
  .filter_btn {
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

  /* 결과 표시 테이블 헤더 스타일 */
  .headt {
    background-color: #f0ecca;
  }

  /* 결과 표시 테이블 리스트 스타일 */
  li {
    border: none;
    list-style-type: none;
  }

  th {
    width: 500px;
    height: 40px;
    text-align: center; 
    padding: 0px;
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

  /* 상세보기 버튼 스타일 */
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

  .btn-group {
    display: flex;
  }

</style>