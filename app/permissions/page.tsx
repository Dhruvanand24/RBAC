"use client"

import { useState } from 'react'
import { useAdmin } from '../context/AdminContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function PermissionsPage() {
  const { permissions, addPermission, deletePermission } = useAdmin()
  const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false)
  const [newPermission, setNewPermission] = useState('')

  const handleAddPermission = () => {
    addPermission(newPermission)
    setNewPermission('')
    setIsAddPermissionOpen(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Permissions Management</h1>
      <Dialog open={isAddPermissionOpen} onOpenChange={setIsAddPermissionOpen}>
        <DialogTrigger asChild>
          <Button>Add Permission</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Permission</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="permission" className="text-right">
                Permission
              </Label>
              <Input
                id="permission"
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddPermission}>Add Permission</Button>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permission</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission}>
              <TableCell>{permission}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deletePermission(permission)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

