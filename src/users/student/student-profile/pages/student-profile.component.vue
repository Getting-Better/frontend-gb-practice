<template>

  <div>
    <nav-bar-student/>

    <pv-divider></pv-divider>
    <pv-card class="p-card">
      <template #header>
        <pv-image
            class="pv-image-holder"
            imageClass="pv-image-circle"
            src="https://www.infobae.com/new-resizer/MNHmV03_B5YfGxHUoWdlomoS2JQ=/992x558/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/08/09153344/Oxaciano.jpg"
            alt="Image Coach"
            width="275"
            height="275"
            preview
        />


      </template>



      <template #content>
        <i class="pi pi-user"></i>
        <p class="pv-p">Nickname:</p>
        <pv-input-text  v-model="student.nickname"/>
        <pv-divider></pv-divider>

        <i class="pi pi-user"></i>
        <p class="pv-p">First Name:</p>
        <pv-input-text   v-model="student.name"/>
        <pv-divider></pv-divider>

        <i class="pi pi-user"></i>
        <p class="pv-p">Last Name:</p>
        <pv-input-text  v-model="student.lastname"/>
        <pv-divider></pv-divider>
        
        <i class="pi pi-briefcase"></i>
        <p class="pv-p">Bibliography:</p>
        <pv-input-text  v-model="student.bibliography"/>
        <pv-divider></pv-divider>

        <pv-button label="Update Profile" @click="update"/>
      </template>

    </pv-card>

  </div>
</template>

<script>
import CoachesService from '../../services/coaches.service.js'

export default {
  name: "student-profile",
  data() {
    return {
      profiles: [],
      studentDialog: false,
      submitted: false,
      coachService: null,
      students: [],
      student:{},
      coachId: 1,
    };
  },

  mounted() {
    CoachesService.getAll().then((response)=>{
      this.students=response.data.map(this.getStorableCoach);
      this.student=this.students.find(x=>(x.id==this.coachId));
      console.log(this.student);
    });
    /*
    this.coachService = new coachProfileService();
    this.coachService.getAll().then((response) => {
      this.profiles = response.data;
      this.coach = response.data;

      console.log(this.profiles);
    });*/

  },
  methods: {
    update(){
      CoachesService.update(this.coachId,this.student).then((response)=>{
        //Agregar Notificacion
      })
    },
    getStorableCoach(coach) {
      return {
        id: coach.id,
        nickname: coach.nickname,
        name: coach.name,
        lastname: coach.lastname,
        role: coach.role,
        heroes: coach.heroes,
        tournaments: coach.tournaments,
        bibliography: coach.bibliography,
      };
    },
    findIndexById(id) {
      return this.profiles.findIndex((coach) => coach.id === id);
    },
    editCoachProfile(coach) {
      this.student = { ...coach };
      this.studentDialog = true;
    },
    saveCoachProfile() {
      this.submitted = true;
      this.student = this.getStorableCoach(this.student);
      this.coachService.update(this.student.id, this.student).then((response) => {
        this.profiles[this.findIndexById(response.data.id)] =
            this.response.data;
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Coach Profile Updated",
          life: 3000,
        });
        console.log(response);
      });
      this.studentDialog = false;
      this.student = {};
    },
  },
};
</script>

<style>

.pv-image-circle{
  border-radius: 30%;
  margin-left: auto;

}

.pv-p{
  font-family: Roboto;
  font-size: x-large;
  size: 100px;
  font-weight: bold;
}
.p-card{
  box-shadow: 0 4px 20px 20px rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 70%;
  padding-left: 20px;
  padding-top: 20px;
  margin:auto;
  margin-top:20px;
}


</style>