<template>
	<div id="signin" class="p-3">
		<!--<form>
		
		

		<div class="form-floating">
		    
			<input v-bind:value="email" v-on:change="email_input" type="email" class="form-control" id="email_input" placeholder="name@example.com">
			<label for="email_input" class="text-dark">
				Email
			</label>
		</div>

		<div class="form-floating">
			<input v-bind:value="password" v-on:change="password_input" type="password" class="form-control" id="password_input" placeholder="Password">
			<label for="password_input" class="text-dark">
				Password
			</label>
		</div>

		<div class="checkbox m-2 mb-2">
			<input v-bind:value="remember_me" v-model="remember_me" type="checkbox" value="remember-me" style="transform : scale(1.5);" id="remember_me_input">
			<label class="text-center align-middle">
				&nbsp;Remember me
			</label>
		</div>
			
		</form>-->

		<div id="signin">
		<form class="row g-3" >
		  
		  
		 
		  <div class="col-md-6">
			<label for="email_input" class="form-label forms-text">User</label>
			<input v-bind:value="email" v-on:change="email_input" type="text" class="form-control" id="email_input" required>
			<div class="valid-feedback">
			  Looks good!
			</div>
		  </div>
		  
		  <div class="col-md-3">
			<label for="password_input" class="form-label forms-text">Password</label>
			<input v-bind:value="password" v-on:change="password_input" type="password" class="form-control" id="password_input" required>
			<div class="invalid-feedback">
			  Please provide a password.
			</div>
		  </div>
		  
		  
		  <div class="col-12"></div>
					  
		  <div class="col-12">
			<div class="checkbox m-2 mb-3">
				<input v-bind:value="remember_me" v-model="remember_me" type="checkbox" value="remember-me" style="transform : scale(1.5);">
				<label class="text-center align-middle">
					 &nbsp; Remember me
				</label>
			</div>
			
		  </div>

		</form>
		  
	</div>


<div class="m-2">
		<button class=" btn btn-primary calculator-navbar-text mb-3" id="signin_button"  @click="signin">
			Sign in
		</button>
</div>
		<!--<div class="m-2">
		<a href="/register.html">
		<button type="button" class="btn btn-primary mb-3 btn calculator-navbar-text float-start me-2"  @click="register">
			Create an account
		</button></a>
	</div>-->

	</div>
	<!-- <table class="table table-sm table-light calculator-text" id="aboutmeTable">
		<thead>
			<tr>
				<th scope="col" class="col-3 col-sm-2">№</th>
				<th scope="col">Key</th>
				<th scope="col">Value</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="userattr in userattrs" :key="userattr.id" scope="row">
				<td>{{ userattr.id }}</td>
				<td>{{ userattr.key }}</td>
				<td>{{ userattr.value }}</td>
			</tr>
		</tbody>
	</table> -->
</template>

<script>
	import {getAPI} from '../../api'
	import axios from "axios"
	export default {
		name: 'user_signin',
		//template: "<div>NAME {{ name }}</div>",
		// props: {
		// 	email: String,
		// 	password: String,
		// 	remember_me:Boolean,
		// },
		data() {
			return {
				email: "",
				password: "",
				remember_me: false,
			}
			/*
			email: "testuser@local.lan",
			password: "testpassword"
			*/
		},
		methods: {
			email_input(event) {
				this.email = event.target.value;
			},
			password_input(event) {
				this.password = event.target.value;
			},
			remember_me_input(event) {
				this.remember_me = event.target.value;
			},
			signin() {
		      this.$store.dispatch('userLogin', {
		        email: this.email,
		        password: this.password,
		      }).then(() => {
		        // this.$router.push({name: 'Home'})
		        window.location.href = "/aboutme.html"
		      }).catch(err => {
		        this.error_text = err.response.data.non_field_errors[0]
		        console.log(err)
		        //throw err;
		      })
		    },
			register() {

			},
		},
		mounted() {
			// console.log(this.$store.state.accessToken)
		},
	}
</script>

<style>
	
</style>
