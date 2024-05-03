<template>
	
	<div class="p-3">
	<table class="table table-striped table-danger table-sm  p-3 table-bordered" id="aboutmeTable">
		
		<tbody>
			<tr v-for="userattr in userattrs" :key="userattr.id" scope="row">
				
				<td>{{ userattr.key }}</td>
				<td>{{ userattr.value }}</td>
			</tr>
		</tbody>
	</table>
	
	<br>
	<button @click="userLogout" type="button" class="btn btn-primary calculator-navbar-text">
		Logout	
	</button>
	</div>
	<br><br>
</template>

<script>
	import {getAPI} from '../../api'
	import axios from "axios"
	export default {
		name: 'user',
		//template: "<div>NAME {{ name }}</div>",
		data() {
			return {
				userattrs: [
	/*				{
						id: 1,
						key: "33",
						value: "povar"
					},*/
				],
			}
		},
		mounted() {
			var url = new URL(window.location.href);
			// console.log(url)
		    if (this.$store.getters.authorized) {
		      // this.getUrls();
		    	this.getUserInfo();
		    } else {
		      // this.$router.push({name: 'Login'})
		      window.location.href = "/signin.html"
		    }
		},
		methods: {
			get_authorization_header() {
				return { Authorization: `Bearer ${this.$store.state.accessToken}` };
			},
			getUserInfo() {
		    	getAPI("/api/user/", {
		    		headers: this.get_authorization_header()
				}).then(response => {
					this.user_info = response.data;
					// console.log(response.data)
					// console.log(this.results);
					Object.entries(response.data).forEach((v, i, a) => {
						if(v[0] == "tokens") {
							return;
						}
						let value1 = v[1];
						if (v[0] == "password") {
							// Insert a newline character in the middle of the string
							//value1 = value1.substring(0, Math.floor(value1.length / 2)) + '\n' + value1.substring(Math.floor(value1.length / 2));
							const length = value1.length;
							const third = Math.floor(length / 3);
							value1 = value1.substring(0, third) + '\n' +value1.substring(third, 2 * third) + '\n' + value1.substring(2 * third);
						}
						
						this.userattrs.push({
							id: i,
							key: v[0],
							value: value1,
						});
					});
				}).catch(err => {
					window.location.href = "/signin.html"
					throw err;
				});
			},
			userLogout() {
				this.$store.dispatch('userLogout', {
				}).then(() => {
					// this.$router.push({name: 'Home'})
					window.location.href = "/login.html"
				}).catch(err => {
					console.log(err)
					//throw err;
				})
			}

	
		}
	}
</script>
