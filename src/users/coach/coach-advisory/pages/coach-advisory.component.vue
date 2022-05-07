
<template>
  <div>
    <pv-button
        class="p-button-lg"
        label="New Advisory"
        icon="pi pi-plus"
        align="Center"
        @click="openNew"
    />
    <pv-divider/>
    <pv-card class="p-card" v-for="advisory of coachAdvisories">

      <template #header>

        <div>
          <pv-avatar image="https://www.infobae.com/new-resizer/MNHmV03_B5YfGxHUoWdlomoS2JQ=/992x558/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/08/09153344/Oxaciano.jpg"
                     size= "xlarge" />
        </div>
        <div>
          <h2>Coach name</h2>
        </div>
        <h3>Title: {{advisory.title}}</h3>
        <h3>Schedule: {{advisory.date}}</h3>
        <h3>Chanel: {{advisory.discordServer}}</h3>
        <h3>Media: {{advisory.attaches}}</h3>
        <pv-button label="Delete Advisory" @click="deleteAdvisory(advisory.id)"/>
        <pv-image
            src="https://d37b96571lewzk.cloudfront.net/assets/image/92/5fbd041a0c9c6/top_games_for_cyber_cafe_o.jpg"
            alt="image advisory"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            width="275"
            height="275"
            preview
        />
      </template>

    </pv-card>
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
          <samll class="p-error" v-if="submitted && !advisory.title"
                 >Title is required</samll>

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
          
          <samll class="p-error" v-if="submitted && !advisory.date"
          >Date is required</samll>
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
          <label for="advisoryDiscordServer">Chanel</label>
          <samll class="p-error" v-if="submitted && !advisory.discordServer"
          >Title is required</samll>

        </span>

      </div>
      <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="description"
              v-model="advisory.attaches"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="advisoryAttaches">Attaches</label>
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
import AdvisoriesService from '../services/advisories.service.js'
export default {
  name: "coach-advisory",
  data() {
    return {
      advisories: [],
      coachAdvisories: [],
      coachId:1,
      advisoryTitle: '',
      advisoryDate: '',
      advisoryDiscordServer: '',
      advisoryAtacches: '',
      advisoryNew: {},
      advisory: {},


      coachDialog: false,
      submitted: false,
      advisoryService: null,
      advisoryId: 1,
      advisoryDialog: false,
    };
  },
  mounted() {
    this.retrieveAdvisories();
    
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
        this.advisories=response.data.map(this.getStorableAdvisory);
        this.coachAdvisories=[];
        for(let Advisory of this.advisories){
          if(Advisory.coachId==this.coachId){
            this.coachAdvisories.push(Advisory);
          }
        }
      })
    },
    deleteAdvisory(advisoryId){
      AdvisoriesService.delete(Number(advisoryId)).then(()=>{
        this.retrieveAdvisories();
      })
    },
    getStorableAdvisory(advisory) {
      return {
        id: advisory.id,
        title: advisory.title,
        date: advisory.date,
        discordServer: advisory.discordServer,
        attaches: advisory.attaches,
        cyberimage: advisory.cyberimage,
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
.p-button-lg{
 background-color: #C4C4C4;
  display: block;
  width: 70%;
  height: 100px;
  border: none;
  padding: 200px 200px;
  font-size: 16px;
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