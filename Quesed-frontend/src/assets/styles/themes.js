const darkButton = {
  bgColor: '#373737',
  hoverColor: '#4d4d4d',
  color: '#f4f4f4',
  borderColor: '#373737',
  activeColor: '#565656'
};

const goldButton = {
  bgColor: '#c0b283',
  hoverColor: '#cebf8e',
  color: '#ffffff',
  borderColor: '#c0b283',
  activeColor: '#ddce9c'
};

const mutedTones = {
  navBar: {
    bgColor: '#dcd0c0'
  },
  body: '#f4f4f4',
  grid: {
    color: '#373737',
    bgColor: '#ffffff'
  },
  button: goldButton,
  text: {
    color: '#8b7d4c',
    hover: '#b2a474'
  },
  link: {
    hoverColor: '#857b58',
    color: '#5a5238',
    activeColor: '#857b58',
    activeFontWeight: 'regular'
  },
  icon: {
    color: '#373737',
    hoverColor: '#000000'
  }
};

const standart = {
  navBar: {
    bgColor: '#dcd0c0'
  },
  body: '#f4f4f4',
  grid: {
    color: '#373737',
    bgColor: '#ffffff'
  },
  button: darkButton,
  text: {
    color: '#8b7d4c',
    hover: '#b2a474'
  },
  link: {
    hoverColor: '#857b58',
    color: '#5a5238',
    activeColor: '#857b58',
    activeFontWeight: 'regular'
  }
};

export default {
  mutedTones,
  standart
};
