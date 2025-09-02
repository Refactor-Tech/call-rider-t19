export default interface MailerGateway {
  send(email: string, subject: string, message: string): Promise<void>;
}

export class MailerGatewayMemory implements MailerGateway {
  async send(email: string, subject: string, message: string): Promise<void> {
    console.log(`Send email to ${email} with subject "${subject}" and message "${message}"`);
  }
}
