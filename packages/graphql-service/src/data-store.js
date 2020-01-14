const users = [
  {
    id: 1,
    name: 'Luis',
    favoriteColors: [100, 101, 102]
  },
  {
    id: 2,
    name: 'Jane',
    favoriteColors: [101, 103, 105]
  }
];

const colors = [
  {
    id: 100,
    hex: '#DEC9B5',
    rgb: '(222,201,181)'
  },  
  {
    id: 101,
    hex: '#FF00FF',
    rgb: '(255,0,255)'

  },
  {
    id: 102,
    hex: '#00A8E3',
    rgb: '(0,168,227)'
  },
  {
    id: 103,
    hex: '#9B0404',
    rgb: '(155,4,4)'
  },
  {
    id: 104,
    hex: '#000000',
    rgb: '(0,0,0)'
  },
  {
    id: 105,
    hex: '#D89225',
    rgb: '(216,146,37)'
  }
]


const dataStore = {
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      const user = users.find(({ id: userId }) => userId == id);
      resolve(user);
    })
  },
  getColorsFromColorIds: (colorIds) => {
    return new Promise((resolve) => {
      const foundColors = colors.filter(color => {
        return colorIds.indexOf(color.id) > -1
      });
      resolve(foundColors);
    });
  }
}

module.exports = dataStore;