import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  homeForm:FormGroup;
  ngOnInit() {
    this.homeForm=this.fb.group({
      button1:["",Validators.required],
      button2:["",Validators.required]
    })
  }

}
