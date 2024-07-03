import dns from "dns/promises";

class EmailVerifier {
  constructor(private allowedProviders: string[]) {
    this.allowedProviders = allowedProviders;
  }

  private async checkMXRecords(domain: string): Promise<boolean> {
    try {
      const records = await dns.resolve(domain, "MX");
      return records.length > 0;
    } catch (error) {
      return false;
    }
  }

  private async checkDomainExists(domain: string): Promise<boolean> {
    try {
      await dns.lookup(domain);
      return true;
    } catch (error) {
      return false;
    }
  }

  private isDisposable(email: string): boolean {
    const domain = email.split("@")[1];
    return !this.allowedProviders.includes(domain);
  }

  public async validateEmail(email: string) {
    const domain = email.split("@")[1];
    const isDisposable = this.isDisposable(email);
    const [isDomainExists, hasMXRecords] = await Promise.all([
      this.checkDomainExists(domain),
      this.checkMXRecords(domain),
      // this.checkSMTPConnection(domain),
    ]);
    let status: "valid" | "invalid" | "disposable";
    let reason: string = "";

    if (isDisposable) {
      status = "disposable";
      reason = "Disposable email detected";
    } else if (!isDomainExists) {
      status = "invalid";
      reason = "Domain does not exist";
    } else if (!hasMXRecords) {
      status = "invalid";
      reason = "No MX records found";
    } else {
      status = "valid";
      reason = "Email is valid";
    }

    return {
      isDisposable,
      isDomainExists,
      domain,
      status,
      reason,
      hasMXRecords,
    };
  }
}

export default EmailVerifier;
