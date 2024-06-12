<template>
  <section class="content-wrap">
    <div class="containerhome">
      <div class="speech-bubble">
        <h2>Hello! 말하는 감자,</h2>
      </div>
      <div class="month">
        <h2>{{ currentMonth }}월</h2>
        <button
          @click="viewDetails(transaction)"
          type="button"
          class="btn btn-outline"
          id="btn1"
          style="display: inline-block"
        >
          더보기
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
      <div class="recent-transactions">
        <div class="header-container">
          <h3 class="title">최근 내역</h3>
          <button
            @click="viewDetails(transaction)"
            type="button"
            class="btn btn-outline"
            id="btn1"
          >
            더보기
          </button>
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
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>
                <button
                  @click="viewDetails(transaction)"
                  type="button"
                  class="btn btn-outline"
                  id="btn2"
                >
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
export default {
  data() {
    return {
      currentMonth: this.getCurrentMonth(),
      transactions: [
        { id: 1, date: "2024.06.10", type: "수입", amount: "1,835원" },
        { id: 2, date: "2024.06.10", type: "지출", amount: "11,835원" },
        { id: 3, date: "2024.06.10", type: "수입", amount: "30,835원" },
      ],
    };
  },
  methods: {
    viewDetails(transaction) {
      alert(`Viewing details for transaction ID: ${transaction.id}`);
    },
    getCurrentMonth() {
      const date = new Date();
      const month = date.getMonth() + 1;
      return month;
    },
  },
};
</script>
<style>
.content-wrap {
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
  border: 10px solid transparent; /* 삼각형 크기 */
  border-bottom-color: #f0ecca; /* 삼각형 색상 */
  border-right-color: #f0ecca; /* 삼각형 색상 */
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
