import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";
import { NotifyDialogComponent } from "../notification/notify-dialog.component";
import { FailNotifyDialogComponent } from "../notification/fail-notify-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {
  ERR_MESSAGE_CODE_VI,
  SUCCESS_MESSAGE_CODE_VI,
} from "../config/messageCode";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(private dialog: MatDialog) {}

  openNotifyDialog(this_announce: string) {
    const ref = this.dialog.open(NotifyDialogComponent, {
      data: {
        title: this_announce,
      },
    });
    return ref.afterClosed();
  }

  openFailNotifyDialog(this_announce: string) {
    const ref = this.dialog.open(FailNotifyDialogComponent, {
      data: {
        title: this_announce,
      },
    });
    return ref.afterClosed();
  }

  openSystemFailNotifyDialog(httpStatus: any) {
    let this_announce = "";
    if (httpStatus.status == "403") {
      this_announce = "Bạn không có thẩm quyền để thực hiện hành động này";
    } else if (httpStatus.status == "504") {
      this_announce = "Mất kết nối với server, vui lòng thử lại sau";
    }

    const ref = this.dialog.open(FailNotifyDialogComponent, {
      data: {
        title: this_announce,
      },
    });
    return ref.afterClosed();
  }

  closeAllDialog() {
    this.dialog.closeAll();
  }

  openMessageNotifyDialog(this_announce_code: string) {
    let message_announce = "";
    if (this_announce_code.startsWith("C")) {
      message_announce = ERR_MESSAGE_CODE_VI.get(this_announce_code) ?? "";
      this.openFailNotifyDialog(message_announce ?? "");
    } else if (this_announce_code.startsWith("I")) {
      message_announce = SUCCESS_MESSAGE_CODE_VI.get(this_announce_code) ?? "";
      this.openNotifyDialog(message_announce ?? "");
    }
  }

  openSystemErrNotifyDialog(this_announce_code: string, this_err_mess: string) {
    let message_announce = "";
    if (this_announce_code.startsWith("C") && this_err_mess != "") {
      message_announce = ERR_MESSAGE_CODE_VI.get(this_announce_code) ?? "";
      this.openFailNotifyDialog(message_announce + ": " + this_err_mess ?? "");
    }
  }
}
