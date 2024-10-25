# HackDeck_Nerd.js


# SafeRakshak

SafeRakshak provides users with a platform for reporting and visualizing safety information in urban areas. By leveraging community input, the app aims to enhance personal safety and inform users about safe travel routes based on real-time data. It is a app for the Users and Websites for server access

## Table of Contents

-   [Screenshots](#screenshots)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [User Authentication](#user-authentication)
-   [Admin Moderation](#admin-moderation)

## Website Demo

https://drive.google.com/file/d/1xsv-jtKeq2VGYJVKD-YPfEnb_JjDsmko/view


## App Demo

https://www.youtube.com/watch?v=F3TwXfgxTao


## Screenshots

# Website

![register](</assets/WhatsApp%20Image%202024-09-28%20at%202.36.03%20PM%20(2).jpeg>)
![register](</assets/WhatsApp%20Image%202024-09-28%20at%202.36.01%20PM%20(1).jpeg>)
![](/assets/WhatsApp%20Image%202024-09-28%20at%202.36.01%20PM.jpeg)  
![](/assets/WhatsApp%20Image%202024-09-28%20at%202.36.03%20PM.jpeg)
![register](</assets/WhatsApp%20Image%202024-09-28%20at%202.36.02%20PM%20(2).jpeg>)
![register](</assets/WhatsApp%20Image%202024-09-28%20at%202.36.01%20PM%20(2).jpeg>)
![](</assets/WhatsApp%20Image%202024-09-28%20at%202.36.00%20PM%20(1).jpeg>)
![](/assets/WhatsApp%20Image%202024-09-28%20at%202.36.02%20PM.jpeg)

# App

![](/assets/Screenshot_2024-09-28-14-52-32-65_f73b71075b1de7323614b647fe394240.jpg)
![](/assets/Screenshot_2024-09-28-14-52-37-81_f73b71075b1de7323614b647fe394240.jpg)
![](/assets/Screenshot_2024-09-28-14-38-44-53_f73b71075b1de7323614b647fe394240.jpg)
![](/assets/Screenshot_2024-09-28-14-38-50-25_f73b71075b1de7323614b647fe394240.jpg)
![](/assets/Screenshot_2024-09-28-14-53-25-14_f73b71075b1de7323614b647fe394240.jpg)
![](/assets/Screenshot_2024-09-28-14-53-33-19_f73b71075b1de7323614b647fe394240.jpg)
![](</assets/Screenshot_2024-09-28-14-39-02-28_f73b71075b1de7323614b647fe394240%20(1).jpg>)
![](/assets/Screenshot_2024-09-28-14-53-57-10_f73b71075b1de7323614b647fe394240.jpg)
![](/assets/Screenshot_2024-09-28-14-54-16-78_da8e1b33c587c7c6dfcf439d19f6f0d3.jpg)
![](/assets/Screenshot_2024-09-28-14-54-39-12_f73b71075b1de7323614b647fe394240.jpg)
![](/assets/Screenshot_2024-09-28-14-54-57-62_ac3737bae9ff3034c1f358df611add2a.jpg)
![](/assets/Screenshot_2024-09-28-14-55-14-70_f73b71075b1de7323614b647fe394240.jpg)
![](/assets/Screenshot_2024-09-28-14-55-18-21_f73b71075b1de7323614b647fe394240.jpg)

![](</assets/Screenshot_2024-09-28-14-40-50-57_f73b71075b1de7323614b647fe394240%20(1).jpg>)
![](/assets//Screenshot_2024-09-28-14-55-08-58_f73b71075b1de7323614b647fe394240.jpg)
![](/assets/safety.jpg)

## Features

1. **Crowdsourced Incident Reporting**

    - Users can report safety incidents in real-time, such as theft, accidents, harassment, or suspicious activity, by pinning them on a map.
    - Incidents are categorized with severity levels.
    - Option to upload photos or videos for better documentation of incidents.

2. **Safety Heatmap**
    - A dynamic heatmap shows the safety rating of different areas based on user reports, historical data, and time of day.
    - A color-coded map visualizes high-risk areas versus safer zones.

<!-- 3. **Route Safety Score**
   - Users can check the safety rating of different travel routes (walking, driving, public transit) and receive route recommendations based on safety.
   - Alerts are sent to users when they are near a recently reported unsafe area. -->

4. **Incident History & Trends**

    - Users can view historical data to see safety trends over time in specific neighborhoods.
    - The app provides insights into the most common types of incidents in different areas (e.g., vehicle theft, pickpocketing, etc.).

5. **Avoid Unsafe Zones Feature**

    - When planning a trip, users can visualize their route from source to destination on a map.

    - The app provides alternative routes that avoid high crime zones based on recent reports and historical data.
    - Users can customize their routes by selecting safer paths, even if they might be longer, and receive warnings when entering high-risk zones.

6. **Community Verification & Feedback**

    - Users can verify incidents posted by others by adding comments or voting on their validity.
    - Option to provide community feedback on the safety of a particular location (e.g., good lighting, high police presence, or crowdedness).

7. **Admins can schedule meets for naive people**

8. **Book a Ride On the App when you are in unsafe Area**

9. **Emergency Multilingual Contacts**

## Technologies Used

-   **Frontend:** React.js , React Native
-   **Backend:** Node.js, Express
-   **Database:** MongoDB
-   **Mapping:** Leaflet.js, OpenStreetMap API,GraphHopper
-   **User Authentication:** JWT

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/TeamMKA/HackDesk_Nerd.js.git
    cd HackDesk_Nerd.js
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    # For backend
    cd backend
    npm install

    # For frontend
    cd ../client
    npm install
    ```

3. Set up environment variables in a `.env` file in the server directory (use the provided `.env.example` as a reference):

    ```plaintext
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application:

    ```bash
    # Start the backend
    cd server
    npm i
    npm run dev

    # Start the frontend with a different terminal
    cd frontend
    npm i
    npm run dev
    ```

## Usage

-   Navigate to `http://localhost:5173` in your browser to access the application.
-   Users can create an account, log in throught the app , and start reporting incidents.
-   Admins can access the admin moderation panel to review reports and manage user submissions.

## User Authentication

The application includes a robust user authentication system that allows users to register and log in using secure methods. Passwords are hashed for security, and JSON Web Tokens (JWT) are used for session management.

## Admin Moderation

The admin panel allows moderators to:

-   Review and manage reported incidents.
-   Verify the authenticity of user reports.
-   Access community feedback and improve safety measures.

##
