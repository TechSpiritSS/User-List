import { MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './UserListHeader.css';

const UserListHeader = ({ onFilterChange, onSortChange }) => {
  const [filterValue, setFilterValue] = useState('');
  const [sortOption, setSortOption] = useState('asc');

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    onFilterChange(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSortChange(e.target.value);
  };

  return (
    <>
      <TextField
        label="Filter by username"
        fullWidth
        value={filterValue}
        onChange={handleFilterChange}
        className="inputBox"
      />
      <TextField
        select
        label="Sort by username"
        fullWidth
        value={sortOption}
        onChange={handleSortChange}
        className="inputBox"
      >
        <MenuItem
          value="asc"
          sx={{
            outline: 'none',
          }}
        >
          Ascending
        </MenuItem>
        <MenuItem
          value="desc"
          sx={{
            outline: 'none',
          }}
        >
          Descending
        </MenuItem>
      </TextField>
    </>
  );
};

UserListHeader.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default UserListHeader;
