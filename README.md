# TourVibes 

TourVibes is a dynamic tour booking website developed to streamline the process of booking tours with role-based functionalities for admins and users. This project aims to enhance operational efficiency and provide a seamless user experience.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

TourVibes is designed to cater to both users and administrators with distinct functionalities, making the booking process efficient and user-friendly. The implementation of role-based access controls ensures that each user interacts with the platform according to their permissions.

## Features

- **Role-Based Access Control**: Different functionalities for admin and user roles.
- **Efficient Booking System**: Streamlined tour booking process.
- **Task Management**: Utilized Trello for enhanced team productivity.
- **Robust Testing**: Achieved high system stability with manual and automated testing using Selenium.

## Technologies

- **Frontend**: ReactJS, CSS, Bootstrap
- **Backend**: NodeJS
- **Database**: MongoDB
- **Task Management**: Trello
- **Testing**: Selenium

## Setup

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/TourVibes.git
   cd TourVibes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your MongoDB connection string and other necessary environment variables.

   ```env
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application in action.

## Usage

### User Role

- **Browse Tours**: Users can view available tours.
- **Book Tours**: Users can book tours and receive confirmations.

### Admin Role

- **Manage Tours**: Admins can add, edit, or delete tours.
- **View Bookings**: Admins can view all bookings made by users.

## Testing

We implemented both manual and automated testing to ensure the stability and reliability of the system.

- **Automated Testing**: Using Selenium for end-to-end testing.
- **Manual Testing**: Conducted various test cases to cover different user scenarios.

To run automated tests:

```bash
npm test
```

## Contributing

Contributions are what make the open source community such an amazing place to be, learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch (`git checkout -b feature/AmazingFeature`)**
3. **Commit your Changes (`git commit -m 'Add some AmazingFeature'`)**
4. **Push to the Branch (`git push origin feature/AmazingFeature`)**
5. **Open a Pull Request**

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- **Your Name** - [your-email@example.com](mailto:your-email@example.com)
- **Project Link**: [https://github.com/your-username/TourVibes](https://github.com/your-username/TourVibes)

---

Feel free to adjust any section or add more details as needed!


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
