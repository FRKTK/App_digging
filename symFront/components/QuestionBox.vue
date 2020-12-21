<template>
    <div>
        <div>
            <b-jumbotron header="Questions" lead="" text-align="center">
                <p> {{ currentQuestion.question }}</p>
                <hr class="my-4">
                <b-list-group class="answer-group">
                    <b-list-group-item 
                    v-for="(answer, index) in answers" 
                    :key="index" 
                    @click.prevent="selectAnswer(index)" 
                    :class="[selectedIndex == index ? 'selected' : '']" >{{ answer }}</b-list-group-item>
                </b-list-group>
                <b-button variant="primary" href="#">submit</b-button>
                <b-button variant="success" href="#" @click="next">next</b-button>
            </b-jumbotron>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            currentQuestion: Object,
            next: Function
        },
        data() {
            return {
                selectedIndex: null
            }
        },
        computed: {
            answers() {
                let answers = [...this.currentQuestion.incorrect_answers]
                answers.push(this.currentQuestion.correct_answer)
                return answers
            }
        },
        watch: {
            currentQuestion(){
                this.selectedIndex = null
                this.shuffleAnswers()
            }
        },
        methods: {
            selectAnswer(index){
                this.selectedIndex = index
                console.log(index);
            },
            shuffleAnswers(){
                let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
            }
        },
    }
</script>

<style scoped>
div.list-group{
    margin-bottom: 15px;
}
.list-group-item:hover{
    background: #dfdfdf;
    cursor: pointer;
}
.selected{
    background: rgb(132, 255, 163);
    font-weight: bolder;
}
.correct{
    background: greenyellow;
}
.incorrect{
    background: red;
}
</style>