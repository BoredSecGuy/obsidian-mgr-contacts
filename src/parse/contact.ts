import { TFile } from "obsidian";

export type Contact = {
  name: string;
  lastName: string;
  tags: string;
  role: string;
  phone: string;
  company: string;
  email: string;
  file: TFile;
  lastContact?: Date;
}