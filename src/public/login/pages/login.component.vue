<template>
  <div class="div-login-general">
    <div class="div-login-center">
      <div class="div-card-options-login">
        <pv-card class="logincard">
          <template #title>
            <h1>¡Bienvenido a Getting Better!</h1>

          </template>
          <template #subtitle>
            <h2> Elige una opción </h2>

          </template>
          <template #header>
            <img src="../../../assets/logo3.jpeg"
                 size= "large"
                 alt="image student"
                 gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                 width="230"
                 height="120"
                 preview/>

          </template>
          <template #content>
            <div class="container">
              <div class="card">

                <pv-card class="left-column">
                  <template #title><h3><b>Coach</b></h3></template>
                  <template #subtitle><h2><small>¡Únete al equipo de profesores de Getting Better y opten beneficios!</small></h2></template>
                </pv-card>


                <div class="card-right-content">
                  <div class="right-column">

                    <pv-card>
                      <template #header>
                        <img src="../../../assets/coach-login.jpeg"
                             size= "large"
                             alt="image logo"
                             gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                             width="100"
                             height="150"
                             preview/>
                      </template>
                      <template #footer><button class="button background2-left-column" onclick="location.href='/log-in'">Login</button></template>
                    </pv-card>

                  </div>
                </div>
              </div>
              <!--Login user stundent-->
              <div class="card">


                <pv-card class="left-column">
                  <template #title><h3><b>Student</b></h3></template>
                  <template #subtitle><h2><small>¡Aprende con nosotros y recibe asesorías de jugadores experimentados en el gaming!</small></h2></template>
                </pv-card>



                <div class="card-right-content">
                  <div class="right-column">

                    <pv-card>
                      <template #header>
                        <img src="../../../assets/student-login.jpg"
                             size= "large"
                             alt="image student"
                             gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                             width="100"
                             height="150"
                             preview/>
                      </template>
                      <template #footer><button class="button background2-left-column" onclick="location.href='/log-in'">Login</button></template>
                    </pv-card>

                  </div>
                </div>
              </div>
              <!--Login cyber-->
              <div class="card">

                <pv-card class="left-column">
                  <template #title><h3><b>Cyber</b></h3></template>
                  <template #subtitle><h2><small>¡Realiza torneos, eventos y promociona tu negocio!</small></h2></template>
                </pv-card>


                <div class="card-right-content">
                  <div class="right-column">

                    <pv-card>
                      <template #header>
                        <img src="../../../assets/cyber-login.jpeg"
                             size= "large"
                             alt="image student"
                             gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                             width="100"
                             height="150"
                             preview/>
                      </template>
                      <template #footer><button class="button background2-left-column" onclick="location.href='/log-in'">Login</button></template>
                    </pv-card>

                  </div>
                </div>
              </div>
            </div>

          </template>
        </pv-card>
      </div>
    </div>
  </div>

</template>




<script>

import StudentsService from '../../../users/student/services/students.service.js'
import CoachesService from '../../../users/coach/services/coaches.service.js'
import Card from 'primevue/card'
export default {
  name: "logeo",

  mounted() {
    this.retrieveStudents();
  },
  methods: {
    submitLogin() {
      this.$router.push("/log-in")
    }
  }
}
</script>
<style>
:root{
  --white-text:#fff;
  --background:#c8e8f1;
  --black-text:rgb(68, 66, 66)

}

.background1-left-column{

}



.background2-left-column{


}


* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  box-sizing: border-box;
  border: none;
}


body {
  font-family: Arial, Helvetica, sans-serif;
}

.container{

  justify-content: center;
  height: 350px;
  align-items: center;
}

.card {
  background-color:var(--white-text);
  border-radius: 1rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);
  display: flex;
  margin: 10px;
  overflow: hidden;
  width: 35rem;
  height:auto;
}

.card h6 {
  opacity: 0.6;
  letter-spacing: .1rem;
  text-transform: uppercase;
}

.card  h2 {
  letter-spacing: .1rem;
  margin: 1rem 0;
}


.card  h3 {
  text-align: center;


}
.p-card{

  height: 250px;

}
.card-left-content{
  padding-top: 40px;
  height: 100%;



}

.left-column {
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 300px;
}

.left-column h3{
  text-align: center;
}
.left-column h2{
  text-align: left;
}

.left-column i {
  font-size: 5rem
}

.card-right-content{
  background-color:#005ecb;
  /* background-color: #004ecb;*/
}
.right-column {
  margin: 20px;
  height:auto;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

}

.right-column p{
  font-size: .9rem;
  color: var(--black-text)
}

.button {
  border-radius: 3rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: var(--white-text);
  font-size: 1.2rem;
  padding: .8rem 1.5rem;
  letter-spacing: .1rem;
  align-self: flex-end;
  background-color: darkblue;
}

/*media queries*/

@media (max-width: 900px) {
  .container{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100px;
  }
}
.div-login-general {
  background: rgb(255, 255, 255);
  height: auto;

  display: flex;
  justify-content: center;

}


.div-login-center {
  margin-top: 100px;

  align-items: center;
  justify-content:center;
  text-align: center;
  border-style: solid;
  border-width: 7px;
  height: 1240px;
  border-color: rgb(26, 26, 88);

}
.div-login-center img{
  width: 250px;
}
.div-login-center button{

  justify-content:right;
  text-align: right;
}
.div-card-options-login{
  height: 900px;


}
.logincard{
  padding-top: 2rem;
  height: 1230px;

}

</style>
