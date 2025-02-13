/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export type Theme = {
    text: string;
    background: string;
    icon: string;
    button: string;
  };

export const Colors = {
  light: {
    text: 'black',
    background: '#fff',
    icon: '#black',
    button: "royalblue"
  },
  dark: {
    text: 'white',
    background: 'black',
    icon: '#red',
    button: "white"
  },
};
