<template>
  <section class="content-wrap">
    <div class="containerhome">
      <div class="speech-bubble">
        <h2>Hello! 말하는 감자,</h2>
      </div>
      <div class="month">
        <h2>{{ currentMonth }}월</h2>
        <router-link to="/summary">
          <button type="button" class="btn btn-outline" id="btn1" style="display: inline-block">
            더보기
          </button>
        </router-link>
      </div>
      <div class="charts">
        <div class="chart">
          <div class="chartimage">
            <canvas id="incomeChart"></canvas>
          </div>
          <p>총 수입 : {{ currentIncome }}원</p>
        </div>
        <div class="chart">
          <div class="chartimage">
            <canvas id="expenseChart"></canvas>
          </div>
          <p>총 지출 : {{ currentExpense }}원</p>
        </div>
        <div class="chart">
          <div class="chartimage">
            <img v-if="currentIncome - currentExpense > 0" src="@/assets/ExcellentPotato.jpg" alt="ExcellentPotato" width="280px" height="220px">
            <img v-else-if="currentIncome - currentExpense <= 0 && currentExpense > 0" src="@/assets/SadPotato.jpg" alt="SadPotato" width="280px" height="220px">
            <img v-else src="@/assets/SearchPotato.webp" alt="SearchPotato" width="280px" height="220px">
          </div>
          <p>순수익 : {{ currentIncome - currentExpense }}원</p>
        </div>
      </div>
      <div class="recent-transactions">
        <div class="header-container">
          <h3 class="title">최근 내역</h3>
          <router-link to="/totalView">
            <button type="button" class="btn btn-outline" id="btn1">
              더보기
            </button>
          </router-link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>구분</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in state.lists.slice(0, 3)" :key="item.id">
              <td>{{ item.date }}</td>
              <td>{{ item.inout ? "수입" : "지출" }}</td>
              <td>{{ item.money }}</td>
              <td>
                <button @click="viewDetails(item.id)" type="button" class="btn btn-outline" id="btn2">
                  상세보기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import { useAccountListStore } from "@/stores/store";
import { useRouter } from "vue-router";
import Chart from "chart.js/auto";

