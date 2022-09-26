import { extendTheme } from '@chakra-ui/react';
import "@fontsource/montserrat";

// Create a theme instance.
const theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',       
},
components: {
  Button: { baseStyle: {_focus: { boxShadow: 'none'}}}       
},
});

export default theme;