import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AchievementIcon = styled(FontAwesomeIcon).attrs(({ icon }) => ({
  icon,
}))`
  margin: 5px 0 5px 0;
`;

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
});

const Achievement = ({ icon, label, classes }) => (
  <Chip
    avatar={(
      <Avatar>
        <AchievementIcon icon={icon} />
      </Avatar>
)}
    label={label}
    className={classes.chip}
  />
);

export default withStyles(styles)(Achievement);
