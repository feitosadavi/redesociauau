"use client";

type ToggleDialog = () => void;

type ComponentProps = {
  open: boolean;
  toggleDialog: ToggleDialog;
  title: string;
  Action: (toggleDialog: ToggleDialog) => JSX.Element;
};

const Dialog = ({ title, Action, open, toggleDialog }: ComponentProps) => {
  if (!open) return null;

  return (
    <>
      <div
        onClick={toggleDialog}
        className="fixed inset-0 z-[998] bg-black bg-opacity-50"
      />
      <dialog
        open={open}
        className="fixed left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
      >
        <h2 className="mb-4 text-lg font-semibold dark:text-white">{title}</h2>
        {Action(toggleDialog)}
      </dialog>
    </>
  );
};

export default Dialog;
