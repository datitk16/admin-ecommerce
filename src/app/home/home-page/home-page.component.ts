import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { DialogMessageService } from 'src/app/core/services/dialog-message.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userService: UserService,
    private dialogMessageService:DialogMessageService
  ) { }

  ngOnInit(): void {
  }
  onActivate(event) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }




  searchProducts(keyword) {
    this.router.navigate(['/products'], {
      queryParams: { keyword },
      relativeTo: this.activatedRoute
    });
  }

  postProduct() {
    if (!this.userService.getToken) {
      this.dialogMessageService.showInfoMessage('Thông báo', 'Vui lòng đăng nhập!');
      this.router.navigateByUrl('/login');
    }
    else {
      this.router.navigateByUrl('/post');
    }
  }
}
