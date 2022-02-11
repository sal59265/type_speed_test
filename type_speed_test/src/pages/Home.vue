<template>
  <div class="main">
      <div class="container">
      <div class="quote">
        <span v-for="(character,index) in quote"
        :key="index" :ref="`this${index}`">{{character? character: ' '}}</span>
      </div>
    <textarea class="text"
    autofocus
    ref="text"
    @input="handleChange"
    value= this.text
    :v-bind="text"
    placeholder="Type here"
    name="text"
    type="text"
    ></textarea>
    <div class="wrapper">
      <div class="stat">
        <div> time left: {{this.time}} </div>
        <div> Error: {{this.error}}</div>
        <div>Accuracy: {{this.accuracy}} </div>
        <div>wpm: {{this.wpm}}</div>
    <button class="restart" @click="restart()" >restart</button>
      </div>
    </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
const QUOTE_API = 'http://api.quotable.io/random?minLength=200&maxLength=300'
export default {
  name: 'Home',
  data: () => ({
    quote: [],
    text:'',
    time: 30,
    error: 0,
    index: 0,
    start: false,
    wpm: 0,
    timer: null,
    accuracy: 0,
    typing: true
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
    handleChange(e) {
      if (e.data === this.quote[0] && this.start === false && this.typing === true) {
        this.start = true
        this.timer = setInterval(() => {
          this.time--
          if (this.time === 0) {
            clearInterval(this.timer)
            this.typing = false
          }
          },1000)
      }
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
    this.error = document.getElementsByClassName('error').length - 1
    this.wpm = Math.round(((document.getElementsByClassName('correct').length - this.error) /5) / (60 - (60 - this.time)) * 60)
    this.wpm = this.wpm < 0 || !this.wpm || this.wpm === Infinity? 0 : this.wpm;
    this.accuracy = Math.round((document.getElementsByClassName('correct').length - this.error/ (document.getElementsByClassName('correct').length)))
    this.accuracy = this.accuracy < 0 || !this.accuracy || this.accuracy === Infinity? 0: this.accuracy
    },
    restart() {
      // for (let i = 0; i < this.index; i++) {
      //   this.$refs[`this${i}`][0].classList.remove("correct")
      //   this.$refs[`this${i}`][0].classList.remove("incorrect")
      //   this.$refs[`this${i}`][0].classList.remove("error")
      //   }
      // this.$refs["text"].value = ''
      // this.time = 30;
      // this.erorr = 0
      // this.text = ''
      // this.index = 0
      // this.start = false
      // this.wpm = 0
      // this.timer = null
      // this.accuracy = 0
      // this.typing = true
      // this.getRandomQuote()
      location.reload()
    }
  }
}
</script>
<style>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: white;
  }
  .text {
    /* opacity: 0; */
  }

  .container {
    width: 770px;
    padding: 35px;
    border-radius: 10px;
    /* background: brown; */
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