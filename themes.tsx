import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import { extendTheme } from '@chakra-ui/react'


const overrides = extendTheme({
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
         bgGradient: 'linear(to-r, #F4B95F, #DAA65D, #7A7A7A)',
         animation: 'gradient 5s alternate infinite'
        },
      }),
    },
  })

export default overrides