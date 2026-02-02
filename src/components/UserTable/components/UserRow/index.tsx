'use client';
import { FC, useState } from 'react';
import { Props } from './UserRow.props';
import { EditUserData } from '@/shared/consts/user';
import { Role } from '@/shared/api/generated/data-contracts';
import { UserInfoCell } from '../cells/UserInfoCell';
import { PasswordCell } from '../cells/PasswordCell';
import { RoleCell } from '../cells/RoleCell';
import { ActionsCell } from '../cells/ActionsCell';
import { validateEmail, validateFullname, validatePassword } from '@/utils/validators';
import generalStyle from './../../UserTable.module.css';

export const UserRow: FC<Props> = ({ user, onEditUser, onDeleteUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditUserData>({
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: '',
    role: user.role,
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: user.name,
      email: user.email,
      password: '',
      confirmPassword: '',
      role: user.role,
    });
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const editedUser = {
      id: user.id,
      name: editData.name,
      email: editData.email,
      role: editData.role,
      createdAt: user.createdAt,
      ...(editData.password ? { password: editData.password } : {}),
    };

    onEditUser(editedUser);
    setIsEditing(false);
  };

  const validateForm = () => {
    if (!editData) {
      return false;
    }

    const shouldValidatePassword = !!editData.password || !!editData.confirmPassword;
    const newErrors = {
      email: validateEmail(editData.email),
      password: shouldValidatePassword
        ? validatePassword(editData.password, editData.confirmPassword)
        : null,
      name: validateFullname(editData.name),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) {
      return;
    }

    if (e.target.name === 'password' && e.target.value === '') {
      setEditData({
        ...editData,
        password: '',
        confirmPassword: '',
      });
    } else {
      setEditData({
        ...editData,
        [e.target.name]: e.target.value,
      });
    }

    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const handleBlur = (field: 'email' | 'password' | 'name') => {
    if (!editData) {
      return;
    }

    if (field === 'password') {
      const shouldValidatePassword = !!editData.password || !!editData.confirmPassword;
      setErrors((prev) => ({
        ...prev,
        password: shouldValidatePassword
          ? validatePassword(editData.password, editData.confirmPassword)
          : null,
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: field === 'email' ? validateEmail(editData.email) : validateFullname(editData.name),
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) {
      return;
    }
    setEditData({
      ...editData,
      role: e.target.checked ? Role.Admin : Role.User,
    });
  };

  return (
    <div className={generalStyle.tableRow}>
      <UserInfoCell
        isEditing={isEditing}
        editData={editData}
        errors={errors}
        user={user}
        onInputChange={handleInputChange}
        onInputBlur={handleBlur}
      />

      <PasswordCell
        isEditing={isEditing}
        editData={editData}
        errors={errors}
        onInputChange={handleInputChange}
        onInputBlur={handleBlur}
      />

      <RoleCell
        isEditing={isEditing}
        editData={editData}
        user={user}
        onRoleChange={handleRoleChange}
      />

      <ActionsCell
        isEditing={isEditing}
        errors={errors}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onDelete={() => onDeleteUser(user.id)}
      />
    </div>
  );
};
