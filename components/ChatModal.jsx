"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import Chat from "./Chat";

export default function ChatModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="" centered size="90vh">
        <Chat />
      </Modal>

      <Button bg={"maroon"} onClick={open}>
        Chat with the owner
      </Button>
    </>
  );
}
