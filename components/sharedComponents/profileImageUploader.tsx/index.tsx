import React, { useState } from "react";
import { Center, HStack, Image, Pressable, Text, View } from "native-base";
import { Camera } from "@/assets/images";
import ModalComponent from "../modal";
import { AntDesign, EvilIcons, Ionicons } from "@expo/vector-icons";
import { usePickImage, useTakeImage, useUploadImage } from "@/app/hooks";

interface IProps {
  image?: any;
  setImage: (image: any) => void;
}

const ProfileImageUploader = ({ image = null, setImage }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { upload, images, isLoading} = useUploadImage();

  const handleTakeImage = async () => {
    const { image } = await useTakeImage();
    if (image) {
      upload([image])
        .unwrap()
        .then(() => {
          if (images) {
            setImage(images);
          }
        });
      setIsOpen(false);
    }
  };

  const handlePickImage = async () => {
    const {image} = await usePickImage();
    if (image) {
      upload([image])
        .unwrap()
        .then(() => {
          if (images) {
            setImage(images);
          }
        });
      setIsOpen(false);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setIsOpen(false);
  };

  return (
    <View>
      <Pressable onPress={() => setIsOpen(true)}>
        <Center>
          {Array.isArray(images) ? (
            <View
              style={{
                backgroundColor: "#F3F5F5",
                height: 120,
                width: 120,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <Ionicons name="camera" color={"white"} size={50} />
            </View>
          ) : (
            <Image
              src={images?.[0] ?? ""}
              height={120}
              width={120}
              my={"6"}
              borderRadius={"full"}
              alt="image"
            />
          )}
        </Center>
      </Pressable>

      {isOpen && (
        <ModalComponent
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          header="Profile Image"
        >
          <HStack justifyContent={"center"} alignItems={"center"}>
            <Pressable
              style={{ marginHorizontal: 12 }}
              onPress={handleTakeImage}
            >
              <EvilIcons name="camera" size={45} />
              <Text>Camera</Text>
            </Pressable>
            <Pressable
              style={{ marginHorizontal: 12 }}
              onPress={handlePickImage}
            >
              <EvilIcons name="image" size={45} />
              <Text>Image</Text>
            </Pressable>
            {image && (
              <Pressable
                style={{ marginHorizontal: 12 }}
                onPress={handleDeleteImage}
              >
                <AntDesign name="delete" size={30} />
                <Text>Delete</Text>
              </Pressable>
            )}
          </HStack>
        </ModalComponent>
      )}
    </View>
  );
};

export default ProfileImageUploader;
