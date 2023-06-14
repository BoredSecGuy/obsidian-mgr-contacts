import { randomUUID } from "crypto";
import * as React from "react";
import { Contact } from "src/parse/contact";
import { Sort } from "src/util/constants";
import { ContactView } from "./ContactView";

type ContactsListProps = {
	contacts: Contact[];
	sort: Sort;
};

export const ContactsListView = (props: ContactsListProps) => {
	const [processedContacts, setProcessedContacts] = React.useState<Contact[]>(
		[]
	);
	const [searchQuery, setSearchQuery] = React.useState<string>("");

	const contacts = props.contacts;
	const sort = props.sort;

	React.useEffect(() => {
		const sortedContacts = [...contacts].sort((a, b) => {
			switch (sort) {
				case Sort.NAME:
					return (a.lastName ?? "").localeCompare(b.lastName ?? "");
				default:
					return 0;
			}
		});

		const filteredContacts = sortedContacts.filter((contact) => {
			const fullName = `${contact.name} ${contact.lastName}`.toLowerCase();
			const companyName = `${contact.company}`.toLowerCase();
			const returnValue = fullName.includes(searchQuery.toLowerCase()) || companyName.includes(searchQuery.toLowerCase());
			return returnValue
		});
		console.log(filteredContacts)

		setProcessedContacts(filteredContacts);
	}, [contacts, sort, searchQuery]);

	return (
		<>
			<div>
				<div className="nav-header">
					<div className="nav-buttons-container">
						<div id="search-by-name-btn" aria-label="Search">
							<input
								type="text"
								placeholder="Search here"
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>

			{processedContacts.map((contact) => {
				console.log(contact.email);
				return <ContactView contact={contact} key={randomUUID()} />;
			})}
		</>
	);
};
