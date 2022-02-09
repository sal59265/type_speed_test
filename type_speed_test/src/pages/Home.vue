<template>
  <div>
      <div class="container">
        <div class="stat">
          <div class="timer">Time: 0</div>
          <div class="error">Error: 0</div>
        </div>
    <div class="quote">
      <span v-for="(character,index) in quote"
      :key="index">{{character? character: ' '}}</span>
    </div>
    <textarea class="text"
    autofocus
    v-model="text"
    placeholder="Type here"
    name="text"
    type="text"
    ></textarea>
    <div>{{this.text}}</div>
    <button class="start" @click="startType()">start</button>
    <button class="restart">restart</button>
<!-- if test is finished render result -->
    <div>result</div>
    <div class="wrapper">
      <div>Accuracy: </div>
      <div>WPM: </div>
    </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
const QUOTE_API = 'http://api.quotable.io/random?minLength=100&maxLength=140'
export default {
  name: 'Home',
  data: () => ({
    quote: [],
    text:[],
    quoteSpan: '',
    timer: "",
    time: 60,
    error: 0,
  }),
  mounted() {
    this.getRandomQuote()
  },
  methods: {
    async getRandomQuote() {
      const res = await axios.get(QUOTE_API)
      this.quote = res.data.content
      this.quote = this.quote.split('')
    },
    startType() {
      this.error = 0;
      this.timer= "";
    },
  }
}
</script>
<style>
  .container {
    width: 80vmin;
    padding: 50px 30px;
    background-color: black;
  }
  
  .stat {
    text-align: right;
  }

  input {
    resize: none;
    width: 100%;
    border-radius: 5px;
    
  }

  button {
    float: right;
    border: none;
    margin: 10px;
    border-radius: 5px;
  }
</style>