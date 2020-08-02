const { default: MockList } = require('../../src/components/mock.component');

const router = require('express').Router();
let Find_API_User = require('../../src/components/mock.component');

router.route('/').get((req, res) => {
  Find_API_User.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:uuid').get((req, res) => {
  Find_API_User.findById(req.params.uuid)
    .then(Find_API_User => res.json(Find_API_User))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:uuid').delete((req, res) => {
  Find_API_User.findByIdAndDelete(req.params.uuid)
    .then(() => res.json('user deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:uuid').post((req, res) => {
  Find_API_User.findById(req.params.id)
    .then(Find_API_User => {
      Find_API_User.username = req.body.username;
      Find_API_User.gender = req.body.gender;
      Find_API_User.dob = Date.parse(req.body.dob);
      Find_API_User.news = Boolean(req.body.news);
      Find_API_User.email = req.body.email;
      Find_API_User.photo = req.body.photo;

      exercise.save()
        .then(() => res.json('user updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

MockList.exports = router;