<template>
    <div class="main">
        <br /><br />
        <h3>수입 / 지출 전체 조회</h3>
        <div class="search_div">
            <li>
                <table>
                    <tr>
                        <th>
                            시작날짜 : <input type="date">
                        </th>
                        <th>
                            종료날짜 : <input type="date">
                        </th>
                    </tr>
                </table>
            </li>
            <li>
                <table>
                    <tr>
                        <th>
                            분   류 : <select name="group1" id="group1" onchange="categoryChange(this)">
                                <option>수입/지출 선택해주세요.</option>
                                <option value="spend">수입</option>
                                <option value="income">지출</option>
                            </select>
                        </th>
                        <th>
                            카테고리 :  <select name="group2" id="group2">
                                <option>세부 카테고리를 선택해주세요.</option>
                            </select>
                        </th>
                    </tr>
                </table>
            </li>
            <li>
                <table>
                    <tr>
                        <th class="search_th" colspan="2">
                            <button type="button" class="search_btn">조회</button>
                        </th>
                    </tr>
                </table>
            </li>
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

function categoryChange(e) {
	var group2_spend = ["쇼핑", "식비", "교통비", "생활비", "문화생활", "기타"];
    var group2_income = ["급여", "용돈", "기타"];
	var target = document.getElementById("group2");

	if(e.value == "spend") var d =  group2_spend;
	else if(e.value == "income") var d = group2_income;

	target.options.length = 0;

	for (x in d) {
		var opt = document.createElement("option");
		opt.value = d[x];
		opt.innerHTML = d[x];
		target.appendChild(opt);
	}	
}
</script>

<style scoped>
    .search_th {
        text-align: center;
        width: 1000px;
    }
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
</style>