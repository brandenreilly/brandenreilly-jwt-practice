const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: null,
			alert: false,
			confirmed: false,
			testVar: "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncToken: () => {
				const token = sessionStorage.getItem('token')
				if(token && token != "" && token != undefined) setStore({ token: token })
			},

			verifyPass: (password1,password2) => {
				if(password1 === password2){
					setStore({ confirmed: true })
					return true
				}	
				else{
					return false
				}
			},
			handleGET: (token) => {
				const opts = {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer '+ token
					}
				}
				fetch("https://opulent-journey-q7759797qq9vcrxv-3001.app.github.dev/api/private", opts)
				.then(resp => resp.json())
				.then(data => setStore({testVar: data}))
			},

			login: async (username , password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: username,
						password: password
					})
				}
			
			try{
				const resp = await fetch("https://opulent-journey-q7759797qq9vcrxv-3001.app.github.dev/api/token", opts)
				if (resp.status != 200){
					if(resp.status == 401){
						setStore({alert: true})
						return false
					}
					console.log("Error")
					return false;
				}
				const data = await resp.json();
				sessionStorage.setItem("token", data.access_token)
				setStore({ token: data.access_token , alert: false })
				return true
				}
			catch(error){
				console.error("There has been an error")
			}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log('Logged out');
				setStore({token: null});
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
