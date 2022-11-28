<template>
  <div class="score-board">
    <h1>Scores</h1>
    <table>
      <tr>
        <td>1</td>
        <td>Victor</td>
        <td>50 seg</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Victor1</td>
        <td>54 seg</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Victor2</td>
        <td>55 seg</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'score-bar',

  setup() {

    return {

    }
  }

}
</script>

<style scoped>
.score-board {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

h1 {
  font-family: monster;
  color: #FFA501;
  letter-spacing: 10px;
  padding-bottom: 10px;
  border-bottom: 3px solid #FFA501;
}
</style>