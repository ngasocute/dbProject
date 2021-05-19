const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});

function testAPI () {
	fetch('https://f511f0a1cf13.ngrok.io/helloworld')
.then(function(response) {
  // Do stuff with the response
  console.log('Example response \n',response);
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
}