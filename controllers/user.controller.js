import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class UserController {

    async signUp(req, res) {
        try {
            const { firstName, lastName, email, username, password, isAdmin } = req.body;

            if (!firstName || !lastName || !email || !username || !password || !isAdmin) {
                return res.status(400).json({ message: 'Please enter all fields' });
            }

            const userExist = await User.findOne({ email });
            if (userExist) return res.json({ status: 400, message: 'User already exists' });

            const newUser = new User({
                firstName,
                lastName,
                email,
                username,
                password,
                isAdmin
            });

            const salts = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newUser.password, salts);
            newUser.password = hash;

            const user = await newUser.save();
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
            res.json({
                status: 200,
                data: {
                    token,
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    password: user.password
                }
            })
        } catch (err) {
            res.json({
                status: 'failed',
                message: err
            })
        }

    }


    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) res.json({ status: 400, message: 'User does not exist' });
            const IsMatch = await bcrypt.compare(password, user.password);
            if (!IsMatch) {
                return res.json({ status: 403, message: 'Incorrect username or password, please review details and try again' });
            }
            const token = jwt.sign(
                { email: user.email, id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 }
            );

            res.json({
                status: 200,
                data: {
                    id: user.id,
                    token,
                    message: 'User Logged in Sucessfully'
                }
            });

        } catch (err) {
            res.json({
                status: 'failed',
                message: err
            })
        }
    }

    // signIn(req, res) {
    //     const signIn = (req, res, next) => {
    //         const { email, password } = req.body;

    //         User.findOne({ email })
    //             .then(user => {
    //                 if (!user) {
    //                     return res.json({ status: 404, message: 'User not found, please provide valid credentials' });
    //                 }

    //                 bcrypt.compare(password, user.password)
    //                     .then(valid => {
    //                         if (!valid) {
    //                             return res.json({ status: 403, message: 'Incorrect username or password, please review details and try again' });
    //                         }
    //                         const token = jwt.sign(
    //                             { email: user.email, id: user.id },
    //                             process.env.JWT_SECRET,
    //                             { expiresIn: 3600 }
    //                         );

    //                         res.json({
    //                             status: 200,
    //                             data: {
    //                                 id: user.id,
    //                                 token,
    //                                 message: 'User Logged in Sucessfully'
    //                             }
    //                         });
    //                     });
    //             })
    //             .catch(err => console.log(err));
    //     }
    // }

}

export default new UserController();

