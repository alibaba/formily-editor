// .storybook/preview.js

// export const parameters = {
//   options: {
//     storySort: (a, b) => {
//       console.log(123);
//       return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
//     }
      
//   },
// };

// .storybook/preview.js
console.log('111');
export const parameters = {
  options: {
    storySort: {
      order: ['Main'],
    },
  },
};
