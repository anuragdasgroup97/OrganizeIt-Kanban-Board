---

# Kanban Board Application

## Problem Statement

The goal of this project is to develop an interactive and dynamic Kanban board application that enables users to organize and manage tasks by grouping them based on ticket status, assigned user, or priority level. Users should also be able to sort the tickets either by priority (descending) or title (ascending). The application should provide an intuitive and responsive interface using only ReactJS and pure CSS, while interacting with a provided API for real-time ticket data.

### Requirements

The application must fulfill the following requirements:

1. **Data Fetching:**
   - Fetch ticket data from the provided API (`https://api.quicksell.co/v1/internal/frontend-assignment`) and display it on the Kanban board.
   
2. **Grouping:**
   - Group tickets dynamically based on the selected option:
     - By **Status**: Organize tickets by their current status (e.g., Open, In Progress, Completed).
     - By **User**: Group tickets by the assigned user.
     - By **Priority**: Group tickets based on their priority level (Urgent, High, Medium, Low, No priority).

3. **Sorting:**
   - Allow users to sort the displayed tickets:
     - By **Priority**: Sort in descending order based on ticket priority (Urgent to Low).
     - By **Title**: Sort in ascending alphabetical order based on the title of the tickets.

4. **Controls:**
   - Provide a **Display** button to trigger the display of tickets according to the selected grouping and sorting criteria.
   - Combine the **Grouping** and **Sorting** options in a dropdown next to the Display button for user convenience.

5. **View State Persistence:**
   - Ensure that the user's selected grouping and sorting options persist even after page reloads, so that the view state is retained.

6. **Responsive UI:**
   - Implement a visually appealing and responsive UI that works on different screen sizes using pure CSS (without CSS libraries like Bootstrap or Tailwind).
   
7. **SVG Integration:**
   - Use SVG icons stored in the `assets` folder to enhance the look and feel of the application, ensuring a consistent visual theme.

8. **Component Structure:**
   - Ensure the application follows a modular component structure, promoting reusability and maintainability.
   - For instance:
     - `KanbanBoard.js`: The main component for rendering the Kanban board.
     - `TicketCard.js`: A component for rendering individual ticket cards.

### Application Structure

Your project structure should follow this layout:

```
kanban-board/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/                # Folder containing SVG assets
│   ├── components/            # React components
│   │   ├── KanbanBoard.js      # Main Kanban board component
│   │   ├── TicketCard.js       # Component for individual tickets
│   ├── App.js                 # Main entry point of the React app
│   ├── App.css                # Main styles
│   └── index.js               # ReactDOM rendering entry
│
├── package.json
└── README.md
```

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/kanban-board.git
   cd kanban-board
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```

4. **Access the Application:**
   - https://anuragorganiserapp.netlify.app/
     

### How to Use

1. On loading the application, ticket data will be fetched from the API and displayed in the default grouping (Status) and sorting (Priority).
2. Use the **Grouping** dropdown to select how you want to group the tickets:
   - Status
   - User
   - Priority
3. Use the **Sorting** dropdown to order tickets by:
   - Priority
   - Title
4. Click the **Display** button to see the changes reflected on the Kanban board.
5. The view state will be saved, so even if you refresh the page, your last grouping and sorting options will remain selected.

### Screenshots

Include relevant screenshots of your UI here to give users a preview of the application.

### Technologies Used

- **ReactJS**: For building the UI and handling state.
- **CSS**: For styling the application, ensuring a responsive and clean layout.
- **SVG**: For including scalable vector graphics for better UI design.
- **API Integration**: Fetching and displaying real-time ticket data from the provided API.

---
