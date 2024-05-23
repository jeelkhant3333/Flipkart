import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { navigation } from './nav-content';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss'
})
export class NavContentComponent {
  category: any;
  @Input() selectedSection: any;

  constructor(private router:Router){}

  ngOnInit() {
    this.category = navigation;
  }

  handleNavigate=(path:any)=>{
    this.router.navigate([path])
  }

}
