<template>
  <section class="contents-wrap">
    <div class="con_title-group">
      <div class="con-title">
        <h3>프로필 수정</h3>
      </div>
    </div>
    <div class="basic-group">
      <div class="btn-group">
        <div
          class="btn-right-group"
          style="flex-wrap: wrap; justify-content: flex-end; gap: 3px"
        >
          <button type="button" @click="cancelEdit" class="btn btn-outline">
            취소
          </button>
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
                <div class="item-text">
                  <div class="flex-align-self-center">이름</div>
                </div>
                <div class="item-input">
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    maxlength="20"
                    size="15"
                    style="text-align: center"
                    value="말하는 감자"
                  />
                </div>
              </div>
            </div>
            <div class="flex-cell grid-1">
              <div class="flex-table-item">
                <div class="item-text">
                  <div class="flex-align-self-center">아이디</div>
                </div>
                <div class="item-input">
                  <input
                    type="text"
                    class="form-control"
                    id="id"
                    name="id"
                    maxlength="20"
                    size="15"
                    style="text-align: center"
                    value="TalkingPotato"
                  />
                </div>
              </div>
            </div>
            <div class="flex-cell grid-1">
              <div class="flex-table-item">
                <div class="item-text">
                  <div class="flex-align-self-center">비밀번호</div>
                </div>
                <div class="item-input">
                  <input
                    type="password"
                    class="form-control"
                    id="pw"
                    name="pw"
                    maxlength="20"
                    size="15"
                    style="text-align: center"
                    value="1234"
                  />
                </div>
              </div>
            </div>
            <div class="flex-cell grid-1">
              <div class="flex-table-item">
                <div class="item-text">
                  <div class="flex-align-self-center">이메일</div>
                </div>
                <div class="item-input">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    maxlength="20"
                    size="15"
                    style="text-align: center"
                    value="https://github.com/TalkingPotato"
                  />
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
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const cancelEdit = () => {
      router.push({ name: "Home" });
    };

    return { cancelEdit };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

.basic-group-1 {
  font-family: 'Jua', sans-serif;
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
  background-color: #fafaf5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #f0f0f0;
}

.btn-group .btn-right-group {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
}

.btn-right-group {
  padding-bottom: 7px;
}

.card-item {
  position: relative;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: #fff;
}

.card-item.basic {
  padding: 50px;
  background: #fff;
  border-radius: 20px;
}

.contents-wrap {
  font-family: 'Jua', sans-serif;
  flex: 1;
  width: 100vw;
  box-sizing: border-box;
  padding: 80px;
  overflow: hidden;
}

.contents-wrap .card-item.basic {
  margin: 0 -20px;
}

.flex-table {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.grid-1 {
  width: 100%;
}

.flex-table-item {
  display: flex;
  min-height: 100%;
}

.flex-table-item .item-title {
  display: flex;
  padding: 10px 20px;
  font-size: 20px;
  line-height: 20px;
  color: #333;
  background-color: #f3f4f6;
  box-sizing: border-box;
  word-break: keep-all;
}

.item-title-bold {
  display: flex;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  color: #333;
  background-color: #f3f4f6;
  box-sizing: border-box;
  word-break: keep-all;
}

.item-text {
  display: flex;
  justify-content: center;
  padding: 10px 40px;
  font-size: 20px;
  line-height: 20px;
  color: #333;
  box-sizing: border-box;
  word-break: keep-all;
}

.item-text-bold {
  display: flex;
  padding: 10px 40px;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  color: #333;
  box-sizing: border-box;
  word-break: keep-all;
}

.flex-table-item .item-data {
  display: flex;
  padding: 10px 20px;
  font-size: 20px;
  line-height: 20px;
  color: #888;
  background-color: #fff;
  box-sizing: border-box;
}

.width-per-20 {
  width: 20%;
}

.width-per-80 {
  width: 80%;
}

.width-per-40 {
  width: 40%;
}

.width-per-60 {
  width: 60%;
}

.flex-table {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.flex-cell {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.flex-table-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.item-text {
  width: 40%;
}

.item-input {
  width: 50%;
  padding-right: 200px;
}
</style>