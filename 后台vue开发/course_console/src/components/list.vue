<template>
  <div class='hello'>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
	data () {
		return{
			msg:'list',
			apiUrl: 'http://localhost/admin/user/list.shtml'	
		}
	},
	ready: function() {
		this.getUser()
	},
	methods: {
		getUser: function() {
			this.$http.get(this.apiUrl)
				.then((response) => {
					console.log(response.data)
				})
				.catch(function(response) {
					console.log(response)
				})
		}
	}
}
</script>
