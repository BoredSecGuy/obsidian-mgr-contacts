import { normalizePath, TFile, TFolder, Notice } from "obsidian";
import * as React from "react";
import { useApp } from "src/context/hooks";
import { createContactFile, findContactFiles } from "src/file/file";
import ContactsPlugin from "src/main";
import { Contact } from "src/parse/contact";
import { parseContactFiles } from "src/parse/parse";
import { Sort } from "src/util/constants";
import { ContactsListView } from "./ContactsListView";
import { HeaderView } from "./HeaderView";
import { CreateModal } from "src/util/modal";

type RootProps = {
	plugin: ContactsPlugin;
};

export const SidebarRootView = (props: RootProps) => {
	const { vault, metadataCache, workspace } = useApp();
	const [contacts, setContacts] = React.useState<Contact[]>([]);
	const [sort, setSort] = React.useState<Sort>(Sort.LAST_CONTACT);
	const folder = props.plugin.settings.contactsFolder;
  
	React.useEffect(() => {
	  loadContacts();
  
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty dependency array to run the effect only once
  
	const loadContacts = async () => {
	  const contactsFolder = vault.getAbstractFileByPath(
		normalizePath(folder)
	  ) as TFolder;
  
	  if (!contactsFolder) {
		setContacts([]);
	  }
  
	  const contactFiles: TFile[] = findContactFiles(contactsFolder);
  
	  const contactsData = await parseContactFiles(
		contactFiles,
		vault,
		metadataCache
	  );
	  setContacts(contactsData);
	};
  
	const createNewContact = (result: { name: string; lastName: string; company: string; email: string; tags: string, phone: string, file: TFile, role: string}) => {
	  createContactFile(folder, vault, workspace, result)
		.then(() => {
		  new Notice(`Contact created: ${result.name} ${result.lastName}`);
		  const updatedContacts = [...contacts, result]; // Add the new contact to the existing contacts
		  setContacts(updatedContacts); // Update the contacts state with the new contact
		})
		.catch((error) => {
		  // Handle error if necessary
		  if (error == "Error: File already exists.") {
			new Notice(`Contact already exists: ${result.name} ${result.lastName}`);
		  }
		});
	};
  
	return (
	  <div>
		<HeaderView
		  onSortChange={setSort}
		  onCreateContact={() =>
			new CreateModal(app, createNewContact).open()
		  }
		  sort={sort}
		/>
		<ContactsListView contacts={contacts} sort={sort} />
	  </div>
	);
  };
  