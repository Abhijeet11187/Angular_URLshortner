import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../shared/httpservice.service';
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-enter-url',
  templateUrl: './enter-url.component.html',
  styleUrls: ['./enter-url.component.scss']
})
export class EnterURLComponent implements OnInit {
  urlData: FormGroup;
  userName;
  message;
  shortenURLresponse;
  userLogin: Boolean = false;
  msgArrived = false;
  notLogin = false;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private httpservice: HttpserviceService, private toastr: ToastrService) { }
  arr = [1, 2, 3, 4, 5, 6]
  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('userName') ? this.route.snapshot.paramMap.get('userName') : "";
    // console.log("Id is captured " + this.userName);
    this.userName ? this.userLogin = true : this.userLogin = false;
    if (this.userLogin) {
      this.httpservice.getUserInfo(this.userName).subscribe((res: any) => {
        this.message = res;
        this.msgArrived = true;
        // this.ngOnInit();
        if (res.message !== "Not Found") {
        } else {
        }
      }, (err) => {
        console.log(err);
      })
    }
    this.urlData = this.fb.group({
      url: ['', [Validators.required,
        // Validators.pattern("/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/")
    ]]
    });
  }
  shortURL() {
    console.log("short URL");
    {
      // originalURL
      let formdata = new FormData();
      formdata.append('originalURL', this.urlData.get('url').value);
      console.log("user Name is " + this.userName);
      this.httpservice.shortURL(this.userName, formdata).subscribe((res: any) => {
        if (res.message !== "Not Found") {
          console.log("Response captured is  ", res);
          !this.userName ? this.notLogin = true : "";
          !this.userName ? alert("Shorten URL is        "+res.shortenURL) : "";

          this.toastr.success("Successfully Shorten");
          this.ngOnInit();
        } else {
        }
      }, (err) => {https://is.gd/WzFWtC
        console.log(err);
        this.toastr.error("Already Exists");

      })
    }
  }
}
