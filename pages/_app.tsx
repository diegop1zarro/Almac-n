import React from 'react'
import { ChakraProvider, Container, VStack , Image, Heading , Text, Box, Divider} from '@chakra-ui/react'
import { AppProps } from 'next/app'
import theme from '../theme'

const App : React.FC<AppProps>=({ Component, pageProps })=> {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
      <Container
      backgroundColor="white"
      borderRadius="sm"
      boxShadow="md"
      // marginY={4}
      maxWidth="container.xl"
      padding={4}
      >
        <VStack marginBottom={6} >
          <Image borderRadius={9999} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzj87LQsJZXdZs_MPRld3F9dehlTmqEJvLt3ycfblnCw&s" alt="imagen almacén"/>
          <Heading>Almacén</Heading>
          <Text> El almacén de la ale </Text>
        </VStack>
        <Divider marginY={7}/>
      <Component {...pageProps} />
      </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App