"use client";

import { useAuth } from "@/contexts/auth";
import { signInFormSchema, signInFormSchemaType } from "@/schemas/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function SignInModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { signIn, authLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
  });

  function onSubmit(data: signInFormSchemaType) {
    signIn(data, () => {
      onClose();
      reset();
    });
  }

  return (
    <>
      <Button className="bg-logo font-semibold text-white" onPress={onOpen}>
        Sign In
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Sign In</ModalHeader>

              <ModalBody>
                <Input
                  size="lg"
                  endContent={
                    <IoMdMail className="font pointer-events-none flex-shrink-0 text-3xl text-default-400" />
                  }
                  label="Email"
                  placeholder="Enter your mail"
                  labelPlacement="inside"
                  {...register("email")}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
                <Input
                  size="lg"
                  endContent={
                    <FaLock className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  labelPlacement="inside"
                  type="password"
                  {...register("password")}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  className="font-semibold"
                  onPress={onClose}
                >
                  Cancel
                </Button>

                <Button
                  className="font-semibold text-white"
                  color="success"
                  type="submit"
                  isLoading={authLoading}
                >
                  Sign In
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
