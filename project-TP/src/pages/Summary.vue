<template>
  <!-- 메인 컨텐츠 섹션 -->
  <section class="contentss-wrap">
    <div class="container">
      <!-- 메인 차트 영역 -->
      <div class="chart-container">
        <!-- 수입과 지출을 보여주는 메인 바 차트 캔버스 -->
        <canvas id="myChart"></canvas>
      </div>

      <!-- 월별 버튼 및 년도 선택 영역 -->
      <div class="months-container">
        <div class="year-select">
          <label>선택 년도 : </label>
          <!-- 연도 선택 드롭다운 메뉴 -->
          <select
            class="form-select"
            v-model="selectedYear"
            @change="updateChart"
          >
            <!-- years 배열을 순회하여 각 연도 옵션을 생성 -->
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <!-- 월별 버튼 영역 -->
        <div class="months-buttons">
          <!-- months 배열을 순회하여 각 월 버튼을 생성 -->
          <button
            v-for="month in months"
            :key="month"
            @click="filterByMonth(month)"
            type="button"
            class="btn btn-outline"
          >
            {{ month }}
          </button>
        </div>
        <br />
        <br />
        <!-- 선택된 년도와 달을 표시하는 영역 -->
        <div class="month">
          <h2>{{ selectedYear }} {{ currentMonth }}</h2>
        </div>

        <!-- 수입, 지출, 순수익 차트 영역 -->
        <div class="charts">
          <!-- 수입 차트 영역 -->
          <div class="chart">
            <div class="chartimage">
              <!-- 수입 도넛 차트를 그리는 캔버스 -->
              <canvas id="incomeChart"></canvas>
            </div>
            <p>총 수입 : {{ currentIncome }}원</p>
          </div>
          <!-- 지출 차트 영역 -->
          <div class="chart">
            <div class="chartimage">
              <!-- 지출 도넛 차트를 그리는 캔버스 -->
              <canvas id="expenseChart"></canvas>
            </div>
            <p>총 지출 : {{ currentExpense }}원</p>
          </div>
          <!-- 순수익 이미지 및 텍스트 영역 -->
          <div class="chart">
            <div class="chartimage">
              <!-- 순수익에 따른 이미지를 보여줌 -->
              <img v-if="currentIncome - currentExpense > 0" src="@/assets/ExcellentPotato.jpg" alt="ExcellentPotato" width="200px" height="200px">
              <img v-else-if="currentIncome - currentExpense <= 0 && currentExpense > 0" src="@/assets/SadPotato.jpg" alt="SadPotato" width="200px" height="200px">
              <img v-else src="@/assets/SearchPotato.webp" alt="SearchPotato" width="200px" height="200px">
            </div>
            <p>순수익 : {{ currentIncome - currentExpense }}원</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Chart, registerables } from "chart.js/auto";

// Chart.js의 모든 레지스터 사능한 항목 등록
Chart.register(...registerables);

