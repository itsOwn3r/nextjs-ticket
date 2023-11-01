# NextJS Ticketing System
  Fully-Functional Ticketing System With Next/React JS, MongoDB(with Prisma), and NextAuth.
  
  # Key Features:
  Custom Login And Signup with NextAuth(With MongoDB and Prisma)
  Uploading Images
  Selecting the department
  Selecting the priority
  Adding tags
  Closing tickets
  Can have multiple agents answering the tickets
  
# **.env** file should look like this:
```bash
NEXTAUTH_URL=
NEXTAUTH_SECRET=
SECRET=
DATABASE_URL=
CLOUDINARY_URL=
cloud_name=
upload_preset=
```
Keep in mind, **Cloudinary** is only for uploading images and avatars.
**Secret** is for hashing the password with sha256 algorithm.



## Creating new agents to answer tickets

After they signed up, you just need to set the **type** of user to **admin**

## Preview
You could login to the preview URL with user & password: **demo**
You could also signup with your email!
