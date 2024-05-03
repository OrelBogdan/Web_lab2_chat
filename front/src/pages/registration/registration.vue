<template>
	
 <div class="p-3">
   <form class="row g-3 needs-validation" id="form_registration">
      <div v-bind:value="username" v-on:change="username_input" class="col-md-4">
        <label for="user_name_input" class="form-label forms-text">First name</label>
        <input type="text" class="form-control" id="user_name_input" required>
        <div class="valid-feedback">
          Looks good!
        </div>
	</div>
		<div v-bind:value="surname" v-on:change="surname_input" class="col-md-4">
        <label for="surname_input" class="form-label forms-text">Second name</label>
        <input type="text" class="form-control" id="surname_input" required>
		</div>
        <div class="valid-feedback">
          Looks good!
        </div>
		
		<div v-bind:value="patronymic" v-on:change="patronymic_input" class="col-md-4">
        <label for="patronymic_input" class="form-label forms-text">Patronymic</label>
        <input type="text" class="form-control" id="patronymic_input" required>
	    </div>

		<div class="valid-feedback">
          Looks good!
        </div>
	


      
      <div v-bind:value="birthdate" v-on:change="birthdate_input" class="col-md-4">
        <label for="birthdate_input" class="form-label forms-text">Birth date</label>
        <input type="date" class="form-control" id="birthdate_input" required>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <div class="col-md-4">
        
		<div v-bind:value="user_gender" v-on:change="gender_input" class="col-md-4">
        <label for="gender_input" class="form-label forms-text">Gender</label>
        <input type="text" class="form-control" id="gender_input" required>
	    </div>
          
        
      </div>
      <div v-bind:value="email" v-on:change="email_input" class="col-md-6">
        <label for="email_input" class="form-label forms-text">Email adress</label>
        <input type="email" class="form-control" id="email_input" required>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      
      <div class="col-md-3">
        <label for="password_input" class="form-label forms-text">Password</label>
        <input v-bind:value="password" v-on:change="password_input" type="password" class="form-control" id="password_input" required>
        <div class="invalid-feedback">
          Please provide a valid password.
        </div>
      </div>
      
      <div class="col-md-3">
        <label for="repeat_password" class="form-label forms-text">Repeat Password</label>
        <input v-bind:value="repeat_password" v-on:change="repeat_password_input" type="password" class="form-control" id="repeat_password" required>
        <div class="invalid-feedback">
          Please provide a valid password.
        </div>
      </div>
      <div class="col-12"></div>
        
      
      <div class="col-12">
        <button  @click="register" type="button" id="register_button" class="btn btn-primary calculator-navbar-text" >Register</button>
      </div>
    </form>

  </div>

		
	
</template>

<script>
	import {getAPI} from '../../api'
	export default {
		name: 'user_signup',
		//template: "<div>NAME {{ name }}</div>",
		// props: {
		// 	email: String,
		// 	password: String,
		// 	remember_me:Boolean,
		// },
		data() {
			return {
				username: "",
				birthdate: "",
				user_gender: "",
				email: "",
				password: "",
				repeat_password: "",
				surname:"",
				patronymic:""
			}
		},
		methods: {
			
			username_input(event) {
				this.username = event.target.value;
			},
			birthdate_input(event) {
				this.birthdate = event.target.value;
			},
			gender_input(event) {
				this.user_gender = event.target.value;
			},
			email_input(event) {
				this.email = event.target.value;
			},
			password_input(event) {
				this.password = event.target.value;
			},
			repeat_password_input(event) {
				this.repeat_password = event.target.value;
			},
			surname_input(event){this.surname = event.target.value; },
			patronymic_input(event){this.patronymic = event.target.value; },
			signin() {
				
			},
			register() {
				getAPI.post("/api/signup/", {
                email: this.email,
                username: this.username,
                password: this.password,
				birth_date: this.birthdate,
                user_gender: this.user_gender,
				surname: this.surname,
				patronymic: this.patronymic,
                // {
				// 	data: JSON.parse(JSON.stringify(this))
				// }
            }).then(response => {
					console.log(response.data)
					//this.results = response.data[1];
					//console.log(this.results);
					// window.location.href = "/aboutme.html?username=" + this.username + "&" + "password=" + this.password;
					console.log(response.data);
					window.location.href = "/aboutme.html"
                	// this.$router.push('/aboutme.html');
				}).catch(err => {
					this.errors = error.response.data
	                console.log(error)
				});
				/*fetch("http://localhost:3070/api/register", {
						method: "POST",
						body: JSON.stringify(this),
						headers: {
						"Content-Type": "application/json",
					},
				}).then().catch();*/
				
			},
		},
		mounted() {
			// this.generateRandomData();
		},
		created() {
			// this.generateRandomData();
		},
	}
</script>

<style>
	
</style>
