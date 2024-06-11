<template>
    <section class="contents-wrap">
        <div class="con_title-group">
            <div class="con-title">
                <h3>프로필 수정</h3>
            </div>
        </div>
        <div class="basic-group">
            <div class="btn-group">
                <div class="btn-right-group" style="flex-wrap : wrap; justify-content:flex-end; gap: 3px;">
                    <button type="button" class="btn btn-outline">취소</button>
                    <button type="button" class="btn btn-outline">수정</button>
                </div>
            </div>
        </div>
        <div class="basic-group-1">
            <div class="card-item basic">
                <div>
                    <div class="flex-table">
                        <div class="flex-cell grid-1">
                                <div class="flex-table-item">
                                    <div class="item-text width-per-40 m-width-per-30">
                                        <div class="flex-align-self-center">이름</div>
                                    </div>
                                    <div class="item-text width-per-60 m-width-per-70">
                                      <div class="flex-align-self-center">
                                          <input type="text" id="uname" name="uid" maxlength="20" size="15" style="text-align:center;" title="orderFrom"> 
                                      </div>
                                    </div>
                                </div>
                            </div>
                        <div class="flex-cell grid-1">
                                <div class="flex-table-item">
                                    <div class="item-text width-per-40 m-width-per-30">
                                        <div class="flex-align-self-center">아이디</div>
                                    </div>
                                    <div class="item-text width-per-60 m-width-per-70">
                                      <div class="flex-align-self-center">
                                          <input type="text" id="uid" name="uid" maxlength="20" size="15" style="text-align:center;" title="orderFrom"> 
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-cell grid-1">
                                <div class="flex-table-item">
                                    <div class="item-text width-per-40 m-width-per-30">
                                        <div class="flex-align-self-center">비밀번호</div>
                                    </div>
                                    <div class="item-text width-per-60 m-width-per-70">
                                      <div class="flex-align-self-center">
                                          <input type="text" id="pw" name="pw" maxlength="20" size="15" style="text-align:center;" title="orderFrom"> 
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-cell grid-1">
                                <div class="flex-table-item">
                                    <div class="item-text width-per-40 m-width-per-30">
                                        <div class="flex-align-self-center">이메일</div>
                                    </div>
                                    <div class="item-text width-per-60 m-width-per-70">
                                      <div class="flex-align-self-center">
                                          <input type="text" id="email" name="email" maxlength="20" size="15" style="text-align:center;" title="orderFrom"> 
                                      </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>     
    </section>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.basic-group-1{
    background-color: #F0ECCA;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
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
  background-color: #FAFAF5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #F0F0F0;
}

.btn-group .btn-right-group {
    display: inline-flex;
    align-items: center;
    margin-left: auto;
}
.btn-right-group {
    padding-bottom: 7px;
}

.card-item{
    position: relative; 
    box-sizing: border-box; 
    border-radius: 20px; 
    background-color: #fff;
}

.card-item.basic {
    padding:30px; 
    background:#fff; 
    border-radius:20px;
}

.contents-wrap{
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    padding: 80px;
    overflow: hidden;
}

.contents-wrap .card-item.basic {
    margin: 0 -20px;
}

.flex-table {
    position:relative; 
    display:flex; 
    flex-wrap:wrap;
}

.grid-2{
    width: 50%;
}

.grid-1{
    width:100%;
}

.flex-table-item {
    display:flex; 
    min-height:100%;
}

.flex-table-item .item-title {
    display:flex; 
    padding:10px 20px; 
    font-size:20px; 
    line-height:20px; 
    color:#333; 
    background-color:#f3f4f6; 
    box-sizing:border-box; 
    word-break: keep-all;
}

.item-title-bold {
  display:flex; 
  padding:10px 20px; 
  font-size:20px; 
  font-weight: bold;
  line-height:20px; 
  color:#333; 
  background-color:#f3f4f6; 
  box-sizing:border-box; 
  word-break: keep-all;
}

.item-text {
  display:flex; 
  padding:10px 20px; 
  font-size:20px; 
  line-height:20px; 
  color:#333; 
  box-sizing:border-box; 
  word-break: keep-all;
}

.item-text-bold {
  display:flex; 
  padding:10px 20px; 
  font-size:20px; 
  font-weight: 700;
  line-height:20px; 
  color:#333; 
  box-sizing:border-box; 
  word-break: keep-all;
}

.flex-table-item .item-data {
    display:flex; 
    padding:10px 20px; 
    font-size:20px; 
    line-height:20px; 
    color:#888; 
    background-color:#fff; 
    box-sizing:border-box;
}

.width-per-20{
    width: 20%;
}

.width-per-80{
    width: 80%;
}

.width-per-40{
    width: 40%;
}

.width-per-60{
    width: 60%;
}
</style>