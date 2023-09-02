import React from "react";

export interface ListItemModels {
  name: string;
  desc: string;
  message: string;
  time: string;
  // onClick: (index: any) => void;
  actionButtons?: React.ReactNode;
  viewDeleteButtons?: React.ReactNode;
  buttonType: string;
  id?: string;
}
