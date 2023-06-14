import * as React from "react";
import { useApp } from "src/context/hooks";
import { openFile } from "src/file/file";
import { Contact } from "src/parse/contact";

type ContactProps = {
	contact: Contact;
};

export const ContactView = (props: ContactProps) => {
	const { workspace } = useApp();
	const contact = props.contact;
	return (
		<div
			className="contact-card"
			onClick={() => openFile(contact.file, workspace)}
		>
			<div className="content">
				<div className="name">
					{contact.name} {contact.lastName}
				</div>
				{contact.company && (
					<div className="company">
						Company: {contact.company}
					</div>
				)}
				{contact.email && (
					<div className="email">
						Email: {contact.email}
					</div>
				)}
			</div>
		</div>
	);
};
