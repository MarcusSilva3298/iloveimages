"use client";

import { useAuth } from "@/contexts/auth";
import { signUpFormSchema, signUpFormSchemaType } from "@/schemas/SignUpSchema";
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
import { FaLock, FaUser } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { TbCircleLetterAFilled } from "react-icons/tb";

export default function SignUpModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { signUp, authLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
  });

  function onSubmit(data: signUpFormSchemaType) {
    signUp(data, () => {
      onClose();
      reset();
    });
  }

  return (
    <>
      <Button className="bg-logo/20 font-semibold text-logo" onPress={onOpen}>
        Sign Up
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>

              <ModalBody>
                <Input
                  size="lg"
                  endContent={
                    <IoMdMail className="font pointer-events-none flex-shrink-0 text-3xl text-default-400" />
                  }
                  label="Email"
                  placeholder="Enter your email"
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
                <Input
                  size="lg"
                  endContent={
                    <TbCircleLetterAFilled className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                  }
                  label="Name"
                  placeholder="Enter your name"
                  labelPlacement="inside"
                  {...register("name")}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
                <Input
                  size="lg"
                  endContent={
                    <FaUser className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                  }
                  label="Alias"
                  placeholder="Enter your alias"
                  labelPlacement="inside"
                  {...register("alias")}
                  isInvalid={!!errors.alias}
                  errorMessage={errors.alias?.message}
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
                  Sign Up
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
