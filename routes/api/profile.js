const express = require('express');
const { isLoggedIn } = require('../../validation/jwtAuth');
const _isEmpty = require('lodash.isempty');

// Validations
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Initialize router
const router = express.Router();

// @route GET api/profile/
// @desc Get current user profile
// @access Private
router.get('/', isLoggedIn(), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ message: 'You do not have a profile' });
      }

      res.json(profile);
    });
});

// @route GET api/profile/all
// @desc Fetch all profiles
// @access Public
router.get('/all', (req, res) => {
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      // Block if profiles array is empty
      if (_isEmpty(profiles)) {
        return res.status(404).json({ message: 'There are no profiles' });
      }

      res.json(profiles);
    });
});

// @route GET api/profile/user/:handle
// @desc Fetch profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(foundProfile => {
      // Block if no profile found
      if (!foundProfile) {
        return res.status(404).json({ message: 'There is no profile for this user' });
      }

      res.json(foundProfile);
    });
});

// @route GET api/profile/user/:id
// @desc Fetch profile by user ID
// @access Public
router.get('/user/:id', (req, res) => {
  Profile.findOne({ user: req.params.id })
    .populate('user', ['name', 'avatar'])
    .then(foundProfile => {
      res.json(foundProfile);
    })
    .catch(() => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route POST api/profile/
// @desc create OR edit current user profile
// @access Private
router.post('/', isLoggedIn(), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  // Get fields
  const profileFields = {};

  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;
  // Skills - Split into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }
  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(foundProfile => {
    if (foundProfile) {
      // Update
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(
        newProfile => res.json(newProfile)
      );
    } else {
      // Create
      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'Handle already exists';
          return res.status(400).json(errors);
        }

        // Save profile
        new Profile(profileFields)
          .save()
          .then(newProfile => {
            res.json(newProfile);
          })
          .catch(err => {
            console.error(err);
            return res.status(400).json({ message: 'Cannot create profile' });
          });
      });
    }
  });
});

// @route DELETE api/profile/
// @desc Delete user and profile
// @access Private
router.delete('/', isLoggedIn(), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => {
          res.json({ success: true });
        })
        .catch(err => {
          console.error(err);
          return res.status(400).json({ message: 'Cannot delete user' });
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(400).json({ message: 'Cannot delete profile' });
    });
});

// @route POST api/profile/experience
// @desc Add experience to profile
// @access Private
router.post('/experience', isLoggedIn(), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Add to experience array
      profile.experience = [{ ...req.body }, ...profile.experience];
      // Save then ouput json
      profile
        .save()
        .then(newProfile => {
          res.json(newProfile);
        })
        .catch(err => {
          console.error(err);
          return res.status(400).json({ message: 'Cannot create experience' });
        });
    })
    .catch(err => res.status(404).json({ message: 'Profile not found' }));
});

// @route DELETE api/profile/experience/:id
// @desc Delete experience from profile
// @access Private
router.delete('/experience/:id', isLoggedIn(), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Ger remove index
      const removeIndex = profile.experience.findIndex(item => item.id === req.params.id);
      // Splice out of array;
      profile.experience.splice(removeIndex, 1);
      profile
        .save()
        .then(updatedProfile => res.json(updatedProfile))
        .catch(err => {
          console.error(err);
          return res.status(400).json({ message: 'Cannot update profile' });
        });
    })
    .catch(err => res.status(404).json({ message: 'Profile not found' }));
});

// @route POST api/profile/education
// @desc Add education to profile
// @access Private
router.post('/education', isLoggedIn(), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Add to experience array
      profile.education = [{ ...req.body }, ...profile.education];
      // Save then ouput json
      profile
        .save()
        .then(newProfile => {
          res.json(newProfile);
        })
        .catch(err => {
          console.error(err);
          res.status(400).json({ message: 'Cannot create education' });
        });
    })
    .catch(err => res.status(404).json({ message: 'Profile not found' }));
});

// @route DELETE api/profile/education/:id
// @desc Delete education from profile
// @access Private
router.delete('/education/:id', isLoggedIn(), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Ger remove index
      const removeIndex = profile.education.findIndex(item => item.id === req.params.id);
      // Splice out of array;
      profile.education.splice(removeIndex, 1);
      profile.save().then(updatedProfile => res.json(updatedProfile));
    })
    .catch(err => res.status(404).json({ message: 'Profile not found' }));
});

module.exports = router;
