import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';

interface LoginPayload {
  identifier: string; // username or email
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'ADMIN',
      status: 'ENABLED',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      username: 'user',
      email: 'user@example.com',
      role: 'USER',
      status: 'ENABLED',
      createdAt: new Date().toISOString(),
    },
  ];

  private passwords = new Map<number, string>([
    [1, 'admin123'],
    [2, 'user123'],
  ]);

  private currentUserKey = 'ignite-current-user';
  private _currentUser: User | null = null;

  constructor(private readonly router: Router) {
    const stored = localStorage.getItem(this.currentUserKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as User;
        const exists = this.users.find((u) => u.id === parsed.id);
        if (exists) {
          this._currentUser = exists;
        }
      } catch {
        // ignore parse errors
      }
    }
  }

  get currentUser(): User | null {
    return this._currentUser;
  }

  get isAuthenticated(): boolean {
    return !!this._currentUser;
  }

  get role(): UserRole | null {
    return this._currentUser?.role ?? null;
  }

  login(payload: LoginPayload): boolean {
    const { identifier, password } = payload;

    const user = this.users.find(
      (u) =>
        u.username.toLowerCase() === identifier.toLowerCase() ||
        u.email.toLowerCase() === identifier.toLowerCase()
    );

    if (!user) return false;

    const storedPassword = this.passwords.get(user.id);
    if (storedPassword !== password) return false;

    this._currentUser = user;
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    return true;
  }

  register(payload: RegisterPayload): User | null {
    const exists = this.users.some(
      (u) =>
        u.username.toLowerCase() === payload.username.toLowerCase() ||
        u.email.toLowerCase() === payload.email.toLowerCase()
    );
    if (exists) return null;

    const id = Math.max(...this.users.map((u) => u.id)) + 1;
    const newUser: User = {
      id,
      username: payload.username,
      email: payload.email,
      role: 'USER',
      status: 'ENABLED',
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    this.passwords.set(id, payload.password);
    return newUser;
  }

  logout(): void {
    this._currentUser = null;
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  getUserPosts(userId: number): number[] {
    return [];
  }
}
