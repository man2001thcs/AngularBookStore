import { Response } from "../../model/response";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, Subscription, map } from "rxjs";
import {
  ConfirmDialogComponent,
  DialogData,
} from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { NotifyDialogComponent } from "src/app/utility/notification/notify-dialog.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Book } from "src/app/model/book";
import { AdminService } from "../service/admin.service";
import { CheckDeactivate } from "../interface/admin.check_edit";
import { Publisher, PublisherParam } from "./publisher-create.component.model";
import * as PublisherActions from "./publisher-create.store.action";
import { State as PublisherState } from "./publisher-create.store.reducer";
import { Store } from "@ngrx/store";
import {
  createPublisher,
  getMessage,
  getSysError,
} from "./publisher-create.store.selector";
import { FailNotifyDialogComponent } from "src/app/utility/notification/fail-notify-dialog.component";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-book-create",
  templateUrl: "./publisher-create.component.html",
  styleUrls: ["./publisher-create.component.css"],
})
export class PublisherCreateComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;

  publisherParam!: PublisherParam;

  this_announce = "";

  createformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  publisherState!: Observable<any>;
  createPublisherState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<PublisherState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: PublisherParam
  ) {
    this.createPublisherState = this.store.select(createPublisher);

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.createPublisherState.subscribe((state) => {
        if (state) {       
          this.messageService.openMessageNotifyDialog(state.messageCode);
        }
      })
    );

    this.subscriptions.push(
      this.errorMessageState.subscribe((state) => {
        if (state) {
          console.log(state);
          this.messageService.openMessageNotifyDialog(state);
        }
      })
    );

    this.subscriptions.push(
      this.errorSystemState.subscribe((state) => {
        if (state) {
          console.log(state);
          this.messageService.openSystemFailNotifyDialog(state);
        }
      })
    );

    this.store.dispatch(PublisherActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createformGroup_info = this.fb.group({
      publisherName: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      address: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      phoneNumber: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      description: "",
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(PublisherActions.resetPublisher());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.createformGroup_info.setValue({
      publisherName: "",
      address: "",
      email: "",
      phoneNumber: "",
      description: "",
    });
  }

  formSubmit_create_info(): void {
    const payload: Publisher = {
      publisherName: this.createformGroup_info.value.publisherName,
      description: this.createformGroup_info.value.description,
      address: this.createformGroup_info.value.address,
      email: this.createformGroup_info.value.email,
      phoneNumber: this.createformGroup_info.value.phoneNumber,
    };

    this.store.dispatch(
      PublisherActions.createPublisher({
        payload: payload,
      })
    );

    console.log(payload);
  }
}
