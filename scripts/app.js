Vue.component("teacher-mode", {
  props: ["visible"],
  template: `<h3 v-if="visible"> Click on a question to answer it</h3>`,
});

Vue.component("question-list", {
  props: ["question"],
  data: function () {
    return {
      reply: "",
      answer: "",
    };
  },
  template: `<li>
<div class="name">
    <p v-on:click="highlight"  >{{question.name}}</p>
</div>
<div class="asked">
    <p v-on:click="highlight" >{{question.text}}</p>
</div>
  <div class="answered">
    <input v-if="question.teacher && question.highlighted" type="text" placeholder="Answer here" v-model="reply" />
    <button v-if="question.teacher && question.highlighted" v-on:click="answerQuestion">Answer</button>
  </div>
  <div class="teacher-replied">
    <p v-if="answer.length">Teacher Response:</p>
  </div>
  <div class="reply">
    <p v-if="answer.length">{{answer}}</p>
  </div>
  </li>`,
  methods: {
    answerQuestion: function () {
      this.answer = this.reply;
      this.reply = "";
    },
    highlight: function () {
      //console.log(this.$props.question.id);
      this.$emit("toggle-highlight", this.$props.question.id);
    },
  },
});

const app = new Vue({
  el: "#app",
  data: {
    title: "ask.Teacher",
    questions: [],
    newQuestion: "",
    name: "",
    answer: "",
    teacher: false,
    highlighted: false,
  },
  methods: {
    addQuestion: function () {
      if (this.newQuestion.length) {
        this.questions.push({
          id: this.questions.length,
          text: this.newQuestion,
          answer: "",
          name: this.name.length ? this.name : "Unknown",
          teacher: this.teacher,
          highlighted: this.highlighted,
        });
      }
      this.newQuestion = "";
    },
    toggleTeacherMode: function () {
      this.teacher = !this.teacher;
      this.questions.forEach((question) => {
        question.teacher = this.teacher;
        question.highlighted = false;
      });
    },
    toggle: function (id) {
      this.questions.forEach((question, index) => {
        if (index === id) {
          question.highlighted = !question.highlighted;
        } else question.highlighted = false;
      });
    },
  },
});
