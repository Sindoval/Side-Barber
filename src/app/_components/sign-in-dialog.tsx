"use client"

import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça seu login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>
      <Button className="flex gap-1 font-bold" variant="outline" onClick={handleLoginWithGoogleClick}>
        <Image
          src="/Google.svg"
          height={18}
          width={18}
          alt="Fazer login com Google" />
        Google
      </Button>
    </>
  );
}

export default SignInDialog;