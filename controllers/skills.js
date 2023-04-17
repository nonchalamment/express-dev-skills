// Import the model that we exported in the Todo.js model file
import { Skill } from '../models/skill.js'

// This ^^ takes the place of the import we were using previously, so we can delete it!
// import { todos } from '../data/todo-data.js'

// Inside the index controller, use the Todo model to query for ALL todos
function index(req, res) {
  Skill.find({})
  .then(skills => { // skills represents the result of the query, in this case ALL skills
    res.render('skills/index', {
      skills: skills,
      time: req.time
    })
  })
  .catch(error => { // If there's an error, console.log it and redirect back home!
    console.log(error)
    res.redirect('/')
  })
}

function create(req, res) {
  console.log(req.body)
  req.body.done = false
  Skill.create(req.body)
  .then(skill => {
		// Notice we are doing a redirect here!
    res.redirect('/skills')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/skills')
  })
}

function show(req, res) {
  Skill.findById(req.params.skillId)
  .then(skill => {
    res.render('skills/show', {
      skill: skill
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/skills')
  })
}
function newSkill(req, res) {
  res.render('skills/new')
}

function deleteSkill(req, res) {
  Skill.findByIdAndDelete(req.params.skillId)
  .then(skill => {
    res.redirect('/skills')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/skills')
  })
}

export {
  index,
  show,
  newSkill as new,
  create,
  deleteSkill as delete,
}
