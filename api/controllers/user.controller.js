import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
  let tokenUserId = req.user?.id || req.user?._id;
  if (!tokenUserId) return next(errorHandler(401, 'Unauthorized'));

  tokenUserId = tokenUserId.toString();
  const requestedUserId = req.params?.userId?.toString();

  if (requestedUserId && tokenUserId !== requestedUserId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return next(errorHandler(400, 'No data provided'));
  }

  const updateFields = {};

  if (req.body.username !== undefined) {
    const username = req.body.username;

    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters'),
      );
    }
    if (username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!username.match(/^[a-z0-9]+$/)) {
      return next(
        errorHandler(
          400,
          'Username can only contain lowercase letters and numbers',
        ),
      );
    }

    updateFields.username = username;
  }

  if (req.body.email !== undefined) {
    updateFields.email = req.body.email;
  }

  if (req.body.profilePicture !== undefined) {
    updateFields.profilePicture = req.body.profilePicture;
  }

  if (req.body.password !== undefined) {
    if (
      typeof req.body.password !== 'string' ||
      req.body.password.trim() === ''
    ) {
    } else {
      if (req.body.password.length < 6) {
        return next(
          errorHandler(400, 'Password must be at least 6 characters'),
        );
      }
      updateFields.password = bcrypt.hashSync(req.body.password, 10);
    }
  }

  if (Object.keys(updateFields).length === 0) {
    return next(errorHandler(400, 'No valid fields to update'));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      tokenUserId,
      { $set: updateFields },
      { new: true },
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const updated = updatedUser.toObject();
    delete updated.password;
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const userWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: userWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
