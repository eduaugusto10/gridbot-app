import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = (message) => toast.success(message, { autoClose: 2000, theme: "colored" })
export const toastError = (message) => toast.error(message, { autoClose: 2000, theme: "colored" })