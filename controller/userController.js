const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../connection/db");

//user register controller
const registerUserController = async (req, res) => {
  try {
    const { name, email, mob, address, companyName, position, password } =
      req.body;

    // Checking email if in use
    const emailCheck = "SELECT * FROM user WHERE email = ?";
    db.query(emailCheck, [email], async (err, result) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: "Something went wrong",
        });
      } else if (result.length > 0) {
        return res.status(400).send({
          success: false,
          message: `The email id ${email} is already in use, please try another id`,
        });
      } else {
        // Check mobile number already in use
        const mobCheck = "SELECT * FROM user WHERE mob = ?";
        db.query(mobCheck, [mob], async (err, result) => {
          if (err) {
            return res.status(400).send({
              success: false,
              message: "Something went wrong",
            });
          } else if (result.length > 0) {
            return res.status(400).send({
              success: false,
              message: `The mobile number ${mob} is already in use, please try another number`,
            });
          }
          //registering new
          else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const insertDetails =
              "INSERT INTO user (`name`,`email`,`mob`,`address`,`companyName`,`position`,`password`) VALUES (?,?,?,?,?,?,?)";
            const values = [
              name,
              email,
              mob,
              address,
              companyName,
              position,
              hashedPassword,
            ];
            db.query(insertDetails, values, (err, data) => {
              if (err) {
                return res.status(400).send({
                  success: false,
                  message: "Error in creating user",
                  error: err.message,
                });
              } else {
                return res.status(201).send({
                  success: true,
                  message: `details of ${name} added successfully`,
                  user: data,
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error at user registration",
      error: error.message,
    });
  }
};

//logic for login
const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail =
      "SELECT * FROM user WHERE email = (?)";
    db.query(checkEmail, [email], async (err, result) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
      if (result.length === 0) {
        return res.status(400).send({
          success: false,
          message: `No user found with the email ${email}`,
        });
      }
      const user = result[0];
      console.log(user);
      const checkPasswordMatch = await bcrypt.compare(password, user.password);
      if (checkPasswordMatch) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.status(200).send({
          success: true,
          message: "Login successful",
          user: user,
          token,
        });
      } else {
        return res.status(400).send({
          success: false,
          message: "Invalid email or password",
        });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error, error at user login part",
    });
  }
};

//logic for fetching the details of logged in user
const fetchUserDetailsController = async (req, res) => {
  try {
    console.log("api 1");
    const { id } = req.params;
    const getDetails = "SELECT * FROM user WHERE id = (?) ";
    db.query(getDetails, [id], async (error, result) => {
      if (error) {
        return res.status(400).send({
          success: false,
          message: "something went wrong",
        });
      } else if (result.length === 0) {
        return res.status(400).send({
          success: false,
          message: `no user found for the id ${id}`,
        });
      } else if (result.length > 0) {
        return res.status(200).send({
          success: true,
          message: `details of user with id ${id} fetched`,
          user: result[0],
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "internal server error. error in fetching user detail part",
      error: error.message,
    });
  }
};

module.exports = {
  registerUserController,
  userLoginController,
  fetchUserDetailsController,
};
