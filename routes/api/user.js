const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('../../passport');

router.post('/signup', (req, res) => {
    console.log('user signup');

    const { username, email, password } = req.body
    // ADD VALIDATION
    User.findOne( { $or: [ { username: username }, { email: email } ] }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            if (user.username == username){
                console.log(`Sorry, already a user with the username: ${username}`);
                res.json({
                    error: `Sorry, already a user with the username: ${username}`
                });
            } 
            else {
                console.log(`Sorry, already a user with the email: ${email}`);
                res.json({
                    error: `Sorry, already a user with the email: ${email}`
                });
            }
           
        }
        else {
            const newUser = new User({
                username: username,
                password: password,
                email: email
            });
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            });

            passport.authenticate('local'), (req, res) => {
            console.log('sign up logged in', req.user);
            var userInfo = {
                    username: req.user.username
                };
                res.send(userInfo);
            }
        }
    })
})

router.post('/login', function (req, res, next) {
        console.log('routes/api/user.js, login, req.body: ');
        console.log(req.body);
        
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router