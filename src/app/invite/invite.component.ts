import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InviteService, User } from '../service/invite.service';

const users: User[] = [
  { email: 'user0@comtravo.com' },
  { email: 'user1@comtravo.com' },
  { email: 'user2@comtravo.com' },
  { email: 'user3@comtravo.com' },
  { email: 'user4@comtravo.com' },
  { email: 'user5@comtravo.com' },
  { email: 'user6@comtravo.com' },
  { email: 'user7@comtravo.com' },
  { email: 'user8@comtravo.com' },
  { email: 'user9@comtravo.com' },
  { email: 'user10@comtravo.com' }
];

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  isLoading: boolean;
  private invitedUsers: string[] = [];
  existingUsers: User[] = [];
  constructor(
    private inviteService: InviteService,
    private toasterService: ToastrService,
    private router: Router
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    console.log(users);
    this.inviteService.exsitingUsers.subscribe(users => {
      this.existingUsers = users;
      console.log('this.existingUsers >>>> ', this.existingUsers);
    });
  }

  onSubmit(): void {
    this.inviteUser();
  }

  async inviteUser() {
    this.isLoading = true;
    console.log("Invite user");
    let subscriptions: Promise<any>[] = [];
    users.forEach(
      user => {
        const existingUser = this.existingUsers.find(existingUser => existingUser.email == user.email);
        if(existingUser) {
          this.toasterService.error(`Inviting ${existingUser.email} failed with error: User already exists`);
        }
        else {
          subscriptions.push(this.inviteService.invite(user));
        }
      }
    )
    const answer = await Promise.allSettled(subscriptions);
    const fulfilled = answer.filter(
      result => result.status === 'fulfilled').map(
        (result: any) => result.value);
    this.invitedUsers = fulfilled.map(user => user.email);
    this.toasterService.success(`${this.invitedUsers.length} new users invited.`);
    const rejected = answer.filter(
      result => result.status === 'rejected').map(
        (result: any) => result.reason);
    rejected.forEach(
      error => {
        this.toasterService.error(`Inviting ${(error.user as User).email} failed with error: ${error.error.error}`);
      }
    )
    this.router.navigate(['list'], { state: { data: fulfilled } });
  }
}
