import React from "react";
import { 
    Button, 
    Drawer, 
    DrawerOverlay, 
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    SimpleGrid
} from "@chakra-ui/core";
import { useDisclosure } from "@chakra-ui/core"
import { LaunchItemById } from './launch-item';
import { useFavourites } from '../utils/use-favourites';

export function FavouriteLaunches() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const { favourites } = useFavourites()

    const hasFavourites = () => favourites?.ids?.length > 0;

    return (
      <>
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen} >
          My Favourites
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Favourite Launches</DrawerHeader>
  
            <DrawerBody overflow="scroll">
              <SimpleGrid m={[2, null, 1]} minChildWidth="250px" spacing="4">
                {hasFavourites() && favourites.ids.map((launchId) => (
                  <LaunchItemById launchId={launchId} key={launchId}/>
                ))}
              </SimpleGrid>
            {!hasFavourites() && 
            "You have no favourite launches. Click a star to favourite a launch"}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    )
  }