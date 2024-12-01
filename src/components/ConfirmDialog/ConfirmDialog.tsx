import React from 'react';
import { Button } from '@/components';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({ message, onConfirm, onCancel }: ConfirmDialogProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <Button
            variant="grey"
            onClick={onCancel}
            position="left"
          >
            No
          </Button>
          <Button
            variant="grey"
            onClick={onConfirm}
            position="right"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ConfirmDialog }; 