export default {
  setup() {
    const store = useAccountListStore();
    const router = useRouter();
    const { state, fetchLists } = store;
    const currentMonth = ref("");
    const currentIncome = ref(0);
    const currentExpense = ref(0);

    // Chart.js 차트 초기화
    let incomeChart;
    let expenseChart;

    onMounted(async () => {
      const monthNames = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
      ];
      const now = new Date();
      currentMonth.value = monthNames[now.getMonth()];
      await fetchLists();

      // DOM 업데이트가 완료된 후에 데이터 처리 및 차트 초기화
      nextTick(() => {
        processMonthlyData();
      });
    });

    const processMonthlyData = () => {
      const filteredData = state.lists.filter((item) => {
        const year = new Date(item.date).getFullYear();
        const month = new Date(item.date).getMonth();
        const now = new Date();
        return year === now.getFullYear() && month === now.getMonth();
      });

      const incomeCategories = { "급여": 0, "용돈": 0, "기타": 0 };
      const expenseCategories = { "쇼핑": 0, "식비": 0, "교통비": 0, "생활비": 0, "문화생활": 0, "기타": 0 };

      filteredData.forEach((item) => {
        const money = parseFloat(item.money);
        if (item.inout) {
          incomeCategories[item.category] += money;
        } else {
          expenseCategories[item.category] += money;
        }
      });

      currentIncome.value = Object.values(incomeCategories).reduce((acc, cur) => acc + cur, 0);
      currentExpense.value = Object.values(expenseCategories).reduce((acc, cur) => acc + cur, 0);

      drawChart(incomeCategories, expenseCategories);
    };

    const drawChart = (incomeCategories, expenseCategories) => {
      const incomeCtx = document.getElementById("incomeChart").getContext("2d");
      const expenseCtx = document.getElementById("expenseChart").getContext("2d");

      if (incomeCtx && expenseCtx) {
        if (incomeChart) {
          incomeChart.destroy();
        }
        if (expenseChart) {
          expenseChart.destroy();
        }

        incomeChart = new Chart(incomeCtx, {
          type: "doughnut",
          data: {
            labels: Object.keys(incomeCategories),
            datasets: [
              {
                label: "수입",
                data: Object.values(incomeCategories),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // 카테고리별 색상
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });

        expenseChart = new Chart(expenseCtx, {
          type: "doughnut",
          data: {
            labels: Object.keys(expenseCategories),
            datasets: [
              {
                label: "지출",
                data: Object.values(expenseCategories),
                backgroundColor: [
                  "#FF6384", "#36A2EB", "#FFCE56", "#63FF84", "#EB36A2", "#56FFCE"
                ], // 카테고리별 색상
                hoverBackgroundColor: [
                  "#FF6384", "#36A2EB", "#FFCE56", "#63FF84", "#EB36A2", "#56FFCE"
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    };

    const viewDetails = async (id) => {
      await store.fetchItemById(id);
      router.push({ name: "UpdateItem", params: { id: id } });
    };

    return {
      state,
      viewDetails,
      currentMonth,
      currentIncome,
      currentExpense,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

.content-wrap {
  font-family: 'Jua', sans-serif;
  flex: 1;
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
}
/* 기본 box-sizing 설정 */
*,
*::before,
*::after {
  box-sizing: border-box;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.title {
  margin: 0;
  font-size: 1.5em;
}

/* 전체 컨테이너 조정 */
.containerhome {
  width: 100%;
  max-width: 100%; /* 최대 너비를 100%로 설정 */
  margin: 0 auto; /* 가운데 정렬 */
  padding: 0 20px; /* 좌우 패딩 */
}

/* 말풍선 스타일 */
.speech-bubble {
  position: relative;
  background: #f0ecca; /* 말풍선의 배경색 */
  border-radius: 10px;
  padding: 2px; /* 줄인 패딩 */
  max-width: 250px; /* 너비 조정 */
  margin-bottom: 30px;
  margin-top: 20px;
  margin-left: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  overflow: visible;
}

.speech-bubble h2 {
  margin: 0;
  color: #000000;
  margin-left: 7px;
  font-size: 16px; /* 폰트 크기 조정 */
}

.speech-bubble::after {
  content: "";
  position: absolute;
  top: -15px; /* 말풍선 위쪽에 위치 */
  left: 15px; /* 말풍선 왼쪽에 위치 */
  transform: rotate(); /* 45도 회전 */
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: #f0ecca;
}

/* 월 표시 섹션 */
.month {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
}

.recent {
  display: flex;
}

.month h2 {
  margin: 0;
  margin-left: 30px;
  font-weight: bolder;
}

/* 차트 섹션 */
.charts {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; /* 화면에 맞게 자동 줄바꿈 */
  padding: 20px;
  margin: 0 auto;
  background-color: #f0ecca;
  width: 100%;
  max-width: 100%; /* 최대 너비를 100%로 설정 */
}

.chartimage {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: white;
  height: 220px;
  width: 280px;
}

.chart {
  text-align: center;
}

.chart p {
  font-size: 1.5em;
  font-weight: medium;
}

.recent-transactions {
  margin-top: 30px;
}

.recent-transactions h3 {
  margin-bottom: 10px;
  font-weight: bolder;
  margin-left: 30px;
}

/* 테이블 */
.table {
  width: 100%; /* 가로 너비를 화면 크기에 맞춤 */
  max-width: 100%; /* 최대 너비를 100%로 설정 */
  border-collapse: collapse;
  margin: 0 auto; /* 가운데 정렬 */
}

.table th,
.table td {
  padding: 10px;
  text-align: center;
}

/* 버튼 스타일 */
#btn1:hover {
  background-color: #f0f0f0;
}

#btn2:hover {
  background-color: #f0f0f0;
}

#btn2 {
  padding: 1px;
  color: black;
  border-radius: 30px;
  cursor: pointer;
  text-align: center;
  width: 80px;
  background-color: #fafaf5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

#btn1 {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  border-radius: 0.25rem;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;
  width: 100px;
  background-color: #fafaf5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
