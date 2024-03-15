import express from "express";
import { signup, login, continueWithGoogle, 
    // googleSignup, googleLogin 
} from "../controllers/auth.js";

const router = express.Router();

// Routes 
router.post('/google/signup', continueWithGoogle);
// router.post('/auth/google/login', googleLogin);
router.post('/signup', signup);
router.post('/login', login);
// export const googleSignup = async (req, res) => {
//     try {
//         const { tokenId } = req.body;
//         const ticket = await client.verifyIdToken({
//             idToken: tokenId,
//             audience: CLIENT_ID,
//         });
//         const payload = ticket.getPayload();
//         const { given_name, family_name, email, picture } = payload;

//         // Check if the user already exists
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json("User already exists");
//         }

//         // Create a new user
//         const newUser = new User({
//             firstName: given_name,
//             lastName: family_name,
//             userName: `${given_name} ${family_name}`,
//             email,
//             picturePath: picture, // URL to the Google profile picture
//             status: false,
//             followers,
//             following,
//             followRequest,
//             sentRequest,
//             posts,
//             savedPosts,
//         });

//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json("Error");
//     }
// };

// /* GOOGLE LOGIN */
// export const googleLogin = async (req, res) => {
//     try {
//         const { tokenId } = req.body;
//         const ticket = await client.verifyIdToken({
//             idToken: tokenId,
//             audience: CLIENT_ID,
//         });
//         const payload = ticket.getPayload();
//         const { email } = payload;

//         // Check if the user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json("User does not exist. Please sign up.");
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//         // Remove password field from user object
//         const userWithoutPassword = { ...user._doc };
//         delete userWithoutPassword.password;

//         res.status(200).json({ user: userWithoutPassword, token });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json("Error");
//     }
// };

export default router;