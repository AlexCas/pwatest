import { Rest, RestService } from "@abp/ng.core";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppMessages } from "../utils/app-messages";

@Injectable({ providedIn: "root" })
export class FileUploadDownloadService {
  constructor(private rest: RestService) { }


  public uploadUserAvatar(input: any): Promise<any> {
    const request: Rest.Request<null> = {
      method: "PUT",
      url: '/api/app/user/update-avatar',
      body: input,
    };
    return this.rest.request<null, any>(request).toPromise()
  }

  private async downloadFile(response: any, setting: any): Promise<any> {
    const downloadedFile = new Blob([response], {
      type: setting.contentType,
    });
    const a = document.createElement("a");
    a.setAttribute("style", "display:none;");
    document.body.appendChild(a);
    a.download = setting.fileName;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = "_blank";
    a.click();
    document.body.removeChild(a);
  }
}
