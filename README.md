# Device Tracker App - Interview Task

Welcome to the Findmy interview task. This task is designed to evaluate your technical skills and problem-solving ability. Please read this document carefully before getting started.

---

## Task Overview

Your goal is to use the provided dataset to populate the `DeviceList` and `Map` components by building both a **backend** and a **frontend**. This involves:

1. **Backend**: Implement the backend using the provided Express.js template to serve the dataset via API endpoints.
2. **Frontend**: Consume these endpoints in the React application to populate the `DeviceList` and `Map` components.

---

## Instructions

### 1. Fork the Repository

- Start by forking this repository to your own GitHub account.
- Clone the forked repository to your local machine.

### 2. Backend

- Use the provided **Express.js template** located in the `/backend` directory.
- Implement the necessary API endpoints:
- Ensure proper error handling and use best practices for API development.

### 3. Frontend

#### DeviceList

- Fetch the list of devices from the **Express.js backend** and display them using **Ag Grid React**.
  - Device Name
  - Status
  - Location (latitude, longitude)
- Add functionality to filter devices based on their status (e.g., Active, Inactive).

#### Map

- Plot device locations on a map using **Mapbox GL JS**.
- Add functionality to focus and zoom to the selected device location when selecting it in the list.

### 4. Requirements

- Backend: Use the provided Express.js template, adhere to RESTful principles, and follow Node.js best practices.
- Frontend: Use **React**, **TypeScript**, and **TailwindCSS** to implement the components.
- Frontend: Use **Ag Grid React**, and **Mapbox GL JS** npm packages to implement the components.

---

## Deliverables

1. **Documentation**: Add comments in your code where necessary.
2. **Git**: Make small commits with meaningful messages.

---

## Important Dates

- **Submission Deadline**: All commits must be made by **16:00 on Friday, 3rd January**. After the deadline we will clone the repo and consider it delivered.
- Any commits made after this time will **not** be reviewed or included in the evaluation.

---

## Getting Started

### Prerequisites

- **Node.js** (v23 or higher)
- **npm** package manager (comes with Node.js)

### Installation

#### Backend

1. Navigate to the `/backend` directory:
   ```bash
   cd backend
   ```
2. Install the npm packages
   ```bash
   npm install
   ```
3. Start the Express.js application
   ```bash
   npm start
   ```

#### Frontend

1. Navigate to the `/frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the npm packages
   ```bash
   npm install
   ```
3. Start the React application
   ```bash
   npm start
   ```

## Useful documentation

- AG Grid React (https://www.ag-grid.com/react-data-grid/getting-started)
- Mapbox (https://docs.mapbox.com/mapbox-gl-js/api)
