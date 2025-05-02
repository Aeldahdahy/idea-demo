const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const fs = require('fs');
const upload = require('../middleWare/projectMiddleware'); // Import multer middleware


require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Import models
const Contact = require('../modules/contact');
const User = require('../modules/signup');
const Otp = require('../modules/otp');
const Project = require('../modules/project');
const Blog = require('../modules/blog');
const Review = require('../modules/review');

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tahaelrajel8@gmail.com',
    pass: 'aaxv kuyj hayf flth'
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

    // Prepare payload for JWT and response
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        role: user.role, // Backend returns 'investor' or 'entrepreneur'
        clientRole: user.role.charAt(0).toUpperCase() + user.role.slice(1), // Normalized to 'Investor' or 'Entrepreneur'
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        date_of_birth: user.date_of_birth,
        national_id: user.national_id,
        education: user.education,
        experience: user.experience,
        biography: user.biography,
        image: user.image,
        status: user.status,
        firstLogin: user.firstLogin,
        investorPreference: user.investorPreference // Include investor preferences if present
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
        res.status(200).json({ 
          token, 
          user: payload.user // Return user data to frontend
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Prepare updates object with basic user fields
    const updates = {
      role: req.body.role,
      fullName: req.body.fullName,
      email: req.body.email,
      status: req.body.status,
      phone: req.body.phone,
      address: req.body.address,
      date_of_birth: req.body.date_of_birth,
      national_id: req.body.national_id,
      education: req.body.education,
      experience: req.body.experience,
      biography: req.body.biography
    };

    // Handle image upload if provided
    if (req.file) {
      updates.image = req.file.filename;
    }

    // Handle investorPreference for investors only
    if (req.body.investorPreference && req.body.role === 'investor') {
      let investorPreference;
      try {
        // Parse investorPreference from JSON string
        investorPreference = typeof req.body.investorPreference === 'string'
          ? JSON.parse(req.body.investorPreference)
          : req.body.investorPreference;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Invalid investorPreference format. Expected a valid JSON object.'
        });
      }

      // Pre-validate investorPreference fields
      const {
        investorType,
        minInvestment,
        maxInvestment,
        yearsOfExperience,
        socialAccounts,
        country,
        city,
        industries
      } = investorPreference;

      if (!['individual', 'company'].includes(investorType)) {
        return res.status(400).json({
          success: false,
          message: 'Investor type must be either "individual" or "company"'
        });
      }

      const minInvest = Number(minInvestment);
      const maxInvest = Number(maxInvestment);
      if (isNaN(minInvest) || isNaN(maxInvest)) {
        return res.status(400).json({
          success: false,
          message: 'Minimum and maximum investment must be valid numbers'
        });
      }

      if (minInvest < 0 || maxInvest > 1000000) {
        return res.status(400).json({
          success: false,
          message: 'Investment range must be between 0 and 1,000,000'
        });
      }

      if (maxInvest < minInvest) {
        return res.status(400).json({
          success: false,
          message: 'Maximum investment must be greater than or equal to minimum investment'
        });
      }

      if (!['0-1', '1-3', '3-5', '5+'].includes(yearsOfExperience)) {
        return res.status(400).json({
          success: false,
          message: 'Years of experience must be one of: 0-1, 1-3, 3-5, 5+'
        });
      }

      const validSocialAccounts = Array.isArray(socialAccounts)
        ? socialAccounts.filter(account => account.trim() !== '')
        : [];
      if (validSocialAccounts.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'At least one social account is required'
        });
      }

      if (!country || !city) {
        return res.status(400).json({
          success: false,
          message: 'Country and city are required'
        });
      }

      if (!Array.isArray(industries) || industries.length !== 3) {
        return res.status(400).json({
          success: false,
          message: 'Exactly 3 industries must be selected'
        });
      }

      // Set investorPreference in updates
      updates.investorPreference = {
        investorType,
        minInvestment: minInvest,
        maxInvestment: maxInvest,
        yearsOfExperience,
        socialAccounts: validSocialAccounts,
        country,
        city,
        industries
      };

      // Set firstLogin to false
      updates.firstLogin = false;
    } else if (req.body.role === 'entrepreneur') {
      // Ensure investorPreference is null for entrepreneurs
      updates.investorPreference = null;
    }

    // Update the user using $set to ensure atomic update
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prepare response data
    const responseData = {
      id: user._id,
      email: user.email,
      role: user.role,
      clientRole: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      fullName: user.fullName,
      phone: user.phone,
      address: user.address,
      date_of_birth: user.date_of_birth,
      national_id: user.national_id,
      education: user.education,
      experience: user.experience,
      biography: user.biography,
      image: user.image,
      status: user.status,
      firstLogin: user.firstLogin,
      investorPreference: user.investorPreference
    };

    console.log('updateUserById response:', responseData);

    // Return normalized user data
    res.status(200).json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('updateUserById error:', error);
    res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
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

