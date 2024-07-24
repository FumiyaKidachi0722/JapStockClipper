# JapStockClipper

JapStockClipper is a web application designed to clip and analyze Japanese stock information using AI. This application leverages Next.js with TypeScript, NestJS for the backend, Firebase for authentication, and AWS for deployment.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

JapStockClipper is designed to help users clip, store, and analyze Japanese stock market information. The application provides user authentication, a CRUD management interface, and utilizes AI to analyze stock data.

## Features

- User Authentication (Login, Logout, Password Reset)
- CRUD Operations for Data Management
- Data Filtering, Searching, and Sorting
- AI-driven Analysis of Japanese Stock Data
- Secure Access and Permission Management
- Fully Responsive UI
- Deployment to AWS

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, HTML, CSS, SCSS
- **Backend**: NestJS, Firebase Authentication, Firebase Firestore
- **AI**: Python (for data analysis)
- **Deployment**: AWS (EC2, S3, etc.)
- **Version Control**: GitHub

## Setup and Installation

### Prerequisites

- Node.js (v18.14.2 or later)
- Yarn
- Firebase Account
- AWS Account

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/JapStockClipper.git
   ```
2. Navigate to the frontend project directory:
   ```bash
   cd JapStockClipper/frontend
   ```
3. Install the dependencies:
   ```bash
   yarn install
   ```
4. Setup Firebase:

   - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication and Firestore Database.
   - Add the Firebase configuration to your project.

5. Navigate to the backend project directory:
   ```bash
   cd ../backend
   ```
6. Install the dependencies:
   ```bash
   yarn install
   ```
7. Start the development server:

   ```bash
   yarn start:dev
   ```

8. Start the frontend development server:
   ```bash
   cd ../frontend
   yarn dev
   ```

## Usage

1. Register or log in to the application.
2. Use the dashboard to manage your stock data.
3. Utilize the AI analysis tools to gain insights on Japanese stock market trends.

## File Structure

```
JapStockClipper/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── firebaseConfig.ts
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── main.ts
│   ├── test/
│   ├── nest-cli.json
│   ├── tsconfig.json
├── ai_analysis/
│   ├── data_collection/
│   │   ├── stock_scraper.py
│   ├── ai_model/
│   │   ├── train_model.py
│   │   ├── predict.py
├── package.json
├── README.md
```

## Roadmap

1. **Phase 1: Basic Setup and Initial Development**

   - Project setup with Next.js and TypeScript
   - Authentication setup with Firebase
   - Basic CRUD operations

2. **Phase 2: CRUD Management Interface Development**

   - Firestore integration
   - UI/UX design and implementation for the management interface
   - Data validation and error handling

3. **Phase 3: AI-powered Information Clipping Tool Development**

   - Data collection scripts for Japanese stock information
   - AI model selection and training
   - Analysis result interface development

4. **Phase 4: AWS Deployment**

   - Infrastructure setup with AWS services
   - CI/CD pipeline setup for automated deployment

5. **Phase 5: Testing and Verification**

   - Functional testing
   - Security testing

6. **Phase 6: Release Preparation and Documentation**
   - Final checks and release preparation
   - Documentation creation for users and developers

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
