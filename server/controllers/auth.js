import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const continueWithGoogle = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts,
        } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            const newUser = new User({
                firstName,
                lastName,
                userName,
                dob,
                bio,
                location,
                picturePath,
                email,
                status,
                followers,
                following,
                followRequest,
                sentRequest,
                posts,
                savedPosts,
            });
            await newUser.save();
            const user = await User.findOne({email:newUser.email})
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(200).json({ user, token });
            // console.log("Contine with google user created and continue")
            // delete user.password;
        } else {
            console.log("Contine with google email already exist ")
            // const user = await User.findOne({ email: email });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(200).json({ user, token });
        }
    } catch (err) {
        console.log("Server error")
        res.status(500).json("Error");
    }
}

/* REGISTER USER */
export const signup = async (req, res) => {
    try {
        // console.log(req.body.values)
        const {
            firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            password,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts,
        } = req.body;
        console.log(firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            password,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts)
        let saltRound = 10;
        let hashedPassword = await bcrypt.hash(password, saltRound);
        const newUser = new User({
            firstName,
            lastName,
            userName,
            dob,
            bio,
            location,
            picturePath,
            email,
            password: hashedPassword,
            status,
            followers,
            following,
            followRequest,
            sentRequest,
            posts,
            savedPosts,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json("Error");
    }
};

/* LOGGING IN */

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("Invalid User");
            return res.status(400).json("Error");
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid Password");
            return res.status(400).json("Error");
        };
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            delete user.password;
            return res.status(200).json({ user, token });
        }
    } catch (err) {
        res.status(500).json("Error");
    }
};
