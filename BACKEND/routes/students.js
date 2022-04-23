const router = require('express').Router();

let Student = require('../models/student.js');

//data adding
//http://localhost:8070/student/add
router.route('/add').post((req, res) => {
	const name = req.body.name;
	const age = Number(req.body.age);
	const gender = req.body.gender;

	const newStudent = new Student({
		name,
		age,
		gender,
	});

	newStudent
		.save()
		.then(() => {
			res.json('Student added');
		})
		.catch((err) => {
			console.log(err);
		});
});

//data reading
router.route('/').get((req, res) => {
	Student.find()
		.then((students) => {
			res.json(students);
		})
		.catch((err) => {
			console.log(err);
		});
});

//data updating(post also can)(put(req,res) also can)
router.route('/update/:id').put(async (req, res) => {
	let userId = req.params.id;
	const { name, age, gender } = req.body; //destructure

	const updateStudent = {
		// can do as 12 line
		name,
		age,
		gender,
	};

	//findone use karnne id eka nathuwa email eka wagee use wenwa nm
	const update = await Student.findByIdAndUpdate(userId, updateStudent)
		.then(() => {
			res.status(200).send({ status: 'user updated' });
		})
		.catch((err) => {
			console.log(err);
			res
				.status(200)
				.send({ status: 'errro with updating data', error: err.message });
		});
});

//data deleting
router.route('/delete/:id').delete(async (req, res) => {
	let userId = req.params.id;
	await Student.findByIdAndDelete(userId)
		.then(() => {
			res.status(200).send({ status: 'User deleted' });
		})
		.catch((err) => {
			console.log(err.message);
			res
				.status(500)
				.send({ status: 'Error with delete user', error: err.message });
		});
});

//one user
router.route('/get/:id').get(async (req, res) => {
	let userId = req.params.id;
	const user = await Student.findById(userId) //findOne(email)
		.then((student) => {
			res.status(200).send({ status: 'user fetched', user: user });
		})
		.catch(() => {
			console.log(err.message);
			res
				.status(500)
				.send({ status: 'Error with get user', error: err.message });
		});
});
module.exports = router;
