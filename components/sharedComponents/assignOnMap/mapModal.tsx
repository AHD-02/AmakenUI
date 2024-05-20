import { Modal, Text, Center } from "native-base";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  headerTitle: string;
  children: React.JSX.Element;
}

const MapModal = ({ children, headerTitle, isOpen, onClose }: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content width={"100%"} height={"70%"}>
        <Modal.Body justifyContent={"center"}>
          <Center>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 22,
                paddingTop: 15,
                paddingBottom: 45,
                textAlign: "center",
              }}
            >
              {headerTitle}
            </Text>
          </Center>

          {children}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
export default MapModal;
