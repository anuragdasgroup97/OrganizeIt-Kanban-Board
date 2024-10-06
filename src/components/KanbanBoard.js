import React, { useState, useEffect } from 'react';
import './KanbanBoard.css'; 
import TicketCard from './TicketCard'; 
import display from '../assest/Display.svg'; 
import dotMenuIcon from '../assest/3 dot menu.svg';
import addIcon from '../assest/add.svg';
import BacklogIcon from '../assest/Backlog.svg';
import cancelledIcon from '../assest/Cancelled.svg';
import DoneIcon from '../assest/Done.svg';
import highPriorityIcon from '../assest/Img - High Priority.svg';
import lowPriorityIcon from '../assest/Img - Low Priority.svg';
import mediumPriorityIcon from '../assest/Img - Medium Priority.svg';
import noPriorityIcon from '../assest/No-priority.svg';
import inProgressIcon from '../assest/in-progress.svg';
import urgentPriorityColorIcon from '../assest/SVG - Urgent Priority colour.svg';
import todoIcon from '../assest/To-do.svg';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]); 
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [displayedTickets, setDisplayedTickets] = useState([]);

  const statuses = [
    { label: 'Backlog', icon: BacklogIcon },
    { label: 'Todo', icon: todoIcon },
    { label: 'In progress', icon: inProgressIcon },
    { label: 'Done', icon: DoneIcon },
    { label: 'Cancelled', icon: cancelledIcon },
  ];

  const priorityLevels = {
    4: { label: 'Urgent', icon: urgentPriorityColorIcon },
    3: { label: 'High', icon: highPriorityIcon },
    2: { label: 'Medium', icon: mediumPriorityIcon },
    1: { label: 'Low', icon: lowPriorityIcon },
    0: { label: 'No priority', icon: noPriorityIcon },
  };

  const priorityOrder = [0, 4, 3, 2, 1]; 

  // Fetching data from the API
  useEffect(() => {
    Promise.all([
      fetch('https://api.quicksell.co/v1/internal/frontend-assignment').then((response) => response.json()),
      fetch('https://api.quicksell.co/v1/internal/frontend-assignment').then((response) => response.json())
    ]).then(([ticketData, userData]) => {
      setTickets(ticketData.tickets);
      setUsers(userData.users);
    });
  }, []);

  useEffect(() => {
    const savedGrouping = localStorage.getItem('groupingOption');
    const savedSorting = localStorage.getItem('sortingOption');
    if (savedGrouping) {
      setGroupingOption(savedGrouping);
    }
    if (savedSorting) {
      setSortingOption(savedSorting);
    }
  }, []);

  const handleGroupingChange = (event) => {
    const newGroupingOption = event.target.value;
    setGroupingOption(newGroupingOption);
    localStorage.setItem('groupingOption', newGroupingOption); // Saving to localStorage
  };

  const handleSortingChange = (event) => {
    const newSortingOption = event.target.value;
    setSortingOption(newSortingOption);
    localStorage.setItem('sortingOption', newSortingOption); // Saving to localStorage
  };

  const handleDisplayClick = () => {
    const groupedTickets = groupTickets(tickets, groupingOption);
    const sortedTickets = Object.keys(groupedTickets).reduce((acc, group) => {
      acc[group] = sortTickets(groupedTickets[group], sortingOption);
      return acc;
    }, {});

    setDisplayedTickets(sortedTickets);
  };

  // Group tickets by status, priority, or user
  const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((acc, ticket) => {
      let key;

      if (groupBy === 'priority') {
        key = ticket.priority;
      } else if (groupBy === 'user') {
        const user = users.find((u) => u.id === ticket.userId);
        key = user ? user.name : 'Unknown User'; // Fallback to 'Unknown User' if user is not found
      } else {
        key = ticket[groupBy];
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(ticket);
      return acc;
    }, {});
  };

  // Sorting function based on priority or title
  const sortTickets = (tickets, sortBy) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  // Helper function to get the user's initials
  const getUserInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part.charAt(0)).join('');
    return initials.toUpperCase();
  };

  return (
    <div className="kanban-board">
      <div className="kanban-controls">
        <div className="display-section">
          <div className="dropdown-section">
            <label>Grouping:</label>
            <select value={groupingOption} onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>

            <label>Sorting:</label>
            <select value={sortingOption} onChange={handleSortingChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
          <button onClick={handleDisplayClick} className="display-button">
            <img src={display} alt="Display Icon" className="display-icon" />
            Display
          </button>
        </div>
      </div>

      {/* Render grouped and sorted tickets */}
      <div className="kanban-columns">
        {groupingOption === 'status'
          ? statuses.map(({ label, icon }) => (
              <div className="kanban-column" key={label}>
                <div className="column-header">
                  <h2>
                    <img src={icon} alt={`${label} Icon`} className="status-icon" />
                    {label} <span className="ticket-count">{displayedTickets[label] ? displayedTickets[label].length : 0}</span>
                  </h2>
                  {/* Add "add" and "3-dot" icons here */}
                  <div className="column-icons">
                    <img src={addIcon} alt="Add" className="add-icon" />
                    <img src={dotMenuIcon} alt="Menu" className="dot-menu-icon" />
                  </div>
                </div>
                {(displayedTickets[label] || []).map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    groupingOption={groupingOption}
                    userName={users.find((user) => user.id === ticket.userId)?.name || 'Unknown User'} // Pass actual name
                  />
                ))}
              </div>
            ))
          : groupingOption === 'priority'
          ? priorityOrder.map((priority) => {
              const { label, icon } = priorityLevels[priority];
              return (
                <div className="kanban-column" key={label}>
                  <div className="column-header">
                    <h2>
                      <img src={icon} alt={`${label} Icon`} className="priority-icon" />
                      {label} <span className="ticket-count">{displayedTickets[priority] ? displayedTickets[priority].length : 0}</span>
                    </h2>
                    {/* Add "add" and "3-dot" icons here */}
                    <div className="column-icons">
                      <img src={addIcon} alt="Add" className="add-icon" />
                      <img src={dotMenuIcon} alt="Menu" className="dot-menu-icon" />
                    </div>
                  </div>
                  {(displayedTickets[priority] || []).map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      groupingOption={groupingOption}
                      userName={users.find((user) => user.id === ticket.userId)?.name || 'Unknown User'} // Pass actual name
                    />
                  ))}
                </div>
              );
            })
          : Object.keys(displayedTickets).map((user) => {
              const userObj = users.find((u) => u.name === user);
              const userInitials = getUserInitials(user);

              return (
                <div className="kanban-column" key={user}>
                  <div className="column-header">
                    <h2>
                      <div className="user-initials-icon">
                        {userInitials}
                      </div>
                      {user} <span className="ticket-count">{displayedTickets[user] ? displayedTickets[user].length : 0}</span>
                    </h2>
                    {/* Add "add" and "3-dot" icons here */}
                    <div className="column-icons">
                      <img src={addIcon} alt="Add" className="add-icon" />
                      <img src={dotMenuIcon} alt="Menu" className="dot-menu-icon" />
                    </div>
                  </div>
                  {(displayedTickets[user] || []).map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      groupingOption={groupingOption}
                      userName={userObj?.name || 'Unknown User'} // Pass actual name
                    />
                  ))}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default KanbanBoard;
