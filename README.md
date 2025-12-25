# Facebook Graph API - User Data Viewer

A web application that retrieves and displays detailed Facebook user profiles using the Facebook Graph API. This project demonstrates practical API integration with Facebook's authentication system, data fetching, and dynamic UI rendering.

**API Used:** Facebook Graph API v18.0  
**Authentication Method:** Access Token (User/App Token)  
**Tech Stack:** HTML5, CSS3, JavaScript (ES6 Modules)

---

## 🎯 Project Overview

This project showcases:
- Real-time Facebook user data retrieval
- Access Token authentication with Facebook Graph API
- Comprehensive user profile data display
- Dynamic error handling and user feedback
- Responsive and clean UI design
- Modular JavaScript architecture with ES6 modules
- Profile picture display with image handling

---

## ⚡ Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Facebook Developer Account
- Facebook Graph API Access Token

### 5-Minute Setup

1. **Get Facebook Access Token** (3 minutes)
   - Go to [Facebook Developer Portal](https://developers.facebook.com/)
   - Create an app or select existing one
   - Navigate to "Tools" → "Graph API Explorer"
   - Select your app from the dropdown
   - Click "Generate Access Token"
   - Select permissions: `user_birthday`, `user_location`, `user_friends`, `user_photos`, `user_videos`, `user_posts`
   - Copy the generated token

2. **Update config.js** (1 minute)
   ```javascript
   // In config.js, replace:
   export const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE";
   export const BASE_URL = "https://graph.facebook.com/v18.0";
   ```

3. **Run the Project** (1 minute)
   - **Option A (VS Code):** Install Live Server extension → Right-click `index.html` → "Open with Live Server"
   - **Option B (Python):** Open terminal → `python -m http.server 8000` → Open `http://localhost:8000`
   - **Option C (Node.js):** Open terminal → `npx http-server` → Open the provided localhost URL

4. **Start Viewing User Profiles!**
   - Enter a Facebook User ID (e.g., `me` for current user, or a numeric ID)
   - Click "Fetch Posts" (or "Fetch User Data")
   - View the complete user profile with all available data

---

## 📋 API Documentation

### Base URL
```
https://graph.facebook.com/v18.0
```

### Authentication
- **Type:** Bearer Token (User/App Access Token)
- **Parameter:** `access_token={YOUR_TOKEN}`
- **Token Generation:** [Facebook Developer Tools - Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- **Required Permissions:**
  - `user_birthday` - Access user's birthday
  - `user_location` - Access user's location
  - `user_friends` - Access user's friend list
  - `user_photos` - Access user's photos
  - `user_videos` - Access user's videos
  - `user_posts` - Access user's posts
  - `email` - Access user's email address

### Endpoints

#### 1. Get User Data
**Endpoint:** `GET /{user-id}`

**Description:** Retrieve comprehensive user profile information including personal details, media, relationships, and activities.

**Required Parameters:**
- `user-id` (path parameter) - Facebook User ID or "me" for current authenticated user
- `fields` (query parameter) - Comma-separated list of fields to retrieve
- `access_token` (query parameter) - Valid Facebook Access Token

**Available Fields:**
```
id, name, birthday, hometown, location, likes, events, photos, videos, 
friends, posts, gender, link, age_range, email, picture
```

**Example Request:**
```bash
curl -X GET "https://graph.facebook.com/v18.0/me?fields=id,name,email,picture&access_token=YOUR_TOKEN"
```

**Current Implementation (in api.js):**
```javascript
export async function getUserData(userId) {
  const fields = [
    "id",
    "name",
    "birthday",
    "hometown",
    "location",
    "likes",
    "events",
    "photos",
    "videos",
    "friends",
    "posts",
    "gender",
    "link",
    "age_range",
    "email",
    "picture"
  ].join(",");

  const url = `${BASE_URL}/${userId}?fields=${fields}&access_token=${ACCESS_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Facebook API request failed");
  }

  return data;
}
```

**Sample Response:**
```json
{
  "id": "123456789",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "birthday": "01/15/1990",
  "gender": "male",
  "age_range": {
    "min": 18,
    "max": 24
  },
  "hometown": {
    "id": "1234",
    "name": "New York, New York"
  },
  "location": {
    "id": "5678",
    "name": "San Francisco, California"
  },
  "picture": {
    "data": {
      "height": 50,
      "is_silhouette": false,
      "url": "https://platform-lookaside.fbsbx.com/...",
      "width": 50
    }
  },
  "friends": {
    "data": [
      {
        "name": "Jane Smith",
        "id": "987654321"
      }
    ],
    "summary": {
      "total_count": 250
    }
  },
  "posts": {
    "data": [
      {
        "message": "Having a great day!",
        "created_time": "2024-12-20T10:30:00+0000",
        "id": "123_456"
      }
    ],
    "summary": {
      "total_count": 45
    }
  },
  "photos": {
    "data": [
      {
        "created_time": "2024-12-15T14:22:00+0000",
        "id": "789_012"
      }
    ],
    "summary": {
      "total_count": 120
    }
  }
}
```

**Fields Displayed in UI:**
- `name` - User's full name
- `email` - Email address
- `birthday` - User's birthday
- `gender` - Gender
- `age_range` - Age range (min-max)
- `hometown` - Hometown location
- `location` - Current location
- `picture` - Profile picture (circular display)
- `friends.data.length` - Friend count
- `posts.data.length` - Post count
- `photos.data.length` - Photo count
- `videos.data.length` - Video count
- `likes.data.length` - Likes count
- `events.data.length` - Events count
- `link` - Direct link to Facebook profile

---

#### 2. Get Page Posts (Bonus)
**Endpoint:** `GET /{page-id}/posts`

**Description:** Retrieve posts from a Facebook page.

**Required Parameters:**
- `page-id` (path parameter) - Facebook Page ID
- `fields` (query parameter) - Fields to retrieve (e.g., `message,created_time`)
- `access_token` (query parameter) - Valid Access Token

**Example Request:**
```bash
curl -X GET "https://graph.facebook.com/v18.0/YOUR_PAGE_ID/posts?fields=message,created_time&access_token=YOUR_TOKEN"
```

**Current Implementation (in api.js):**
```javascript
export async function getPagePosts(pageId) {
  const url = `${BASE_URL}/${pageId}/posts?fields=message,created_time&access_token=${ACCESS_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Facebook API request failed");
  }

  return data;
}
```

**Future Use:** Can be extended to display page posts in a feed format.

---

## 🔐 Error Handling

The application handles various error scenarios:

| Error Type | Likely Cause | Solution |
|-----------|--------------|----------|
| **Invalid Access Token** | Expired or revoked token | Generate new token from Graph API Explorer |
| **User Not Found** | Invalid user ID or private profile | Verify user ID or check privacy settings |
| **Insufficient Permissions** | Token lacks required scopes | Request additional permissions for token |
| **Rate Limited** | Too many API requests | Wait before making more requests |
| **Invalid Request** | Malformed request parameters | Check fields parameter syntax |

**Error Handling Code (in script.js):**
```javascript
try {
  const data = await getUserData(userId);
  if (!data || Object.keys(data).length === 0) {
    showError("No user data found");
  } else {
    displayUserData(data);
  }
} catch (error) {
  showError(error.message);
}
```

---

## 🎨 UI/UX Features

### Input Validation
- ✅ Empty input check: "User ID cannot be empty"
- ✅ Whitespace trimming: Removes leading/trailing spaces
- ✅ Button disabled during API calls: Prevents duplicate requests
- ✅ Enter key support: Press Enter to fetch data

### Loading State
- "Loading..." message display
- Button disabled to prevent multiple submissions
- Visual feedback during data fetch

### Error Display
- Red background error container
- Clear error messages from Facebook API
- Contextual error descriptions

### Results Display
- User card with clean layout
- Profile picture (circular, 150px)
- Organized information display:
  - Personal details (name, email, birthday, gender, age range)
  - Location information (hometown, current location)
  - Profile link to Facebook
  - Statistics (friends count, posts, photos, videos, likes, events)
- Responsive card layout

### Responsive Design

| Screen Size | Breakpoint | Layout |
|-------------|-----------|--------|
| Desktop | > 768px | Centered card with full width |
| Tablet | 480px - 768px | Adjusted card width |
| Mobile | < 480px | Full-width stack |

---

## 📁 Project Structure

```
api-fb-group-project/
├── index.html          # Main HTML structure with semantic markup
├── style.css           # Responsive styling with mobile-first approach
├── script.js           # Main application logic (data fetch handler)
├── api.js              # Facebook Graph API functions
├── config.js           # Configuration (token placeholder)
├── dom.js              # DOM manipulation and rendering functions
├── README.md           # This file
└── .vscode/            # VS Code workspace settings (optional)
```

### File Purposes

| File | Purpose |
|------|---------|
| **index.html** | Structure with user ID input, fetch button, results/error display |
| **style.css** | Responsive styling, card layouts, loading states, error display |
| **script.js** | Event listeners, input validation, error handling orchestration |
| **api.js** | Facebook Graph API endpoint functions with error handling |
| **config.js** | API token and base URL configuration |
| **dom.js** | User data card rendering and DOM manipulation functions |

---

## 🔄 Data Flow Architecture

```
┌─────────────────────┐
│   User Input        │ (Facebook User ID)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────┐
│  Input Validation       │ (script.js)
│  - Not empty            │
│  - Trim whitespace      │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  Show Loading State     │ (dom.js)
│  - Display "Loading"    │
│  - Disable button       │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  API Request            │ (api.js)
│  - Build URL with fields│
│  - Add auth token       │
│  - Encode parameters    │
└──────────┬──────────────┘
           │
           ▼
┌──────────────────────────┐
│  Facebook Graph API      │
│  Endpoint: /{user-id}    │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Response Handling       │ (api.js)
│  - Check status code     │
│  - Parse JSON response   │
│  - Extract error message │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Display Result or Error │ (dom.js)
│  - Render user card OR   │
│  - Show error message    │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Hide Loading State      │ (dom.js)
│  - Remove "Loading"      │
│  - Re-enable button      │
└──────────────────────────┘
```

---

## 👥 Team Collaboration Roles

| Role | Responsibility | Files |
|------|-----------------|-------|
| **API & Authentication Handler** | Setup Facebook API, manage tokens, test endpoints, handle permissions | `api.js`, `config.js` |
| **JavaScript Logic Developer** | Implement fetch logic, validation, error handling, async operations | `script.js`, `api.js` |
| **UI/UX & Frontend Designer** | Responsive layouts, styling, animations, card design | `style.css`, `index.html`, `dom.js` |
| **Documentation & Testing Manager** | Write documentation, test scenarios, manage GitHub repository | `README.md`, testing |

---

## 🤝 GitHub Workflow for Team Collaboration

### Repository Setup
1. One member creates GitHub repository
2. Add all team members as collaborators
3. Clone repository: `git clone <repo-url>`
4. Install dependencies (if any): `npm install`

### Development Workflow

#### 1. Create Feature Branch
```bash
git checkout -b feature/api-integration
```

Branch naming convention:
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code improvements

#### 2. Make Changes & Commit
```bash
git add .
git commit -m "feat: add Facebook user data fetching"
```

Commit message format:
```
feat: add new feature
fix: resolve bug
docs: update documentation
refactor: improve code
style: fix formatting
test: add test cases
```

#### 3. Push to Remote
```bash
git push origin feature/api-integration
```

#### 4. Create Pull Request
- Go to GitHub repository
- Click "New Pull Request"
- Compare your branch with `main`
- Add descriptive title and description
- Request reviews from team members

#### 5. Code Review & Merge
- Team members review code
- Request changes or approve
- Once approved, merge to `main`
- Delete feature branch

#### 6. Pull Latest Changes
```bash
git checkout main
git pull origin main
```

### Handling Merge Conflicts
```bash
git pull origin main
# Resolve conflicts in files
git add .
git commit -m "resolve merge conflicts"
git push origin feature/branch-name
```

---

## 🧪 Testing with Postman

### Setup Postman for Facebook Graph API

1. **Create New Request**
   - Method: GET
   - URL: `https://graph.facebook.com/v18.0/me?fields=id,name,email,picture`

2. **Add Query Parameters**
   - Key: `access_token`
   - Value: Your Facebook Access Token

3. **Test User Data Endpoint**
   - Expected Status: `200 OK`
   - Response includes user object with all requested fields

### Test Different User IDs
```
https://graph.facebook.com/v18.0/{USER_ID}?fields=id,name,email&access_token=YOUR_TOKEN
```

Replace `{USER_ID}` with:
- `me` - Current authenticated user
- Numeric ID (e.g., `123456789`) - Specific user

### Test Error Scenarios

#### 401 Invalid Token
- Use expired or invalid token
- Expected Response: Error with `"code": 400`

#### 404 User Not Found
- Use non-existent user ID
- Expected Response: Error with `"code": 100`

#### 403 Insufficient Permissions
- Use token without required scopes
- Expected Response: Error with `"code": 200`

---

## 🔄 Troubleshooting

### Token Issues
**Problem:** "Invalid Access Token" error  
**Solutions:**
- Verify token hasn't expired
- Generate new token from [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- Ensure token has required permissions
- Check token is pasted correctly in `config.js`

### User Not Found
**Problem:** "User not found" or no data displayed  
**Solutions:**
- Verify Facebook User ID is correct
- Check user's privacy settings (profile must be public)
- Try with `me` to fetch current user data
- Ensure token has `user_birthday`, `user_location` permissions

### Permission Errors
**Problem:** "User hasn't authorized app" or "Insufficient permissions"  
**Solutions:**
- Generate new token with all required scopes
- Request additional permissions in token generation
- Ensure app is properly configured in Facebook Developer Portal

### CORS Error
**Problem:** "No 'Access-Control-Allow-Origin' header"  
**Solutions:**
- Use a local server (Live Server, http-server, Python)
- Don't open `index.html` directly
- Facebook Graph API supports CORS for browser requests

### No Profile Picture
**Problem:** Profile picture doesn't display  
**Solutions:**
- User may have private photo settings
- Check browser console for image loading errors
- Ensure `picture` field is included in API request

---

## 📚 Resources & Documentation

- **Facebook Graph API:** [Official Documentation](https://developers.facebook.com/docs/graph-api/)
- **Access Tokens:** [Authentication Guide](https://developers.facebook.com/docs/facebook-login/access-tokens)
- **User Fields:** [User Object Reference](https://developers.facebook.com/docs/graph-api/reference/user/)
- **Graph API Explorer:** [Interactive Testing Tool](https://developers.facebook.com/tools/explorer/)
- **Fetch API:** [MDN Fetch Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- **ES6 Modules:** [JavaScript Modules Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

---

## 🚀 Future Enhancement Ideas

### Phase 1 (Easy)
- [ ] Display all user's friends with avatars
- [ ] Show user's recent posts with timestamps
- [ ] Add photo gallery view (thumbnails)
- [ ] Display video list with counts
- [ ] Show likes and events information
- [ ] Add "View on Facebook" button

### Phase 2 (Medium)
- [ ] Implement multiple user comparison view
- [ ] Add search functionality for user lookup
- [ ] Create timeline view of user posts
- [ ] Add filters (date range, content type)
- [ ] Cache recent searches
- [ ] Implement pagination for large datasets

### Phase 3 (Advanced)
- [ ] Build a backend to securely manage tokens
- [ ] Implement user authentication flow
- [ ] Create social network visualization
- [ ] Add advanced filtering and analytics
- [ ] Deploy to production (Heroku, AWS, Firebase)
- [ ] Implement real-time updates with webhooks

---

## 📄 License & Attribution

This project is created for educational purposes as part of an API Group Project assignment.

**Created:** December 2025  
**Last Updated:** December 25, 2025  
**Version:** 1.0.0  
**API Version:** Facebook Graph API v18.0

---

## ✅ Checklist for Running the Project

- [ ] Created Facebook Developer Account
- [ ] Generated Facebook Access Token with required permissions
- [ ] Updated `config.js` with actual token
- [ ] Started local server (Live Server / http-server / Python)
- [ ] Opened project in browser
- [ ] Tested with own user ID (`me`)
- [ ] Tested with different user IDs
- [ ] Verified user profile card displays correctly
- [ ] Tested error handling (invalid token, user not found)
- [ ] Checked responsive design on mobile/tablet
- [ ] Verified all team contributions
- [ ] Committed final changes to GitHub

---

## 📞 Common Facebook User IDs for Testing

| ID | Description |
|---|---|
| `me` | Current authenticated user |
| `123456789` | Example numeric user ID |
| `facebook` | Facebook's official page |
| `meta` | Meta Platforms official page |

*Note: Only public profiles will return data. Private profiles will return an error.*
