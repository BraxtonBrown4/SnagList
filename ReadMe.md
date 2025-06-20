# SnagList

**SnagList** is a list manager app that lets you keep track of items you want to buy. You can also browse other people’s lists if they’ve set them to public. The app uses modern technologies including JavaScript, React, Tailwind CSS, AutoMapper, and C# for a full-stack experience.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Server Details](#server-details)
- [Client Details](#client-details)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contact](#contact)

---

## Project Overview

SnagList is built to help users organize and share shopping lists. You can:
- Create and manage your own lists of items to buy.
- Browse and view lists from others who make them public.

The backend is an ASP.NET Core Web API using .NET 8.0, PostgreSQL, and Entity Framework Core. The frontend is a React app styled with Tailwind CSS and built with Vite.

---

## Features

- Create, read, update, and delete your shopping lists and items
- Set lists as public or private
- View other users’ public lists
- User authentication and authorization
- Interactive API documentation with Swagger

---

## Tech Stack

- **Frontend:** JavaScript, React 19, React Router DOM, Tailwind CSS, Vite
- **Backend:** C#, ASP.NET Core Web API, .NET 8.0
- **Database:** PostgreSQL with Entity Framework Core
- **Mapping:** AutoMapper for DTO and model conversions
- **Authentication:** ASP.NET Core Identity
- **API Documentation:** Swagger (Swashbuckle)

---

## File Structure

<details>
<summary>Click to expand full directory structure</summary>

```plaintext
SnagList/
├── client/                         # React frontend source code
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── AllLists.jsx
│   │   │   ├── ApplicationViews.jsx
│   │   │   ├── EditList.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── ListDetails.jsx
│   │   │   ├── MyLists.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── NewList.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Tags.jsx
│   │   ├── managers/
│   │   │   ├── authManager.js
│   │   │   ├── itemManager.js
│   │   │   ├── listManager.js
│   │   │   ├── listTagManager.js
│   │   │   ├── tagManager.js
│   │   │   └── userProfileManager.js
│   │   ├── modals/
│   │   │   ├── AddItemModal.jsx
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── EditItemModal.jsx
│   │   │   └── TagsModal.jsx
│   │   └── ...
└── server/                         # ASP.NET Core backend API
    ├── .gitignore
    ├── appsettings.Development.json
    ├── appsettings.json
    ├── AutoMapperProfiles.cs
    ├── Program.cs
    ├── SnagList.csproj
    ├── SnagList.sln
    ├── Controllers/
    │   ├── AuthController.cs
    │   ├── ItemController.cs
    │   ├── ListController.cs
    │   ├── ListTagController.cs
    │   ├── TagController.cs
    │   └── UserProfileController.cs
    ├── Data/
    │   └── SnagListDbContext.cs
    ├── DTOs/
    │   ├── ItemDTOs/
    │   │   └── DefaultItemDTO.cs
    │   ├── ListDTOs/
    │   │   ├── DefaultListDTO.cs
    │   │   └── DetailedListDTO.cs
    │   ├── ListTagDTOs/
    │   │   ├── CreateListTagDTO.cs
    │   │   ├── DefaultListTagDTO.cs
    │   │   └── DetailedtListTagDTO.cs
    │   ├── TagDTOs/
    │   │   └── DefaultTagDTO.cs
    │   └── UserProfileDTOs/
    │       ├── DefaultUserProfileDTO.cs
    │       ├── DetailedUserProfileDTO.cs
    │       ├── RegistrationDTO.cs
    │       └── UserProfileDTO.cs
    ├── Migrations/
    │   ├── 20250609134605_initial.cs
    │   ├── 20250609134605_initial.Designer.cs
    │   └── SnagListDbContextModelSnapshot.cs
    ├── Models/
    │   ├── Item.cs
    │   ├── List.cs
    │   ├── ListTag.cs
    │   ├── Tag.cs
    │   └── UserProfile.cs
    └── Properties/
        └── launchSettings.json
```

</details>

## Getting Started

Follow these instructions to run both the frontend and backend locally.

---

### Prerequisites

Make sure the following tools are installed:

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js and npm](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)

---

### Server Setup (ASP.NET Core API)

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Configure user secrets:**

   ```bash
   dotnet user-secrets init

   dotnet user-secrets set "SnagListDbConnectionString" "Host=localhost;Database=SnagListDb;Username=postgres;Password=yourpassword"
   dotnet user-secrets set "AdminPassword" "your-secure-admin-password"
   ```

   **Note:** Replace `"yourpassword"` and `"your-secure-admin-password"` with your actual PostgreSQL password and desired admin password. This step is optional if you configure the connection string and admin password through other means.

3. **Restore dependencies:**

   ```bash
   dotnet restore
   ```

4. **Build the project:**

   ```bash
   dotnet build
   ```

5. **Run the API:**

   ```bash
   dotnet run
   ```

The API will be available at `https://localhost:5001`.

---

### Client Setup (React Frontend)

1. **Navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

---

## Configuration

### Server Configuration

The server uses `appsettings.json` for configuration. Key settings include:

- `ConnectionStrings:DefaultConnection`: Specifies the PostgreSQL database connection string.
- `Logging:LogLevel:Default`: Configures the default logging level.

### Client Configuration

The client uses environment variables for configuration. Key settings include:

- `VITE_API_URL`: Specifies the URL of the backend API.

---

## Usage

- **Register:** Create a new user account to start using SnagList.
- **Login:** Log in with your credentials to access your lists.
- **Create Lists:** Add new shopping lists and manage items.
- **Edit Lists:** Modify existing lists and their items.
- **Add Tags to Lists:** Categorize lists with relevant tags.
- **Browse Public Lists:** View lists created by other users.
- **View Profiles:** See other users' profiles.
- **Edit Profiles:** Update your own profile information.

---

## Contact

For questions or feedback, please contact [braxtoncarterbrown@gmail.com](mailto:braxtoncarterbrown@gmail.com).

---