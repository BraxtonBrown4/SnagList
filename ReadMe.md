```markdown
# SnagList

**SnagList** is a list manager app that lets you keep track of items you want to buy. You can also browse other people's lists if they've set them to public. The app uses modern technologies including JavaScript, React, Tailwind CSS, AutoMapper, and C# for a full-stack experience.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Packages](#backend-packages)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Server Details](#server-details)
- [Client Details](#client-details)
- [Configuration](#configuration)
- [eBay Integration Setup](#ebay-integration-setup)
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

- Create, read, update, and delete shopping lists and items
- Set lists as public or private
- View other users' public lists
- User authentication and authorization
- Interactive API documentation with Swagger
- Tag management for lists
- React Query for data fetching and caching
- eBay integration for notifications (requires additional setup)

---

## Tech Stack

- **Frontend:** JavaScript, React 19, React Router DOM v7, Tailwind CSS, Vite
- **Backend:** C#, ASP.NET Core Web API, .NET 8.0
- **Database:** PostgreSQL with Entity Framework Core
- **ORM:** Entity Framework Core
- **Mapping:** AutoMapper
- **Authentication:** ASP.NET Core Identity
- **API Documentation:** Swagger (Swashbuckle)
- **Query Library:** React Query
- **Packages:** Npgsql.EntityFrameworkCore.PostgreSQL

---

## Backend Packages

| Package | Version | Description |
|---------|---------|-------------|
| AutoMapper | 14.0.0 | Object-to-object mapping, commonly used to map between models and DTOs. |
| FluentResults | 3.16.0 | Simplifies result and error handling with a functional approach. |
| Microsoft.AspNetCore.Identity.EntityFrameworkCore | 8.0 | ASP.NET Core Identity support integrated with Entity Framework Core. |
| Microsoft.EntityFrameworkCore.Design | 8.0 | Design-time tools for EF Core (e.g., migrations, scaffolding). |
| Npgsql.EntityFrameworkCore.PostgreSQL | 8.0 | PostgreSQL database provider for Entity Framework Core. |
| Swashbuckle.AspNetCore | 8.1.4 | Generates Swagger/OpenAPI documentation for your ASP.NET Core APIs. |

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
│   │   └── modals/
│   │       ├── AddItemModal.jsx
│   │       ├── DeleteModal.jsx
│   │       ├── EditItemModal.jsx
│   │       └── TagsModal.jsx
│   └── ...
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
    │   │   └── DetailedListTagDTO.cs
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

## Components

- **AllLists.jsx:** Displays a list of all public lists.
- **MyLists.jsx:** Displays a list of the current user's lists.
- **ListDetails.jsx:** Displays the details of a specific list.
- **NewList.jsx:** Allows the user to create a new list.
- **EditList.jsx:** Allows the user to edit an existing list.
- **AuthController.cs:** Handles user authentication and registration.
- **ListController.cs:** Handles the creation, retrieval, updating, and deletion of lists.

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

2. **Initiate user secrets:**

   ```bash
   dotnet user-secrets init

   dotnet user-secrets set "SnagListDbConnectionString" "Host=localhost;Database=SnagListDb;Username=postgres;Password=yourpassword"
   dotnet user-secrets set "AdminPassword" "your-secure-admin-password"
   ```

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

## eBay Integration Setup

**Important:** The notification features in SnagList require eBay API integration. Without proper eBay configuration, notification functionality will not work.

### Prerequisites for eBay Integration

1. **eBay Developer Account**: You must have an active eBay Developer account
2. **eBay Developer Project**: Create a project in your eBay Developer dashboard
3. **Client Credentials**: Obtain your Client ID and Client Secret from your eBay project

### Configuration Steps

1. **Set up eBay User Secrets** (required for notifications):

   ```bash
   dotnet user-secrets set "Ebay:ClientId" "your-ebay-client-id"
   dotnet user-secrets set "Ebay:ClientSecret" "your-ebay-client-secret"
   ```

2. **eBay Developer Account Setup**:
   - Visit [eBay Developers Program](https://developer.ebay.com/)
   - Sign up for a developer account or log in
   - Create a new application/project
   - Note your Client ID and Client Secret from the application details

### Important Notes

- **Notifications will not function** without proper eBay API credentials
- The eBay Client ID and Client Secret must be stored as user secrets (not in configuration files)
- Ensure your eBay developer account is in good standing and your application is properly configured
- Different eBay environments (sandbox vs production) require different credentials

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
- **Notifications:** Receive eBay-powered notifications (requires eBay integration setup).

---

## Contact

For questions or feedback, please contact [braxtoncarterbrown@gmail.com](mailto:braxtoncarterbrown@gmail.com).

---
```