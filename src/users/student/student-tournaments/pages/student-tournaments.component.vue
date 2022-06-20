<template>
  <nav-bar-student/>

  <div class="container">
    <br><br>
    <pv-divider/>

    <pv-card v-for="tournament of tournamentsSelected" style="width: 395px">
      <template #header>
        <pv-image v-bind:src="tournament.urlToImage"
                  size= "xlarge"
                  alt="image tournaments"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  width="275"
                  height="200"
                  preview/>
      </template>
      <template #title>
        {{ tournament.title }}
      </template>
      <template #subtitle>
        {{  tournament.name }}
      </template>
      <template #content>
        <h4>Schedule: {{tournament.schedule}}</h4>
        <h4>Location: {{tournament.location}}</h4>
      </template>
      <template #footer>
        <pv-button @click="cancelTournament(tournament.id)">Cancel</pv-button>
      </template>

    </pv-card>

    <pv-dialog
        v-model:visible="tournamentDialog"
        :style="{ width: '500px'}"
        header="Tournament Information"
        :modal="true"
        class="p-fluid"
    >
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="title"
              v-model.trim="tournament.title"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !tournament.title}"
          />
          <label for="tournamentTitle">Title</label>
          <small class="p-error" v-if="submitted && !tournament.title"
          >Title is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="name"
              v-model.trim="tournament.name"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !tournament.name}"
          />
          <label for="tournamentTitle">Cyber's name</label>
          <small class="p-error" v-if="submitted && !tournament.name"
          >Cyber's name is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="urlToImage"
              v-model="tournament.urlToImage"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="tournamentUrlToImage">Url to Image</label>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="schedule"
              v-model="tournament.schedule"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="tournamentSchedule">Schedule</label>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              id="multiple"
              v-model="tournament.location"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="tournamentChanel">Location</label>
          <small class="p-error" v-if="submitted && !tournament.location"
          >Location is required</small>
        </span>
      </div>


      <template #footer>
        <pv-button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
        />
        <pv-button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveTournament"
        />
      </template>

    </pv-dialog>

    <br><br>
  </div>
</template>

<script>
import TournamentsService from "../../../coach/coach-tournament/services/tournaments.service";
import TournamentStudentsService from "../services/tournament-students.service";
export default {
  name: "student-tournaments",
  data() {
    return  {
      tournaments: [],
      tournamentsSelected: [],
      tournament_students: [],
      id: 1,
      students:[],
      tournament: {},
      coachTournaments:[],
      coachId:1,
      tournamentTitle:'',
      tournamentDate:'',
      tournamentAttacches:'',
      tournamentNew:{},


      coachDialog: false,
      submitted:false,
      tournamentService:null,
      tournamentId:1,
      tournamentDialog:false,
    };
  },
  mounted(){
    this.retrieveTournaments();
  },
  methods:{
    retrieveTournaments(){
      this.tournamentsSelected = [];

      TournamentStudentsService.getByStudentId(this.id).then((response)=>{
        this.tournament_students = response.data;
        TournamentsService.getAll().then((response2)=>{
          this.tournaments = response2.data;
          for(let tournament_student of this.tournament_students){
            this.tournamentsSelected.push(this.tournaments.find(x=>(x.id==tournament_student.tournamentId)));
          }
        })
      });
    },
    getStorableAdvisory(tournament){
      return {
        id: tournament.id,
        name: tournament.name,
        title: tournament.title,
        schedule:tournament.schedule,
        location: tournament.location,
        urlToImage: tournament.urlToImage
      };
    },
    openNew() {
      this.tournament = {};
      this.submitted = false;
      this.tournamentDialog = true;
    },
    hideDialog() {
      this.tournamentDialog = false;
      this.submitted = false;
    },
    saveTournament(){
      this.tournament.id=0;
      TournamentsService.create(this.tournament).then((response)=>{
        this.retrieveTournaments();
        this.hideDialog();
      })
    },
    cancelTournament(id){
      console.log(id);
      TournamentStudentsService.getByTournamentIdAndStudentId(id,this.id).then((response)=>{
        let tournament_student = response.data;
        TournamentStudentsService.delete(tournament_student[0].id).then(()=>{
          this.retrieveTournaments();
        })
      })
    }

  }
};
</script>

<style scoped>

</style>