import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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

    items = [
        {
            label: 'Admin',
            items: [
                {
                    label: 'Profile',   
                },
            ]
        },
        {
            items: [
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                }
            ]
        },
    ];

  logout(): void {
    this.route.navigate(['/login']);
  }
 
  
}
