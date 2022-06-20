<template>
  <nav-bar-coach/>

  <div class="container">
    <br><br>

    <pv-card v-for="tournament of tournaments" style="width: 395px">
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
        Road to Major
      </template>
      <template #subtitle>
        Cyber: G2-House
      </template>
      <template #content>
        <h4 style="font-type: bold">{{tournament.title}}</h4>
        <h4>Schedule: {{tournament.schedule}}</h4>
        <h4>Chanel: {{tournament.chanel}}</h4>
        <h4>Media: {{tournament.media}}</h4>
      </template>
      <template #footer>
        <pv-button @click="cancelTournament(tournament.id)">Cancel</pv-button>
      </template>

    </pv-card>

    <pv-dialog
        v-model:visible="tournamentDialog"
        :style="{ width: '500px'}"
        header="Tournaments Information"
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
              v-model="tournament.chanel"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="tournamentChanel">Channel</label>
          <small class="p-error" v-if="submitted && !tournament.channel"
          >Channel is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              id="multiple"
              v-model="tournament.media"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="tournamentMedia">Media</label>
          <small class="p-error" v-if="submitted && !tournament.media"
          >Media is required</small>
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
import TournamentsService from "../services/tournaments.service";
export default {
  name: "coach-tournament",
  data() {
    return  {
      tournaments: [],
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
      TournamentsService.getAll().then((response)=>{
      this.tournaments=response.data;
    });
    },
    getStorableAdvisory(advisory){
      return {
        id: advisory.id,
        title: advisory.title,
        schedule:advisory.schedule,
        chanel: advisory.chanel,
        media: advisory.media
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
      TournamentsService.delete(id).then((response)=>{
        this.retrieveTournaments();
      })
    }

  }
};

</script>

<style >
.p-button-lg{
  background-color: #C4C4C4;
  display: block;
  width: 40%;
  height: 100px;
  border: none;
  padding: 200px 200px;
  font-size: 50px;
  cursor: pointer;
  text-align: center;
  margin:auto;
}
.p-card{
  box-shadow: 0 4px 20px 20px rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 70%;
  padding-left: 20px;
  margin:auto;
}




</style>