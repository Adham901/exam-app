"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { editProfile } from "@/api/editProfile";
import { deleteAccount } from "@/api/delete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  username: z.string().min(3, "Username must be at least 3 chars"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone is too short"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ModifyAccountPage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
    },
  });

  const router = useRouter();
  const [open, setOpen] = useState(false);

  // 🟢 Mutation update profile
  const mutation = useMutation({
    mutationFn: (data: ProfileFormValues) => editProfile(data),
    onSuccess: (data) => {
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        form.reset(data.user);
      }
      alert("✅ Profile updated successfully");
    },
    onError: (error: any) => {
      alert("❌ Failed to update profile: " + (error?.message || "Unknown error"));
    },
  });


  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      localStorage.removeItem("user");
      alert("✅ Account deleted successfully");
      setOpen(false);
      router.push("/auth/register"); 
    },
    onError: (error: any) => {
      alert("❌ Failed to delete account: " + (error?.message || "Unknown error"));
    },
  });


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      form.reset(parsed);
    }
  }, [form]);

  const onSubmit = (data: ProfileFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <main className="col-span-9">
        <Card>
          <CardContent className="p-6">
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Profile Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First name</label>
                  <Input {...form.register("firstName")} />
                  {form.formState.errors.firstName && (
                    <p className="text-red-500 text-sm">{form.formState.errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Last name</label>
                  <Input {...form.register("lastName")} />
                  {form.formState.errors.lastName && (
                    <p className="text-red-500 text-sm">{form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <Input {...form.register("username")} />
                {form.formState.errors.username && (
                  <p className="text-red-500 text-sm">{form.formState.errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input type="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <Input {...form.register("phone")} />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between space-x-4 pt-4">
                <Button
                  variant="destructive"
                  className="flex-1 bg-red-100 text-red-600 hover:bg-red-200"
                  type="button"
                  onClick={() => setOpen(true)}
                >
                  Delete My Account
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  type="submit"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      {/* Delete Confirm Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription>
              This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Yes, delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
