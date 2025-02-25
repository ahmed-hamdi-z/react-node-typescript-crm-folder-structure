import React from "react";
// Hooks
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";

// Components 
import { DottedSeparator } from "@/components/global/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

import { loginSchema } from "@/models/auth/userSchemas";
import { useLogin } from "@/hooks/dashboard/auth/use-login";
import { appRoutes } from "@/config/routes-config";

const LoginCard = () => {

  const { mutate, isPending } = useLogin();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values)
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">
          Welcome back!
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator className="" />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={isPending}
              size="lg">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator className="" />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-7">
        <Button
          className="w-full"
          variant="secondary"
          size="lg"
          disabled={isPending}
        >
          <FcGoogle className="mr-2 size-5" />
          Login With Google
        </Button>
        <Button
          className="w-full"
          variant="secondary"
          size="lg"
          disabled={isPending}
        >
          <FaGithub className="mr-2 size-5" />
          Login With Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator className="" />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Don&apos;t have an account?
          <Link to={appRoutes.auth.register}>
            <span className="text-blue-700">&nbsp;Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
};

export default LoginCard;