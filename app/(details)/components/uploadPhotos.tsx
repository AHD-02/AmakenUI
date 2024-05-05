import { UploadPhotosIcon } from "@/assets/icons";
import { Box, HStack, Text, View } from "native-base";

const UploadPhotos = () => {
  return (
    <Box>
      <HStack alignItems="center">
        <Text
          color={"#191E3A"}
          fontSize={14}
          fontWeight={500}
          fontFamily={"Cairo"}
        >
          {"Photos"}
        </Text>
      </HStack>

      <HStack
        paddingX={4}
        width="100%"
        height={55}
        marginTop={2}
        alignItems={"center"}
        marginBottom={2}
        borderRadius={10}
        justifyContent={"space-between"}
        borderColor={"#A5583A"}
        borderWidth={1}
      >
        <View>
          <Text color={"#A5583A"} fontSize={16} fontWeight={400}>
            Upload Photo
          </Text>
        </View>
        <View>
          <UploadPhotosIcon />
        </View>
      </HStack>
    </Box>
  );
};
export default UploadPhotos;
