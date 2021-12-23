<template>
  <div class="home">
    <TeacherList msg="央院附中老师信息确认页"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import TeacherList from '@/components/TeacherList.vue';
@Component({
  components: {
    TeacherList,
  },
})
export default class Home extends Vue {}
</script>
