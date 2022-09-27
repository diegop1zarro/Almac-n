import React from 'react'
import { GetStaticProps } from 'next';
import {Product} from '../product/types'
import api from '../product/api';
import {Button, Grid, Link, Stack, Text ,Flex, Image} from "@chakra-ui/react"
import {motion , AnimatePresence, AnimateSharedLayout} from "framer-motion" 


interface Props{
  products: Product[],
}
// vamos a hacer una funcion para cambiar los precios a pesos argentinos o agregarle el signo de pesos
function parseCurrentcy(value:number):string{ // le pasamos un valor numerico pero nos devuelve un string 
  return value.toLocaleString("es-AR",{ //ya viene predeterminado para pasarlo a pesos Argentinos
    style:"currency",
    currency:"ARS"
  })

}

const IndexRoute: React.FC<Props> =({products})=>{
  const [cart , setCart] = React.useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = React.useState<string>(null);
  // React.useEffect(()=>{
  //   setTimeout(()=> setCart([]),2000)
  // },[cart])

  //useMemo son como las dependencias de useEffect, se va a ejecutar solo si cambia el cart
const text = React.useMemo(()=>{
 return cart.reduce((message, product)=> message.concat(`* ${product.title} - ${parseCurrentcy(product.price)}\n`), '').concat(`\nTotal:${parseCurrentcy(cart.reduce((total, product)=> total + product.price,0))}`)
},[cart])
  return( 
    <AnimateSharedLayout>
  <Stack spacing={6}>
  <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))"> 
{/* en columna hasta agotar los espacios y con gridgap lo hacemos responsive */}
         {products.map(product => 
         <Stack 
         spacing={3}
         borderRadius="md"
         padding={4}
         backgroundColor="gray.100" key={product.id}>
          <Stack spacing={1}>
            <Image 
            borderTopRadius="md"
            maxHeight={200}
            objectFit="cover"
            as={motion.img}
            cursor="pointer"
            layoutId={product.image}
            src={product.image} 
            alt={product.title} 
            onClick={()=>setSelectedImage(product.image)}
            />
          <Text>{product.title}</Text>
          <Text fontSize="14px">{product.description}</Text>
          <Text 
          fontSize="sm" 
          fontWeight="500"
          color="green.400">{parseCurrentcy(product.price)}</Text>
          </Stack>
          <Button 
          size="sm"
          variant="outline"
          colorScheme="primary" onClick={()=> setCart(cart=> cart.concat(product))}>Agregar</Button>
         </Stack>)}   
       </Grid>
       <AnimatePresence>
       { Boolean(cart.length)&&
       <Flex 
       as={motion.div}
       animate={{scale:1}}
       initial={{scale:0}}
       exit={{scale:0}}
       bottom={4} 
       alignItems="center" 
       justifyContent="center" position="sticky" > 
       <Button 
       colorScheme="whatsapp" 
       href={`https://wa.me/543516137592?text=`+encodeURIComponent(text)}
       leftIcon={<Image src='https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffff' alt='' />}
      //  size="lg"
       as={Link}
       inExternal>
        Completar pedido({cart.length} productos) 
       </Button>
       </Flex>
       }
       {/* ponemos encodeuricomponent para asegurarnos que el mensajes que mandemos sea capaz de viajar por url */}
       </AnimatePresence>
  </Stack>
  <AnimatePresence>
        {
          selectedImage && (
            <Flex 
            key="backdrop"
            alignItems="center"
            as={motion.div}
            backgroundColor="rgba(0,0,0,0.5)"
            height="100%"
            justifyContent="center"
            layoutId={selectedImage}
            left={0}
            position="fixed"
            top={0}
            width="100%"
            onClick={()=> setSelectedImage(null)}
            >
              <Image key="image" src={selectedImage} alt="producto" />
            </Flex>
          )
        }
      </AnimatePresence>
    </AnimateSharedLayout>
  )
};

export const getStaticProps: GetStaticProps = async()=>{
  const products = await api.list()
  return {
    props:{
      products,
    },
    revalidate: 10 // para que cada 10sg se actualice los datos de google sheets
  }
}

export default IndexRoute
