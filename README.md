# Invite code challenge

The task of this code challenge is to send an invitation to each of the users from the list (located in `invite.component.ts`).
You need to make api call sequentially for each email and to display the collected results info afterwards on `invite-list.component.html` (redirect to `invet-list` page once the last email is sent). 

The error messages should be displayed individually with the information on the error content (e.g. _user1@comtravo.com already exists_). 
Successful invitations should all be given in the form of their total number (e.g. _5 users successfully invited_).

## Development server

Run `npm run start:all` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


App Start Page
![image](https://user-images.githubusercontent.com/54270466/145456789-3e069194-f966-4f4f-9d3a-cf1cdfe58555.png)

On click of "Invite" link
![image](https://user-images.githubusercontent.com/54270466/145456854-c05a2c20-72c8-4c61-ac1a-c9dca6c6c64a.png)


On click of "INVITE" button, error toasts are displayed if any, number of invited users are displayed in toast, list of successfully invited users are displayed after routing to list page.
![image](https://user-images.githubusercontent.com/54270466/145457044-215264ef-0644-497f-bd27-4036ebb72ead.png)







*Challenge completed by Oladipupo Paul Folarin - folarindipo@yahoo.co.uk*
