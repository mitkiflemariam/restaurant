import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/**
 * DeleteConfirmation - A reusable confirmation dialog for delete operations
 * 
 * @param {boolean} isOpen - Whether the dialog is visible
 * @param {function} onClose - Function to call when dialog is closed
 * @param {function} onConfirm - Function to call when delete is confirmed
 * @param {string} title - Dialog title (e.g. "Delete User")
 * @param {string} description - Dialog message (e.g. "Are you sure you want to delete this user?")
 * @param {boolean} isDeleting - Whether the delete operation is in progress
 */
const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isDeleting,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
