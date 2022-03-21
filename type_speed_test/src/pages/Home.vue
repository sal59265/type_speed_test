<template>
  <div class="main">
      <div class="container" v-if="form">
        <div v-if="randomQuote">
          <div class="quote">
            <span v-for="(character,index) in quote"
            :key="index" :ref="`this${index}`">{{character? character: ' '}}</span>
          </div>
        </div>
        <div v-else>
          <div class="quote">
            <span v-for="(character,index) in dataQuote"
            :key="index" :ref="`this${index}`">{{character? character: ' '}}</span>
          </div>
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
    <button class="dataQuote" @click="getDataQuote()" >Data</button>
    <button class="getQuote" @click="getRandomQuote()">Quote</button>
      </div>
    </div>
      </div>
      <div class="form" v-else>
        <div>
    <form v-on:submit.prevent="handleSubmit">
      <input
      @input="handleFormChange($event)"
      placeholder="name"
      :value="name"
      name="name"
      type="name"
      />
      <input
      @input="handleFormChange($event)"
      placeholder="password"
      :value="password"
      name="password"
      type="password"
      />
          </form>
      <button @click="togglePage()">Submit</button>
  </div>
      </div>
  </div>
</template>

<script>
const BASE_URL = "https://rapid-type-test.herokuapp.com"
import axios from 'axios'
const QUOTE_API = 'https://api.quotable.io/random?minLength=200&maxLength=300'
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
    typing: true,
    form: false,
    name: '',
    password: '',
    email: '',
    dataQuote: '',
    scriptId: '',
    randomQuote: true
  }),
  mounted() {
    this.getRandomQuote()
  },
  methods: {
    togglePage() {
      this.form = !this.form
    },
    handleFormChange(name, value) {
      this[name] = value
    },
    handleSubmit() {
      this.createUser()
    },
    async createUser() {
      await axios.post(`${BASE_URL}/users/`, {
        name: this.name,
        password: this.password
      })
        this.form = false
      window.location.reload()
    },
    async getDataQuote(){
      this.scriptId = Math.floor(Math.random() * 3 + 1)
      const res = await axios.get(`${BASE_URL}/scripts/${this.scriptId}`)
      this.dataQuote = res.data.script.codeScript
      this.dataQuote = this.dataQuote.split('')
      this.randomQuote = false
      for (let i = 0; i < this.index; i++) {
        this.$refs[`this${i}`][0].classList.remove("correct")
        this.$refs[`this${i}`][0].classList.remove("incorrect")
        this.$refs[`this${i}`][0].classList.remove("error")
        }
      this.$refs["text"].value = ''
      this.time = 30;
      this.erorr = 0
      this.text = ''
      this.index = 0
      this.start = false
      this.wpm = 0
      this.timer = clearInterval(this.timer)
      this.accuracy = 0
      this.typing = true
      let text = document.querySelector("textarea");
      text.removeAttribute("disabled", "");
      text.focus()
    },

    async getRandomQuote() {
      const res = await axios.get(QUOTE_API)
      this.quote = res.data.content
      this.randomQuote = true
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
    this.error = document.getElementsByClassName('error').length
    this.wpm = Math.round(((document.getElementsByClassName('correct').length - this.error) /5) / (60 - this.time) * 120)
    this.wpm = this.wpm < 0 || !this.wpm || this.wpm === Infinity? 0 : this.wpm;
    this.accuracy = Math.round(((document.getElementsByClassName('correct').length - this.error)/ (document.getElementsByClassName('correct').length)) * 100)
    this.accuracy = this.accuracy < 0 || !this.accuracy || this.accuracy === Infinity? 0: this.accuracy
    if (this.time === 0) {
      let text = document.querySelector("textarea");
      text.setAttribute("disabled", "");
      alert("Time is up!")
    }
    },
    restart() {
      for (let i = 0; i < this.index; i++) {
        this.$refs[`this${i}`][0].classList.remove("correct")
        this.$refs[`this${i}`][0].classList.remove("incorrect")
        this.$refs[`this${i}`][0].classList.remove("error")
        }
      this.$refs["text"].value = ''
      this.time = 30;
      this.erorr = 0
      this.text = ''
      this.index = 0
      this.start = false
      this.wpm = 0
      this.timer = clearInterval(this.timer)
      this.accuracy = 0
      this.typing = true
      this.getRandomQuote()
      let text = document.querySelector("textarea");
      text.focus()
    }
  }
}
</script>
<style>
  span {
    font-size: 50px;
  }
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 85vh;
    background: rgba(18, 10, 19, 0.37);
    color: rgb(219, 219, 219);
    margin: 0;
    color: #777;
  }
  .text {
    opacity: 0;
  }
  .container {
    width: 770px;
    padding: 35px;
    border-radius: 10px;
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