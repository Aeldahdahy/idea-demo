const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const upload = require('../middleWare/projectMiddleware'); // Import multer middleware


require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Import models
const Contact = require('../modules/contact');
const User = require('../modules/signup');
const Otp = require('../modules/otp');
const Project = require('../modules/project');

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tahaelrajel8@gmail.com',
    pass: 'bwdj iofo hirn vqmx'
  }
});

// Generate OTP
const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4-character OTP
};

const createContact = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;

    // Create a new contact instance
    const newContact = new Contact({ fullname, email, message });

    // Save the contact to the database
    await newContact.save();

    res.status(201).send({ message: 'Contact message received successfully' });
  } catch (error) {
    let errors = {};
    if (error instanceof mongoose.Error.ValidationError) {
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
    } else {
      errors['general'] = 'An error occurred while saving the contact message';
    }
    res.status(400).send(errors);
  }
};

const signUp = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const otp = generateOtp();
    const otpEntry = new Otp({ email, otp });
    await otpEntry.save();

    const mailOptions = {
      from: 'tahaelrajel8@gmail.com',
      to: email,
      subject: 'Your OTP for Signup',
      text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send OTP!' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'OTP sent to email.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp, role, fullName, password } = req.body;

  try {
    const otpEntry = await Otp.findOne({ email, otp });

    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP!' });
    }

    const newUser = new User({ email, password, role, fullName });

    try {
      await newUser.save();
      await Otp.deleteMany({ email });
      res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
      let errors = {};
      if (error instanceof mongoose.Error.ValidationError) {
        for (let field in error.errors) {
          errors[field] = error.errors[field].message;
        }
      } else if (error.code === 11000) {
        errors['email'] = 'Email already exists!';
      } else {
        errors['general'] = 'An error occurred during registration';
      }
      res.status(400).json(errors);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
};

const signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the user status is inactive
    if (user.status !== 'Active') {
      return res.status(403).json({ message: 'Access denied. User is inactive.' });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        status: user.status
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to generate token' });
        }
        req.session.user = payload.user; // Save user info in session
        res.status(200).json({ token });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const signOut = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Failed to destroy session:', err);
      return res.status(500).json({ message: 'Failed to sign out' });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid', { path: '/' }); // Ensure path matches the cookie's path option
    res.status(200).json({ message: 'Signed out successfully' });
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist!' });
    }

    const otp = generateOtp();
    const otpEntry = new Otp({ email, otp });
    await otpEntry.save();

    const mailOptions = {
      from: 'tahaelrajel8@gmail.com',
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send OTP!' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'OTP sent to email.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
};

const verifyOtpForReset = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid OTP!' });
    }

    // Perform password reset here
    res.status(200).json({ message: 'OTP verified successfully! You can now reset your password.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });
    await Otp.deleteMany({ email });
    res.status(200).json({ message: 'Password reset successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error!' });
  }
};

// Get All Users (Clients) for Admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
  }
};


// update User (Client) for Admin only
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
  }
};

// Get all contact messages
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contact messages', error: error.message });
  }
};

// update contact message status
const updateContactStatus = async (req, res) => {
  try {
    const { contactId } = req.params; // Get contact ID from request params
    const { status } = req.body; // Get new status from request body

    if (!['Pending', 'Replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(contactId, { status }, { new: true, runValidators: true });

    if (!updatedContact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    res.status(200).json({ success: true, message: 'Contact status updated', data: updatedContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating contact status', error: error.message });
  }
};

// Create Project Controller
const createProject = async (req, res) => {
  try {
    const {
      project_name, project_industry, max_investment, min_investment,
      city, state, postal_code, market_description, business_objectives,
      project_stage, networth, deal_type, website_link,
      bussiness_highlights, financial_status, business_description
    } = req.body;

    // File uploads from middleware
    const business_plan = req.files?.business_plan ? req.files.business_plan[0].path : null;
    const additional_document = req.files?.additional_document ? req.files.additional_document[0].path : null;
    const financial_statement = req.files?.financial_statement ? req.files.financial_statement[0].path : null;
    const exective_sunnary = req.files?.exective_sunnary ? req.files.exective_sunnary[0].path : null;
    const project_images = req.files?.project_images ? req.files.project_images.map(file => file.path) : [];

    // Create new project
    const newProject = new Project({
      project_name,
      project_industry,
      max_investment,
      min_investment,
      city,
      state,
      postal_code,
      market_description,
      business_objectives,
      business_plan,
      additional_document,
      financial_statement,
      exective_sunnary,
      project_images,
      project_stage,
      networth,
      deal_type,
      website_link,
      bussiness_highlights,
      financial_status,
      business_description,
      status: 'Rejected' // Default status override
    });

    await newProject.save();
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// Get All Projects Controller
const getAllProjects = async (req, res) => {
  try {
      const projects = await Project.find(); // Fetch all projects from the database
      res.status(200).json({ success: true, data: projects });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching projects', error: error.message });
  }
};

// Get Project by ID Controller
const getProjectById = async (req, res) => {
  try {
      const { projectId } = req.params; // Get project ID from request params
      const project = await Project.findById(projectId);

      if (!project) {
          return res.status(404).json({ success: false, message: 'Project not found' });
      }

      res.status(200).json({ success: true, data: project });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching project', error: error.message });
  }
};

// Update Project Controller
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    let {
      project_name, project_industry, max_investment, min_investment,
      city, state, postal_code, market_description, business_objectives,
      status, project_stage, networth, deal_type, website_link,
      bussiness_highlights, financial_status, business_description, comment
    } = req.body;

    // Validate status
    const validStatuses = ['Approved', 'Rejected'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    // Find the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Handle file uploads
    const business_plan = req.files?.business_plan ? req.files.business_plan[0].path : project.business_plan;
    const additional_document = req.files?.additional_document ? req.files.additional_document[0].path : project.additional_document;
    const financial_statement = req.files?.financial_statement ? req.files.financial_statement[0].path : project.financial_statement;
    const exective_sunnary = req.files?.exective_sunnary ? req.files.exective_sunnary[0].path : project.exective_sunnary;
    const project_images = req.files?.project_images ? req.files.project_images.map(file => file.path) : project.project_images;

    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        project_name,
        project_industry,
        max_investment,
        min_investment,
        city,
        state,
        postal_code,
        market_description,
        business_objectives,
        business_plan,
        additional_document,
        financial_statement,
        exective_sunnary,
        project_images,
        project_stage,
        networth,
        deal_type,
        website_link,
        bussiness_highlights,
        financial_status,
        business_description,
        comment, // Added comment field
        status: status || project.status
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// Delete Project by ID Controller
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params; // Get project ID from request params

        // Find the project
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // Delete files (business plan, additional document, images)
        if (project.business_plan) fs.unlinkSync(project.business_plan);
        if (project.additional_document) fs.unlinkSync(project.additional_document);
        if (project.project_images) {
            project.project_images.forEach(imagePath => {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            });
        }

        // Delete project from database
        await Project.findByIdAndDelete(projectId);

        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting project', error: error.message });
    }
};



module.exports =
{
  createContact,
  signUp,
  signIn,
  signOut,
  verifyOtp,
  forgotPassword,
  verifyOtpForReset,
  resetPassword,
  getAllUsers,
  updateUser,
  getAllContacts,
  updateContactStatus,
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
};
