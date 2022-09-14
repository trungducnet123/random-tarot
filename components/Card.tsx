import {
  Box,
  Button,
  Heading,
  HStack,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { a, useSpring } from "@react-spring/web";
import cards from "../data/cards.json";

function Card({
  size,
  index,
  reversed,
  flipped,
  showInfo,
  closeInfo,
  onClick,
}: {
  size?: "medium" | "large";
  index: number;
  reversed: boolean;
  flipped: boolean;
  showInfo: boolean;
  closeInfo: () => void;
  onClick: () => void;
}) {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const scale = size === "large" ? { x: 150, y: 260 } : { x: 75, y: 130 };

  return (
    <>
      <Box onClick={onClick}>
        <a.div
          style={{
            opacity: opacity.to((o) => 1 - o),
            transform,
            borderRadius: "4px",
            position: "fixed",
            cursor: "pointer",
            marginLeft: -0.5 * scale.x,
            marginTop: -0.5 * scale.y,
          }}
        >
          <Img
            w={scale.x}
            h={scale.y}
            src="https://spells8.com/wp-content/uploads/2020/04/back-tarot-200x340.png"
            borderRadius={4}
          ></Img>
        </a.div>
        <a.div
          style={{
            opacity,
            transform,
            rotateY: reversed ? "0deg" : "180deg",
            rotateX: reversed ? "180deg" : "0deg",
            position: "fixed",
            cursor: "pointer",
            marginLeft: -0.5 * scale.x,
            marginTop: -0.5 * scale.y,
          }}
        >
          <Img w={scale.x} h={scale.y} src={cards[index].link}></Img>
        </a.div>
      </Box>

      <Modal
        isCentered
        onClose={closeInfo}
        isOpen={showInfo}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{cards[index].name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack gap="20px">
              <Img
                objectFit={"contain"}
                boxSize="200px"
                src={cards[index].link}
              ></Img>
              <VStack align="flex-start">
                <Heading fontSize='lg'>正位: </Heading>
                <Text>{cards[index].normal}</Text>
                <Heading fontSize='lg'>逆位: </Heading>
                <Text>{cards[index].reversed}</Text>
              </VStack>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={closeInfo}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Card;