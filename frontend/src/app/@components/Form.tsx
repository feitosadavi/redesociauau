"use client";

import React, { FormHTMLAttributes } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormElements = {
  button?: {
    label: string;
    className?: string;
  };
  input?: {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    icon?: string;
    iconRight?: boolean;
    className?: string;
  };
  select?: {
    id: string;
    label: string;
    options: {
      value: string;
      label: string;
    }[];
    className?: string;
  };
  textarea?: {
    id: string;
    label: string;
    placeholder?: string;
    className?: string;
  };
  checkbox?: {
    id: string;
    label: string;
    className?: string;
  };
  radio?: {
    id: string;
    label: string;
    name: string;
    value: string;
    className?: string;
  };
};

type Elements = {
  div?: {
    className?: string;
  } & FormElements;
} & FormElements;

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: SubmitHandler<any>;
  elements: Elements;
  validations: any;
}

const Form: React.FC<Props> = ({ onSubmit, children }) => {
  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<any>();

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};

export default Form;
