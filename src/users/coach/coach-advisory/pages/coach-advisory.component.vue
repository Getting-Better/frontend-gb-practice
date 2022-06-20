<template>
  <nav-bar-coach/>
  <div class="container">
    <br>
    <h1 style="text-align: center;color: white"> ADVISORIES</h1>
    <br>
    <pv-button
        class="p-button-lg"
        label="New Advisory"
        icon="pi pi-plus"
        align="Center"
        @click="openNew"
    />

    <br>

    <div class="container-2">
      <pv-card style="width: 24.8rem; margin-bottom: 2em" v-for="advisory of advisories">

        <template #header v-if="advisory">
          <pv-image v-bind:src="advisory.urlToImage"
                    size= "large"
                    alt="image advisory"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    width="250"
                    height="200"
                    preview/>
        </template>

        <template #title v-if="advisory">
          {{advisory.title}}
        </template>

        <template #subtitle v-if="advisory">
          {{advisory.description}}
        </template>

        <template #content v-if="advisory">
          Date: {{advisory.date}}
          <br>
          Hour: {{advisory.hour}}
          <br>
          <h4>Student Name: {{advisory.studentName}}</h4>
          <h4>Discord Server: {{advisory.discordServer}} </h4>
        </template>

        <template #footer v-if="advisory">
          <pv-button label="Delete Advisory" @click="deleteAdvisory(advisory.id)"/>
        </template>
      </pv-card>
    </div>
    <br><br>

    <pv-dialog
        v-model:visible="advisoryDialog"
        :style="{ width: '500px'}"
        header="Advisory Information"
        :modal="true"
        class="p-fluid"
    >
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="title"
              v-model.trim="advisory.title"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !advisory.title}"
          />
          <label for="advisoryTitle">Title</label>
          <small class="p-error" v-if="submitted && !advisory.title"
          >Title is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="description"
              v-model="advisory.description"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="advisoryAttaches">Description</label>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              id="multiple"
              v-model="advisory.date"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="advisoryDate">Date</label>
          <small class="p-error" v-if="submitted && !advisory.date"
          >Date is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              id="multiple"
              v-model="advisory.hour"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="advisoryDate">Hour</label>
          <small class="p-error" v-if="submitted && !advisory.hour"
          >Hour is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              id="multiple"
              v-model="advisory.urlToImage"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="advisoryUrlToImage">Url to Image</label>
          <small class="p-error" v-if="submitted && !advisory.urlToImage"
          >Url is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-dropdown v-model="selectedCity" :options="students_" optionLabel="name" placeholder="Select a Student" />
          <small class="p-error" v-if="submitted && !advisory.studentName"
          >DiscordServer is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="title"
              v-model.trim="advisory.discordServer"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !advisory.discordServer}"
          />
          <label for="advisoryDiscordServer">Discord Server</label>
          <small class="p-error" v-if="submitted && !advisory.discordServer"
          >DiscordServer is required</small>
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
            @click="saveCoachAdvisory"
        />
      </template>

    </pv-dialog>


  </div>

</template>

<script>
import CoachesService from '../../services/coaches.service.js';
import AdvisoriesService from '../services/advisories.service.js'
export default {
  name: "coach-advisory",
  data() {
    return {
      advisories: [],
      coachAdvisories: [],
      coachId:1,
      advisoryTitle: '',
      advisoryDescription: '',
      advisoryDate: '',
      advisoryHour:'',
      advisoryDiscordServer: '',
      advisoryNew: {},
      advisory: {},
      coach: {},
      coaches:[],
      coachName: '',

      coachDialog: false,
      submitted: false,
      advisoryService: null,
      advisoryId: 1,
      advisoryDialog: false,

      selectedCity: null,
      students_: [
        {name: '', code: 'NY'},
        {name: 'Carlos', code: 'RM'},
        {name: 'Pepe', code: 'LDN'},
        {name: 'Oscar', code: 'IST'},
        {name: 'Omar', code: 'PRS'}
      ]


    };
  },
  mounted() {
    this.retrieveAdvisories();
    CoachesService.getById(this.coachId).then((response)=>{

      this.coaches=response.data.map(this.getStorableCoach);
      this.coachName=this.coaches[0].name;
    })

    /*
    this.advisoryService.getById()
    this.advisoryService.getAll().then((response) => {
      this.advisoryes = response.data;
      this.advisory = response.data;

      console.log(this.advisoryes);
    });*/
  },
  methods: {
    retrieveAdvisories(){
      AdvisoriesService.getAll().then((response)=>{
        this.advisories=response.data;
        this.coachAdvisories=[];
        for(let Advisory of this.advisories){
          if(Advisory.coachId==this.coachId){
            this.coachAdvisories.push(Advisory);
          }
        }
      })
    },
    deleteAdvisory(advisoryId){
      AdvisoriesService.delete((advisoryId)).then(()=>{
        this.retrieveAdvisories();
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
    getStorableAdvisory(advisory) {
      return {
        id: advisory.id,
        title: advisory.title,
        description: advisory.description,
        date: advisory.date,
        hour: advisory.hour,
        studentName: advisory.studentName,
        discordServer: advisory.discordServer,
        cyberImage: advisory.cyberImage,
        coachId: advisory.coachId,
      };
    },

    findIndexById(id) {
      return this.advisories.findIndex((advisory) => advisory.id === id);
    },

    editCoachAdvisory(advisory) {
      this.advisory = { ...advisory };
      this.advisoryDialog = true;
    },
    openNew() {
      this.advisory = {};
      this.submitted = false;
      this.advisoryDialog = true;
    },
    hideDialog() {
      this.advisoryDialog = false;
      this.submitted = false;
    },
    saveCoachAdvisory() {
      this.advisory.id=0;
      this.advisory.cyberimage="https://d37b96571lewzk.cloudfront.net/assets/image/92/5fbd041a0c9c6/top_games_for_cyber_cafe_o.jpg";
      this.advisory.coachId=this.coachId;
      this.advisory=this.getStorableAdvisory(this.advisory);
      AdvisoriesService.create(this.advisory).then((response)=>{
        this.hideDialog();
        this.retrieveAdvisories();
      })
      /*this.submitted = true;
      this.advisoryNew={
        id:0,
        title: this.advisoryTitle,
        date: this.advisoryDate,
        discordServer: this.advisoryDiscordServer,
        attaches: this.advisoryAtacches,
        cyberimage: "https://d37b96571lewzk.cloudfront.net/assets/image/92/5fbd041a0c9c6/top_games_for_cyber_cafe_o.jpg",
        coachId: this.coachId
      }
      this.advisoryNew = this.getStorableCoach(this.advisoryNew);
      AdvisoriesService.create(this.advisoryNew).then((response)=>{
        this.retrieveAdvisories();
      })

      this.coachDialog = false;*/
    },
  },
};

</script>
<style>
.container{
  background-color: #2455A5;
  margin-left: 100px;
  margin-right: 100px;
}
.spacer{
  flex: 1 1 auto;
}
.container-2{

}


</style>