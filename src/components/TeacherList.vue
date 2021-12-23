<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>已确定的附中老师/总老师数： {{fzTeacherCount}}/{{totalTeacherCount}}</div>
    <table class="gridtable"> 
        <tr> 
            <th v-for="item in myHeaders" :key="item">{{item}}</th> 
        </tr>
		
		<tr v-for="teacher in teacherList" :key="teacher.id">
			<!--td  v-for="item in teacher" :key="item">{{teacher[item]}}</td-->
            <td>{{teacher.id}}</td>
            <td>{{teacher.name}}</td>
            <td>{{teacher.birthYear}}</td>
            <td>{{teacher.age}}</td>
            <td><a :href="teacher.pageURL" target="_blank">{{teacher.pageURL}} </a></td>
            <td>{{teacher.infoFrom}}</td>
            <td>{{teacher.isDetermined}}</td>
            <td>{{teacher.updateTime}}</td>
            <td>
                <input type="button" value="是" @click="updateDetermined(teacher.id, true)"/> 
                <input type="button" value="不是" @click="updateDetermined(teacher.id, false)"/>
            </td>
		<tr/>
       
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from "axios"
import {ITeacher} from "@/interface/ITeacher"
import {EnvHost, Constant} from "../const/constant"
@Component
export default class TeacherList extends Vue {
  @Prop() private msg!: string;
    private myHeaders:string[] = ["id","姓名", "出生年", "年龄", "页面地址",  "信息来源", "是否已确定", "更新时间", "操作"];
    private teacherList:ITeacher[] = []
    private fzTeacherCount:number = 0;
    private totalTeacherCount:number = 0;
    private mounted() {      
      this.getTeacherList()       
    }
    // 获取老师列表
    private async getTeacherList() {
        const listUrl = EnvHost + Constant.TeacherList;
        const rst:any = await axios.get(listUrl)
        this.teacherList = rst.data.data;
        this.totalTeacherCount = this.teacherList.length;
        this.fzTeacherCount = this.getFZTeachers().length;
        console.log(`getTeacherList :: len = `,rst.data.data.length)
    }
    /**
     * 获取已经明确是央院老师的列表
     */
    private getFZTeachers(): ITeacher[] {
        const rst: ITeacher[] = [];
        for(let i=0;i<this.teacherList.length; i++){
            const teacher = this.teacherList[i]
            if(teacher.isDetermined === true){
                rst.push(teacher)
            }
        }
        return rst;
    }
    /**
     * 更新是否是央院附中老师的状态
     */
    private async updateDetermined(id:string, status:boolean) {
        console.log(`updateDetermined :: enter, id = ${id}, status = ${status}`)
        for(let i=0;i<this.teacherList.length; i++){
            const teacher = this.teacherList[i]
            if(id === teacher.id){
                const newTeacher = {...teacher, isDetermined:status}
                const rst = await axios.post(
                    EnvHost + Constant.UpdateTeacher,
                    newTeacher,
                )
                const updatedTeacher = rst.data.data;
                console.log(`updateDetermined :: update success, updatedTeacher = `, updatedTeacher)
                this.$set(this.teacherList, i, updatedTeacher)
                // 因为$set是异步的，所以搞个延时
                setTimeout(()=>{
                    this.fzTeacherCount = this.getFZTeachers().length;
                },200)
                break
            }
        }
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983

input[type=button]
  margin-right: 6px

table.gridtable  
  font-family: verdana,arial,sans-serif; font-size:11px; color:#333333; border-width: 1px; border-color: #666666; border-collapse: collapse;

table.gridtable th 
  border-width: 1px; padding: 8px; border-style: solid; border-color: #666666; background-color: #dedede; 

table.gridtable td 
  border-width: 1px; padding: 8px; border-style: solid; border-color: #666666; background-color: #ffffff;

</style>
