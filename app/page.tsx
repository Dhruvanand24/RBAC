"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "./context/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronUp, ChevronDown } from "lucide-react";

type SortField = "name" | "email" | "role" | "status";
type SortOrder = "asc" | "desc";

export default function UsersPage() {
  const {
    roles,
    addUser,
    updateUser,
    deleteUser,
    searchUsers,
    getUsersPage,
    getTotalUsers,
  } = useAdmin();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active" as const,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState<
    ReturnType<typeof searchUsers>
  >([]);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const pageSize = 10;

  useEffect(() => {
    const results = searchQuery
      ? searchUsers(searchQuery)
      : getUsersPage(currentPage, pageSize, sortField, sortOrder);
    setFilteredUsers(results);
    console.log("running use effect with this data", results);
  }, [
    searchQuery,
    currentPage,
    sortField,
    sortOrder,
    searchUsers,
    getUsersPage,
  ]);

  const totalPages = Math.ceil(getTotalUsers() / pageSize);

  const handleAddUser = () => {
    if (newUser.email === "" || newUser.name === "" || newUser.role === "") {
      toast("All fields are required");
      return;
    }
    addUser(newUser);
    toast("User Added Successfully");
    setNewUser({ name: "", email: "", role: "", status: "Active" });
    setIsAddUserOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (field === sortField) {
      return sortOrder === "asc" ? (
        <ChevronUp className="inline-block ml-1" />
      ) : (
        <ChevronDown className="inline-block ml-1" />
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex flex-row w-fit p-2 rounded-lg border mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm mr-2"
        />
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Name {renderSortIcon("name")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("email")}
              className="cursor-pointer"
            >
              Email {renderSortIcon("email")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("role")}
              className="cursor-pointer"
            >
              Role {renderSortIcon("role")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("status")}
              className="cursor-pointer"
            >
              Status {renderSortIcon("status")}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              {user.status == "Active" ? (
                <TableCell className="text-green-600">{user.status}</TableCell>
              ) : (
                <TableCell className="text-red-500">{user.status}</TableCell>
              )}

              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2 mb-2"
                  onClick={() =>
                    updateUser(user.id, {
                      status: user.status === "Active" ? "Inactive" : "Active",
                    })
                  }
                >
                  {user.status === "Active" ? "Deactivate" : "Activate"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button>Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          deleteUser(user.id);
                          toast("User deleted Successfully");
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4 select-none">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:font-bold cursor-pointer"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="hover:font-bold cursor-pointer"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
