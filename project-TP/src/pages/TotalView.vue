<template>
    <div class="main">
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
                      v-model="formData.type"
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
                <button type="button" class="search_btn">조회</button>
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
                        <tr>
                            <th class="th_width">날짜</th>
                            <th class="th_width">분류</th>
                            <th class="th_const">금액</th>
                            <th class="th_width"></th>
                        </tr>
                        <tr>
                            <td>
                                24.06.10
                            </td>
                            <td>
                                수입
                            </td>
                            <td>
                                1,835원
                            </td>
                            <td>
                                <button
                                    @click="viewDetails(transaction)"
                                    type="button"
                                    class="btn btn-outline"
                                >
                                    상세보기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                24.06.10
                            </td>
                            <td>
                                지출
                            </td>
                            <td>
                                11,835원
                            </td>
                            <td>
                                <button
                                    @click="viewDetails(transaction)"
                                    type="button"
                                    class="btn btn-outline"
                                >
                                    상세보기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                24.06.10
                            </td>
                            <td>
                                수입
                            </td>
                            <td>
                                30,835원
                            </td>
                            <td>
                                <button
                                    @click="viewDetails(transaction)"
                                    type="button"
                                    class="btn btn-outline"
                                >
                                    상세보기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                24.06.10
                            </td>
                            <td>
                                수입
                            </td>
                            <td>
                                30,835원
                            </td>
                            <td>
                                <button
                                    @click="viewDetails(transaction)"
                                    type="button"
                                    class="btn btn-outline"
                                >
                                    상세보기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                24.06.10
                            </td>
                            <td>
                                수입
                            </td>
                            <td>
                                30,835원
                            </td>
                            <td>
                                <button
                                    @click="viewDetails(transaction)"
                                    type="button"
                                    class="btn btn-outline"
                                >
                                    상세보기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                24.06.10
                            </td>
                            <td>
                                수입
                            </td>
                            <td>
                                30,835원
                            </td>
                            <td>
                                <button
                                    @click="viewDetails(transaction)"
                                    type="button"
                                    class="btn btn-outline"
                                >
                                    상세보기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                24.06.10
                            </td>
                            <td>
                                수입
                            </td>
                            <td>
                                30,835원
                            </td>
                            <td>
                                <button
                                    @click="viewDetails(transaction)"
                                    type="button"
                                    class="btn btn-outline"
                                >
                                    상세보기
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                24.06.10
                            </td>
                            <td>
                                수입
                            </td>
                            <td>
                                30,835원
                            </td>
                            <td>
                                <button
                                    @click="viewDetails(transaction)"
                                    type="button"
                                    class="btn btn-outline"
                                >
                                    상세보기
                                </button>
                            </td>
                        </tr>
                    </table>           
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      formData: {
        date: "",
        amount: "",
        type: "spend",
        category: "",
        memo: "",
      },
      incomeCategories: ["급여", "용돈", "기타"],
      spendCategories: ["쇼핑", "식비", "교통비", "생활비", "문화생활", "기타"],
      categoryOptions: [],
    };
  },
  methods: {
    updateCategories() {
      if (this.formData.type === "income") {
        this.categoryOptions = this.incomeCategories;
      } else {
        this.categoryOptions = this.spendCategories;
      }
    },
  },
  mounted() {
    this.updateCategories();
  },
};

</script>

<style scoped>
    .list_size {
        height: 40px;
        margin : 0px;
        background-color: #F0ECCA;
        padding: 0px;
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
        text-align: center; 
        padding: 20px;
    }
    .main {
        width: 100%;
        margin-left: 10%;
        margin-right: 10%;
    }
    .search_div {
        padding-top: 20px;
        text-align : center;
        background-color: #F0ECCA;
        width: auto;
        height: 250px;
    }
    .th_width {
        border: 1px solid black;
        width: 300px;
        height: 40px;
        padding: 0px;
    }

    .th_const {
        border: 1px solid black;
        width: 420px;
        height: 40px;
        padding: 0px;
    }

    td {
        text-align: center;
        border: 1px solid black;
        padding: 0px;
        height: 40px;
    }

    .btn {
        padding: 1px;
        color: black;
        border-radius: 30px;
        cursor: pointer;
        text-align: center;
        width: 80px;
        background-color: #FAFAF5;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .tab {
        height: 200px;
        overflow-y : auto;
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
    margin-right : 80px
}

.flex-cell {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.flex-table-item {
  display: flex;
  min-height: 100%;
}

.item-input {
  width: 60%;
}
</style>