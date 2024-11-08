"use client";

import SignInModal from "@/components/modals/SignInModal";
import SignUpModal from "@/components/modals/SignUpModal";
import { useAuth } from "@/contexts/auth";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import logo from "../../public/svg/Logo.svg";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className="w-full bg-white font-semibold shadow">
      <div className="flex items-center justify-between px-40 py-4">
        <div className="flex items-center space-x-4">
          <Image src={logo} alt="Logo" width={48} height={48} />
          <div className="text-2xl font-semibold">ILoveImages</div>
        </div>

        <Input
          size="lg"
          classNames={{
            base: "w-[40rem]",
            input: "px-4 py-3 font-semibold",
          }}
          endContent={
            <IoMdSearch className="font pointer-events-none flex-shrink-0 text-3xl text-default-400" />
          }
          placeholder="Search for photos"
        />

        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <p>Welcome, {user.name}!</p>
              <Button className="rounded-full bg-logo text-white" isIconOnly>
                {user.alias[0].toUpperCase()}
              </Button>
            </>
          ) : (
            <>
              <SignUpModal />
              <SignInModal />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
