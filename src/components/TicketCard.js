import React from 'react';
import './TicketCard.css'; 
import backlogIcon from '../assest/Backlog.svg';
import todoIcon from '../assest/To-do.svg';
import inProgressIcon from '../assest/in-progress.svg';
import cancelledIcon from '../assest/Cancelled.svg';
import doneIcon from '../assest/Done.svg';
import urgentPriorityIcon from '../assest/SVG - Urgent Priority grey.svg';
import highPriorityIcon from '../assest/Img - High Priority.svg';
import mediumPriorityIcon from '../assest/Img - Medium Priority.svg';
import lowPriorityIcon from '../assest/Img - Low Priority.svg';
import noPriorityIcon from '../assest/No-priority.svg';
import InitialsIcon from './InitialsIcon';

const TicketCard = ({ ticket, groupingOption, userName }) => {
  const priorityLevels = {
    4: { label: 'Urgent', icon: urgentPriorityIcon },
    3: { label: 'High', icon: highPriorityIcon },
    2: { label: 'Medium', icon: mediumPriorityIcon },
    1: { label: 'Low', icon: lowPriorityIcon },
    0: { label: 'No priority', icon: noPriorityIcon },
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return backlogIcon;
      case 'Todo':
        return todoIcon;
      case 'In progress':
        return inProgressIcon;
      case 'Cancelled':
        return cancelledIcon;
      case 'Done':
        return doneIcon;
      default:
        return null;
    }
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span>{ticket.id}</span>
        {groupingOption !== 'user' && <InitialsIcon name={userName} />}
      </div>
      <h3 className="ticket-title">
        {groupingOption !== 'status' && (
          <img
            src={getStatusIcon(ticket.status)}
            alt={`${ticket.status} icon`}
            className="status-icon"
          />
        )}
        <span>{ticket.title}</span>
      </h3>
      {groupingOption !== 'priority' && (
        <p className="ticket-tag">
          <img
            src={priorityLevels[ticket.priority].icon}
            alt={`${priorityLevels[ticket.priority].label} icon`}
            className="priority-icon"
          />
          <span className="tag-circle"></span>
          {ticket.tag}
        </p>
      )}
      {groupingOption === 'priority' && (
        <p className="ticket-tag">
          <span className="tag-circle"></span>
          {ticket.tag}
        </p>
      )}
    </div>
  );
};

export default TicketCard;
