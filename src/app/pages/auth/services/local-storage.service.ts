import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "@env/environment";
import jwtdecode from "jwt-decode";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models";
@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    private jwtHelper = new JwtHelperService();
    public readonly UserMenu: string = "user_menu";
    public readonly ClientId: string = "client_id";
    public readonly UserInfo: string = "user_info";

    /*Keys used on the local storage*/
    private readonly JwtToken: string = "app_token";
    private readonly JwtAvatar: string = "avatar_url";
    private readonly JwtFullName: string = "full_name";
    /*Keys used on the JwtToken*/
    private readonly JwtTokenAttrEmail: string = "email";
    private readonly JwtTokenAttrSub: string = "sub";
    private readonly JwtTokenAttrRole: string =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

    private readonly JwtTokenName: string = "name";

    private readonly JwtTokenSurname: string =
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname";

    private readonly JwtTokenNameidentifier: string =
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

    private readonly JwtTokenOrganizationName: string = "organizationName";
    private readonly JwtTokenOrganizationId: string = "organizationId";
    private readonly ApiProcessNotificationKey: string = "apiProcessNotificationKey";

    user$: Observable<User>;
    private readonly userSubject: BehaviorSubject<User>;

    constructor() {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user$ = this.userSubject.asObservable();
    }

    setJwtToken(token: string): void {
        localStorage.setItem(this.JwtToken, token);
    }

    getJwtToken(): string | null {
        return localStorage.getItem(this.JwtToken);
    }

    setApiProcessNotificationKey(key: string): void {
        localStorage.setItem(this.ApiProcessNotificationKey, key);
    }
    getApiProcessNotificationKey(): string | null {
        return localStorage.getItem(this.ApiProcessNotificationKey);
    }

    getUserEmail(): string | null {
        const token: any = this.getJwtToken();
        if (token) {
            const decodedtoken: any = jwtdecode(this.getJwtToken() || "");
            return decodedtoken[this.JwtTokenAttrEmail];
        } else {
            return null;
        }
    }

    getUserData(): User {
        const user: User = { id: null };
        const token: any = this.getJwtToken();
        if (token) {
            const decodedtoken: any = jwtdecode(this.getJwtToken() || "");            
            user.id = decodedtoken[this.JwtTokenAttrSub];
            user.name = decodedtoken[this.JwtFullName];
            user.email = decodedtoken[this.JwtTokenAttrEmail];
            user.avatar = `${environment.apis.default.url}/${decodedtoken[this.JwtAvatar]}?last=${Math.random()}`;
            user.role = decodedtoken.role

            this.setUserData(user);
        }
        return user;
    }
    

    setUserData(user: User): void {
        this.userSubject.next(user)
    }

    getUserId(): string | null {
        const token: any = this.getJwtToken();
        if (token) {
            const decodedtoken: any = jwtdecode(this.getJwtToken() || "");
            return decodedtoken[this.JwtTokenAttrSub];
        } else {
            return null;
        }
    }


    getUsuarioRole(): string | null {
        const token: any = this.getJwtToken();
        if (token) {
            const decodedtoken: any = jwtdecode(this.getJwtToken() || "");
            return decodedtoken[this.JwtTokenAttrRole];
        } else {
            return null;
        }
    }

    isTokenExpired(): boolean {
        const token: any = this.getJwtToken();
        if (token) {
            const decodedtoken = jwtdecode(this.getJwtToken() || "");
            return this.jwtHelper.isTokenExpired(token);
        } else {
            return true;
        }
    }

    setMenu(menuList: any): void {
        console.log(menuList);
        localStorage.setItem(this.UserMenu, JSON.stringify(menuList));
    }
    getUserMenu(): any[] {
        const menuList = localStorage.getItem(this.UserMenu);
        return menuList ? JSON.parse(menuList) : [];
    }

    clearLocalStorage(): void {
        this.setJwtToken("");
        localStorage.removeItem(this.UserMenu);
    }

}
