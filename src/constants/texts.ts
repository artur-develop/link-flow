export const texts = {
  list: {
    addMenuItem: 'Add menu item',
  },

  link: {
    add: 'Add menu item',
    edit: 'Edit',
    delete: 'Delete',
    addSubItem: 'Add sub item',
    deleteConfirmation: 'Are you sure you want to delete this item and all its subitems?',
    errors: {
      noMenuId: 'MenuItem has no menuId',
    },
  },

  generalAdd: {
    emptyMenuTitle: 'Menu is empty',
    emptyMenuDescription: 'There are no menu items yet.',
    addMenu: 'Add menu',
  },

  addEditForm: {
    labels: {
      name: 'Name',
      link: 'Link',
    },
    placeholders: {
      name: 'for example: Discount',
      link: 'https://example.com',
    },
    buttons: {
      cancel: 'Cancel',
      add: 'Add',
      save: 'Save',
    },
    validation: {
      name: {
        required: 'Name is required',
        minLength: 'Name must be at least 2 characters',
        maxLength: 'Name must be less than 50 characters',
      },
      link: {
        required: 'Link is required',
        invalid: 'Please enter a valid URL (e.g., https://example.com)',
        minLength: 'Link must be at least 2 characters',
        maxLength: 'Link must be less than 100 characters',
      },
    },
  },

  confirmDialog: {
    buttons: {
      yes: 'Yes',
      no: 'No',
    },
  },
}; 