import React, {useState} from "react";



const Home = () => {
	const [reminder, setReminder] = useState({
		reminder:"",
		isDone: false
	})
	const [listReminder, setListReminder] = useState([])

	const handleReminder = (event) =>{
		
		setReminder({...reminder,[event.target.name]: event.target.value})
	}

	const saveList = (event) =>{	
		if (event.key === "Enter") {
		
		setListReminder([...listReminder,reminder])
		setReminder({...reminder, reminder:""})
		} 
	}

	const removeReminder = (id) =>{
		let newList = listReminder.filter((item, index) =>{
			if (id !== index){
				return item
			}
		})
		setListReminder(newList)
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
			name="reminder"
			value={reminder.reminder}
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
							<div>{item.reminder}</div> 
							<div>
								<button className="btn btn-light" onClick={() => removeReminder(index)}><i className="fa-solid fa-xmark"></i></button>
							</div>
						</div>
					);
				})
				}
			</div>
		</div>
	);
};

export default Home;
