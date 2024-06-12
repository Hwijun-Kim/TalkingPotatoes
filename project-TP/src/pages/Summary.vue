<template>
  <section class="contentss-wrap">
    <div class="container">
      <div class="chart-container">
        <div class="chart-placeholder"></div>
      </div>
      <div class="months-container">
        <div class="year-select">
          <label>선택 년도 : </label>
          <select v-model="selectedYear" @change="updateChart">
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div class="months-buttons">
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
        <div class="month">
          <h2>{{ currentMonth }}월</h2>
          <button
            @click="hiddenChart(currentMonth)"
            type="button"
            class="btn btn-outline"
            style="display: inline-block"
            id="bt2"
          >
            뒤로가기
          </button>
        </div>
        <div class="charts">
          <div class="chart">
            <div class="chartimage"></div>
            <p>총 수입 : 0000원</p>
          </div>
          <div class="chart">
            <div class="chartimage"></div>
            <p>총 지출 : 0000원</p>
          </div>
          <div class="chart">
            <div class="chartimage"></div>
            <p>순수익 : 0000원</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MonthlySummary",
  setup() {
    const selectedYear = ref(2024);
    const years = [2023, 2024];
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

    const updateChart = () => {
      // Logic to update chart based on selected year
    };

    const filterByMonth = (month) => {
      currentMonth.value = month;
      // Logic to filter chart data by month
    };

    const hiddenChart = (month) => {
      currentMonth.value = null;
      // Logic to hide chart data by month
    };

    return {
      selectedYear,
      years,
      months,
      currentMonth,
      updateChart,
      filterByMonth,
      hiddenChart,
    };
  },
};
</script>

<style scoped>
.contentss-wrap {
  flex: 1;
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
}

.container {
  text-align: center;
  font-family: Arial, sans-serif;
}

.chart-container {
  margin: 20px;
}

.chart-placeholder {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
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
</style>
