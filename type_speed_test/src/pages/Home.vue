<template>
  <div>
      <div class="container">
        <div class="stat">
          <div class="timer">Time: 0</div>
          <div> {{this.index}} </div>
          <div class="error"> Error: {{this.error}}</div>
        </div>
    <div class="quote">
      <span v-for="(character,index) in quote"
      :key="index" :ref="`this${index}`">{{character? character: ' '}}</span>
    </div>
    <textarea class="text"
    autofocus
    @input="handleChange"
    value= this.text
    :v-bind="text"
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
    text:'',
    quoteSpan: '',
    timer: "",
    time: 60,
    error: 0,
    index: 0
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
    handleChange(e) {
      console.log(e)
      if (e.data === null) {
        this.index -= 1
      } else {
        this.index += 1
      }
      this.text = e.target.value
      this.text = this.text.split('')
      for (let i=0; i < this.text.length; i++) {
        if (this.text[i] !== this.quote[i]) {
        this.$refs[`this${i}`][0].classList.add("incorrect")
        this.$refs[`this${i}`][0].classList.add("error")
        this.$refs[`this${i}`][0].classList.remove("correct")
      } else {
        this.$refs[`this${i}`][0].classList.remove("incorrect")
        this.$refs[`this${i}`][0].classList.add("correct")
      }
    }
    if (e.data === null ) {
          this.$refs[`this${this.index}`][0].classList.remove("incorrect") 
          this.$refs[`this${this.index}`][0].classList.remove("correct")
      }
      console.log(document.getElementsByClassName('error'))
    this.error = document.getElementsByClassName('error').length - 1
    }
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
  .correct {
    color: green;
  }
  .incorrect {
    color: red;
    text-decoration: underline;
  }
</style>