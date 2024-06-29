# PostAway2
This is the backend apis for social media app

//Important Please add your database link in .env file and also your email and app password for sending emailusing nodemailer.

# Social Media Backend REST-API

This project is designed to create a robust social media backend REST-API using Node.js, ExpressJS, and MongoDB. The API will provide various functionalities including user management, posts, comments, likes, friend requests, and enhanced security features like OTP-based password reset.

## Features

### RESTful Architecture
- **Efficient Routing**: Develop a RESTful API for managing data and routing control using Node.js and ExpressJS.

### User Authentication
- **Authentication System**: Implement user authentication for signup, login, and logout functionalities.
- **Secure Login**: Provide enhanced security with an option to log out from all devices.

### Post Management
- **CRUD Operations**: Implement Create, Read, Update, and Delete operations for posts.
- **Owner Access**: Allow post updates and deletions only by the post owner.

### Comment System
- **Comment Functionality**: Enable users to add, update, and delete comments on posts.
- **Authorization**: Manage comment updates and deletions by the post owner or the commenter.

### Like Functionality
- **Like System**: Create a system to like posts and display like counts.
- **Populated Information**: Display user information (id, name, and email) for likes, comments, and posts.

### Friendship Features
- **Friendship System**: Implement friend-related functionalities including managing friend requests, accepting/rejecting, and fetching user friends.

### User Profile Updates
- **Profile Updates**: Allow users to update their profiles, including name, gender, or avatar uploads.

### OTP-Based Password Reset (Additional Task)
- **OTP Management**: Implement OTP-based password reset functionality for added security.

## Acceptance Criteria

### API Structure

#### Authentication Routes
- `/api/users/signup`: Register a new user account.
- `/api/users/signin`: Log in as a user.
- `/api/users/logout`: Log out the currently logged-in user.
- `/api/users/logout-all-devices`: Log out the user from all devices.

#### User Profile Routes
- `/api/users/get-details/:userId`: Retrieve user information while ensuring sensitive data is not exposed.
- `/api/users/get-all-details`: Retrieve information for all users, excluding sensitive credentials.
- `/api/users/update-details/:userId`: Update user details while securing sensitive data.
- `/api/users//avatar-upload`: Add avatar on user profile.

#### Post Routes
- `/api/posts/all`: Retrieve all posts from various users.
- `/api/posts/:postId`: Retrieve a specific post by ID.
- `/api/posts/user/:userId`: Retrieve all posts for a specific user.
- `/api/posts/create`: Create a new post.
- `/api/posts/delete/:postId`: Delete a specific post.
- `/api/posts/update/:postId`: Update a specific post.

#### Comment Routes
- `/api/comments/:postId`: Get comments for a specific post.
- `/api/comments/add/:postId`: Add a comment to a specific post.
- `/api/comments/delete/:commentId`: Delete a specific comment.
- `/api/comments/update/:commentId`: Update a specific comment.

#### Like Routes
- `/api/likes/:id`: Get likes for a specific post or comment.
- `/api/likes/toggle/:id`: Toggle like on a post or comment.

#### Friendship Routes
- `/api/friends/get-friends/:userId`: Get a user's friends.
- `/api/friends/get-pending-requests`: Get pending friend requests.
- `/api/friends/toggle-friendship/:friendId`: Toggle friendship with another user.
- `/api/friends/response-to-request/:friendId`: Accept or reject a friend request.

#### OTP Routes
- `/api/otp/send`: Send an OTP for password reset.
- `/api/otp/verify`: Verify an OTP.
- `/api/otp/reset-password`: Reset the user's password.
