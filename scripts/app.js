Vue.component("question-list", {
  props: ["question"],
  data: function () {
    return {
      reply: "",
      answer: "",
    };
  },
  template: `<li>
  <p>{{question.text}}</p>
  <input v-if="question.teacher" type="text" placeholder="Answer here" v-model="reply" />
  <button v-if="question.teacher" v-on:click="answerQuestion">Answer</button>
  <p v-if="answer.length">{{answer}}</p>
  </li>`,
  methods: {
    answerQuestion: function () {
      this.answer = this.reply;
      this.reply = "";
    },
  },
});

const app = new Vue({
  el: "#app",
  data: {
    title: "The Vue From You",
    questions: [],
    newQuestion: "",
    answer: "",
    inputValue: "Ask your question here",
    teacher: false,
  },
  methods: {
    addQuestion: function () {
      if (this.newQuestion.length) {
        this.questions.push({
          id: this.questions.length,
          text: this.newQuestion,
          answer: "",
          teacher: this.teacher,
        });
      }
      this.newQuestion = "";
    },
    toggleTeacherMode: function () {
      this.teacher = !this.teacher;
      this.questions.forEach((question) => {
        question.teacher = this.teacher;
      });
    },
  },
});
