import React, {useEffect, useState} from "react";



const Home = () => {
	const [reminder, setReminder] = useState({
		reminder:"",
		isDone: false
	})
	const [listReminder, setListReminder] = useState([])

	const urlBase = "http://assets.breatheco.de/apis/fake/todos/" //editar aqui
	const userBase = "jogomze"

	const handleReminder = (event) =>{
		
		setReminder({...reminder,[event.target.name]: event.target.value})
	}

	const saveList = async (event) => {
		if (event.key === "Enter") {
			if (reminder.label.trim() !== "") {
				try {
					let response = await fetch(`${urlBase}/${userBase}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify([...listReminder, reminder])
					})
					if (response.ok) {
						setReminder({ label: "", done: false })
						getReminders()
					}
				} catch (error) {
					console.log("error", error)
				}
			}
		}
	}

	const getReminders = async () => {
		try {
			let response = await fetch(`${urlBase}/${userBase}`)
			let data = await response.json()
			if (response.status !== 404) {
				setListReminder(data)
			}
			else {
				let responseReminder = await fetch(`${urlBase}/${userBase}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify([])
				})

				if (responseReminder.ok) {
					getReminders()
				}
			}

		}
		catch (error) {
			console.log(`explote, este es el error: ${error}`)
		}
	}
	useEffect(() => {
		getReminders()
	}, [])

	const deleteReminder = async (id) => {
		let newList = listReminder.filter((item, index) => {
			if(id !== index){
				return item
			}
		})
		try {
			let response = await fetch(`${urlBase}/${userBase}`, {
				method: "PUT",
				headers: {
					"content-Type": "application/json"
				},
				body: JSON.stringify(newList)
			})
			if(response.ok) {
				getReminders()
			}
		} catch (error) {
			console.log("error", error)
		}
	}

	return (
		<div className="container
		d-flex
		flex-column
		justify-content-center
		align-text-center
		align-items-center
		my-5
		bg">
			<div className="font-title fs-1">
				<h1>To Do List</h1>
			</div>
			<input className="d-flex
			align-items-center
			align-text
			bg-light
			box
			border
			mt-5
			p-3
			font"
			type="text"
			placeholder="What's need to be done?..."
			name="label"
			value={reminder.label}
			onChange={handleReminder}
			onKeyDown={saveList}/>
			<div>
				{listReminder.map((item, index) => {
					return (
						<div className="d-flex
						align-items-center
						justify-content-between
						align-text
						bg-light
						box
						border
						p-3
						font" key={index}>
							<div>{item.label}</div> 
							<div>
								<button className="btn btn-light" onClick={() => deleteReminder(index)}><i className="fa-solid fa-xmark"></i></button>
							</div>
						</div>
					);
				})
				}
			</div>
			<div className="col-12 d-flex align-content-center text-start bg-light minibox border font px-2 fs-6">
				Items on list: {listReminder.length}
			</div>
		</div>
	);
};

export default Home;
