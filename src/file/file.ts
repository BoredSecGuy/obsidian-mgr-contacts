import { normalizePath, Notice, TFile, TFolder, Vault, Workspace } from "obsidian";
import { join } from "path";

export async function openFile(file: TFile, workspace: Workspace) {
  const leaf = workspace.getLeaf()
  await leaf.openFile(file, { active: true });
}

export function findContactFiles(contactsFolder: TFolder) {
  const contactFiles: TFile[] = [];
  Vault.recurseChildren(contactsFolder, async (contactNote) => {
    if (contactNote instanceof TFile) {
      contactFiles.push(contactNote);
    }
  });
  return contactFiles;
}

export function createContactFile(
  folderPath: string,
  vault: Vault,
  workspace: Workspace,
  contact: { name: string; lastName: string; company: string; email: string; tags: string, phone: string, file: TFile}
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const folder = vault.getAbstractFileByPath(folderPath);
    if (!folder) {
      new Notice(`Can not find path: '${folderPath}'. Please update "Contacts" plugin settings`);
      reject();
      return;
    }

    vault
      .create(
        normalizePath(join(folderPath, `${contact.name} ${contact.lastName}.md`)),
        getNewFileContent(contact)
      )
      .then((createdFile) => {
        openFile(createdFile, workspace);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getNewFileContent(contact: { name: string; lastName: string; company: string; email: string; tags: string, phone: string, file: TFile, role: string}) {
    const formattedCompany = contact.company.replace(/\s/g, '');
    
    let frontmatterFormat = `---
name:
  first: ${contact.name}
  last: ${contact.lastName}
tags: ${formattedCompany}
role: ${contact.role}
phone: 
email: ${contact.email}
company: ${contact.company}
last_chat: 
connections: 
type: contact
---
`;

  if (contact.company) {
    frontmatterFormat += `\n## [[${contact.company}]]`;
  }

    return frontmatterFormat;
}