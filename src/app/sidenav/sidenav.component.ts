import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  constructor(private route: Router) {}

  toggleSidebar(): void {
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const closeBtn = document.querySelector('#btn') as HTMLElement;

    if (sidebar && closeBtn) {
      sidebar.classList.toggle('open');
      this.menuBtnChange(closeBtn, sidebar);
    }
  }

  private menuBtnChange(closeBtn: HTMLElement, sidebar: HTMLElement): void {
    if (sidebar.classList.contains('open')) {
      closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  }

  logout(): void {
    this.route.navigate(['/login']);
  }
}