export default {
  name: "MonthlySummary",
  setup() {
    // 선택된 연도와 월, 수입 및 지출 데이터를 저장하는 변수
    const selectedYear = ref(null);
    const years = ["2023년", "2024년"];
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    const currentMonth = ref(null);
    const currentIncome = ref(0);
    const currentExpense = ref(0);
    const monthlyData = ref([]);
    let chartInstance = null;
    let incomeChartInstance = null;
    let expenseChartInstance = null;

    // 서버에서 월별 데이터를 가져오는 함수
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get("/api/user");
        monthlyData.value = response.data;
        processMonthlyData();
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    // 선택된 연도의 데이터를 필터링하여 수입 및 지출 데이터를 계산하는 함수
    const processMonthlyData = () => {
      const filteredData = monthlyData.value.filter((item) => {
        const year = new Date(item.date).getFullYear();
        return year === parseInt(selectedYear.value);
      });

      const incomeData = Array(12).fill(0);
      const expenseData = Array(12).fill(0);

      filteredData.forEach((item) => {
        const month = new Date(item.date).getMonth();
        const money = parseFloat(item.money);

        if (item.inout) {
          incomeData[month] += money;
        } else {
          expenseData[month] += money;
        }
      });

      drawChart(incomeData, expenseData);
      if (currentMonth.value !== null) {
        drawIncomeChart(filteredData);
        drawExpenseChart(filteredData);
      }
    };

    // 연도가 변경될 때 차트를 업데이트하는 함수
    const updateChart = () => {
      if (selectedYear.value) {
        processMonthlyData();
      }
    };

    // 월별 데이터를 필터링하여 차트를 업데이트하는 함수
    const filterByMonth = (month) => {
      currentMonth.value = month;
      const monthIndex = months.indexOf(month);
      const filteredData = monthlyData.value.filter((item) => {
        const itemMonth = new Date(item.date).getMonth();
        const itemYear = new Date(item.date).getFullYear();
        return (
          itemMonth === monthIndex && itemYear === parseInt(selectedYear.value)
        );
      });

      currentIncome.value = filteredData
        .filter((item) => item.inout)
        .reduce((acc, item) => acc + parseFloat(item.money), 0);
      currentExpense.value = filteredData
        .filter((item) => !item.inout)
        .reduce((acc, item) => acc + parseFloat(item.money), 0);

      drawIncomeChart(filteredData);
      drawExpenseChart(filteredData);
    };

    // 차트를 숨기는 함수
    const hiddenChart = () => {
      currentMonth.value = null;
    };

    // 전체 수입 및 지출 차트를 그리는 함수
    const drawChart = (incomeData, expenseData) => {
      const ctx = document.getElementById("myChart").getContext("2d");

      // 기존 차트 인스턴스가 있는 경우 삭제
      if (chartInstance) {
        chartInstance.destroy();
      }

      // 새 차트 인스턴스 생성
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "수입",
              data: incomeData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "지출",
              data: expenseData,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    // 수입 차트를 그리는 함수
    const drawIncomeChart = (filteredData) => {
      const ctx = document.getElementById("incomeChart").getContext("2d");

      // 기존 차트 인스턴스가 있는 경우 삭제
      if (incomeChartInstance) {
        incomeChartInstance.destroy();
      }

      // 선택된 년도와 달에 해당하는 데이터 필터링
      const filteredMonthData = filteredData.filter((item) => {
        const itemMonth = new Date(item.date).getMonth();
        const itemYear = new Date(item.date).getFullYear();
        return (
          itemMonth === months.indexOf(currentMonth.value) &&
          itemYear === parseInt(selectedYear.value)
        );
      });

      // 카테고리별 수입 계산
      const categoryData = {
        급여: 0,
        용돈: 0,
        기타: 0,
      };

      filteredMonthData.forEach((item) => {
        const category = item.category;
        if (item.inout && ["급여", "용돈", "기타"].includes(category)) {
          categoryData[category] += parseFloat(item.money);
        }
      });

      // 차트 그리기
      incomeChartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["급여", "용돈", "기타"],
          datasets: [
            {
              label: "수입",
              data: Object.values(categoryData),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    };

    // 지출 차트를 그리는 함수
    const drawExpenseChart = (filteredData) => {
      const ctx = document.getElementById("expenseChart").getContext("2d");

      // 기존 차트 인스턴스가 있는 경우 삭제
      if (expenseChartInstance) {
        expenseChartInstance.destroy();
      }

      // 선택된 년도와 달에 해당하는 데이터 필터링
      const filteredMonthData = filteredData.filter((item) => {
        const itemMonth = new Date(item.date).getMonth();
        const itemYear = new Date(item.date).getFullYear();
        return (
          itemMonth === months.indexOf(currentMonth.value) &&
          itemYear === parseInt(selectedYear.value) &&
          !item.inout // 지출만 필터링
        );
      });

      // 카테고리별 지출 계산
      const categoryData = {
        쇼핑: 0,
        식비: 0,
        교통비: 0,
        생활비: 0,
        문화생활: 0,
        기타: 0,
      };

      filteredMonthData.forEach((item) => {
        const category = item.category;
        if (
          ["쇼핑", "식비", "교통비", "생활비", "문화생활", "기타"].includes(
            category
          )
        ) {
          categoryData[category] += parseFloat(item.money);
        }
      });

      // 차트 그리기
      expenseChartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["쇼핑", "식비", "교통비", "생활비", "문화생활", "기타"],
          datasets: [
            {
              label: "지출",
              data: Object.values(categoryData),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#63FF84",
                "#EB36A2",
                "#56FFCE",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#63FF84",
                "#EB36A2",
                "#56FFCE",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    };

    // 페이지 로드 시 데이터 불러오기
    onMounted(() => {
      fetchMonthlyData();
    });

    return {
      selectedYear,
      years,
      months,
      currentMonth,
      currentIncome,
      currentExpense,
      filterByMonth,
      hiddenChart,
      updateChart,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

.contentss-wrap {
  font-family: 'Jua', sans-serif;
  flex: 1;
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
}

.container {
  text-align: center;
}

.chart-container {
  margin: 20px;
}

.months-container {
  margin: 20px;
}

.year-select {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.year-select label {
  margin-right: 10px;
}

.months-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 0.5rem 1rem;
  background-color: white;
  color: black;
  border-radius: 0.25rem;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;
  width: 94px;
  background-color: #fafaf5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #f0f0f0;
}

#bt2 {
  width: 100px;
}

select {
  padding: 5px;
  width: 150px;
}

.charts {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.chart {
  text-align: center;
}

.chartimage {
  width: 200px;
  height: 200px;
  margin: auto;
}

.chart p {
  margin-top: 10px;
}
</style>