// create project controller
const createProject = async (req, res) => {
  try {
    const {
      project_name, project_industry, max_investment, min_investment,
      city, state, postal_code, market_description, business_objectives,
      project_stage, networth, deal_type, website_link,
      bussiness_highlights, financial_status, business_description,
      team_overview // Don't forget to get team_overview if you're using it
    } = req.body;

    // File uploads from middleware
    const business_plan = req.files?.business_plan ? req.files.business_plan[0].path : null;
    const additional_document = req.files?.additional_document ? req.files.additional_document[0].path : null;
    const financial_statement = req.files?.financial_statement ? req.files.financial_statement[0].path : null;
    const exective_sunnary = req.files?.exective_sunnary ? req.files.exective_sunnary[0].path : null;
    const project_logo = req.files?.project_logo ? req.files.project_logo[0].path : null;
    const project_images = req.files?.project_images ? req.files.project_images.map(file => file.path) : [];

    // Get uploaded member images
    const member_images = req.files?.member_image ? req.files.member_image.map(file => file.path) : [];

    // Get user data from token
    const user_id = req.user.user.id;
    const user_name = req.user.user.fullName;

    // Build team_members array
    let team_members = [];

    if (Array.isArray(req.body.member_name)) {
      // Multiple members (member_name, member_position, etc. are arrays)
      team_members = req.body.member_name.map((_, index) => ({
        member_name: req.body.member_name[index],
        linkedin_account: req.body.linkedin_account[index],
        member_position: req.body.member_position[index],
        member_bio: req.body.member_bio[index],
        member_image: member_images[index] || null
      }));
    } else if (req.body.member_name) {
      // Single member (not an array)
      team_members.push({
        member_name: req.body.member_name,
        linkedin_account: req.body.linkedin_account,
        member_position: req.body.member_position,
        member_bio: req.body.member_bio,
        member_image: member_images[0] || null
      });
    }

    // Create new project
    const newProject = new Project({
      user_id,
      user_name,
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
      project_logo,
      project_stage,
      networth,
      deal_type,
      website_link,
      bussiness_highlights,
      financial_status,
      business_description,
      team_overview,
      team_members, // 🔥 New team_members field set
      status: 'Rejected' 
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

// Get Project by User ID Controller
const getProjectByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Get user ID from request params

    const projects = await Project.find({ user_id: userId }); // Find all projects matching the user_id

    if (!projects || projects.length === 0) {
      return res.status(404).json({ success: false, message: 'No projects found for this user' });
    }

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching projects', error: error.message });
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
      bussiness_highlights, financial_status, business_description, comment,
      team_members // expect team_members as JSON string
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
    const project_logo = req.files?.project_logo ? req.files.project_logo[0].path : project.project_logo;

    // Handle team_members update
    let parsedTeamMembers = [];
    if (team_members) {
      parsedTeamMembers = JSON.parse(team_members);

      // If there are member_image files uploaded, match them
      const memberImages = req.files?.member_image || [];

      parsedTeamMembers = parsedTeamMembers.map((member, index) => {
        return {
          member_image: memberImages[index] ? memberImages[index].path : (project.team_members[index]?.member_image || null),
          member_name: member.member_name,
          linkedin_account: member.linkedin_account,
          member_position: member.member_position,
          member_bio: member.member_bio
        };
      });
    } else {
      parsedTeamMembers = project.team_members; // If no update provided, keep the existing
    }

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
        project_logo,
        project_stage,
        networth,
        deal_type,
        website_link,
        bussiness_highlights,
        financial_status,
        business_description,
        comment,
        status: status || project.status,
        team_members: parsedTeamMembers
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

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { blog_title, blog_description } = req.body;

    if (!blog_title || !blog_description) {
      return res.status(400).json({ message: 'Blog title and description are required' });
    }

    const blog_image = req.file ? req.file.path : null;

    const newBlog = new Blog({
      blog_title,
      blog_description,
      blog_image,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      message: 'Blog created successfully',
      blog: savedBlog,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const { blog_title, blog_description, status } = req.body;

    const validStatuses = ['Active', 'Inactive'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    let blog_image = blog.blog_image;
    if (req.file) {
      if (blog.blog_image && fs.existsSync(blog.blog_image)) {
        fs.unlinkSync(blog.blog_image);
      }
      blog_image = req.file.path;
    }

    const updatedData = {
      blog_title: blog_title || blog.blog_title,
      blog_description: blog_description || blog.blog_description,
      blog_image,
      status: status || blog.status
    };

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      blog: updatedBlog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Latest first

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

// Create Review
const createReview = async (req, res) => {
  try {
    const { userId } = req.params;
    const { client_review, review_rate } = req.body;

    // Validate input
    if (!client_review || !review_rate) {
      return res.status(400).json({ error: 'client_review and review_rate are required' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create and save the review
    const newReview = new Review({
      user: userId,
      client_review,
      review_rate
    });

    await newReview.save();

    res.status(201).json({
      message: 'Review created successfully',
      review: {
        _id: newReview._id,
        client_name: user.fullName,
        client_image: user.image,
        client_review: newReview.client_review,
        review_rate: newReview.review_rate,
        createdAt: newReview.createdAt
      }
    });
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Fetch all reviews with client name and image
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'fullName image');

    const formattedReviews = reviews.map(review => ({
      _id: review._id,
      client_name: review.user.fullName,
      client_image: review.user.image,
      client_review: review.client_review,
      review_rate: review.review_rate,
      createdAt: review.createdAt
    }));

    res.status(200).json(formattedReviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
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
  getAllContacts,
  updateContactStatus,
  createProject,
  getAllProjects,
  getProjectById,
  getProjectByUserId,
  updateProject,
  deleteProject,
  updateUserById,
  createBlog,
  updateBlog,
  getAllBlogs,
  createReview,
  getAllReviews
};
