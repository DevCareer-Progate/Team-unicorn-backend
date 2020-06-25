import Profile from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// Get user profile details

class ProfileController {

    createProfile(req, res) {
        const { firstName, lastName, isAdmin, country, state, city, address, image, created_on } = req.body;

        if (!firstName || !lastName || !isAdmin || !country || !state || !city || !address || !image || !created_on) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const newProfile = new Profile({
            firstName,
            lastName,
            isAdmin,
            country,
            state,
            city,
            address,
            image,
            created_on
        });

        newProfile.save()
            .then(profile => {
                jwt.sign({ _id: profile.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            id: newProfile.id,
                            firstName: newProfile.firstName,
                            lastName: newProfile.lastName,
                            address: newProfile.address,
                            state: newProfile.state
                        })
                    })
            })
    }

    getProfile(req, res, next) {
        Profile.findById(req.params.id).then(
            (result) => {
                res.status(200).json({
                    status: 200,
                    message: 'success',
                    data: result,
                    request: {
                        type: "GET",
                        url: `http://${req.headers.host}/api/v1/auth/profile/:${id}`
                    }
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    message: 'An error occurred',
                    error: err
                })
            })
        next();
    }

    getProfiles(req, res, next) {
        Profile.find({})
            .then((foundObject) => {
                res.status(200).json({
                    status: 200,
                    data: foundObject
                })
            })
            .catch(err => res.status(400).json({
                status: 404,
                data: err
            }))
        next();
    }

    updateProfile(req, res, next) {
        const { firstName, lastName, isAdmin, country, state, city, address, image } = req.body;
        Profile.findById(req.params.id)
            .then(profile => {
                if (!profile) {
                    return res.status(403).json({ status: 403, message: "User not found!" });
                }
                else {
                    Profile.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
                        () => {
                            res.status(200).json({
                                status: 200,
                                data: {
                                    '_id': req.params.id,
                                    'firstName': req.body.firstName || profile.firstName,
                                    'lastName': req.body.lastName || profile.lastName,
                                    'country': req.body.country || profile.country,
                                    'state': req.body.state || profile.state,
                                    'city': req.body.city || profile.city,
                                    'address': req.body.address || profile.address,
                                    'image': req.body.image || profile.image,
                                    'created_on': profile.created_on,
                                }
                            });
                        })
                }
            })
            .catch(err => res.status(404).json({
                status: 404,
                message: "An error occurred"
            }));
        next();
    };

    deleteProfile(req, res, next) {
        Profile.findOneAndRemove({ _id: req.parmas.id })
            .then((err) => {
                if (err) return res.json({ status: 400, message: 'No user with the specified Id' });
                res.json({
                    status: 200,
                    message: 'The profile is deleted successfully',
                })
            })
            .catch(err => res.json({
                status: 404,
                message: 'No profile found!',
            }))
        next();
    }
}



export default new ProfileController();