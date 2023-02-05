import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

// Handles list of pages on sidebar. Edit if you want to add more pages

export default function MainListItems({ setCurrentView }) {
  return (
    <List component="nav">
      <ListItemButton onClick={() => setCurrentView("default")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Links" />
      </ListItemButton>
      <ListItemButton onClick={() => setCurrentView("detail")}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Detail View" />
      </ListItemButton>
    </List>
  )
}

