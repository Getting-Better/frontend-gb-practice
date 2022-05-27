<template>
  <dv class="dv-color">
    <pv-card style="width: 50rem; margin-bottom: 2em" v-for="student of studentsCoach">
        <template #title v-if="student">
            {{student.name}}
        </template>
        <template #content v-if="student">
            {{student.lastname}}
            {{student.heroes}}
        </template>
    </pv-card>
  </dv>
</template>

<script>

import StudentsService from '../../../student/services/students.service.js'
import CoachesService from '../../../coach/services/coaches.service.js'

export default {
    name: "students",
    data: () => ({

      id:1,
      students: [],
      studentsCoach: [],
      coaches: [],
    }),
    mounted() {
      this.retrieveStudents();
    }, 
    methods:{
      
      retrieveStudents(){
        
        StudentsService.getAll().then((response)=>{
          this.students=response.data.map(this.getDisplayTutorial);
        })
        CoachesService.getAll().then((response)=>{
          this.coaches=response.data.map(this.getDisplayTutorial);
          console.log(this.coaches);
          for(let studentId of this.coaches.find(x=>(x.id==this.id)).studentsId){
            console.log(studentId);
            this.studentsCoach.push(this.students.find(x=>(x.id==studentId)));
            /*StudentsService.getById(studentId).then((response2)=>{
              this.students.push(response2.data.map(this.getDisplayTutorial));
            })*/
          }
        })
        

      },
      getDisplayTutorial(tutorial) {
          return {
            id:tutorial.id,
            nickname:tutorial.nickname,
            name:tutorial.name,
            lastname:tutorial.lastname,
            role:tutorial.role,
            heroes:tutorial.heroes,
            tournaments:tutorial.tournaments,
            bibliography:tutorial.bibliography,
            studentsId:tutorial.studentsId
          };
        
      }
      
    }
}
</script>