const express = require('express');
const { isLoggedIn } = require('../../validation/jwtAuth');
const isEmpty = require('lodash.isempty');

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
  const findCurrent = async () => {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .exec();

    if (!profile) return res.status(404).json({ message: 'You do not have a profile' });

    res.json(profile);
  };

  findCurrent();
});

// @route GET api/profile/all
// @desc Fetch all profiles
// @access Public
router.get('/all', (req, res) => {
  const findAll = async () => {
    const profiles = await Profile.find()
      .populate('user', ['name', 'avatar'])
      .exec();

    if (isEmpty(profiles)) return res.status(404).json({ message: 'There are no profiles' });

    res.json(profiles);
  };

  findAll();
});

// @route GET api/profile/user/:handle
// @desc Fetch profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const findByHandle = async () => {
    const profile = await Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
      .exec();

    if (!profile) return res.status(404).json({ message: 'There is no profile for this user' });

    res.json(profile);
  };

  findByHandle();
});

// @route GET api/profile/user/:id
// @desc Fetch profile by user ID
// @access Public
router.get('/user/:id', (req, res) => {
  const findById = async () => {
    const profile = await Profile.findOne({ user: req.params.id })
      .populate('user', ['name', 'avatar'])
      .exec();

    if (!profile) return res.status(404).json({ message: 'There is no profile for this user' });

    res.json(profile);
  };

  findById();
});

// @route POST api/profile/
// @desc create OR edit current user profile
// @access Private
router.post('/', isLoggedIn(), (req, res) => {
  const {
    handle,
    status,
    company,
    website,
    location,
    bio,
    githubUsername,
    skills,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = req.body;
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  // Get fields
  const profileFields = {};

  profileFields.user = req.user.id;
  if (handle) profileFields.handle = handle;
  if (!isEmpty(status)) profileFields.status = status;
  if (!isEmpty(company)) profileFields.company = company;
  if (!isEmpty(website)) profileFields.website = website;
  if (!isEmpty(website)) profileFields.location = location;
  if (!isEmpty(bio)) profileFields.bio = bio;
  if (!isEmpty(githubUsername)) profileFields.githubUsername = githubUsername;
  // Skills - Split into array
  if (typeof skills !== 'undefined') {
    profileFields.skills = skills.split(',');
  }
  // Social
  profileFields.social = {};
  if (!isEmpty(youtube)) profileFields.social.youtube = youtube;
  if (!isEmpty(twitter)) profileFields.social.twitter = twitter;
  if (!isEmpty(facebook)) profileFields.social.facebook = facebook;
  if (!isEmpty(linkedin)) profileFields.social.linkedin = linkedin;
  if (!isEmpty(instagram)) profileFields.social.instagram = instagram;

  const createProfile = async () => {
    const profile = await Profile.findOne({ user: req.user.id }).exec();

    // Update
    if (profile) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).exec();

      return res.json(updatedProfile);
    }

    // Create
    // Check if handle exists
    const handle = await Profile.findOne({ handle: profileFields.handle }).exec();

    if (handle) {
      errors.handle = 'Handle already exists';
      return res.status(400).json(errors);
    }

    try {
      const newProfile = await new Profile(profileFields).save();

      return res.json(newProfile);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Cannot create profile' });
    }
  };

  createProfile();
});

// @route DELETE api/profile/
// @desc Delete user and profile
// @access Private
router.delete('/', isLoggedIn(), (req, res) => {
  const removeProfileAndUser = async () => {
    try {
      await Profile.findOneAndRemove({ user: req.user.id }).exec();
      await User.findByIdAndRemove({ _id: req.user.id }).exec();

      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Cannot delete' });
    }
  };

  removeProfileAndUser();
});

// @route POST api/profile/experience
// @desc Add experience to profile
// @access Private
router.post('/experience', isLoggedIn(), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const createExperience = async () => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).exec();

      // Add to experience array
      profile.experience = [{ ...req.body }, ...profile.experience];

      // Save then ouput json
      const updatedProfile = await profile.save();

      return res.json(updatedProfile);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Cannot create experience' });
    }
  };

  createExperience();
});

// @route DELETE api/profile/experience/:id
// @desc Delete experience from profile
// @access Private
router.delete('/experience/:id', isLoggedIn(), (req, res) => {
  const deleteExperience = async () => {
    try {
      // Get profile and remove index
      const profile = await Profile.findOne({ user: req.user.id }).exec();
      const removeIndex = profile.experience.findIndex(item => item.id === req.params.id);

      // Splice out of array then save
      profile.experience.splice(removeIndex, 1);
      const updateProfile = await profile.save();

      return res.json(updateProfile);
    } catch (error) {
      return res.status(404).json({ message: 'Profile not found' });
    }
  };

  deleteExperience();
});

// @route POST api/profile/education
// @desc Add education to profile
// @access Private
router.post('/education', isLoggedIn(), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const createEducation = async () => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).exec();

      // Add to experience array
      profile.education = [{ ...req.body }, ...profile.education];
      const updatedProfile = await profile.save();

      return res.json(updatedProfile);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: 'Profile not found' });
    }
  };

  createEducation();
});

// @route DELETE api/profile/education/:id
// @desc Delete education from profile
// @access Private
router.delete('/education/:id', isLoggedIn(), (req, res) => {
  const deleteEducation = async () => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).exec();
      const removeIndex = profile.education.findIndex(item => item.id === req.params.id);

      profile.education.splice(removeIndex, 1);

      const updatedProfile = await profile.save();

      return res.json(updatedProfile);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: 'Profile not found' });
    }
  };

  deleteEducation();
});

module.exports = router;
