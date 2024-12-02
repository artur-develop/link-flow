import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, TextInput } from "@/components";
import { CreateItemT } from "@/types";
import { linkPattern } from "@/utils";
import { SearchIcon } from "@/assets";
import { texts } from '@/constants';

interface AddEditFormProps {
  initialData?: {
    name: string;
    link: string;
  };
  onSave: (id: number, item: CreateItemT) => void;
  onCancel: () => void;
  menuId?: number;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required(texts.addEditForm.validation.name.required)
    .min(2, texts.addEditForm.validation.name.minLength)
    .max(50, texts.addEditForm.validation.name.maxLength),
  link: Yup.string()
    .required(texts.addEditForm.validation.link.required)
    .matches(
      linkPattern,
      texts.addEditForm.validation.link.invalid
    )
    .min(2, texts.addEditForm.validation.link.minLength)
    .max(100, texts.addEditForm.validation.link.maxLength),
});

const AddEditForm = ({ initialData, onSave, onCancel, menuId }: AddEditFormProps) => {
  const isEditMode = !!initialData;

  const initialValues = {
    name: initialData?.name || '',
    link: initialData?.link || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (menuId) {
          onSave(menuId, values);
          resetForm();
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="mt-4 bg-white p-4 rounded-lg border shadow-sm w-full">
          <div className="space-y-3">
            <TextInput
              id="name"
              name="name"
              label={texts.addEditForm.labels.name}
              touched={touched.name}
              error={errors.name}
              placeholder={texts.addEditForm.placeholders.name}
            />
            
            <TextInput
              id="link"
              name="link"
              label={texts.addEditForm.labels.link}
              touched={touched.link}
              error={errors.link}
              prependIcon={SearchIcon}
              placeholder={texts.addEditForm.placeholders.link}
            />

            <div className="flex gap-2 pt-3">
            <Button
                type="button"
                onClick={onCancel}
                variant="grey"
                position="center"
              >
                {texts.addEditForm.buttons.cancel}
              </Button>
              <Button
                type="submit"
                variant="purpleOutlined"
                position="center"
                disabled={isSubmitting}
              >
                {isEditMode ? texts.addEditForm.buttons.save : texts.addEditForm.buttons.add}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { AddEditForm }; 