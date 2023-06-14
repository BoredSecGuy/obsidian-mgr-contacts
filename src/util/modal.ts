import { App, Modal, Setting, TFile } from "obsidian";

export class CreateModal extends Modal {
  result: { name: string; lastName: string; company: string; email: string; tags: string, phone: string, file: TFile, role: string};
  onSubmit: (result: { name: string; lastName: string; company: string; email: string; tags: string, phone: string, file: TFile, role: string}) => void;

  constructor(app: App, onSubmit: (result: { name: string; lastName: string; company: string; email: string; tags: string, phone: string, file: TFile, role: string}) => void) {
    super(app);
    this.onSubmit = onSubmit;
    this.result = { name: "", lastName: "", company: "", email: "", tags: "", phone: "", file: {} as TFile, role: "" };
  }

  onOpen() {
    const { contentEl } = this;

    contentEl.createEl("h1", { text: "Add New Contact" });

    new Setting(contentEl)
      .setName("First name")
      .addText((text) =>
        text.onChange((value) => {
          this.result.name = value
        }));

    new Setting(contentEl)
      .setName("Last name")
      .addText((text) =>
        text.onChange((value) => {
          this.result.lastName = value
        }));

    new Setting(contentEl)
        .setName("Company name")
        .addText((text) =>
        text.onChange((value) => {
            this.result.company = value
        }));
        
    new Setting(contentEl)
        .setName("Email")
        .addText((text) =>
        text.onChange((value) => {
            this.result.email = value
        }));
    
    new Setting(contentEl)
        .setName("Role")
        .addText((text) =>
        text.onChange((value) => {
            this.result.role = value
        }));
          
    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            this.onSubmit(this.result);
          }));
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}