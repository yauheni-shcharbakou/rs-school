import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor(private readonly salt: number) {}

  async hash(input: string): Promise<string> {
    return hash(input, this.salt);
  }

  async compare(decrypted: string, encrypted: string): Promise<boolean> {
    return compare(decrypted, encrypted);
  }
}
