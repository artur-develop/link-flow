import React from 'react';
import {Button} from "@/components";

interface AddEditFormProps {
  initialData?: {
    name: string;
    link: string;
  };
  onSave: (data: { name: string; link: string }) => void;
  onCancel: () => void;
}

const AddEditForm = ({ initialData, onSave, onCancel }: AddEditFormProps) => {
  const isEditMode = !!initialData;

  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    link: initialData?.link || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded-lg shadow-sm w-full">
      <div className="space-y-3">
        <div className="justify-items-start">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 rounded"
          />
        </div>
        
        <div className="justify-items-start">
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">
            Link
          </label>
          <input
            id="link"
            name="link"
            type="text"
            value={formData.link}
            onChange={handleChange}
            className="mt-1 block w-full border p-2 rounded"
          />
        </div>

        <div className="flex gap-2 pt-3">
          <Button
            onClick={() => onSave(formData)}
            variant="purple"
            position="center"
          >
            {isEditMode ? 'Save' : 'Add'}
          </Button>
          <Button
            onClick={() => onCancel()}
            variant="grey"
            position="center"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export {AddEditForm}; 